import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VatRateService } from 'src/app/shared/services/vat-rate.service';

@Component({
  selector: 'app-new-vat-rate',
  templateUrl: './new-vat-rate.component.html',
  styleUrls: ['./new-vat-rate.component.scss']
})
export class NewVatRateComponent implements OnInit {
  constructor(private vatRate: VatRateService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }
  newVatRateForm!: FormGroup;
  edit?: number;
  ngOnInit(): void {
    this.newVatRateForm = this.fb.group({
      vatRatePercentage: [''],
      title: [''],
    });
    this.route.params.subscribe(({ vatRateId }) => {
      this.edit = Number(vatRateId);
      this.vatRate.getVatRateById(this.edit).subscribe((vatRate) => {
        this.newVatRateForm.patchValue(vatRate)
      });
    })
  }

  submitForm() {
    (!this.edit ?
      this.vatRate.addVatRate(this.newVatRateForm.value)
      : this.vatRate.updateVatRate(this.edit, this.newVatRateForm.value)
    ).subscribe((res) => res == '1' && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route }))
  }

}
