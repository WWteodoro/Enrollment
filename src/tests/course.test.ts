import { v4 as uuidv4 } from 'uuid';

class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

interface ICourse {
  id: string;
  title: string;
  slug: string;
  priceCents: number;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

class InMemoryCourseRepository {
  private courses: ICourse[] = [];

  async create(course: ICourse): Promise<ICourse> {
    const slugExists = this.courses.find(c => c.slug === course.slug);
    if (slugExists) {
      throw new AppError('Slug já está em uso', 400);
    }

    this.courses.push(course);
    return course;
  }

  async clear(): Promise<void> {
    this.courses = [];
  }

  async findBySlug(slug: string): Promise<ICourse | null> {
    return this.courses.find(c => c.slug === slug) || null;
  }

  async findById(id: string): Promise<ICourse | null> {
  return this.courses.find(c => c.id === id) || null;
}

async listAll(): Promise<ICourse[]> {
  return this.courses;
}

async paginate(page: number, perPage: number): Promise<ICourse[]> {
  const start = (page - 1) * perPage;
  return this.courses.slice(start, start + perPage);
}

}

describe('InMemoryCourseRepository', () => {
    const repo = new InMemoryCourseRepository();

    beforeEach(async () => {
        await repo.clear();
    })

    describe('Criação de cursos', () => {
  const courseRepo = new InMemoryCourseRepository();

  beforeEach(async () => {
    await courseRepo.clear();
  });

  it('deve criar um curso com slug único', async () => {
    const course = {
      id: uuidv4(),
      title: 'teste',
      slug: 'testte6',
      priceCents: 10,
      capacity: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const created = await courseRepo.create(course);
    expect(created.slug).toBe('testte6');
    expect(created.title).toBe('teste');
  });

  it('não deve permitir criação de curso com slug duplicado', async () => {
    const course1 = {
      id: uuidv4(),
      title: 'Curso A',
      slug: 'duplicado',
      priceCents: 100,
      capacity: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const course2 = {
      id: uuidv4(),
      title: 'Curso B',
      slug: 'duplicado', 
      priceCents: 200,
      capacity: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await courseRepo.create(course1);

    await expect(courseRepo.create(course2)).rejects.toThrow(AppError);
  });

  it('deve retornar um curso pelo ID', async () => {
  const course = {
    id: '13ad58d9-9b3d-4b18-ab4f-cefe05c2e9e3',
    title: 'Curso por ID',
    slug: 'curso-id',
    priceCents: 50,
    capacity: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await courseRepo.create(course);

  const found = await courseRepo.findById(course.id);
  expect(found).not.toBeNull();
  expect(found?.title).toBe('Curso por ID');
});

it('deve listar todos os cursos', async () => {
  const course1 = {
    id: uuidv4(),
    title: 'Curso 1',
    slug: 'curso-1',
    priceCents: 100,
    capacity: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const course2 = {
    id: uuidv4(),
    title: 'Curso 2',
    slug: 'curso-2',
    priceCents: 200,
    capacity: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await courseRepo.create(course1);
  await courseRepo.create(course2);

  const all = await courseRepo.listAll();
  expect(all).toHaveLength(2);
});

it('deve paginar os cursos corretamente', async () => {
  for (let i = 1; i <= 5; i++) {
    await courseRepo.create({
      id: uuidv4(),
      title: `Curso ${i}`,
      slug: `curso-${i}`,
      priceCents: i * 100,
      capacity: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  const page1 = await courseRepo.paginate(1, 3);
  const page2 = await courseRepo.paginate(2, 3);

  expect(page1).toHaveLength(3);
  expect(page2).toHaveLength(2);
  expect(page1[0].title).toBe('Curso 1');
  expect(page2[0].title).toBe('Curso 4');
});

});

})
