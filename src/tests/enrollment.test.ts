import { v4 as uuidv4 } from 'uuid';

class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

interface IEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: Date;
  status: string;
}

class InMemoryEnrollmentRepository {
  private enrollments: IEnrollment[] = [];

  async enroll(studentId: string, courseId: string): Promise<IEnrollment> {
    const alreadyEnrolled = this.enrollments.find(
  e => e.studentId === studentId &&
       e.courseId === courseId
);


    if (alreadyEnrolled) {
      throw new AppError('Usuário já está matriculado neste curso', 400);
    }

    const enrollment: IEnrollment = {
      id: uuidv4(),
      studentId,
      courseId,
      enrolledAt: new Date(),
      status: 'pending_payment',
    };

    this.enrollments.push(enrollment);
    return enrollment;
  }

  async findByUser(userId: string): Promise<IEnrollment[]> {
    return this.enrollments.filter(e => e.studentId === userId);
  }

  async findByCourse(courseId: string): Promise<IEnrollment[]> {
    return this.enrollments.filter(e => e.courseId === courseId);
  }

  async clear(): Promise<void> {
    this.enrollments = [];
  }

  async handlePaymentWebhook(enrollmentId: string, status: string): Promise<void> {
  const enrollment = this.enrollments.find(e => e.id === enrollmentId);
  if (!enrollment) {
    throw new AppError('Matrícula não encontrada', 404);
  }

  if (enrollment.status === 'paid') {
    return;
  }

  if (status === 'paid' && enrollment.status === 'pending_payment') {
    enrollment.status = 'paid';
  }
}

async listAll(): Promise<IEnrollment[]> {
  return this.enrollments;
}

async findByStudent(studentId: string, role: string): Promise<IEnrollment[]> {
  if (role === 'admin') {
    return this.enrollments;
  }
  return this.enrollments.filter(e => e.studentId === studentId);
}

async findById(enrollmentId: string): Promise<IEnrollment | null> {
  return this.enrollments.find(e => e.id === enrollmentId) || null;
}

async delete(enrollmentId: string): Promise<void> {
  const index = this.enrollments.findIndex(e => e.id === enrollmentId);
  if (index === -1) {
    throw new AppError('Matrícula não encontrada', 404);
  }

  if (this.enrollments[index].status !== 'pending_payment') {
    throw new AppError('Matrícula não pode ser cancelada após pagamento', 400);
  }

  this.enrollments.splice(index, 1);
}



}

describe('InMemoryEnrollmentRepository', () => {
    const repo = new InMemoryEnrollmentRepository();

beforeEach(async () => {
    await repo.clear();
  });


    describe('Criação de matrícula', () => {
  const enrollmentRepo = new InMemoryEnrollmentRepository();

  beforeEach(async () => {
    await enrollmentRepo.clear();
  });

  it('deve criar uma matrícula válida', async () => {
    const enrollment = await enrollmentRepo.enroll(
      'ec42a0b5-04b2-4e0f-a04d-af4056f968cd',
      '6222db44-ff99-4b7f-b76f-2e126478beb6'
    );

    expect(enrollment.studentId).toBe('ec42a0b5-04b2-4e0f-a04d-af4056f968cd');
    expect(enrollment.courseId).toBe('6222db44-ff99-4b7f-b76f-2e126478beb6');
    expect(enrollment.status).toBe('pending_payment');
  });

  it('não deve permitir matrícula duplicada para o mesmo aluno e curso', async () => {
    await enrollmentRepo.enroll(
      'ec42a0b5-04b2-4e0f-a04d-af4056f968cd',
      '6222db44-ff99-4b7f-b76f-2e126478beb6'
    );

    await expect(
      enrollmentRepo.enroll(
        'ec42a0b5-04b2-4e0f-a04d-af4056f968cd',
        '6222db44-ff99-4b7f-b76f-2e126478beb6'
      )
    ).rejects.toThrow(AppError);
  });
});

describe('Webhook de pagamento', () => {
  const enrollmentRepo = new InMemoryEnrollmentRepository();

  beforeEach(async () => {
    await enrollmentRepo.clear();
  });

  it('deve alterar status para paid se estiver pending_payment', async () => {
    const enrollment = await enrollmentRepo.enroll(
      'student-id-1',
      'course-id-1'
    );

    await enrollmentRepo.handlePaymentWebhook(enrollment.id, 'paid');

    const updated = await enrollmentRepo.findByUser('student-id-1');
    expect(updated[0].status).toBe('paid');
  });

  it('não deve alterar status se já estiver como paid', async () => {
    const enrollment = await enrollmentRepo.enroll(
      'student-id-2',
      'course-id-2'
    );

    enrollment.status = 'paid';

    await enrollmentRepo.handlePaymentWebhook(enrollment.id, 'paid');

    const result = await enrollmentRepo.findByUser('student-id-2');
    expect(result[0].status).toBe('paid'); 
  });

  it('deve lançar erro se matrícula não existir', async () => {
    await expect(
      enrollmentRepo.handlePaymentWebhook('matricula-inexistente', 'paid')
    ).rejects.toThrow(AppError);
  });
});

describe('Listagem e busca de matrículas', () => {
  const enrollmentRepo = new InMemoryEnrollmentRepository();

  beforeEach(async () => {
    await enrollmentRepo.clear();
  });

  it('deve listar todas as matrículas existentes', async () => {
    await enrollmentRepo.enroll('student-1', 'course-1');
    await enrollmentRepo.enroll('student-2', 'course-2');

    const all = await enrollmentRepo.listAll();
    expect(all).toHaveLength(2);
  });

  it('deve retornar todas as matrículas de um estudante', async () => {
    await enrollmentRepo.enroll('student-1', 'course-1');
    await enrollmentRepo.enroll('student-1', 'course-2');
    await enrollmentRepo.enroll('student-2', 'course-3');

    const studentEnrollments = await enrollmentRepo.findByStudent('student-1', 'student');
    expect(studentEnrollments).toHaveLength(2);
    expect(studentEnrollments.every(e => e.studentId === 'student-1')).toBe(true);
  });

  it('deve retornar todas as matrículas se o usuário for admin', async () => {
    await enrollmentRepo.enroll('student-1', 'course-1');
    await enrollmentRepo.enroll('student-2', 'course-2');

    const adminView = await enrollmentRepo.findByStudent('student-1', 'admin');
    expect(adminView).toHaveLength(2);
  });

  it('deve retornar uma matrícula específica pelo ID', async () => {
    const enrollment = await enrollmentRepo.enroll('student-1', 'course-1');

    const found = await enrollmentRepo.findById(enrollment.id);
    expect(found).not.toBeNull();
    expect(found?.id).toBe(enrollment.id);
  });
});

describe('Cancelamento de matrícula (delete)', () => {
  const enrollmentRepo = new InMemoryEnrollmentRepository();

  beforeEach(async () => {
    await enrollmentRepo.clear();
  });

  it('deve deletar matrícula se estiver com status pending_payment', async () => {
    const enrollment = await enrollmentRepo.enroll('student-1', 'course-1');

    await enrollmentRepo.delete(enrollment.id);

    const all = await enrollmentRepo.findByUser('student-1');
    expect(all).toHaveLength(0);
  });

  it('não deve deletar matrícula se status for paid', async () => {
    const enrollment = await enrollmentRepo.enroll('student-2', 'course-2');
    enrollment.status = 'paid';

    await expect(enrollmentRepo.delete(enrollment.id)).rejects.toThrow(AppError);
  });

  it('deve lançar erro se matrícula não existir', async () => {
    await expect(enrollmentRepo.delete('matricula-inexistente')).rejects.toThrow(AppError);
  });
});



})