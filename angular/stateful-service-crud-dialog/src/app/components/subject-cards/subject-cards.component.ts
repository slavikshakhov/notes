import { Component, Input } from '@angular/core';
import { Subject } from '../../models/subject';

import { MatDialog } from '@angular/material/dialog';
import { openEditSubjectDialog } from '../edit-subject/edit-subject.component';
import { filter, tap } from 'rxjs';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-subject-cards',
  templateUrl: './subject-cards.component.html',
  styleUrl: './subject-cards.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectCardsComponent {
  @Input() subjects: Subject[] = [];

  constructor(
    private matDialog: MatDialog,
    private subjectsService: SubjectsService
  ) {}
  deleteSubject(id: number) {
    this.subjectsService.deleteSubject(id).subscribe();
  }
  editSubject(subject: Subject) {
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '400px';

    // dialogConfig.data = subject;

    // const dialogRef = this.matDialog.open(EditSubjectComponent, dialogConfig);

    // dialogRef
    //   .afterClosed()
    //   .pipe(
    //     filter((val) => !!val),
    //     tap(() => this.subjectChanged.emit())
    //   )
    //   .subscribe();

    openEditSubjectDialog(this.matDialog, subject)
      .pipe(
        filter((val) => !!val)
        // tap(() => this.subjectChanged.emit())
      )
      .subscribe();
  }
}
