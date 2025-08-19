import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { CreateResultadosRiesgosDetectadosDto, UpdateResultadosRiesgosDetectadosDto } from './dto/results_risks_detected.dto';
import { ResultadosRiesgosDetectadosService } from 'src/core/application/services/results_risks_detected.service';

@Controller('resultados-riesgos-detectados')
export class ResultadosRiesgosDetectadosController {
  constructor(private readonly service: ResultadosRiesgosDetectadosService) {}

  @Post()
  async create(@Body() createDto: CreateResultadosRiesgosDetectadosDto) {
    try {
      return await this.service.crear(createDto);
    } catch {
      throw new HttpException('Error al crear el resultado de riesgo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.service.obtenerTodos();
    } catch {
      throw new HttpException('Error al obtener resultados de riesgos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const resultado = await this.service.obtenerPorId(id);
      if (!resultado) throw new HttpException('Resultado no encontrado', HttpStatus.NOT_FOUND);
      return resultado;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al obtener el resultado', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateResultadosRiesgosDetectadosDto,
  ) {
    try {
      const actualizado = await this.service.actualizar(id, updateDto);
      if (!actualizado) throw new HttpException('Resultado no encontrado', HttpStatus.NOT_FOUND);
      return actualizado;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al actualizar el resultado', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const eliminado = await this.service.eliminar(id);
      if (!eliminado) throw new HttpException('Resultado no encontrado', HttpStatus.NOT_FOUND);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al eliminar el resultado', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
