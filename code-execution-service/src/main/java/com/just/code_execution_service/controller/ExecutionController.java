package com.just.code_execution_service.controller;

import com.just.code_execution_service.dto.CodeRequest;
import com.just.code_execution_service.dto.ExecutionResponse;
import com.just.code_execution_service.service.CodeExecutionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/execution-service")
@CrossOrigin(origins = "http://localhost:4200")
public class ExecutionController {
    private final CodeExecutionService codeExecutionService;

    public ExecutionController(CodeExecutionService codeExecutionService) {
        this.codeExecutionService = codeExecutionService;
    }

    @PostMapping()
    public ResponseEntity<ExecutionResponse> executeCode(@RequestBody CodeRequest codeRequest){
        try{
            ExecutionResponse response = codeExecutionService.excuteCode(codeRequest);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (IOException | InterruptedException ex){
            System.err.println(ex.getMessage());
        }

        return ResponseEntity.status(HttpStatus.OK).body(new ExecutionResponse("Something went wrong", false));
    }
}
