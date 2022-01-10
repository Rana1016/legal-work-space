import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService } from '../shared/services/cases.service';
import { KeydatesService } from '../shared/services/keydates.service';

@Component({
  selector: 'app-keydates',
  templateUrl: './keydates.component.html',
  styleUrls: ['./keydates.component.scss']
})
export class KeydatesComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
      
  }
}
