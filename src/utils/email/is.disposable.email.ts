import axios from 'axios';
import { BadRequestException } from '@nestjs/common';

export async function isDisposableEmail(email: string): Promise<boolean> {
  try {
    
    const response = await axios.get(`https://disposable.debounce.io/?email=${email}`);
    
    // Verifica a resposta da API
    if (response.data && response.data.disposable) {
      const { disposable } = response.data;
      return disposable === 'true';
    }
    
    return false; // Considera não descartável se a resposta for inconsistente
  } catch (error) {
    throw new BadRequestException('Erro ao verificar o e-mail com o serviço Debounce');
  }
}