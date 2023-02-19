import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarJogadorDto } from './dtos/criarJogadorDto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModule: Model<Jogador>,
  ) {}

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModule
      .findOne({ email })
      .exec();

    if (jogadorEncontrado) {
      await this.atualizar(criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadorModule.find().exec();
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModule
      .findOne({ email })
      .exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com e-mail ${email} não encontrado.`,
      );
    }

    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = await this.consultarJogadorPorEmail(email);

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com e-mail ${email} não encontrado.`,
      );
    }

    await this.jogadorModule.remove({ email }).exec();
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogador = new this.jogadorModule(criarJogadorDto);

    return await jogador.save();
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadorModule
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();
  }
}
