import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador-dto';
import { CriarJogadorDto } from './dtos/criar-jogador-dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModule: Model<Jogador>,
  ) {}

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModule
      .findOne({ email })
      .exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Jogador com e-mail ${email} já cadastrado`,
      );
    }

    const jogador = new this.jogadorModule(criarJogadorDto);

    return await jogador.save();
  }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = await this.consultarJogadorPorId(_id);

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador não encontrado`);
    }

    await this.jogadorModule
      .findOneAndUpdate({ _id }, { $set: atualizarJogadorDto })
      .exec();
  }

  async consultarJogadores(): Promise<Jogador[]> {
    return this.jogadorModule.find().exec();
  }

  async consultarJogadorPorId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModule.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador não encontrado.`);
    }

    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<void> {
    await this.consultarJogadorPorId(_id);

    await this.jogadorModule.deleteOne({ _id }).exec();
  }
}
