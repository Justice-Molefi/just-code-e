import { Injectable } from '@angular/core';
import { Language } from '../models/enums/language';
import { languages } from 'monaco-editor';

@Injectable({
  providedIn: 'root'
})
export class BoilerplateService {

  private boilerplateMap: Record<string, string> = {
    [Language.Java]: 'public class Main {\n  public static void main(String[] args) {\n    // Your code here\n  }\n}',
  }
  constructor() { }

  getBoilerPlate(language: string): string{
    return this.boilerplateMap[language] || '';
  }
}
