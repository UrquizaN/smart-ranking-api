import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { DesafiosService } from './desafios.service';
import { criarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  @Get()
  async consultarDesafios(): Promise<Array<Desafio>> {
    return this.desafiosService.consultarDesafios();
  }

  @Get(':_id')
  async consultarDesafio(@Param('_id') desafioId: string): Promise<Desafio> {
    return this.desafiosService.consultarDesafio(desafioId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(@Body() criarDesafio: criarDesafioDto): Promise<Desafio> {
    return this.desafiosService.criarDesafio(criarDesafio);
  }
}
