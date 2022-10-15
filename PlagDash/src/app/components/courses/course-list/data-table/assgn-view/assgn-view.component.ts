import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-assgn-view',
  templateUrl: './assgn-view.component.html',
  styleUrls: ['./assgn-view.component.scss']
})
export class AssgnViewComponent implements OnInit {

  fileLink: SafeResourceUrl = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public service: SharedService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fileLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.service.FileUrl + "/" +this.data.selectedAssgn.DocFileName);
  }

}
