import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kendo-grid-test';
  public showGrid = false;

  public onGridDestroy(): void {
    this.showGrid = false;
  }
}
