import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExampleComponent } from './components/example/example.component';
import { CategoryComponent } from './components/category/category.component';
import { TestsComponent } from './components/tests/tests.component';
import { AuthGuard } from '../utils/guards/auth.guard';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ExampleComponent },
      {
        path: 'categories',
        component: ExampleComponent,
        data: { breadcrumb: 'Categories' },
      },
      {
        path: 'categories/:title',
        component: CategoryComponent,
        data: { breadcrumb: ':title' },
      },
      {
        path: 'categories/:title/tests/:id',
        component: TestsComponent,
      },
      {
        path: 'admins',
        component: ExampleComponent,
        data: { breadcrumb: 'Admins' },
      },
      {
        path: 'users',
        component: ExampleComponent,
        data: { breadcrumb: 'Users' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
