import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'lw-select',
  templateUrl: './lw-select.component.html',
  styleUrls: ['./lw-select.component.scss']
})
export class LwSelectComponent implements OnInit {
  @Input() controlName!: string;
  @Input() options!: any[];
  @Input() bindLabel?: string;
  @Input() bindValue?: string;
  @Input() customNote?: string;
  @Input() sort?: boolean;
  @Input() noFirstText?: boolean;
  @Input() firstText?: string;
  @Input() notEditValue?: boolean;
  @Input() notAddValue?: boolean;
  @Input() tableName?: string;
  @Input() keyColName?: string;
  @Input() displayColName?: string;

  @Output() change: EventEmitter<any> = new EventEmitter();

  optionForm!: FormGroup;
  modalType!: string;
  formGroup!: FormGroup;
  formControl!: FormControl;
  constructor(private fb: FormBuilder, private modalService: NgbModal, private lookup: SharedService, private controlContainer: ControlContainer) {}
  ngOnInit(): void {
    if (!!this.tableName && !!this.keyColName && !!this.displayColName) {
      this.lookup.getOptions(`tbl${this.tableName}`, this.keyColName, this.displayColName).subscribe((res) => {
        this.options = res;
        this.bindValue = 'keyValue'
        this.bindLabel = 'displayValue';
      })
    }

    if (!!this.options) {
      this.optionForm = this.fb.group({
        value: [this.options.length - 1],
        label: [null]
      })
    }
    this.formGroup = <FormGroup>this.controlContainer.control;
    this.formControl = <FormControl>this.controlContainer.control?.get(this.controlName);
  }

  openModel(type: any, content: any) {
    this.modalType = type;
    if (type == 'edit') {
      this.optionForm.patchValue({
        value: this.formControl.value,
        label: !this.bindLabel ? this.options.filter((opt, i) => i == this.formControl.value - 1)[0] : this.options.filter((opt, i) => (!this.bindValue ? i : opt[this.bindValue]) == (!this.bindValue ? this.formControl.value - 1 : this.formControl.value))[0][this.bindLabel]
      })
    } else {
      this.optionForm.reset()
    }
    this.modalService.open(content);
  }
  addNewOption(modal?: any) {
    let newOption: any;
    if (this.bindLabel && this.bindValue) {
      newOption = {};
      newOption[this.bindValue] = this.optionForm.value.value;
      newOption[this.bindLabel] = this.optionForm.value.label;
    } else {
      newOption = this.optionForm.value.label
    }

    this.modalType == 'add' ? this.options.push(newOption) :
      this.options.filter((opt, i) => {
        if ((!this.bindLabel && i == this.formControl.value - 1) || (this.bindLabel && (!this.bindValue ? i : opt[this.bindValue]) == (!this.bindValue ? this.formControl.value - 1 : this.formControl.value))) {
          this.options[i] = newOption
        }
      })
    this.modalType == 'add' ? !this.bindValue ? !this.sort ? this.formControl.setValue(this.options.length) :
      this.options.sort().filter((opt, i) => { opt == this.optionForm.value.label && this.formControl.setValue(i + 1) }) :
      this.formControl.setValue(this.options[this.options.length - 1][this.bindValue]) :
      this.bindValue && this.formControl.setValue(this.optionForm.value.value);
    modal.dismiss();
  }
}
