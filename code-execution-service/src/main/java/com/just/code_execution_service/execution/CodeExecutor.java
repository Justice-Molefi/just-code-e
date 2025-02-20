package com.just.code_execution_service.execution;

import com.just.code_execution_service.dto.CodeRequest;
import com.just.code_execution_service.dto.ExecutionResponse;
import com.just.code_execution_service.dto.ProcessResults;

import java.io.IOException;

public interface CodeExecutor {
    public ExecutionResponse execute(CodeRequest codeRequest) throws IOException, InterruptedException;
    public ProcessResults compile(String filename) throws IOException, InterruptedException;
    public ProcessResults run(String filename) throws IOException, InterruptedException;
    public String getLanguage();//return lower case string on implementation
}
