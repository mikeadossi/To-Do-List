import React from 'react';
import TodosListHeader from './todos-list-header';
import _ from 'lodash';
import TodosListItem from './todos-list-item';

export default class TodosList extends React.Component{
  renderItems() {
    return _.map(
      this.props.todos,
      (todos, index) => <TodosListItem key= {index} {...todos} /> // Our spread operator here helps us access: task={todo.task} isCompleted={todo.isCompleted}
    );
  }

  render(){

    return(
      <table>
          <TodosListHeader />
          
          <tbody>
            {this.renderItems()}
          </tbody>
      </table>
    );
  }
}
