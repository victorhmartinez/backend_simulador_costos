import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NegocioModule } from './core/insfrasture/modules/businnes.module';
import { AprendizajeModule } from './core/insfrasture/modules/learning.module';
import { ModulosModule } from './core/insfrasture/modules/module.module';
import { BusinessSizeModule } from './core/insfrasture/modules/business_size.module';
import { BusinessProgressStepModule } from './core/insfrasture/modules/business_progress_step.module';
import { EstadoModule } from './core/insfrasture/modules/estado.module';
import { AnalisisIAModule } from './core/insfrasture/modules/analysis_ai.module';
import { ResultadosPlanAccionModule } from './core/insfrasture/modules/results_action_plan.module';
import { ResultadosCostosAnalizadosModule } from './core/insfrasture/modules/results_costs_analyzed.module';
import { ResultadosCostosOmitidosModule } from './core/insfrasture/modules/results_omitted_costs.module';
import { ResultadosRiesgosDetectadosModule } from './core/insfrasture/modules/results_risks_detected.module';


@Module({
  imports: [
    NegocioModule,
    BusinessSizeModule,
    AprendizajeModule,
    BusinessProgressStepModule,

    ModulosModule,
    EstadoModule,
    AnalisisIAModule,

    ResultadosPlanAccionModule,
    ResultadosCostosAnalizadosModule,
    ResultadosCostosOmitidosModule,
    ResultadosRiesgosDetectadosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
