import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criação de usuários
  const admin = await prisma.user.create({
  data: {
    name: 'Admin',
    email: 'admin@enova.ac',
    password: 'Admin123!',
    role: 'admin',
  },
});

const student = await prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@example.com',
    password: 'Alice123!',
    role: 'student',
  },
});


  // Criação de cursos
  const course1 = await prisma.course.create({
    data: {
      title: 'Fundamentos de Marketing Digital',
      slug: 'fund-marketing',
      priceCents: 9900,
      capacity: 2,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Introdução a Data Science',
      slug: 'intro-ds',
      priceCents: 12900,
    },
  });

  // Matrícula 
  await prisma.enrollment.create({
    data: {
      studentId: student.id,
      courseId: course1.id,
      status: 'pending_payment',
    },
  });

  console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch(e => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
