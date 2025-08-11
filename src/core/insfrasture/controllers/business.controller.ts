// src/infrastructure/controllers/negocio.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';

import { NegocioService } from 'src/core/application/services/buisness.service';
import { CreateNegocioDto, UpdateNegocioDto } from './dto/business.dto';

// Define la ruta base para todos los endpoints en este controlador.
@Controller('negocios')
export class NegocioController {
  // Inyecta el servicio de aplicación. El controlador no sabe nada de la base de datos.
  constructor(private readonly negocioService: NegocioService) {}

  @Post()
  async create(@Body() createNegocioDto: CreateNegocioDto) {
    // NestJS usa class-validator en el DTO para validar el body automáticamente.
    // Si la validación falla, NestJS arroja un error 400 por defecto.
    try {
      return await this.negocioService.crearNegocio(createNegocioDto);
    } catch (error) {

    console.log(error.stack)
      // Manejo de errores genérico
      throw new HttpException(
        'Error al crear el negocio',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
      try {
        const negocio = await this.negocioService.obtenerNegocioPorId(id);
        if (!negocio) {
          throw new HttpException('Negocio no encontrado', HttpStatus.NOT_FOUND);
        }
        return negocio;
    } catch (error) {
        console.log(`Fallo al buscar el negocio con id ${id}`, error.stack);
        throw new HttpException(
            'Error al obtener el negocio',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
  

  @Get('usuario/:usuarioId')
  async findByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    return this.negocioService.obtenerNegociosPorUsuario(usuarioId);



  }
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNegocioDto: UpdateNegocioDto,
  ) {
    try {
      return await this.negocioService.actualizarNegocio(id, updateNegocioDto);
    } catch (error) {
      if (error ) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Error al actualizar el negocio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // --- NUEVO ENDPOINT: ELIMINAR ---
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // <-- Devuelve un código 204 en lugar de 200 por defecto
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.negocioService.eliminarNegocio(id);
      // No se devuelve contenido, el código 204 lo indica
    } catch (error) {
      if (error ) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Error al eliminar el negocio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

@Get()
  async findAll() {
    try {
      return await this.negocioService.obtenerTodosLosNegocios();
    } catch (error) {
      throw new HttpException(
        'Error al obtener la lista de negocios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}