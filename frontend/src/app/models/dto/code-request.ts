export class CodeRequest{
    language: string;
    code: string;
    extension: string;

    constructor(language: string, code: string, extension: string){
        this.language = language;
        this.code = code,
        this.extension = extension
    }
}