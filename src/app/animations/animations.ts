import {animate, state, style, transition, trigger} from '@angular/animations';

export const routeAnimation =
  trigger('routeAnimation', [
    state('*', style({
      transform: 'scale(1)',
      opacity: 1
    })),
    transition(':leave', [
      style({
        transform : 'scale(1)',
        opacity: 1,
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%'
      }),
      // animation and styles at end of transition
      animate('1s ease-in', style({
        transform: 'scale(5)',
        opacity: 0
      }))
    ]),
    transition(':enter', [
      // styles at start of transition
      style({
        // start with the content positioned off the right of the screen,
        // -400% is required instead of -100% because the negative position adds to the width of the element
        transform : 'scale(5)',
        // start with background opacity set to 0 (invisible)
        opacity: 0
      }),

      // animation and styles at end of transition
      animate('1s ease-in', style({
        // transition the right position to 0 which slides the content into view
        transform: 'scale(1)',

        // transition the background opacity to 0.8 to fade it in
        opacity: 1
      }))
    ]),
  ]);
