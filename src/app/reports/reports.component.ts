import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  constructor() {
    console.log('main componenet');
    
   }
  
  ngOnInit(): void {
    
  }
  ngOnDestroy(){
    console.log('hp gya main');
    
  }
}
