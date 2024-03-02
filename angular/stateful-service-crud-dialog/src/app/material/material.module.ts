import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
 
  MatDialogModule,
} from '@angular/material/dialog';

const MaterialComponents = [
  MatButtonModule,
  MatCardModule,
  FormsModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatDialogModule,
  
];
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
