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
import { CreateResultadosPlanAccionDto, UpdateResultadosPlanAccionDto } from './dto/results_action_plan.dto';
import { ResultadosPlanAccionService } from 'src/core/application/services/results_action_plan.service';

@Controller('resultados-plan-accion')
export class ResultadosPlanAccionController {
  constructor(private readonly service: ResultadosPlanAccionService) {}

  @Post()
  async create(@Body() createDto: CreateResultadosPlanAccionDto) {
    try {
      return await this.service.crear(createDto);
    } catch {
      throw new HttpException('Error al crear el plan de acción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.service.obtenerTodos();
    } catch {
      throw new HttpException('Error al obtener planes de acción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const resultado = await this.service.obtenerPorId(id);
      if (!resultado) throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
      return resultado;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al obtener el plan de acción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateResultadosPlanAccionDto,
  ) {
    try {
      const actualizado = await this.service.actualizar(id, updateDto);
      if (!actualizado) throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
      return actualizado;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al actualizar el plan de acción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const eliminado = await this.service.eliminar(id);
      if (!eliminado) throw new HttpException('Plan no encontrado', HttpStatus.NOT_FOUND);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al eliminar el plan de acción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
