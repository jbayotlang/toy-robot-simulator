import process from 'process';
import ToyRobot from './toyRobot';

const toyRobot = new ToyRobot();
const stdin = process.openStdin();

stdin.addListener('data', (data) => {
  let input = data.toString().trim().toUpperCase();

  if (input === '') {
    return;
  }

  input = input.split(' ');

  if (input.length > 1) {
    const coordinates: string = input[1];
    const [x, y, f] = coordinates.split(',');
    toyRobot.place({
      x: parseInt(x),
      y: parseInt(y),
      f,
    });
  } else {

    if (!toyRobot.hasInitiated) {
      toyRobot.speak('Please put me in the table first', 'error');
      return;
    }

    switch(input[0]) {
      case 'LEFT':
      case 'RIGHT':
        toyRobot.face(input[0]);
        break;
      case 'MOVE':
        toyRobot.move();
        break;
      case 'REPORT':
        toyRobot.report();
        break;
      default:
        toyRobot.speak('I\'m not sure, I understand', 'error');
        break;
    }
  }
});
