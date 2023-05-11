import {inject, Injectable} from '@angular/core';
import {filter} from 'rxjs';
import {SwPush, SwUpdate, VersionReadyEvent} from '@angular/service-worker';

@Injectable({providedIn: 'root'})
export class SubscriptionService {
  private readonly update = inject(SwUpdate);
  private readonly push = inject(SwPush);
  private readonly SERVER_PUBLIC_KEY = 'BCh6M1BtHyLVPg4GYAfMJBFTIkcjz28qsOo8UiX4F6BAxDeqZKIRzJX9KHC3HOfj5R09m-YV09Xvt19IdctdCHc';

  constructor() {
    this.push.subscription.subscribe((sub) => {
      console.log('SUBSCRIPTION')
      console.log(sub)
    })

    this.update.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(evt => document.location.reload());
  }

  public requestSubscription(): void {
    this.push.requestSubscription({serverPublicKey: this.SERVER_PUBLIC_KEY})
      .then((sub) => {
        console.log('NEW SUBSCRIPTION')
        console.log(sub);
      })
  }
}
