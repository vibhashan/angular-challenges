import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style]="backgroundColor">
      <ng-content select="[cardImage]" />
      <section>
        @for (item of list; track item) {
          <app-list-item
            (deleteItemId)="delete($event)"
            [name]="item.firstName || item.name"
            [id]="item.id" />
        }
      </section>
      <ng-content select="[addButton]" />
    </div>
  `,
  imports: [ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() backgroundColor = '';
  @Output() deleteItemId = new EventEmitter<number>();

  delete(id: number) {
    this.deleteItemId.emit(id);
  }
}
