const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.message.deleteMany();
  await prisma.user.deleteMany();

  // Create two users
  const user1 = await prisma.user.create({
    data: {
      id: '1',
      username: 'admin',
      password: '$2b$10$QbxkMr9lOBz2Pw55REgTH.iGW3a6rbwoUPE98rcL/0188orKPvD3e', // Replace with a hashed password
      //email: 'john@example.com',
      avatar: 'https://via.placeholder.com/150',
      bio: 'Hello, I am John!',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: '2',
      username: 'user',
      password: '$2b$10$QbxkMr9lOBz2Pw55REgTH.iGW3a6rbwoUPE98rcL/0188orKPvD3e', // Replace with a hashed password
      //email: 'jane@example.com',
      avatar: 'https://via.placeholder.com/150',
      bio: 'Hi, I am Jane!',
    },
  });

  console.log('Users created:', { user1, user2 });

  // Create messages between the two users
  const messages = await prisma.message.createMany({
    data: [
      {
        content: 'Hi Jane, how are you?',
        senderId: user1.id,
        receiverId: user2.id,
      },
      {
        content: 'Hi John, I am good! How about you?',
        senderId: user2.id,
        receiverId: user1.id,
      },
      {
        content: 'I am doing great, thanks for asking!',
        senderId: user1.id,
        receiverId: user2.id,
      },
    ],
  });

  console.log('Messages created:', messages);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
