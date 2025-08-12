// src/infrastructure/controllers/estado.controller.ts

import {
  Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete, HttpCode, HttpStatus, Logger, NotFoundException
} from '@nestjs/common';
import { CreateEstadoDto, UpdateEstadoDto } from './dto/estado.dto';
import { EstadoService } from 'src/core/application/services/estado.service';

@Controller('estados')
export class EstadoController {

  constructor(private readonly estadoService: EstadoService) {}

  @Post()
  async create(@Body() createDto: CreateEstadoDto) {
    try {
      return await this.estadoService.crear(createDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.estadoService.obtenerTodos();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.estadoService.obtenerPorId(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateEstadoDto) {
    try {
      return await this.estadoService.actualizar(id, updateDto);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.estadoService.eliminar(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw error;
    }
  }
}