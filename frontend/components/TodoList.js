import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return(
      <div className='todos'>
      {this.props.todos.map((todo)=>{
        if (this.props.state.hideComplete) {
            if (todo.completed === false) {
              return(<Todo check={this.props.todoCheck} id={todo.id} name={todo.name} status={todo.completed} key={todo.id} />)
            }
          } else {
            return(<Todo check={this.props.todoCheck} id={todo.id} name={todo.name} status={todo.completed} key={todo.id} />)

          }

      })}
      </div>

    )
  }
}
