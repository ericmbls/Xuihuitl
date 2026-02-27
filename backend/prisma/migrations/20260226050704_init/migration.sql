/*
  Warnings:

  - The `estado` column on the `Cultivo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EstadoCultivo" AS ENUM ('activo', 'inactivo', 'cosechado', 'perdido');

-- AlterTable
ALTER TABLE "Cultivo" DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoCultivo" NOT NULL DEFAULT 'activo';
