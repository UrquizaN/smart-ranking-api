import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Partida } from 'src/partidas/interfaces/partida.interface';
import { DesafioStatus } from './desafio-status.enum';

export interface Desafio extends Document {
  status: DesafioStatus;
  categoria: string;
  solicitante: string;
  jogadores: Array<Jogador>;
  partida: Partida;
  dataHoraDesafio: Date;
  dataHoraSolicitacao: Date;
  dataHoraResposta: Date;
}
