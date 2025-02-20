package com.just.code_execution_service.execution;

import com.just.code_execution_service.dto.CodeRequest;
import com.just.code_execution_service.dto.ExecutionResponse;
import com.just.code_execution_service.dto.ProcessResults;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;

public abstract class AbstractCodeExecutor implements CodeExecutor{
    @Override
    public ExecutionResponse execute(CodeRequest codeRequest) throws IOException, InterruptedException {
        String output;
        String filename = "Main." + codeRequest.getExtension();
        File program = new File(filename);

        Files.writeString(program.toPath(),codeRequest.getCode());
        String filePath = new File(program.getAbsolutePath()).getParent();

        try{
            ProcessResults compileResults = compile(filePath);
            if(compileResults.exitCode() != 0){
                output = "Compilation Failed!<br>Errors: <br>" + compileResults.output();
                return new ExecutionResponse(output, false);
            }

            ProcessResults runResults = run(filePath);
            if(runResults.exitCode() != 0){
                output = "Program Execution Failed!<br>Errors: <br>" + runResults.output();
                return new ExecutionResponse(output, false);
            }
            output = "Program Execution Successful!<br>Output: <br>" + runResults.output();
            return new ExecutionResponse(output, true);
        }finally {
            Files.deleteIfExists(program.toPath());
        }
    }

    protected ProcessResults executeProcess(ProcessBuilder processBuilder) throws IOException, InterruptedException {
        StringBuilder output = new StringBuilder();

        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        int exitCode = process.waitFor();

        try(BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))){
            String line;
            while((line = reader.readLine()) != null){
                output.append(line).append(System.lineSeparator());
            }
        }

        return new ProcessResults(output.toString().trim(),exitCode);
    }
}
