package com.just.code_execution_service.service;

import com.just.code_execution_service.dto.CodeRequest;
import com.just.code_execution_service.dto.ExecutionResponse;
import com.just.code_execution_service.execution.CodeExecutor;
import com.just.code_execution_service.execution.ExecutorFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.Executor;

@Service
public class CodeExecutionService {
    private final ExecutorFactory executorFactory;

    public CodeExecutionService(ExecutorFactory executorFactory) {
        this.executorFactory = executorFactory;
    }

    public ExecutionResponse excuteCode(CodeRequest codeRequest) throws IOException, InterruptedException {
        CodeExecutor codeExecutor = executorFactory.getExecutor(codeRequest.getLanguage());

        if(codeExecutor == null){
            throw new IllegalArgumentException("Unsupported Langauge " + codeRequest.getLanguage());
        }
        return codeExecutor.execute(codeRequest);
    }
}
