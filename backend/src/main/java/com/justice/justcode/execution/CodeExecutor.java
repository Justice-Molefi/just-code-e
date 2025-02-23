package com.justice.justcode.execution;

import com.justice.justcode.dto.CodeExecutionResponse;
import com.justice.justcode.dto.CodeRequest;

import java.io.IOException;

public interface CodeExecutor {
    public CodeExecutionResponse execute(CodeRequest codeRequest) throws IOException, InterruptedException;
    public ProcessResults compile(String filename) throws IOException, InterruptedException;
    public ProcessResults run(String filename) throws IOException, InterruptedException;
    public String getLanguage();//return lower case string on implementation
}
