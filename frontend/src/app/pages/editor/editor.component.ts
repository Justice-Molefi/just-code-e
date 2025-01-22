import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import loader from '@monaco-editor/loader';
import * as monaco from 'monaco-editor'
import { OutputComponent } from './output/output.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faJs } from '@fortawesome/free-brands-svg-icons';
import { Language } from '../../models/enums/language';
import { NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { BoilerplateService } from '../../service/boilerplate.service';
import { CodeRequest } from '../../models/dto/code-request';
import { LanguageExtensionService } from '../../service/language-extension.service';
import { EditorService } from '../../service/editor.service';
import { conf, language } from '../../service/languages/java';




@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [OutputComponent, FontAwesomeModule, NgFor, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit, AfterViewInit{

  @Input() editorOptions: monaco.editor.IStandaloneEditorConstructionOptions | undefined;
  private editorInstance!: monaco.editor.IStandaloneCodeEditor; 

  languages : string[] = [];
  selectedLanguage: string = 'Java';
  output: string = '';
  codeExecSuccess: boolean = true;

  editorHeight!: number;
  outputHeight : number = 100;
  actionBarHeight: number = 70;
  isResizing: boolean = false;
  faPlay: IconDefinition = faPlay;
  faJs: IconDefinition = faJs;



  constructor(private el: ElementRef, 
              private boilerPlateService: BoilerplateService, 
              private langaugeExtensionService: LanguageExtensionService,
              private editorService: EditorService){
    this.languages = Object.values(Language);
  }

  ngOnInit(){
    monaco.languages.register({ id: 'java' });
    monaco.languages.setLanguageConfiguration('java', conf);
    monaco.languages.setMonarchTokensProvider('java', language);

    loader.init().then(monacoInstance => {
      this.editorInstance = monacoInstance.editor.create(this.el.nativeElement.querySelector('.editor'),{
        language: 'java',
        theme: 'vs-dark',
        fontSize: 20,
        automaticLayout: true,
        ...this.editorOptions
      });
      this.setBoilerPlateCode();
    })

  }

  ngAfterViewInit(): void {
    this.calculateEditorHeight();
  }

  @HostListener('document: mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void{
    if(!this.isResizing) return;

    const containerHeight = window.innerHeight;
    const offsetY = event.clientY;

    this.outputHeight = containerHeight - offsetY;
    this.calculateEditorHeight();

    
    if(this.outputHeight > containerHeight - 250) {
      this.isResizing = false;
      this.outputHeight = this.outputHeight - 10;
    }

    if(this.outputHeight < 100){
      this.isResizing = false;
      this.outputHeight = 100;
    }

  }

  startResizing(event: MouseEvent) : void{
    this.isResizing = true;
    event.preventDefault();
  }

  @HostListener('document: mouseup')
  stopResizing(): void{
    this.isResizing = false;
  }

  calculateEditorHeight() : void{
    this.editorHeight = window.innerHeight - this.outputHeight - this.actionBarHeight - 4;
  }

  onLanguageChange(event: Event){
    this.selectedLanguage = (event.target as HTMLSelectElement).value;
    this.setBoilerPlateCode();
  }

  setBoilerPlateCode(){
    const boilerPlateCode  = this.boilerPlateService.getBoilerPlate(this.selectedLanguage);
    this.editorInstance.setValue(boilerPlateCode);
  }

  runCode(){
    const editorContent = this.editorInstance.getValue();
    const extension = this.langaugeExtensionService.getExtension(this.selectedLanguage);
    let codeRequest = new CodeRequest(this.selectedLanguage,editorContent, extension);
    this.editorService.execute(codeRequest).subscribe({
      next: (val) => {
        if(!val.success) this.codeExecSuccess = false;
        else this.codeExecSuccess = true;

        this.output = val.output;       
      },
      error: err => {
        console.log("Something went wrong: " + err.message)
      }
    })
  }
}
