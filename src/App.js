import React from 'react';
import './App.css';
import Snake from './components/snake'
import Food from './components/food'

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  while(x % 4 !== 0 || y % 4 !== 0) {
    x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  }
  return [x,y]
}

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      food: getRandomCoordinates(),
      speed: 200,
      direction: 'RIGHT',
      body: [
        [0,0],
        [4,0], 
        [8,0]
      ]
    };
  }
  
  componentDidMount() {
    window.onkeydown = this.handleKeyPress;
    let speed = this.state.speed;
    setInterval(this.moveSnake, speed);
  }

  componentDidUpdate() {
    this.checkFood();
    this.checkBoundary();
    this.eatItself();
  }

  eatItself = () => {
    let snake = this.state.body;
    let head = snake[snake.length - 1];
    for(let i=0; i<snake.length - 1; i++) {
      if(head[0] == snake[i][0] && head[1] == snake[i][1]) {
        this.gameOver();
    }
  }
  }

  checkBoundary = () => {
    let snake = this.state.body;
    let head = snake[snake.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) 
      this.gameOver();
  }

  gameOver = () => {
    alert(`Game over! \nFinal score is: ${this.state.body.length - 3}.`);
    this.setState(
      {
        food: getRandomCoordinates(),
        speed: 200,
        direction: 'RIGHT',
        body: [
          [0,0],
          [4,0], 
          [8,0]
        ]
      }
    );
  }

  checkFood = () => {
    let snake = this.state.body;
    let head = snake[snake.length - 1];
    let food = this.state.food;
    if(head[0] === food[0] && head[1] === food[1] ) {
      this.setState({food: getRandomCoordinates()})
      this.increaseSize();
      this.increaseSpeed();
    }
  }

  increaseSize = () => {
    let snake = this.state.body;
    snake.unshift([]);
    this.setState({body: snake})
  }


  increaseSpeed = () => {
    if (this.state.speed > 10) {
      this.setState({speed: this.state.speed - 10})
    }
  }

  moveSnake = () => {
    let snake = this.state.body;
    let head = snake[snake.length - 1];
    switch(this.state.direction) {
      case 'RIGHT':
                    head = [head[0] + 4, head[1]];
                    break;
      case 'LEFT': 
                    head = [head[0] - 4, head[1]];
                    break;
      case 'UP':  
                    head = [head[0], head[1] - 4];
                    break;
      case 'DOWN': 
                    head = [head[0], head[1] + 4];
                    break;
    }
    snake.push(head);
    snake.shift();
    this.setState({body: snake});
  }

  handleKeyPress = (event) => {
    event = event || window.event;
    switch(event.keyCode) {
      case 38: 
              this.setState({direction: 'UP'});
              break;
      case 40: 
              this.setState({direction: 'DOWN'});
              break;
      case 37: 
              this.setState({direction: 'LEFT'});
              break;
      case 39: 
              this.setState({direction: 'RIGHT'});
              break;
    }
  }

  render() {
    const snake = this.state.body.map(val => <Snake coorX={val[0]} coorY={val[1]} />)
    return (
      <div className="container">
        {snake}
        <Food coorX={this.state.food[0]} coorY={this.state.food[1]} />
      </div>
    )
  }  
}