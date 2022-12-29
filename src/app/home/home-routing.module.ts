import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ExampleComponent } from './components/example/example.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ExampleComponent },
      { path: 'categories', component: ExampleComponent },
      { path: 'tests', component: ExampleComponent },
      { path: 'test/:id', component: ExampleComponent },
      { path: 'admins', component: ExampleComponent },
      { path: 'users', component: ExampleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
