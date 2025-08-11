import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NegocioModule } from './core/insfrasture/modules/businnes.module';

@Module({
  imports: [
    NegocioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
