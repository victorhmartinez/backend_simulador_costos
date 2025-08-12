import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BusinessProgressStepController } from '../controllers/business_progress_step.controller';
import { BusinessProgressStepService } from 'src/core/application/services/business_progress_step.service';
import { BusinessProgressStepMapper } from '../controllers/mappers/business_progress_step.mapper';
import { BusinessProgressStepRepositoryPort } from 'src/core/application/ports/business_progress_step.repository.ports';
import { BusinessProgressStepPrismaRepository } from '../adapters/persistence/business_progress_step.prisma.repository';

@Module({
  controllers: [BusinessProgressStepController],
  providers: [
    PrismaService,
    BusinessProgressStepService,
    BusinessProgressStepMapper,
    {
      provide: BusinessProgressStepRepositoryPort,
      useClass: BusinessProgressStepPrismaRepository,
    },
  ],
})
export class BusinessProgressStepModule {}