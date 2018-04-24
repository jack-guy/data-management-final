import { Component, EventEmitter, OnInit, Output, ViewChild, Input, HostListener } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';

@Component({
  selector: 'app-eva',
  templateUrl: './eva.component.html',
  styleUrls: ['./eva.component.scss']
})
export class EvaComponent implements OnInit {
  @ViewChild('evaPopover') evaPopover: SatPopover;
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (this.evaPopover && this.evaPopover.isOpen()) {
      this.evaPopover.close();
    }
  }

  @Input() instance;
  @Input() column;

  @Output() popoverOpen = new EventEmitter(); 

  constructor() { }

  ngOnInit() {
  }

  popoverClick (e: MouseEvent) {
    e.stopPropagation();
  }

  open (e: MouseEvent) {
    e.stopPropagation();
    this.evaPopover.toggle();
    if (this.evaPopover.isOpen()) {
      this.popoverOpen.emit(null);
    }
  }

  close () {
    if (this.evaPopover && this.evaPopover.isOpen()) {
      this.evaPopover.close();
    }
  }
}
