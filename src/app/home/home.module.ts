import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './components/example/example.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CategoryComponent } from './components/category/category.component';
import { TestsComponent } from './components/tests/tests.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ModalModule } from '../shared/modules/modal/modal.module';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { TestsService } from './services/tests.service';

@NgModule({
  declarations: [
    HomeComponent,
    ExampleComponent,
    CategoriesComponent,
    CategoryComponent,
    TestsComponent,
    CreateCategoryComponent,
    CreateTestComponent,
  ],
  exports: [],
  imports: [
    HomeRoutingModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzDividerModule,
    ModalModule,
    NzSelectModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
  ],
  providers: [TestsService],
  exports: [],
})
export class HomeModule {}
