import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, filter, tap } from 'rxjs';
import { Level, Subject } from './models/subject';
import { SubjectsService } from './services/subjects.service';
import { LEVELS_OPTIONS } from './constants';
import { openEditSubjectDialog } from './components/edit-subject/edit-subject.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'University';
  LEVEL_OPTIONS = LEVELS_OPTIONS;
  selectedLevel: Level;
  level$: Observable<Level>;

  subjects$: Observable<Subject[]>;

  constructor(
    private subjectsService: SubjectsService,
    private matDialog: MatDialog
  ) {}
  ngOnInit(): void {
    // runs once but subjects$ observable is reactive, will change if changed in service
    this.reloadSubjects();
  }

  reloadSubjects() {
    this.subjects$ = this.subjectsService.getSubjectsValue();
  }

  filterByLevel(level: Level) {
    this.subjects$ =
      level === Level.all
        ? this.subjectsService.getSubjectsValue()
        : this.subjectsService.filterByLevel(level);
  }
  createNewSubject() {
    openEditSubjectDialog(this.matDialog)
      .pipe(
        filter((val) => !!val)
        // tap(() => this.subjectChanged.emit())
      )
      .subscribe();
  }
}
