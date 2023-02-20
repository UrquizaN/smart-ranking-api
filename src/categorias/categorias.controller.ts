import { Body, Controller } from '@nestjs/common';
import { Get, Param, Post, Put } from '@nestjs/common/decorators';
import { CategoriasService } from './categorias.service';
import { atualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interfaces';

@Controller('/api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriaService: CategoriasService) {}

  @Post()
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    return await this.categoriaService.criarCategoria(criarCategoriaDto);
  }

  @Get()
  async consultarCategorias(): Promise<Array<Categoria>> {
    return await this.categoriaService.consultarCategorias();
  }

  @Get(':categoria')
  async consultarCategoria(
    @Param('categoria') categoria: string,
  ): Promise<Categoria> {
    return await this.categoriaService.consultarCategoria(categoria);
  }

  @Put(':categoria')
  async atualizarCategoria(
    @Param('categoria') categoria: string,
    @Body() atualizarCategoria: atualizarCategoriaDto,
  ): Promise<void> {
    await this.categoriaService.atualizarCategoria(
      categoria,
      atualizarCategoria,
    );
  }

  @Put(':categoria/jogador/:id')
  async atribuirJogador(@Param() params: string[]): Promise<void> {
    await this.categoriaService.adicionarJogador(params);
  }
}
