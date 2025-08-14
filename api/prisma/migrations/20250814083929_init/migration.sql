-- CreateEnum
CREATE TYPE "public"."OrgType" AS ENUM ('Proprietary', 'Hindu_Undivided_Family', 'Partnership', 'Co_Operative', 'Private_Limited_Company', 'Public_Limited_Company', 'Self_Help_Group', 'Limited_Liability_Partnership', 'Society', 'Trust', 'Others');

-- CreateTable
CREATE TABLE "public"."Data" (
    "id" SERIAL NOT NULL,
    "ctl00_ContentPlaceHolder1_txtadharno" VARCHAR(12) NOT NULL,
    "ctl00_ContentPlaceHolder1_txtownername" VARCHAR(100) NOT NULL,
    "ctl00_ContentPlaceHolder1_chkDecarationA" BOOLEAN NOT NULL,
    "ctl00_ContentPlaceHolder1_ddlTypeofOrg" "public"."OrgType" NOT NULL,
    "ctl00_ContentPlaceHolder1_txtPan" VARCHAR(10) NOT NULL,
    "ctl00_ContentPlaceHolder1_txtPanName" VARCHAR(100) NOT NULL,
    "ctl00_ContentPlaceHolder1_rbdDOB_0" TIMESTAMP(3) NOT NULL,
    "consent" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);
