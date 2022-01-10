import { Component, OnInit } from '@angular/core';
import { InstallmentService } from '../shared/services/installment.service';

@Component({
  selector: 'app-installments',
  templateUrl: './installments.component.html',
  styleUrls: ['./installments.component.scss']
})
export class InstallmentsComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
      
  }
}
