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
import { CreateAnalisisIADto, UpdateAnalisisIADto } from './dto/analysis_ai.dto';
import { AnalisisIAService } from 'src/core/application/services/analysis_ai.service';

@Controller('analisis-ia')
export class AnalisisIAController {
  constructor(private readonly analisisIAService: AnalisisIAService) {}

  @Post()
  async create(@Body() createDto: CreateAnalisisIADto) {
    try {
      return await this.analisisIAService.crearAnalisisIA(createDto);
    } catch (error) {
      throw new HttpException('Error al crear el análisis IA', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.analisisIAService.obtenerTodosLosAnalisisIA();
    } catch (error) {
      throw new HttpException('Error al obtener la lista de análisis IA', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const analisis = await this.analisisIAService.obtenerAnalisisIAPorId(id);
      if (!analisis) {
        throw new HttpException('Análisis IA no encontrado', HttpStatus.NOT_FOUND);
      }
      return analisis;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al obtener el análisis IA', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAnalisisIADto,
  ) {
    try {
      const actualizado = await this.analisisIAService.actualizarAnalisisIA(id, updateDto);
      if (!actualizado) {
        throw new HttpException('Análisis IA no encontrado', HttpStatus.NOT_FOUND);
      }
      return actualizado;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al actualizar el análisis IA', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const eliminado = await this.analisisIAService.eliminarAnalisisIA(id);
      if (!eliminado) {
        throw new HttpException('Análisis IA no encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al eliminar el análisis IA', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
