import { Currency, Prisma } from "@prisma/client";

export interface CurrencyRepository {
  create(data: Prisma.CurrencyUncheckedCreateInput): Promise<Currency>;
  findByID(id: string) : Promise<Currency | null>;
  findAll(): Promise<Currency[]>;
  updateRate(short_code: string, rate: number): Promise<Currency>;
  findByShortCode_returnID(short_code: string): Promise<string | null>;
}