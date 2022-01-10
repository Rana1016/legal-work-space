import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CasesService } from 'src/app/shared/services/cases.service';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { StatusService } from 'src/app/shared/services/case-details/status.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {

  constructor(private router: Router, private caseService: CasesService, private status: StatusService) { }
  caseId!: number;
  caseDetails: any;
  caseCategories: any[] = [];

  @ViewChild('forPDF') pdfView!: ElementRef;

  ngOnInit(): void {
    const UrlPartitions = this.router.url.split('/');
    this.caseId = Number(UrlPartitions[UrlPartitions.length - 2]);
    this.caseService.cDObservable.subscribe((cD) => {
      this.caseDetails = cD?.caseDetail;
      this.caseCategories = cD?.caseCategories?.map(({categoryTitle}: any) => categoryTitle);
    });
    this.status.statusObservable.subscribe((status) => {this.caseDetails && (this.caseDetails.caseStatus = status)});
  }

  downloadAsPDF() {
    const doc = new jsPDF();
    const pdfView = this.pdfView.nativeElement;
    var html = htmlToPdfmake(pdfView.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
  }

}
