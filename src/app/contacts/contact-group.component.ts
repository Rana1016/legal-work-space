import { Component, OnInit } from '@angular/core';
import { ContactGroupService } from '../shared/services/contact-group.service';

@Component({
  selector: 'app-contact-groups',
  templateUrl: './contact-group.component.html',
  styleUrls: ['./contact-group.component.scss']
})
export class ContactGroupComponent implements OnInit {
  constructor(private contactGroup: ContactGroupService) { }
  contactGroups!: any[];
  title!: string;
  dtOptions!: DataTables.Settings;

  ngOnInit(): void {
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
        emptyTable: 'No Contact Groups available.'
      },
      columns: [{
        title: 'Contact groups',
        width: '700',
        data: '`title`',
        orderable: true
      }, {
        title: 'Actions',
        width: '50',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxContactGroups.bind(this)
    };
  }

  ajaxContactGroups(dTParams: any, callback: any) {
    this.contactGroup.getAll(dTParams).subscribe(({records, totalRecords}) => {
      this.contactGroups = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords,
        data: []
      })
    });
  }

  deleteContactGroup(id: number) {
    this.contactGroup.deleteContactGroup(id).subscribe((res) => {
      if (res == 1) {
        this.contactGroups = this.contactGroups.filter(({contactGroupId}) => contactGroupId != id)
      }
    });
  }
}
