import {
  CurrencyEnum,
  LanguageEnum,
  PaymentChannelFeeTypeEnum,
  PaymentChannelStatusEnum,
  PaymentChannelTypeEnum,
  PaymentDirectionEnum,
  PrismaClient,
} from '@prisma/client';
const prisma = new PrismaClient();

async function seedSite() {
  const logo = await prisma.media.upsert({
    where: {
      id: 'cm4ei8eea000008l5crykb6jq',
    },
    create: {
      id: 'cm4ei8eea000008l5crykb6jq',
      mimeType: 'image/webp',
      filePath: 'logo.webp',
    },
    update: {},
  });
  await prisma.site.upsert({
    where: {
      id: 'cm4ei20ug0000sqr8wfk682hm',
    },
    create: {
      id: 'cm4ei20ug0000sqr8wfk682hm',
      currencyId: CurrencyEnum.MYR,
      domain: 'https://mintdeal.my',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'MintDeal',
              languageId: LanguageEnum.EN_MY,
              logoId: logo.id,
            },
            {
              name: 'MintDeal',
              languageId: LanguageEnum.ZH_MY,
              logoId: logo.id,
            },
          ],
        },
      },
    },
    update: {},
  });
}

async function seedPaymentChannels() {
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u2yt5i00003b6qqad688an',
    },
    create: {
      id: 'cm4u2yt5i00003b6qqad688an',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Maybank',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Maybank',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u3trgs00013b6qwugtsnj0',
    },
    create: {
      id: 'cm4u3trgs00013b6qwugtsnj0',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Ambank',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Ambank',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u3v0we00033b6qgo2iof3b',
    },
    create: {
      id: 'cm4u3v0we00033b6qgo2iof3b',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'RHB',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'RHB',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u3wgy700053b6q0j4yl862',
    },
    create: {
      id: 'cm4u3wgy700053b6q0j4yl862',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'HSBC',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'HSBC',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u3wz7000073b6q51ed8yof',
    },
    create: {
      id: 'cm4u3wz7000073b6q51ed8yof',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Hong Leong',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Hong Leong',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u3y0i100093b6q1269ojn2',
    },
    create: {
      id: 'cm4u3y0i100093b6q1269ojn2',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'UOB',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'UOB',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u3zdxy000d3b6q3xlua2mx',
    },
    create: {
      id: 'cm4u3zdxy000d3b6q3xlua2mx',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'OCBC',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'OCBC',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u3zosr000f3b6q53shv8fr',
    },
    create: {
      id: 'cm4u3zosr000f3b6q53shv8fr',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Public Bank',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Public Bank',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u40df1000h3b6qt1wniuzc',
    },
    create: {
      id: 'cm4u40df1000h3b6qt1wniuzc',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'CIMB',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'CIMB',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u40xfe000j3b6qtya6hajb',
    },
    create: {
      id: 'cm4u40xfe000j3b6qtya6hajb',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Bank Islam',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Bank Islam',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u41fnh000l3b6qt0zfnemk',
    },
    create: {
      id: 'cm4u41fnh000l3b6qt0zfnemk',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Citibank',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Citibank',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u41u41000n3b6q5mglqf8m',
    },
    create: {
      id: 'cm4u41u41000n3b6q5mglqf8m',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Bank Simpanan Nasional',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Bank Simpanan Nasional',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u429ki000p3b6qf358dap1',
    },
    create: {
      id: 'cm4u429ki000p3b6qf358dap1',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Affin Bank',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Affin Bank',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
  await prisma.paymentChannel.upsert({
    where: {
      id: 'cm4u42qid000r3b6qn12fhn63',
    },
    create: {
      id: 'cm4u42qid000r3b6qn12fhn63',
      metadatas: {
        createMany: {
          data: [
            {
              name: 'Agro Bank',
              languageId: LanguageEnum.EN_MY,
            },
            {
              name: 'Agro Bank',
              languageId: LanguageEnum.ZH_MY,
            },
          ],
        },
      },
      typeId: PaymentChannelTypeEnum.BankTransfer,
      directionId: PaymentDirectionEnum.Withdrawal,
      statusId: PaymentChannelStatusEnum.Active,
      minAmount: 10,
      maxAmount: 1000,
      processingFee: 0,
      feeTypeId: PaymentChannelFeeTypeEnum.Fixed,
      currencies: {
        connect: {
          id: CurrencyEnum.MYR,
        },
      },
    },
    update: {},
  });
}

async function main() {
  await seedSite();
  await seedPaymentChannels();
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
