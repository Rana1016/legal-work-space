import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactGroupService } from 'src/app/shared/services/contact-group.service';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  constructor(private contact: ContactService, private contactGroup: ContactGroupService, private router: Router) {
    const urlParts = this.router.url.split('/');
    this.contactGroupId = Number(urlParts[urlParts.length - 1]);
  }
  contactGroupId: number;
  contacts!: any[];
  title!: string;
  dtOptions!: DataTables.Settings;

  ngOnInit(): void {
    this.contactGroup.getContactGroupById(this.contactGroupId).subscribe(({title}) => {
      this.title = title;
    })
    this.dtOptions = {
      responsive: true,
      serverSide: true,
      // scrollX: true,
      order: [[0, "desc"]],
      lengthChange: false,
      paging: true,
      processing: true,
      ordering: true,
      displayStart: -1,
      info: true,
      autoWidth: false,
      searching: true,
      language: {
        infoEmpty: '',
        emptyTable: 'No Contacts available.'
      },
      columns: [{
        title: '',
        width: '50',
        data: 'name',
        orderable: true
      }, {
        title: 'Contact Details',
        width: '330',
        data: 'name',
        orderable: false,
        
      }, {
        title: 'Phone',
        width: '210',
        data: 'phoneNumber',
        orderable: false
      }, {
        title: 'Email',
        width: '350',
        data: 'email',
        orderable: false
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxContacts.bind(this)
    };
  }

  ajaxContacts(dTParams: any, callback: any) {
    this.contact.getContactByGroupId(this.contactGroupId, dTParams).subscribe(({records, totalRecords}) => {
      this.contacts = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        data: []
      })
    });
  }

  deleteContact(id: number) {
    this.contact.deleteContact(id).subscribe((res) => {
      if (res == 1) {
        this.contacts = this.contacts.filter(({contactId}) => contactId != id)
      }
    });
  }
}
