import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(private clientSvc: ClientService, private route: ActivatedRoute, private fb: FormBuilder, private modal: NgbModal) { }
  client: any;
  clientForm!: FormGroup;
  ngOnInit(): void {
    this.route.params.subscribe(({caseId}) => {
      this.clientSvc.clientObservable.subscribe((caseId) => {
        this.clientSvc.getClientInfo(Number(caseId)).subscribe((client) => {
          this.client = client;
          this.clientForm.patchValue(client);
        });
      })
      this.clientSvc.updateClient(Number(caseId));
    })
    this.clientForm = this.fb.group({
      password: [''],
      accountStatus: [false]
    })
  }

  open(content: TemplateRef<any>) {
    this.modal.open(content, {centered: true});
  }

}
