import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';
import { Level, Subject } from '../models/subject';
import { BASE_ROUTE } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  // only used in this service, becomes accessible via getter
  private subject = new BehaviorSubject<Subject[]>([]);

  constructor(private http: HttpClient) {
    //runs once
    this.loadAllSubjects();
    this.subject.pipe(tap((res) => console.log({ result: res }))).subscribe();
  }
  getSubjectsValue(): Observable<Subject[]> {
    return this.subject;
  }

  private loadAllSubjects() {
    this.http
      .get<Subject[]>(`${BASE_ROUTE}/subjects`)
      .pipe(
        map((resp) => {
          console.log({ resp });
          return resp['data'];
        }),
        catchError((err) => {
          console.log({ err });
          // replaces observable with error observable
          return throwError(() => err);
        }),
        // assigns new value to subject BehaviorSubject and dependent on it - subjects$ observable
        tap((subjs) => this.subject.next(subjs))
      )
      .subscribe((result) => this.subject.next(result));
  }

  filterByLevel(level: Level): Observable<Subject[]> {
    return this.subject.pipe(
      map((subjects) => {
        console.log({ subjects, level });
        return subjects.filter((s) => {
          console.log({ subject: s, level });
          return s.level === level;
        });
      }),
      tap((res) => {
        console.log({ res });
      })
    );
  }
  updateSubject(id: number, collegeSubject: Partial<Subject>): Observable<any> {
    const previousSubjects = this.subject.getValue();
    // optimistic update, before updating in db
    const updatedSubjects = previousSubjects.reduce((acc, s) => {
      return id === s.id ? [...acc, collegeSubject] : [...acc, s];
    }, []);

    this.subject.next(updatedSubjects);

    return this.http
      .put<Subject[]>(`${BASE_ROUTE}/subjects/${id}`, collegeSubject)
      .pipe(
        catchError((err) => {
          const message = 'Could not update Subject';
          // use messages service to display message (top screen)
          return throwError(() => err);
        }),
        shareReplay()
      );
  }
  createSubject(subject: Subject) {
    const previousSubjects = this.subject.getValue();
    const updated = [...previousSubjects, subject];
    this.subject.next(updated);
    return this.http.post(`${BASE_ROUTE}/subjects/`, subject);
  }
  deleteSubject(id: number) {
    const previousSubjects = this.subject.getValue();
    console.log({id, previousSubjects})
    const updated = previousSubjects.reduce(
      (acc, s) => (s.id != id ? [...acc, s] : acc),
      []
    );
    this.subject.next(updated);
    return this.http.delete(`${BASE_ROUTE}/subjects/${id}`);
  }
}
