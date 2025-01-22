import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [NgClass],
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent {
  @Input() height!: number;
  @Input() output!: string;
  @Input() codeExecSuccess!: boolean;
}
