import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { Subject } from '../../models/subject';
import { LEVELS_OPTIONS } from '../../constants';
import { Observable } from 'rxjs';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrl: './edit-subject.component.scss',
})
export class EditSubjectComponent {
  levelOptions = LEVELS_OPTIONS.slice(1);
  subject: Subject;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) private subj: Subject | null,
    private subjectsService: SubjectsService
  ) {
    if (this.subj) {
      this.subject = subj;
      this.form = this.fb.group({
        name: [this.subj.name, Validators.required],
        level: [this.subj.level, Validators.required],
        credits: [this.subj.credits, Validators.required],
        instructor: [this.subj.instructor],
      });
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        level: ['', Validators.required],
        credits: ['', Validators.required],
        instructor: [],
      });
    }
  }
  save() {
    const changes = this.form.value;
    if (this.subject)
      this.subjectsService.updateSubject(this.subj.id, changes).subscribe();
    else {
      this.subjectsService.createSubject(changes).subscribe();
    }

    this.dialogRef.close(changes);
  }
  close() {
    this.dialogRef.close();
  }
}

export const openEditSubjectDialog = (
  dialog: MatDialog,
  subject?: Subject
): Observable<Subject> => {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = 'model-panel';
  config.backdropClass = 'backdrop-model-panel';
  config.data = subject ? { ...subject } : null;
  const dialogRef = dialog.open(EditSubjectComponent, config);
  return dialogRef.afterClosed();
};
