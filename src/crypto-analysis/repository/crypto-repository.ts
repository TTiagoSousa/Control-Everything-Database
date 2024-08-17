import { Prisma, Crypto } from "@prisma/client";

export interface CryptoRepository {
  create(data: Prisma.CryptoUncheckedCreateInput): Promise<Crypto>;
  findByID(cryptoAPIid: string): Promise<Crypto | null>
  findAll(): Promise<Crypto[]>;
  findByUID(cryptoAPIid: string): Promise<Crypto | null>
}