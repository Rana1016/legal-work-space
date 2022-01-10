import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogbookFolderService } from 'src/app/shared/services/logbook-folder.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss']
})
export class AddFolderComponent implements OnInit {
  constructor(private logBookFolder: LogbookFolderService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private user: UserService) { }
  newFolderForm!: FormGroup;
  edit?: number;
  ngOnInit(): void {
    this.newFolderForm = this.fb.group({
      title: [''],
      userId: [this.user.getUser.userId]
    });
    this.route.params.subscribe(({logBookFolderId}) => {
      this.edit = Number(logBookFolderId);
      this.logBookFolder.getLogBookFolderById(this.edit).subscribe((logBookFolder) => {
        this.newFolderForm.patchValue(logBookFolder)
      });
    })
  }

  submitForm() {
    (!this.edit ?
      this.logBookFolder.addLogBookFolder(this.newFolderForm.value)
      : this.logBookFolder.updateLogBookFolderById(this.edit, this.newFolderForm.value)
    ).subscribe((res) => res == '1' && this.router.navigate(!this.edit ? ['..'] : ['../..'], { relativeTo: this.route }))
  }

}
