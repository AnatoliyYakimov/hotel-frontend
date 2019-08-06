import {Directive, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthorityService} from '../../../core/services/auth/authority.service';
import {SubscriptionLike} from 'rxjs';

@Directive({
  selector: '[appPermit]'
})
export class PermitDirective implements OnChanges, OnDestroy {

  @Input() appPermit!: string[];

  private sub?: SubscriptionLike;

  constructor(private vcr: ViewContainerRef,
              private template: TemplateRef<void>,
              private authorityService: AuthorityService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!('appPermit' in changes)) {
      if (this.sub != undefined) {
        this.sub.unsubscribe();
      }
      this.sub = this.authorityService.watch(this.appPermit).subscribe(
        has => {
          has ? this.vcr.createEmbeddedView(this.template)
            : this.vcr.clear();
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.sub != undefined) {
      this.sub.unsubscribe();
    }
  }


}
