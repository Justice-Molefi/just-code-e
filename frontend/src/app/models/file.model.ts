import { Language } from "./enums/language";

export class File{
    fileName: string;
    boilerPlate: string;
    language: Language;

    constructor(fileName: string, boilerPlate: string, language: Language){
        this.fileName = fileName;
        this.boilerPlate = boilerPlate;
        this.language = language;
    }
}