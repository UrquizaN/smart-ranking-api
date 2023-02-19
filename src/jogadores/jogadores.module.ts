import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresSchema } from './interfaces/jogadores.schema';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jogador', schema: JogadoresSchema }]),
  ],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class JogadoresModule {}
