package com.just.code_execution_service.execution;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ExecutorFactory {
    private final Map<String, CodeExecutor> codeExecutors = new HashMap<>();

    public ExecutorFactory(List<CodeExecutor> list){
        for(CodeExecutor codeExecutor: list){
            codeExecutors.put(codeExecutor.getLanguage().toLowerCase(), codeExecutor);
        }
    }

    public CodeExecutor getExecutor(String language){ return codeExecutors.getOrDefault(language.toLowerCase(), null); }
}
