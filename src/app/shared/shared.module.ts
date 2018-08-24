import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatIconModule } from '@angular/material';
import { MarginIconComponent } from './margin-icon/margin-icon.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule, 
    MatIconModule,
    FlexLayoutModule
  ], 
  declarations: [ 
    ToolbarComponent,
    MarginIconComponent
  ],
  exports: [
    ToolbarComponent,
    MarginIconComponent
  ],
})
export class SharedModule { }
