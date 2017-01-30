import React from 'react'
import TodosList from './todos-list'
import CreateTodo from './create-todo'

export default class App extends React.Component{
  constructor(props) {
    super(props)

    this.state = { todos: [] }
  }

  componentDidMount() {
    fetch( 'http://localhost:3000/api/terrific_thrasher2' )
      .then( result => result.json() )
      .then( json => this.setState({ todos: json.data }) )
  }

  render() {
    const { todos } = this.state

    return(
      <div>
        <h1>Terrific Thrasher Todos App</h1>
        <CreateTodo todos={todos} createTask={this.createTask.bind(this)} />
        <TodosList todos={todos}
          toggleTask={this.toggleTask.bind(this)}
          saveTask={this.saveTask.bind(this)}
          deleteTask={this.deleteTask.bind(this)} />
      </div>
    )
  }

  toggleTask(task) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === task)
    foundTodo.isCompleted = !foundTodo.isCompleted
    this.setState({ todos: this.state.todos })
  }

  createTask(task) {
    var currentTodo = {
      task,
      isCompleted: false
    }
    let { todos }  = this.state
    todos = [...todos, currentTodo]
    // this.state.todos.push( currentTodo )

    this.setState({ todos: todos })

    var request = new Request('http://localhost:3000/api/terrific_thrasher2', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(currentTodo)
    })

    // xmlhttprequest()

    fetch(request)
      // .then(res => res.json())
  }

  saveTask(oldTask, newTask) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask)
    foundTodo.task = newTask
    this.setState({ todos: this.state.todos })
  }

  deleteTask(id) {
    console.log(id)
    let { todos } = this.state
    console.log(todos)
    var index = -1
    while(index<todos.length) {
      index++
      if(todos[index].id == id) {break}
    }
    console.log(index,todos.length)
    if(index<todos.length){
      todos.splice(index,1)
      todos = [...todos]
    }
    console.log(todos.length)
    this.setState({ todos: todos })

    let request = new Request('http://localhost:3000/api/terrific_thrasher2', {
      method: 'DELETE',
      mode: 'cors',
      headers: new Headers({'Content-Type': 'application/json'}),
    })

    let deleteString = 'http://localhost:3000/api/terrific_thrasher2'
    deleteString += `/${id}`
    console.log('prerequest')
    fetch(deleteString, request)
  }

}
