import { Injectable } from '@angular/core';
import { Language } from '../models/enums/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageExtensionService {

  private LangaugeExtensionMap : Record<string, string> = {
    [Language.Java] : 'java',
    [Language.Javascript]: 'js',
    [Language.CSharp]: 'cs'
  }

  constructor() { }

  getExtension(language: string): string{
    return this.LangaugeExtensionMap[language] || '';
  }
}
