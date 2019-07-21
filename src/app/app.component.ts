import { Component } from '@angular/core';
import { style, trigger, state, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openTodo', [
      state('open', style({ display: 'block', width: '800px', minWidth: '800px' })),
      state('closed', style({ display: 'none', width: '0px'})),

      transition('* => open',
        animate('1000ms',
          keyframes([
              style({ display: 'block', transform: 'translate(-100% , 0)', opacity: 0, offset: 0, width: '0px' ,  minWidth: '0px' }),
              style({ display: 'block', transform: 'translate(-50% , 0)', opacity: 0.5, offset: 0.5, width: '400px',  minWidth: '400px' }),
              style({ display: 'block', transform: 'translate(0 , 0)', opacity: 1, offset: 1, width: '800px',  minWidth: '800px'  })
          ])
        )
      ),

      transition('* => closed',
        animate('1000ms',
          keyframes([
            style({ transform: 'translate(0% , 0)', opacity: 0, offset: 0 , width: '800px', minWidth: '800px'}),
            style({ transform: 'translate(-50% , 0)', opacity: 0.5, offset: 0.5, width: '400px', minWidth: '400px' }),
            style({ transform: 'translate(-100% , 0)', opacity: 0.7, offset: 0.7, width: '240px', minWidth: '240px' }),
            style({ transform: 'translate(-200% , 0)', opacity: 1, offset: 1, width: '0px', display: 'none', minWidth: '0px' })
          ])
        )
      ),
    ])

  ]
})
export class AppComponent {
  title = 'pomodoro';
  isOpen = true;
  missionTitle = '';
  selectedTitle = '';

  buttons = [
    {
      title: 'Add list',
      active: true
    },
    {
      title: 'Analytics',
      active: false
    },
    {
      title: 'Setting',
      active: false
    }
  ];

  todos = [
    'The three tihngs to do today',
    'Study English',
    'Check the airplane tickets',
    'Clean the bathroom'
  ];
  dones = [
    'Check baby’s homework',
    'Check baby’s homeworks'
  ];

  tomatoState = 'start'; // start, paused, end
  defaultTime = 60 * 25;

  time = 0;
  timer;

  constructor() {
    this.time = this.defaultTime;
    this.selectedTitle = this.todos[0];
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  pressButton(index) {
    this.buttons.forEach( (el) => {
      el.active = false;
    });
    this.buttons[index].active = true;
  }

  addTodoList() {
    this.todos.unshift(this.missionTitle);
    this.missionTitle = '';
  }

  todoChange(index) {
    this.dones.unshift(this.todos[index]);
    this.todos.splice(index, 1);
  }

  doneChange(index) {
    this.todos.unshift(this.dones[index]);
    this.dones.splice(index, 1);
  }

  changeState() {
    switch (this.tomatoState) {
      case 'start':
        this.tomatoState = 'paused';
        if (this.time === 0) {
          this.time = this.defaultTime;
        }
        this.startCountDown();
        break;
      case 'paused':
        this.tomatoState = 'start';
        clearInterval(this.timer);
        this.timer = null;
        break;
    }
  }

  selectTodo(todo) {
    this.selectedTitle = todo;
    this.tomatoState = 'start';
    this.time = this.defaultTime;
    clearInterval(this.timer);
    this.timer = null;
  }

  startCountDown() {
    this.timer = setInterval( () => {
      this.time = this.time - 1;
    }, 1000);
  }

  get timeFormat() {
    let min = String(Math.floor(this.time / 60));
    let sec = String(Math.floor(this.time % 60));
    if (min.length === 1) {
      min = '0' + min;
    }

    if (sec.length === 1) {
      sec = '0' + sec;
    }
    return `${min}:${sec}`;
  }
}
