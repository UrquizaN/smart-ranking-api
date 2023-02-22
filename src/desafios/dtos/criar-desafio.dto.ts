import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export class criarDesafioDto {
  // @IsNotEmpty()
  // @IsString()
  // categoria: string;

  // @IsNotEmpty()
  // @IsString()
  // status: string;

  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio: Date;

  // @IsNotEmpty()
  // @IsDateString()
  // dataHoraSolicitacao: Date;

  // @IsNotEmpty()
  // @IsDateString()
  // dataHoraResposta: Date;

  @IsNotEmpty()
  solicitante: Jogador;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  jogadores: Array<Jogador>;

  // @IsArray()
  // @ArrayMinSize(1)
  // partida: Partida;
}
