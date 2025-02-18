import { Injectable, NgModule } from '@angular/core';
import { TopicComponent } from '../topic/topic.component';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
  RouterModule,
  Routes,
} from '@angular/router';

import { TrackComponent } from '../track/track.component';
import { BrokersComponent } from '../brokers/brokers.component';
import { TopicsComponent } from '../topics/topics.component';
import { ConsumerGroupsComponent } from '../consumers/consumer-groups/consumer-groups.component';
import { ConsumerGroupComponent } from '../consumers/consumer-group/consumer-group.component';

@Injectable()
export class ReloadingRouterStrategy extends RouteReuseStrategy {
  shouldDetach(_route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(
    _route: ActivatedRouteSnapshot,
    _detachedTree: DetachedRouteHandle
  ): void {
    // empty
  }

  shouldAttach(_route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(_route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  shouldReuseRoute(
    _future: ActivatedRouteSnapshot,
    _curr: ActivatedRouteSnapshot
  ): boolean {
    return false;
  }
}

const routes: Routes = [
  {
    path: 'brokers',
    component: BrokersComponent,
  },
  {
    path: 'topics',
    component: TopicsComponent,
  },
  {
    path: 'topics/messages/:topic',
    component: TopicComponent,
  },
  {
    path: 'consumer-groups',
    component: ConsumerGroupsComponent,
  },
  {
    path: 'consumer-groups/:groupId',
    component: ConsumerGroupComponent,
  },
  {
    path: 'track',
    component: TrackComponent,
  },
  {
    path: '',
    redirectTo: 'topics',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: ReloadingRouterStrategy,
    },
  ],
})
export class RoutingModule {}
