
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Logger,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { CreateBusinessSizeiDto, UpdateBusinessSizeDto } from './dto/business_size.dto';
import { BusinessSizeService } from 'src/core/application/services/business_size.service';

@Controller('tamanos-negocio')
export class BusinessSizeController {

  constructor(private readonly tamanoNegocioService: BusinessSizeService) {}

  @Post()
  async create(@Body() createDto: CreateBusinessSizeiDto) {
    try {
      return await this.tamanoNegocioService.crear(createDto);
    } catch (error) {
      throw new HttpException('Error al crear el tamaño de negocio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.tamanoNegocioService.obtenerTodos();
    } catch (error) {
      throw new HttpException('Error al obtener la lista', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.tamanoNegocioService.obtenerPorId(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al obtener el tamaño de negocio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBusinessSizeDto,
  ) {
    try {
      return await this.tamanoNegocioService.actualizar(id, updateDto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al actualizar el tamaño de negocio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.tamanoNegocioService.eliminar(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al eliminar el tamaño de negocio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}