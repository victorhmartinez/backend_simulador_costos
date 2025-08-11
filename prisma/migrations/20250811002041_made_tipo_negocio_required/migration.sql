/*
  Warnings:

  - Made the column `tipo_negocio` on table `Negocios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ubicacion` on table `Negocios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Negocios" ALTER COLUMN "tipo_negocio" SET NOT NULL,
ALTER COLUMN "ubicacion" SET NOT NULL;
