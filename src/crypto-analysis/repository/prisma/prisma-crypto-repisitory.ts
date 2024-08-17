import { Prisma, Crypto } from "@prisma/client";
import { prisma } from '../../../lib/prisma';
import { CryptoRepository } from "../crypto-repository";

export class PrismaCryptoRepository implements CryptoRepository{

  async create(data: Prisma.CryptoUncheckedCreateInput) {
    const crypto = await prisma.crypto.create({
      data,
    })
  
    return crypto
  }

  async delete() {
    const deleteInfo = await prisma.crypto.deleteMany();
    return deleteInfo;
  }

  async findByID(id: string): Promise<Crypto | null> {
    const crypto = await prisma.crypto.findUnique({
      where: {
        id: id 
      },
    });
    return crypto;
  }

  async findByUID(cryptoAPIid: string): Promise<Crypto | null> {
    const crypto = await prisma.crypto.findUnique({
      where: {
        cryptoAPIid: cryptoAPIid
      },
    });
    return crypto;
  }

  async findAll(){
    const crypto = await prisma.crypto.findMany();

    return crypto;
  }
}
