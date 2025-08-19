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
import { CreateResultadosCostosAnalizadosDto, UpdateResultadosCostosAnalizadosDto } from './dto/results_costs_analyzed.dto';
import { ResultadosCostosAnalizadosService as ResultadosCostosService } from 'src/core/application/services/results_costs_analyzed.service';

@Controller('resultados-costos-analizados')
export class ResultadosCostosController {
  constructor(private readonly servicios: ResultadosCostosService) {}

  @Post()
  async create(@Body() createDto: CreateResultadosCostosAnalizadosDto) {
    try {
      return await this.servicios.crear(createDto);
    } catch (error) {
      throw new HttpException('Error al crear el resultado de costos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.servicios.obtenerTodos();
    } catch (error) {
      throw new HttpException('Error al obtener la lista de resultados de costos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const resultado = await this.servicios.obtenerPorId(id);
      if (!resultado) {
        throw new HttpException('Resultado de costos no encontrado', HttpStatus.NOT_FOUND);
      }
      return resultado;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al obtener el resultado de costos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateResultadosCostosAnalizadosDto,
  ) {
    try {
      const actualizado = await this.servicios.actualizar(id, updateDto);
      if (!actualizado) {
        throw new HttpException('Resultado de costos no encontrado', HttpStatus.NOT_FOUND);
      }
      return actualizado;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al actualizar el resultado de costos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const eliminado = await this.servicios.eliminar(id);
      if (!eliminado) {
        throw new HttpException('Resultado de costos no encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al eliminar el resultado de costos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
