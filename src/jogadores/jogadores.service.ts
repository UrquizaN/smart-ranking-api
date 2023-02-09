import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CriarJogadorDto } from './dtos/criarJogadorDto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const jogador = this.criar(criarJogadorDto);

    this.jogadores.push(jogador);
  }

  private criar(criarJogadorDto: CriarJogadorDto): Jogador {
    const { nome, email, telefoneCelular } = criarJogadorDto;

    const jogador: Jogador = {
      _id: uuid.v4(),
      email,
      nome,
      telefoneCelular,
      posicaoRanking: 5,
      ranking: 'A',
      urlFotoJogador: 'www.google.com',
    };

    return jogador;
  }
}
