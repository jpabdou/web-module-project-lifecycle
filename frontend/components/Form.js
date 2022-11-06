import React from 'react'

export default class Form extends React.Component {
  render() {
    return(
      <div className='todo-form'>
        <form onSubmit={this.props.submit}>
          <input type="text" placeholder="add todo here" value={this.props.state.pending} onChange={this.props.setPending} />
          <button>Submit Todo</button>
        </form>
        <button onClick={this.props.hide}>Hide Completed</button>

      </div>
    )
  }
}
