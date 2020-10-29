import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playing-card',
  templateUrl: './playing-card.component.html',
  styleUrls: ['./playing-card.component.scss']
})
export class PlayingCardComponent implements OnInit {

  constructor() { }
  @Input() text: string;
  @Input() type: string;
  @Input() color: string;

  ngOnInit(): void {
  }
}
