import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lw-select',
  templateUrl: './lw-select.component.html',
  styleUrls: ['./lw-select.component.scss']
})
export class LwSelectComponent implements OnInit {
  @Input() control!: string;
  @Input() options!: any[];
  @Input() type!: string;
  @Input() index!: number;
  @Input() form!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  addNewOption() {
    this.options.push('Hello')
  }

}
