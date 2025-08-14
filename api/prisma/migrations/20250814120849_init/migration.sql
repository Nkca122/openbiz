/*
  Warnings:

  - Changed the type of `ctl00_ContentPlaceHolder1_ddlTypeofOrg` on the `Data` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Data" DROP COLUMN "ctl00_ContentPlaceHolder1_ddlTypeofOrg",
ADD COLUMN     "ctl00_ContentPlaceHolder1_ddlTypeofOrg" VARCHAR(50) NOT NULL;

-- DropEnum
DROP TYPE "public"."OrgType";
