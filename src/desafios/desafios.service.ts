import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { criarDesafioDto } from './dtos/criar-desafio.dto';
import { DesafioStatus } from './interfaces/desafio-status.enum';
import { Desafio } from './interfaces/desafio.interface';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafio') private readonly desafiosModel: Model<Desafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService,
  ) {}

  async consultarDesafios(): Promise<Array<Desafio>> {
    return this.desafiosModel.find().exec();
  }

  async consultarDesafio(_id: string): Promise<Desafio> {
    return this.desafiosModel.findOne({ _id }).exec();
  }

  async criarDesafio(criarDesafio: criarDesafioDto): Promise<Desafio> {
    const { jogadores, solicitante } = criarDesafio;

    const solicitanteEncontrado =
      await this.jogadoresService.consultarJogadorPorId(solicitante._id);

    if (!solicitanteEncontrado) {
      throw new NotFoundException(`O jogador solicitante não cadastrado`);
    }

    const jogador1 = await this.jogadoresService.consultarJogadorPorId(
      jogadores[0]._id,
    );

    if (!jogador1) {
      throw new NotFoundException(`Jogador desafiante não cadastrado`);
    }

    const jogador2 = await this.jogadoresService.consultarJogadorPorId(
      jogadores[1]._id,
    );

    if (!jogador2) {
      throw new NotFoundException(`Jogador desafiado não cadastrado`);
    }

    const categorias = await this.categoriasService.consultarCategorias();

    const categoriaJogador1 = categorias.find((categoria) =>
      categoria.jogadores.some((jogador) => jogador.email === jogador1.email),
    );

    if (!categoriaJogador1) {
      throw new NotFoundException(
        `Jogador desafiante não pertence a nenhuma categoria.`,
      );
    }

    const categoriaJogador2 = categorias.find((categoria) =>
      categoria.jogadores.some((jogador) => jogador.email === jogador2.email),
    );

    if (!categoriaJogador2) {
      throw new NotFoundException(
        `Jogador desafiado não pertence a nenhuma categoria.`,
      );
    }

    const desafioCriado = new this.desafiosModel({
      ...criarDesafio,
      status: DesafioStatus.PENDENTE,
      dataHoraSolicitacao: new Date().toISOString(),
      categoria: categoriaJogador1.categoria,
    });

    return desafioCriado.save();
  }
}
