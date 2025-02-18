import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Backend } from '../app.backend';
import { SendBackendService } from './send.backend.service';
import { SendDemoService } from './send.demo.service';
import {MessageData} from '@app/message-data';

@Injectable()
export abstract class SendService {
  abstract send$(serverId: string, count: number, message: MessageData): Observable<Record<string, unknown>>;
}

export function sendServiceFactory(http: HttpClient): SendService {
  switch (environment.backend) {
    case Backend.SERVER: {
      return new SendBackendService(http);
    }
    case Backend.DEMO: {
      return new SendDemoService();
    }
  }
}
