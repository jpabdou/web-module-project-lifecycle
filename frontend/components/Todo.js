import React from 'react'

export default class Todo extends React.Component {
  render() {
    return(
      <div onClick={()=>this.props.check(this.props.id, this.props.status)}>
        <p>{this.props.name} {this.props.status ? "X" : null}</p>
      </div>
    )
  }
}
