import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AprendizajeService } from 'src/core/application/services/learning.service';
import { CreateAprendizajeDto, UpdateAprendizajeDto } from './dto/learning.dto';
import { Aprendizaje } from 'src/core/domain/model/learning';

@Controller('aprendizajes')
export class AprendizajeController {
  constructor(private readonly aprendizajeService: AprendizajeService) {}

  @Post()
  async crear(@Body() createDto: CreateAprendizajeDto): Promise<Aprendizaje> {
    return this.aprendizajeService.crearAprendizaje(createDto);
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Aprendizaje | null> {
    return this.aprendizajeService.obtenerAprendizajePorId(id);
  }

  @Get()
  async obtenerTodos(): Promise<Aprendizaje[]> {
    return this.aprendizajeService.obtenerTodosLosAprendizajes();
  }

  @Patch(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAprendizajeDto,
  ): Promise<Aprendizaje | null> {
    return this.aprendizajeService.actualizarAprendizaje(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Respuesta 204 No Content
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.aprendizajeService.eliminarAprendizaje(id);
  }
}
