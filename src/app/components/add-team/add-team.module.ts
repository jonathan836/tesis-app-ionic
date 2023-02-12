import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTeamPageRoutingModule } from './add-team-routing.module';

import { AddTeamPage } from './add-team.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTeamPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddTeamPage]
})
export class AddTeamPageModule { }
