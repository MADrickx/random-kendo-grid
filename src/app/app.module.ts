import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@progress/kendo-angular-grid';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RandomKendoGridComponent } from './random-kendo-grid/random-kendo-grid.component';
import { InputsModule } from '@progress/kendo-angular-inputs';

@NgModule({
  declarations: [AppComponent, RandomKendoGridComponent],
  imports: [BrowserModule, GridModule, AppRoutingModule, InputsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
