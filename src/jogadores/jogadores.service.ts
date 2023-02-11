import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { CriarJogadorDto } from './dtos/criarJogadorDto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado, criarJogadorDto);
    } else {
      const jogador = this.criar(criarJogadorDto);

      this.jogadores.push(jogador);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com e-mail ${email} não encontrado.`,
      );
    }

    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com e-mail ${email} não encontrado.`,
      );
    }

    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== email,
    );
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

  private atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ) {
    jogadorEncontrado.nome = criarJogadorDto.nome;
  }
}
