import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  newGroupForm!: FormGroup;
  ngOnInit(): void {
    this.newGroupForm = this.fb.group({
      name: [''],
      accessType: ['public']
    })
  }

}
