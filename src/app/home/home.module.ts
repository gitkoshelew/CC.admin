import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './components/example/example.component';
import { WebsocketModule } from 'src/shared/websocket/websocket.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, ExampleComponent],
  imports: [
    HomeRoutingModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    FormsModule,
    ReactiveFormsModule,
    WebsocketModule.config({
      url: 'wss://socketsbay.com/wss/v2/1/demo/',
    }),
  ],
  exports: [],
})
export class HomeModule {}
