import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.scss']
})
export class GlobalSettingsComponent implements OnInit {
  constructor(private fb: FormBuilder, private gSet: SharedService) { }
  globalSettingsForm!: FormGroup;
  ngOnInit(): void {
    this.globalSettingsForm = this.fb.group({
      id: 0,
      companyRegNo: [""],
      vatRegNo: [""],
      vatRatePercentage: [""],
      invoiceFooter: [""],
      invoiceEmailTemplate: [""],
      invoiceReminderTemplate: [""],
      installmentReminder: [""]
    });
    this.gSet.getGlobalSettings().subscribe((data) => {
      this.globalSettingsForm.patchValue(data.response[0])
    });
  }
  submitForm() {
    this.gSet.updateGlobalSettings(this.globalSettingsForm.value).subscribe((res) => {
      res == 1 && ((<any>window).pageLoading = true);
      this.gSet.getGlobalSettings().subscribe((data) => {
        this.globalSettingsForm.patchValue(data.response[0])
      });
    })
  }
}
