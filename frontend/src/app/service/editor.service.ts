import { Injectable } from '@angular/core';
import { CodeRequest } from '../models/dto/code-request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CodeExecutionResponse } from '../models/dto/code-execution-response';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  baseUrl: string = 'http://localhost:8080'
  constructor(private http: HttpClient) { }

  execute(codeRquest: CodeRequest): Observable<CodeExecutionResponse>{
    return this.http.post<CodeExecutionResponse>(`${this.baseUrl}/execution-service`, codeRquest);
  }
}
