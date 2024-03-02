import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { EditSubjectComponent } from './components/edit-subject/edit-subject.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubjectCardsComponent } from './components/subject-cards/subject-cards.component';

@NgModule({
  declarations: [AppComponent, EditSubjectComponent, SubjectCardsComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
