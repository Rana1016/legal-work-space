import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-new-office-location',
  templateUrl: './new-office-location.component.html',
  styleUrls: ['./new-office-location.component.scss']
})
export class NewOfficeLocationComponent implements OnInit {
  newLocationForm: FormGroup;
  edit?: string;
  constructor(private location: LocationService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.newLocationForm = this.fb.group({
      title: [''],
      phone: [''],
      fax: [''],
      email: [''],
    });
    this.route.params.subscribe(({ locationId }) => {
      if (!!locationId) {
        this.edit = locationId;
        this.location.getLocationById(Number(this.edit)).subscribe((Location) => {
          this.newLocationForm.patchValue({
            ...Location,
          })
        });
      }
    });
  }

  ngOnInit(): void { }

  submitForm() {
    let data = this.newLocationForm.value;
    !!this.edit ?
      this.location.updateLocationById(Number(this.edit), data)
        .subscribe((res) => res == '1' && this.router.navigate(['../..'], { relativeTo: this.route }))
      : this.location.addLocation(data).subscribe((res) => res == '1' && this.router.navigate(['..'], { relativeTo: this.route }));
  }
}
