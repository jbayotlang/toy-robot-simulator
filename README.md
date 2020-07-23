# Toy Robot Simulator NodeJS (CLI application)

Written in Typescript. Node version used for this application is v12.6.3

## Installation

1. Run `npm i` to install dependencies
2. Run `npm start` to run application

## Available Commands
- PLACE x,y,direction
- MOVE
- LEFT
- RIGHT
- REPORT - This will output the coordinates of the toy robot, plus a simple visual representation using `terminal-kit`

## Available Directions
- NORTH
- EAST
- SOUTH
- WEST

## Sample Commands with different scenarios
> Normal Flow
```
PLACE 0,0,NORTH
MOVE
REPORT
```

> The application should discard all commands in the sequence until a valid PLACE command has been executed.
```
MOVE
REPORT
```
ToyRobot will say "*Please put me in the table first*"

>The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot.
```
PLACE 5,5,NORTH
```

ToyRobot will say "*You can't put me there, there's no surface*"
> Any move that would cause the robot to fall must be ignored.

 ```
PLACE 0,4,NORTH
MOVE
```
Result: *I can't go there!*

> Invalid commands
```
PLACE 0,0,NORTH
UNKNOWN_COMMAND
```
ToyRobot will says "*I'm not sure, I understand*"

> Invalid direction
```
PLACE 0,0,NORTH_SOUTH
```
ToyRobot will say "*Available directions are NORTH, EAST, SOUTH, WEST*"

