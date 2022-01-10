import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  constructor(private fb: FormBuilder, private contact: ContactService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(({contactGroupId, contactId}) => {
      this.contactGroupId = Number(contactGroupId);
      !!contactId && (this.editId = Number(contactId));
    });
  }
  contactGroupId?: number;
  editId?: number;
  newContactForm!: FormGroup;

  ngOnInit(): void {
    !!this.editId && this.contact.getContactById(this.editId).subscribe((data) => {
      this.newContactForm.patchValue(data)
    })
    this.newContactForm = this.fb.group({
      name: [''],
      phoneNumber: [''],
      email: [''],
      contactGroupId: [this.contactGroupId || 0]
      // jobTitle: [''],
      // companyName: [''],
      // workPhone: [''],
      // workEmail: [''],
      // faxNumber: [''],
      // fullAddress: [''],
      // dxAddress: ['']
      // fullName: [''],
      // jobTitle: [''],
      // companyName: [''],
      // workPhone: [''],
      // workEmail: [''],
      // personalPhone: [''],
      // personalEmail: [''],
      // faxNumber: [''],
      // fullAddress: [''],
      // dxAddress: ['']
    });
  }

  submitForm() {
    !!this.editId ?
      this.contact.updateContactById(Number(this.editId), this.newContactForm.value)
        .subscribe((res) => res == '1' && this.router.navigate(['../..'], { relativeTo: this.route }))

      : this.contact.addContact(this.newContactForm.value)
        .subscribe((res) => res == '1' && this.router.navigate(['..'], { relativeTo: this.route }));
  }

}
