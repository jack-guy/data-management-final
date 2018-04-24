import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';

@Component({
  selector: 'app-multi-eva',
  templateUrl: './multi-eva.component.html',
  styleUrls: ['./multi-eva.component.scss']
})
export class MultiEvaComponent implements OnInit {
  @ViewChild('mevaPopover') mevaPopover: SatPopover;

  @Input() instance;
  @Input() column;

  @Output() popoverOpen = new EventEmitter(); 

  constructor() { }

  ngOnInit() {
    console.log(this.instance, this.column);
  }

  popoverClick (e: MouseEvent) {
    e.stopPropagation();
  }

  open (e: MouseEvent) {
    e.stopPropagation();
    this.mevaPopover.toggle();
    if (this.mevaPopover.isOpen) {
      this.popoverOpen.emit(null);
    }
  }

  close () {
    this.mevaPopover.close();
  }
}
