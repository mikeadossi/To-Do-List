import React from 'react';
import TodosList from './todos-list';

const todos = [
  {
    task: 'make React tutorial',
    isCompleted: false
  },
  {
    task: 'eat dinner',
    isCompleted: true
  }
];

export default class App extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      todos: todos
    };
  }
  render(){
    return(
      <div>
          <h1>Terrific Thrasher Todos App</h1>
          <TodosList todos={this.state.todos} />
      </div>
    );
  }
}
