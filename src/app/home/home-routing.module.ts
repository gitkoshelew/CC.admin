import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ExampleComponent } from './components/example/example.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ExampleComponent},
      { path: 'categories', component: ExampleComponent, data: {breadcrumb: 'Categories'}, children: [
          { path: ':title', component: ExampleComponent, data: {breadcrumb: 'title'} }
        ]},
      { path: 'admins', component: ExampleComponent, data: {breadcrumb: 'Admins'} },
      { path: 'users', component: ExampleComponent, data: {breadcrumb: 'Users'} },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
