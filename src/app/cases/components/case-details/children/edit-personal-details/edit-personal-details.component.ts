import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/cases.service';
import FormData from 'src/assets/JSONs/FormData.json';

@Component({
  selector: 'app-edit-personal-details',
  templateUrl: './edit-personal-details.component.html',
  styleUrls: ['./edit-personal-details.component.scss']
})
export class EditPersonalDetailsComponent implements OnInit {
  caseId: number;
  personId!: number;
  editPersonalDetailsForm!: FormGroup;
  FormData = FormData;
  constructor(private fb: FormBuilder, private caseService: CasesService, private router: Router, private route: ActivatedRoute) {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 4]);
    this.route.params.subscribe(({personID}) => {
      this.personId = personID;
    });
  }
  ngOnInit(): void {
    this.editPersonalDetailsForm = this.fb.group({
      personID: [this.personId || 0],
      type: [''],
      status: [''],
      title: ["0"],
      name: [''],
      nickName: [''],
      gender: ["0"],
      fatherName: [''],
      companyName: [''],
      cnic: [''],
      phoneNumber: [''],
      whatsApp: [''],
      email: [''],
      address: [''],
      companyAddress: [''],
      otherDetails: [''],
      isLead: [false],
      isContactPerson: [false],
      cpName: [''],
      cpFatherName: [''],
      cpCompanyName: [''],
      cpCNIC: [''],
      cpPhoneNumber: [''],
      cpWhatsApp: [''],
      cpEmail: [''],
      cpAddress: [''],
      cpOtherDetails: [''],
      personType: [''],
      caseId: [0],
    });

    this.editPersonalDetailsForm.controls.status.valueChanges.subscribe((status) => {
      this.editPersonalDetailsForm.controls.isLead.setValue(status == 'lead');
    })
    this.caseService.pDObservable.subscribe((data) => {
      if (!!data) {
        this.editPersonalDetailsForm.patchValue(data);
      } else {
        this.caseService.getPersonalDetails(this.caseId).subscribe((data) => {
          this.editPersonalDetailsForm.patchValue(data);
        })
      }
    });
  }
  
  submitForm() {
    this.caseService.editPersonalDetails(Number(this.personId), this.editPersonalDetailsForm.value).subscribe(res => {
      res == 1 && this.router.navigate(['../..'], {relativeTo: this.route})
    });
  }
}