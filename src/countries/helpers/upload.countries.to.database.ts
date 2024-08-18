import { PrismaCountriesRepository } from '../repositories/prisma/prisma-countries-repository';
import { getCountriesFromApi } from './api/get.countries.from.api';

export async function uploadCountriesToDataBase() {

  const countriesRepository = new PrismaCountriesRepository();

  try {

    const response = await getCountriesFromApi()
    
    const countries = response.map((country: any) => ({
      nameEn: country.name.common,
      namePt: country.translations.por.common, 
      flag: country.flags.png,
    }));

    for (const country of countries) {
      try {
        await countriesRepository.create({
          countryNameEn: country.nameEn,
          countryNamePt: country.namePt,
          CoutryFlag: country.flag,
        });
      } catch (insertError) {

      }
    }

  }catch (error) {

  }
}