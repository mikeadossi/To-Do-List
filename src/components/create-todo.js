import React from 'react';

export default class TodosListItem extends React.Component{
  render(){
    return(
        <form onSubmit={this.handleCreate.bind(this)}>
          <input type="text" placeholder="what do I need to do?" ref="createInput"/>
          <button>Create</button>
        </form>
    );
  }

  handleCreate(event) {
    event.preventDefault();

    const createInput = this.refs.createInput
    const task = createInput.value
    const validateInput = this.validateInput(task);

    this.props.createTask(this.refs.createInput.value);
    this.refs.createInput.value = '';

  }

  validateInput(task) {
    if(!task) {
      return 'Please enter a task.'
    }
    if(_.find(this.props))
  }
}
