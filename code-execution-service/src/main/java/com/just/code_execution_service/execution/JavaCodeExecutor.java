package com.just.code_execution_service.execution;

import com.just.code_execution_service.dto.ProcessResults;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JavaCodeExecutor extends AbstractCodeExecutor{
    String imageName = "openjdk";
    @Override
    public ProcessResults compile(String filePath) throws IOException, InterruptedException {
        ProcessBuilder compileProcess = new ProcessBuilder(     "docker", "run", "--rm", "--memory=256m", "--cpus=0.5", "-v", filePath + ":/app", imageName,"sh", "-c", "javac /app/Main.java");
        return executeProcess(compileProcess);
    }

    @Override
    public ProcessResults run(String filePath) throws IOException, InterruptedException {
        ProcessBuilder runProcess = new ProcessBuilder(     "docker", "run", "--rm", "--memory=256m", "--cpus=0.5", "-v", filePath + ":/app", imageName,"sh", "-c", "java -cp /app Main");
        return executeProcess(runProcess);
    }

    @Override
    public String getLanguage() {
        return "java";
    }
}
