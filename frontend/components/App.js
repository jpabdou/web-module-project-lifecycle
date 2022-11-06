import axios from 'axios';
import React from 'react'
import TodoList from './TodoList';
import Form from './Form';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(){
    console.log("constructed")
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

  componentDidMount(){
    console.log("mounted")
    this.getTodos()

  }

  render() {
    console.log("rendered")
    return(
      <div>
      <TodoList todos={this.state.todos} state={this.state} todoCheck={this.todoCheck}/>
      <Form state={this.state} setPending={this.setPending} submit={this.submitTodo} hide={this.hideCompleted}/>
      </div>

    )
  }
}
