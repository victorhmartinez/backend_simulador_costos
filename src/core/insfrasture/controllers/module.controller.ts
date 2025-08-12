import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ModulosService } from 'src/core/application/services/module.service';
import { CreateModulosDto, UpdateModuloDto } from './dto/module.dto';
import { Modulos } from 'src/core/domain/model/module';

@Controller('modulos')
export class ModuloController {
  constructor(private readonly moduloService: ModulosService) {}

  @Post()
  async crear(@Body() createDto: CreateModulosDto): Promise<Modulos> {
    return this.moduloService.crearModulo(createDto);
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Modulos | null> {
    return this.moduloService.obtenerModuloPorId(id);
  }

  @Get()
  async obtenerTodos(): Promise<Modulos[]> {
    return this.moduloService.obtenerTodosLosModulos();
  }

  @Patch(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateModuloDto,
  ): Promise<Modulos | null> {
    return this.moduloService.actualizarModulo(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Respuesta 204 No Content
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.moduloService.eliminarModulo(id);
  }
}
