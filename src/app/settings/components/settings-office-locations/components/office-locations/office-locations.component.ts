import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-office-locations',
  templateUrl: './office-locations.component.html',
  styleUrls: ['./office-locations.component.scss']
})
export class OfficeLocationsComponent implements OnInit {
  constructor(private location: LocationService) { }
  locations?: any[];
  dtOptions: any;
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
        emptyTable: 'No Locations available.'
      },
      columns: [{
        title: 'Title',
        width: '250',
        data: 'title',
        orderable: true
      }, {
        title: 'Phone',
        width: '150',
        data: 'phone',
        orderable: false,
        
      }, {
        title: 'Fax',
        width: '180',
        data: 'fax',
        orderable: false
      }, {
        title: 'Email',
        width: '400',
        data: 'email',
        orderable: false
      }, {
        title: 'Actions',
        width: '100',
        orderable: false,
        data: null
      }],
      ajax: this.ajaxLocations.bind(this)
    };
  }

  ajaxLocations(dTParams: any, callback: any) {
    this.location.getAll(dTParams).subscribe(({records, totalRecords}) => {
      this.locations = records;
      callback({
        recordsTotal: totalRecords,
        recordsFiltered: totalRecords
      })
    })
  }

}
