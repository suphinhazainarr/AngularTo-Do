import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-priority-tasks-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './priority-tasks-popup.component.html',
  styleUrl: './priority-tasks-popup.component.css'
})
export class PriorityTasksPopupComponent {
  @Input() tasks: any[] = [];
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}
