import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  constructor(private fb: FormBuilder) { }

  newContactForm!: FormGroup;

  ngOnInit(): void {
    this.newContactForm = this.fb.group({
      fullName: [''],
      jobTitle: [''],
      companyName: [''],
      workPhone: [''],
      workEmail: [''],
      personalPhone: [''],
      personalEmail: [''],
      faxNumber: [''],
      fullAddress: [''],
      dxAddress: ['']
    });
  }

}
