/*
  Warnings:

  - Added the required column `userId` to the `MedicalHistoryUpdateLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicalHistoryUpdateLog" ADD COLUMN     "data" JSONB,
ADD COLUMN     "oldData" JSONB,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "MedicalHistoryUpdateLog_data_idx" ON "MedicalHistoryUpdateLog" USING GIN ("data");

-- CreateIndex
CREATE INDEX "MedicalHistoryUpdateLog_oldData_idx" ON "MedicalHistoryUpdateLog" USING GIN ("oldData");

-- AddForeignKey
ALTER TABLE "MedicalHistoryUpdateLog" ADD CONSTRAINT "MedicalHistoryUpdateLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
