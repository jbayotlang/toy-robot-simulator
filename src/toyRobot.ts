import chalk from 'chalk';
import { Coords } from './types';
import { DIRECTIONS, RIGHT, LEFT, WEST, NORTH, SOUTH, EAST } from './constants';
const term = require('terminal-kit').terminal; // vanilla, method I needed wasn't available in the typings

class ToyRobot {
  x: number = 0;
  y: number = 0;
  f: string = '';
  hasInitiated: boolean = false;
  visualTable: Array<any> = [];

  constructor() {
    this.greet();
  }

  _isValidCoordinates(x: number, y: number): boolean {
    return (!(x >= 0 && x < 5) || !(y >= 0 && y < 5));
  }

  place(coords: Coords): void {
    if (this._isValidCoordinates(coords.x, coords.y)) {
      this.speak('You can\'t put me there, there\'s no surface', 'error');
      return;
    }

    if (DIRECTIONS.indexOf(coords.f) === -1) {
      this.speak(`I can only face the following directions: ${DIRECTIONS.join(', ')}`, 'error');
      return;
    }

    this.hasInitiated = (this.hasInitiated) ? this.hasInitiated : true;
    this.x = coords.x;
    this.y = coords.y;
    this.f = coords.f;
  }

  face(direction: string): void {
    let index: number = DIRECTIONS.indexOf(this.f);

    switch (direction) {
      case LEFT:
        index--;
        break;
      case RIGHT:
        index++;
        break;
    }

    this.f = DIRECTIONS[index];

    if (index < 0) {
      this.f = WEST;
    }

    if (index > 3) {
      this.f = NORTH;
    }
  }

  move(): void {
    let y = this.y;
    let x = this.x;

    switch(this.f) {
      case NORTH:
        y += 1
        break;
      case SOUTH:
        y -= 1
        break;
      case EAST:
        x += 1
        break;
      case WEST:
        x -= 1
        break;
    }

    if (this._isValidCoordinates(x, y)) {
      this.speak('I can\'t go there!', 'error');
    } else {
      this.x = x;
      this.y = y;
    }
  }


  report(): void {
    let arrayYPos: number = 0;

    // 5 x 5 array for terminal-kit table method
    for (let i: number = 0; i <= 4; i++) {
      this.visualTable[i] = [];
      for (let j:number = 0; j <= 4; j++) {
        this.visualTable[i].push('xxxxyyyy'); // Placeholders
      }
    }

    switch (this.y) {
      case 3:
        arrayYPos = this.y - 2
        break;
      case 2:
        arrayYPos = this.y;
        break;
      case 1:
        arrayYPos = this.y + 2
        break;
      case 0:
        arrayYPos = this.y + 4
        break;
    }

    this.visualTable[arrayYPos][this.x] = `I'M HERE, FACING ${this.f}`;

    this.speak(`Coordinates: x: ${this.x}, y: ${this.y}, f: ${this.f}`);

    term.table(this.visualTable, {
      hasBorder: true ,
      borderChars: 'lightRounded' ,
      borderAttr: { color: 'yellow' } ,
      width: 100,
      height: 30,
      expandToWidth: true,
    });
  }

  speak(dialogue: string, type: string = 'info'): void {
    if (type === 'error') {
      console.log(chalk.red(dialogue));
    } else {
      console.log(chalk.yellow(dialogue));
    }
  }

  greet(): void {
    this.speak('Hi! I\'m WALL-E\n');
    this.speak('Available commands:\n');
    this.speak('PLACE x,y,direction\nLEFT\nRIGHT\nMOVE\nREPORT\n');
    this.speak('Available directions:\n');
    this.speak(DIRECTIONS.join('\n'));
  }
}

export default ToyRobot;
