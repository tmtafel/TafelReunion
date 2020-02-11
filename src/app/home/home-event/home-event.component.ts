import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeEvent } from '../home-event';

@Component({
  selector: 'app-home-event',
  templateUrl: './home-event.component.html',
  styleUrls: ['./home-event.component.scss']
})
export class HomeEventComponent implements OnInit {
  @Input() event: HomeEvent;
  html: string;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.html = this.sanitizer.sanitize(SecurityContext.HTML, this.event.html);
  }

}
