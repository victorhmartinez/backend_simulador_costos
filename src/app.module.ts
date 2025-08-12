import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NegocioModule } from './core/insfrasture/modules/businnes.module';
import { AprendizajeModule } from './core/insfrasture/modules/learning.module';
import { ModulosModule } from './core/insfrasture/modules/module.module';
import { BusinessSizeModule } from './core/insfrasture/modules/business_size.module';
import { BusinessProgressStepModule } from './core/insfrasture/modules/business_progress_step.module';
import { EstadoModule } from './core/insfrasture/modules/estado.module';

@Module({
  imports: [
    NegocioModule,
    BusinessSizeModule,
    AprendizajeModule,
    BusinessProgressStepModule,

    ModulosModule,
    EstadoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
