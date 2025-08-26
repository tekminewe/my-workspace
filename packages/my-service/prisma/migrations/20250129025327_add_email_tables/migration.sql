-- CreateEnum
CREATE TYPE "EmailStatusEnum" AS ENUM ('PENDING', 'DELIVERED', 'BOUNCED', 'SOFT_BOUNCED', 'COMPLAINT', 'REJECTED');

-- CreateEnum
CREATE TYPE "SuppressionTypeEnum" AS ENUM ('BOUNCED', 'COMPLAINT', 'MANUAL');

-- CreateEnum
CREATE TYPE "BounceComplaintTypeEnum" AS ENUM ('BOUNCED', 'COMPLAINT');

-- CreateTable
CREATE TABLE "EmailTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "textContent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailLog" (
    "id" TEXT NOT NULL,
    "templateId" TEXT,
    "emailAddress" TEXT NOT NULL,
    "userId" TEXT,
    "subject" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "textContent" TEXT,
    "status" "EmailStatusEnum" NOT NULL DEFAULT 'PENDING',
    "messageId" TEXT,
    "sentAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "retryCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EmailLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailBounceComplaint" (
    "id" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "emailLogId" TEXT NOT NULL,
    "type" "BounceComplaintTypeEnum" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailBounceComplaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailSuppression" (
    "id" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "reason" "SuppressionTypeEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailSuppression_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailTemplate_name_key" ON "EmailTemplate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EmailLog_messageId_key" ON "EmailLog"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailBounceComplaint_emailAddress_key" ON "EmailBounceComplaint"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "EmailSuppression_emailAddress_key" ON "EmailSuppression"("emailAddress");

-- CreateIndex
CREATE INDEX "EmailSuppression_emailAddress_idx" ON "EmailSuppression"("emailAddress");

-- AddForeignKey
ALTER TABLE "EmailLog" ADD CONSTRAINT "EmailLog_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "EmailTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailLog" ADD CONSTRAINT "EmailLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailBounceComplaint" ADD CONSTRAINT "EmailBounceComplaint_emailLogId_fkey" FOREIGN KEY ("emailLogId") REFERENCES "EmailLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
