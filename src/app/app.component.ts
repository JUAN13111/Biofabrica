import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LinechartComponent } from "./linechart/linechart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LinechartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Biofabrica';
}
