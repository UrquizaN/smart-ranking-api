import mongoose from 'mongoose';

export const JogadoresSchema = new mongoose.Schema(
  {
    telefoneCelular: { type: String },
    email: { type: String, unique: true },
    nome: String,
    ranking: String,
    posicaoRanking: Number,
    urlFotoJogador: String,
  },
  { timestamps: true, collection: 'jogadores' },
);
