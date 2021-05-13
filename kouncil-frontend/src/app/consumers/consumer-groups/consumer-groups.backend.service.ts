import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConsumerGroupsService} from './consumer-groups.service';
import {Observable} from 'rxjs';
import {ConsumerGroupsResponse} from './consumer-groups';

@Injectable({
  providedIn: 'root'
})
export class ConsumerGroupsBackendService implements ConsumerGroupsService {

  constructor(private http: HttpClient) {
  }

  deleteConsumerGroup(serverId: string, value: string): Observable<Object> {
    return this.http.delete(`/api/consumer-group/${value}?serverId=${serverId}`);
  }

  getConsumerGroups(serverId: string): Observable<ConsumerGroupsResponse> {
    return this.http.get<ConsumerGroupsResponse>(`/api/consumer-groups?serverId=${serverId}`);
  }
}
