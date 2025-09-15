import { v4 as uuidv4 } from 'uuid';

class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

class InMemoryUserRepository {
  private users: IUser[] = [];

  async insert(data: IUser): Promise<IUser> {
    const existing = this.users.find(user => user.email === data.email);
    if (existing) {
      throw new AppError('Email já está em uso', 400);
    }

    this.users.push(data);
    return data;
  }

  async findAll(): Promise<IUser[]> {
    return this.users;
  }

    async findById(id: string): Promise<IUser | null> {
  return this.users.find(user => user.id === id) || null;
}

async update(id: string, data: Partial<IUser>): Promise<IUser> {
  const index = this.users.findIndex(user => user.id === id);
  if (index === -1) {
    throw new AppError('Usuário não encontrado', 404);
  }

  this.users[index] = {
    ...this.users[index],
    ...data,
    updatedAt: new Date(),
  };

  return this.users[index];
}

async delete(id: string): Promise<void> {
  const index = this.users.findIndex(user => user.id === id);
  if (index === -1) {
    throw new AppError('Usuário não encontrado', 404);
  }

  this.users.splice(index, 1);
}

async findByEmail(email: string): Promise<IUser | null> {
  return this.users.find(user => user.email === email) || null;
}


  async clear(): Promise<void> {
    this.users = [];
  }
}

describe('InMemoryUserRepository', () => {
  const repo = new InMemoryUserRepository();

  beforeEach(async () => {
    await repo.clear();
  });

  it('deve lançar erro se email já estiver em uso', async () => {
    const user = {
      id: uuidv4(),
      name: 'Outro',
      email: 'willgv@email.com',
      password: '123',
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await repo.insert(user);

    await expect(
      repo.insert({
        id: uuidv4(),
        name: 'Albertjok232',
        email: 'willgv@email.com',
        password: 'teste',
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    ).rejects.toThrow(AppError);
  });

  it('deve criar usuário se email for único', async () => {
    const user = await repo.insert({
      id: uuidv4(),
      name: 'Albertjok232',
      email: 'novo@email.com',
      password: 'teste',
      role: 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('novo@email.com');
  });

  it('deve retornar todos os usuários cadastrados', async () => {
  const user1 = {
    id: uuidv4(),
    name: 'Usuário 1',
    email: 'user1@email.com',
    password: '123',
    role: 'student',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const user2 = {
    id: uuidv4(),
    name: 'Usuário 2',
    email: 'user2@email.com',
    password: '456',
    role: 'student',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await repo.insert(user1);
  await repo.insert(user2);

  const allUsers = await repo.findAll();

  expect(allUsers).toHaveLength(2);
  expect(allUsers).toEqual(expect.arrayContaining([user1, user2]));
});

it('deve retornar um usuário pelo id', async () => {
  const user = {
    id: 'e6f05a8d-082f-43d6-880c-4950f976ab30',
    name: 'Usuário Teste',
    email: 'teste@email.com',
    password: '123',
    role: 'student',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await repo.insert(user);

  const found = await repo.findById('e6f05a8d-082f-43d6-880c-4950f976ab30');

  expect(found).not.toBeNull();
  expect(found?.email).toBe('teste@email.com');
});

it('deve atualizar um usuário existente', async () => {
  const originalUser = {
    id: 'e6f05a8d-082f-43d6-880c-4950f976ab30',
    name: 'Usuário Original',
    email: 'original@email.com',
    password: '123',
    role: 'student',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await repo.insert(originalUser);

  const updated = await repo.update(originalUser.id, {
    name: 'Albertjok232',
    email: 'willgv@tuldewtwl.com',
    password: 'senha',
  });

  expect(updated.name).toBe('Albertjok232');
  expect(updated.email).toBe('willgv@tuldewtwl.com');
  expect(updated.password).toBe('senha');
});

it('deve deletar um usuário existente', async () => {
  const user = {
    id: 'e6f05a8d-082f-43d6-880c-4950f976ab30',
    name: 'Usuário Deletável',
    email: 'delete@email.com',
    password: '123',
    role: 'student',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await repo.insert(user);

  await repo.delete(user.id);

  const found = await repo.findById(user.id);
  expect(found).toBeNull();
});

it('deve retornar um usuário pelo email', async () => {
  const user = {
    id: 'e6f05a8d-082f-43d6-880c-4950f976ab30',
    name: 'Usuário Email',
    email: 'email@email.com',
    password: '123',
    role: 'student',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await repo.insert(user);

  const found = await repo.findByEmail('email@email.com');

  expect(found).not.toBeNull();
  expect(found?.id).toBe('e6f05a8d-082f-43d6-880c-4950f976ab30');
});


});


