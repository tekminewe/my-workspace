import { LanguageEnum, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedDev() {
  console.log('Seeding development data');
  await prisma.user.upsert({
    where: { email: 'ewe.tekmin@outlook.com' },
    update: {
      roles: {
        connect: {
          name: 'Owner',
        },
      },
    },
    create: {
      id: 'cm2hn7zpg00006shxctoj4jcz',
      email: 'ewe.tekmin@outlook.com',
      emailVerified: '2024-10-20T12:48:23.353Z',
      createdAt: '2024-10-20T12:48:23.813Z',
      updatedAt: '2024-10-20T12:48:23.813Z',
      profile: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
      // companies: {
      //   create: {
      //     id: 'cm2m188pk0000s99unejjqom0',
      //     name: 'Adam Limited',
      //   },
      // },
      accounts: {
        create: {
          type: 'oidc',
          provider: 'cognito',
          providerAccountId: '058d7508-0051-70db-c136-55a23d974076',
          createdAt: '2024-10-20T12:48:23.813Z',
          updatedAt: '2024-10-20T12:48:23.813Z',
        },
      },
      emailLogs: {
        createMany: {
          data: [
            {
              id: 'cm2hn7zpg00016shx7tqj4jcz',
              emailAddress: 'ewe.tekmin@outlook.com',
              subject: 'Testing Complaint Email',
              htmlContent: '<p>Welcome to Adam Limited</p>',
              status: 'PENDING',
              messageId:
                '010e0194a373962d-c012c8f1-525b-47b9-b17d-0a3c62dabc48-000000',
              createdAt: '2024-10-20T12:48:23.813Z',
              updatedAt: '2024-10-20T12:48:23.813Z',
            },
            {
              id: 'cm6f5rngk00003b5yomrz9925',
              emailAddress: 'ewe.tekmin@outlook.com',
              subject: 'Testing Bounce Email',
              htmlContent: '<p>Welcome to Adam Limited</p>',
              status: 'PENDING',
              messageId:
                '010e0194a370b91d-3ac8fc29-1a2a-48c3-9016-504e8e4347c5-000000',
              createdAt: '2024-10-20T12:48:23.813Z',
              updatedAt: '2024-10-20T12:48:23.813Z',
            },
          ],
        },
      },
      roles: {
        connect: {
          name: 'Owner',
        },
      },
    },
  });

  const advertiser = await prisma.advertiser.findFirst();

  await prisma.userAdvertiserClick.upsert({
    where: {
      id: 'cm5k7mawa00051113h21um8rc',
    },
    create: {
      id: 'cm5k7mawa00051113h21um8rc',
      userId: 'cm2hn7zpg00006shxctoj4jcz',
      advertiserId: advertiser.id,
      ipAddress: '',
      referrer: '',
      userAgent: '',
    },
    update: {},
  });
}

async function main() {
  if (process.env.NODE_ENV === 'development') {
    await seedDev();

    await prisma.language.updateMany({
      where: {
        id: {
          in: [LanguageEnum.ZH_MY, LanguageEnum.EN_MY],
        },
      },
      data: {
        isSupported: true,
      },
    });

    await prisma.language.update({
      where: {
        id: LanguageEnum.EN_MY,
      },
      data: {
        isDefault: true,
      },
    });
  }
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
