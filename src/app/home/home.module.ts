import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './components/example/example.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CategoryComponent } from './components/category/category.component';
import { TestsComponent } from './components/tests/tests.component';

@NgModule({
  declarations: [
    HomeComponent,
    ExampleComponent,
    CategoryComponent,
    TestsComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
  ],
  exports: [],
})
export class HomeModule {}
