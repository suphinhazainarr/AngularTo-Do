import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private updateStatisticsSource = new Subject<void>();
  updateStatistics$ = this.updateStatisticsSource.asObservable();

  triggerUpdateStatistics() {
    this.updateStatisticsSource.next();
  }
}
