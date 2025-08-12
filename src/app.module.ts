import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NegocioModule } from './core/insfrasture/modules/businnes.module';
import { AprendizajeModule } from './core/insfrasture/modules/learning.module';
import { ModulosModule } from './core/insfrasture/modules/module.module';

@Module({
  imports: [
    NegocioModule,
    AprendizajeModule,
    ModulosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
