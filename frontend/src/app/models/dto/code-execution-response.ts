export class CodeExecutionResponse{
    output: string;
    success: boolean;

    constructor(output: string, success: boolean){
        this.output = output;
        this.success = success;
    }
}