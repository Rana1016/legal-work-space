import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-cases',
  templateUrl: './my-cases.component.html',
  styleUrls: ['./my-cases.component.scss']
})
export class MyCasesComponent implements OnInit {
  constructor (private clientSvc: ClientService, private user: UserService) {}
  Cases: any;
  dtOptions!: DataTables.Settings;

  ngOnInit(): void {
    this.getCases();
  }

  getCases() {
    this.clientSvc.getClientCases(this.user.getClient.clientId).subscribe(({response}: any) => {
      console.log(response);
      
      this.Cases = response;
      console.log(this.Cases);
    })
  }

}
