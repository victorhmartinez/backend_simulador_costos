// src/infrastructure/modules/tamano-negocio.module.ts

import { Module } from '@nestjs/common';
import { BusinessSizeMapper } from '../controllers/mappers/business_size.mapper';
import { BusinessSizeService } from 'src/core/application/services/business_size.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BusinessSizeController } from '../controllers/business _size.controller';
import { BusinessSizePrismaRepository } from '../adapters/persistence/business_size.prisma.repository';
import { BusinessSizeRepositoryPort } from 'src/core/application/ports/business_size.repository.ports';

@Module({
  controllers: [BusinessSizeController],
  providers: [
    PrismaService,
    BusinessSizeService,
    BusinessSizeMapper,
    {
      provide: BusinessSizeRepositoryPort,
      useClass: BusinessSizePrismaRepository,
    },
  ],
  exports: [BusinessSizeService],
})
export class BusinessSizeModule {}