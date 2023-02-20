import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { atualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interfaces';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService,
  ) {}

  async criarCategoria(
    criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;

    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (categoriaEncontrada) {
      throw new BadRequestException(`Categoria ${categoria} já existe`);
    }

    const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
    return await categoriaCriada.save();
  }

  async consultarCategorias(): Promise<Array<Categoria>> {
    return await this.categoriaModel.find().populate('jogadores').exec();
  }

  async consultarCategoria(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .populate('jogadores')
      .exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada`);
    }

    return categoriaEncontrada;
  }

  async atualizarCategoria(
    categoria: string,
    atualizarCategoria: atualizarCategoriaDto,
  ): Promise<void> {
    await this.consultarCategoria(categoria);

    await this.categoriaModel.findOneAndUpdate(
      { categoria },
      { $set: atualizarCategoria },
    );
  }

  async adicionarJogador(params: string[]): Promise<void> {
    const categoria = params['categoria'];
    const idJogador = params['id'];

    const categoriaEncontrada = await this.consultarCategoria(categoria);

    await this.jogadoresService.consultarJogadorPorId(idJogador);

    categoriaEncontrada.jogadores.push(idJogador);

    const jogadorCadastrado = await this.categoriaModel
      .find({ categoria })
      .where('jogadores')
      .in(idJogador)
      .exec();

    if (jogadorCadastrado.length) {
      throw new BadRequestException(
        `Jogador já cadastrado na categoria ${categoria}`,
      );
    }

    await this.categoriaModel.findOneAndUpdate(
      { categoria },
      { $set: categoriaEncontrada },
    );
  }
}
