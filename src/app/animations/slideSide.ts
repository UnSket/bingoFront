import {animate, state, style, transition, trigger} from '@angular/animations';

export const slideSideAnimation =
  trigger('slideSideAnimation', [
    state('in', style({transform: 'translateX(0)'})),
    transition(':enter', [
      style({transform: 'translateX(-2000px)', position: 'absolute'}),
      animate('1s ease-out')
    ]),
    transition(':leave', [
      style({position: 'absolute'}),
      animate('1s ease-out', style({transform: 'translateX(2000px)'}))
    ])
  ]);
