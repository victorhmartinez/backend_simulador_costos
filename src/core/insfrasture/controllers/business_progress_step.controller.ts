import {
  Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete, HttpCode, HttpStatus, Logger, NotFoundException,
} from '@nestjs/common';
import { CreateBusinessProgressStepDto, UpdateBusinessProgressStepDto } from './dto/business_progress_step.dto';
import { BusinessProgressStepService } from 'src/core/application/services/business_progress_step.service';

@Controller('progreso-negocio')
export class BusinessProgressStepController {

  constructor(private readonly progresoService: BusinessProgressStepService) {}

  @Post()
  async create(@Body() createDto: CreateBusinessProgressStepDto) {
    try {
      return await this.progresoService.crear(createDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.progresoService.obtenerTodos();
  }

  @Get('negocio/:negocioId')
  findByNegocioId(@Param('negocioId', ParseIntPipe) negocioId: number) {
      return this.progresoService.obtenerPorNegocioId(negocioId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.progresoService.obtenerPorId(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateBusinessProgressStepDto) {
    try {
      return await this.progresoService.actualizar(id, updateDto);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.progresoService.eliminar(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw error;
    }
  }
}