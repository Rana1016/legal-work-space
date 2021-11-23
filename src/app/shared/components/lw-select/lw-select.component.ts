import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lw-select',
  templateUrl: './lw-select.component.html',
  styleUrls: ['./lw-select.component.scss']
})
export class LwSelectComponent implements OnInit {
  @Input() control!: string;
  @Input() options!: any[];
  @Input() type!: string;
  @Input() index!: number;
  @Input() form!: FormGroup;
  @Input() bindLabel?: string;
  @Input() bindValue?: string;
  @ViewChild('lwSELECT') lwSELECT!: ElementRef;
  optionForm!: FormGroup;
  modalType!: string;
  constructor(private fb: FormBuilder, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.optionForm = this.fb.group({
      value: [this.options.length - 1],
      label: [null]
    })
  }

  openModel(type: any, content: any) {
    this.modalType = type;
    if (type == 'edit') {
      this.optionForm.patchValue({
        value: this.lwSELECT.nativeElement.value,
        label: !this.bindLabel ? this.options.filter((opt, i) => i == this.lwSELECT.nativeElement.value - 1)[0] : this.options.filter((opt, i) => i == this.lwSELECT.nativeElement.value - 1)[0][this.bindLabel]
      }) 
    } else {
      this.optionForm.reset()
    }
    this.modalService.open(content);
  }
  addNewOption(modal?: any) {
    let newOption: any;
    if (this.bindLabel && this.bindValue) {
      newOption[this.bindValue] = this.optionForm.value.value;
      newOption[this.bindLabel] = this.optionForm.value.label;
    } else {
      newOption = this.optionForm.value.label
    }
    this.modalType == 'add' ? this.options.push(newOption) :
    this.options[this.lwSELECT.nativeElement.value - 1] = newOption;
    this.modalType == 'add' && (<FormGroup>(<FormArray>this.form.controls[this.type !== 'thirdParty' ? this.type + 's' : 'thirdParties']).controls[this.index]).controls[this.control].setValue(this.options.length)
    modal.dismiss();
  }
}
