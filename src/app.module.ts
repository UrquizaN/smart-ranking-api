import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';
import { PartidasModule } from './partidas/partidas.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:kJnNW3coFIOde6FP@cluster0.im6udtv.mongodb.net/smart-ranking?retryWrites=true&w=majority',
    ),
    JogadoresModule,
    CategoriasModule,
    PartidasModule,
    DesafiosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
