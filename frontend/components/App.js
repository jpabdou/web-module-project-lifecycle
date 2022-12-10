import axios from 'axios';
import React from 'react'
import TodoList from './TodoList';
import Form from './Form';

const URL = 'https://jpabdou.github.io/web-module-project-lifecycle/api/todos'

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      todos: [],
      pending: "",
      hideComplete: false
    }
  }

  submitTodo = (evt) => {
    evt.preventDefault();
    axios.post(URL, {name: this.state.pending})
      .then(res=>{
         console.log(res)
        this.getTodos()
        this.setState({pending: ""})
      })
  }

  hideCompleted=()=>{
    {this.state.hideComplete ? this.setState({hideComplete: false}) : this.setState({hideComplete: true})}
  }

  setPending =(event)=>{
    this.setState({pending: event.target.value})

  }

  todoCheck = (id, status) => {
    axios.patch(`${URL}/${id}`, {completed: !status})
      .then(res=>{
        this.getTodos()
      })
      .catch(error=>console.log(error))
  }

  getTodos = ()=>{
    axios.get(URL)
    .then(res=>{
      this.setState({...this.state, todos: res.data.data})})
    .catch(err=>console.log(err))
  }

  deleteTodo = (id)=>{
    axios.delete(`${URL}/${id}`)
    .then(res=>{
      console.log(res.data)
      this.setState({...this.state, todos: res.data.todos})
        })
    .catch(err=>{
        console.log(err.response);
    })
}

  componentDidMount(){
    this.getTodos()

  }

  render() {
    return(
      <div>
      <TodoList todos={this.state.todos} state={this.state} todoCheck={this.todoCheck} delete={this.deleteTodo}/>
      <Form state={this.state} setPending={this.setPending} submit={this.submitTodo} hide={this.hideCompleted}/>
      </div>

    )
  }
}
