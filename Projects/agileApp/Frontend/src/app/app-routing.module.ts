import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BacklogComponent } from './backlog/backlog.component';
import { SprintBacklogComponent } from './sprint-backlog/sprint-backlog.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'backlog',component:BacklogComponent},
  {path:'sprint',component:SprintBacklogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
