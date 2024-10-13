import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'car-toolbar',
  standalone: true,
  imports: [MatToolbar],
  templateUrl: `./car-toolbar.component.html`,
  styleUrl: `./car-toolbar.component.scss`,
})
export class CarToolbar {}
