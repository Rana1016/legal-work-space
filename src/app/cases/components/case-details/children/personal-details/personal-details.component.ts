import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { CasesService } from 'src/app/shared/services/cases.service';
import FormData from 'src/assets/JSONs/FormData.json';
@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  constructor(private caseService: CasesService, private modal: NgbModal, private router: Router) {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
  }
  caseId: number;
  pD: any;
  FormData = FormData;
  @ViewChild('deletePerson') ViewModal!: TemplateRef<any>;
  ngOnInit(): void {
    this.caseService.pDObservable.subscribe((data) => {
      console.log(data);
      
      this.pD = data;
    });
  }
  toDate(date: any) {
    return moment(new Date(date)).format('DD-MM-YYYY')
  };

  toTime(date: any) {
    return moment(new Date(date)).format('HH:mm:ss')
  };

  deletePersonalDetails() {
    this.modal.open(this.ViewModal);
  }

  deleteProfile() {
    this.caseService.deleteProfile(this.pD.personID).subscribe();
  }
}
