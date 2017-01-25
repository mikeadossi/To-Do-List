import React from 'react';
import TodosListHeader from './todos-list-header';
import _ from 'lodash';
import TodosListItem from './todos-list-item';

export default class TodosList extends React.Component{
  renderItems() {

    const props = _.omit(this.props, 'todos');

    return _.map(
      this.props.todos,
      (todos, index) => <TodosListItem key= {index} {...todos} {...props} /> 
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
