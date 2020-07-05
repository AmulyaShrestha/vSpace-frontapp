import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class WidgetCommunicationService {
  private dataSource = new BehaviorSubject<any>(null);
  public data = this.dataSource.asObservable();

  constructor() {
  }

  public sendDataToSubscribers(data: any) {
    this.dataSource.next(data);
  }
}
