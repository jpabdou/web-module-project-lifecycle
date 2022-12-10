import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return(
      <div className='todos'>
      {this.props.todos && this.props.todos.map((todo)=>{
        if (this.props.state.hideComplete) {
            if (todo.completed === false) {
              return(<Todo delete={this.props.delete} check={this.props.todoCheck} id={todo.id} name={todo.name} status={todo.completed} key={todo.id} />)
            }
          } else {
            return(<Todo delete={this.props.delete} check={this.props.todoCheck} id={todo.id} name={todo.name} status={todo.completed} key={todo.id} />)

          }

      })}
      </div>

    )
  }
}
