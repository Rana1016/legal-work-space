import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactGroupService } from 'src/app/shared/services/contact-group.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private contactGroup: ContactGroupService) {}
  newGroupForm!: FormGroup;
  edit!: number;
  ngOnInit(): void {
    this.route.params.subscribe(({contactGroupId}) => {
      this.edit = Number(contactGroupId)
    });
    !!this.edit && this.contactGroup.getContactGroupById(this.edit).subscribe((data) => {
      this.newGroupForm.patchValue({...data, accessType: data.isPrivate ? 'private' : 'public'});
    });
    this.newGroupForm = this.fb.group({
      title: [''],
      accessType: [null]
    });
  }

  submitForm() {
    let data = {
      ...this.newGroupForm.value,
      isPrivate: this.newGroupForm.value.accessType == 'private'
    }
    !!this.edit ?
      this.contactGroup.updateContactGroupById(Number(this.edit), this.newGroupForm.value)
        .subscribe((res) => res == '1' && this.router.navigate(['../..'], { relativeTo: this.route }))

      : this.contactGroup.addContactGroup(this.newGroupForm.value)
        .subscribe((res) => res == '1' && this.router.navigate(['..'], { relativeTo: this.route }));
  }

}
