import React, { Component } from 'react'
import { put } from '../utils/headers';


class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.idea.title,
      body: props.idea.body,
      color: props.idea.color,
      prevProps:  Object.assign({}, props.idea)
    }
  }

  changeBackground= (color) => {
    this.setState(
      {color},
      () => { this.updateIdea({ ...this.state, color: color }) }
    )

  }

  handleInput = (e) => {
  	this.setState({
      [e.target.name]: e.target.value
    })
  }

  updateIdea = ({ color, body, title, force = false }) => {
    const prevColor = this.state.prevProps.color
    const prevTitle = this.state.prevProps.title
    const prevBody = this.state.prevProps.body

    console.log(`prevColor: ${prevColor} color: ${color}`)
    if (color !== prevColor || body !== prevBody || title !== prevTitle) {
      put(
        `/boards/${this.props.boardSlug}/ideas/${this.props.idea.id}`,
        {
          title: title,
          body: body,
          color: color
        }
      )
      .then(response => this.props.updateIdea(response.data))
      .catch(error => console.warn(error))
    }

    this.props.closeBox()
  }

  handleDelete = () => {
    this.props.onDelete(this.props.idea.id)
  }

  handleClick = () => {this.props.onClick(this.props.idea.id)}

  render() {
  	return(
  		<div
        className="tile"
        onClick={this.props.onClick}
        style={{background: this.state.color}}
      >
  		  <span className="deleteButton" onClick={() => this.handleDelete()}> x </span>
        <form onBlur={() => this.updateIdea(this.state)}>
    			<input
            style={{ fontSize: "16px", fontWeight: "bold" }}
            className='input'
            type="text"
            name="title"
            placeholder='Enter a Title'
    			  value={this.state.title || ""}
            onChange={this.handleInput}
    			  ref={this.props.titleRef}
            onClick={this.handleColor && this.handleClick}
            autoComplete="off"
          />

    			<textarea
            style={{fontSize: "14px"}}
            className='input'
            name="body"
            placeholder='Describe your idea'
    			  value={this.state.body || ""}
            onChange={this.handleInput}
            onClick={this.handleClick}
          ></textarea>
  		  </form>
  		</div>
  	)
  }
}

export default Idea
