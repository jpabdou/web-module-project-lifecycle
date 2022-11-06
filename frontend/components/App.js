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
    axios.post(URL, {name: this.state.pending, completed: false, id: String(Math.random()*10000-1)})
      .then(res=>{
        this.setState({todos: this.state.todos.concat(res.data.data)})
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
        this.state.todos.splice(this.state.todos.findIndex(element=>element.id===id), 1, res.data.data)
        this.setState({todos: this.state.todos})
      })
      .catch(error=>console.log(error))
  }

  componentDidMount(){
    console.log("mounted")
    const getTodos = ()=>{
      axios.get(URL)
      .then(res=>{
        this.setState({todos: res.data.data})})
      .catch(err=>console.log(err))
    }
    getTodos()

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
