import React, { Component } from 'react';
import { debounce } from 'lodash';
import { ActionCableConsumer } from 'react-actioncable-provider';

import { put } from '../utils/headers';
import toast from '../../constants/toast';

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.idea.title,
      body: props.idea.body,
      prevProps: Object.assign({}, props.idea),
      color: props.idea.color,
    }
    this.ref = React.createRef();
  }

  // changeBackground = color => {
  //   setColor(color);
  //   updateIdea(color);
  // }

  updateApi = () => {
    const {
      boardSlug,
      idea,
    } = this.props;

    const {
      title,
      body,
      color,
    } = this.state;

    debounce(() => put(`/boards/${boardSlug}/ideas/${idea.id}`,
      {
        title,
        body,
        color,
      }
    )
      .then(response => { toast('success', 'updated item') })
      .catch(error => { toast('error', error) }), 1000, { trailing: true })
  };

  // updateIdea = (force = false) => {
  //   if (color !== prevProps.color || body !== prevProps.body || title !== prevProps.title || force) {
  //     updateApi();
  //   }
  //   props.closeBox();
  // }

  handleDelete = () => this.props.onDelete(this.props.idea.id);

  handleclick = () => this.props.onClick();

  handleReceivedIdeaEvent = idea => {
    const {
      title,
      body,
    } = idea;

    const { prevProps } = this.state;

    if (title !== prevProps.title) {
      this.setState({ title })
    } else if (body !== prevProps.body) {
      this.setState({ body });
    }
  };

  render() {
    const { idea } = this.props;
    const {
      title,
      body,
      color,
    } = this.state;
    return (<div
      className="tile"
      onClick={this.handleClick}
      ref={this.ref}
      style={{ background: color }} >
      <ActionCableConsumer
        channel={{ channel: 'IdeasChannel', id: idea.id }}
        onReceived={this.handleReceivedIdeaEvent}>
        <span className="deletebutton" onClick={this.handleDelete}>x</span>
        <form>
          <input
            style={{ fontSize: "16px", fontWeight: "bold" }}
            className='input'
            type="text"
            name="title"
            placeholder='enter a title'
            value={title || ""}
            onChange={e => this.setState({ title: e.target.value })}
            onClick={this.handleClick}
            autoComplete="off"
          />

          <textarea
            style={{ fontSize: "14px" }}
            className='input'
            name="body"
            placeholder='Describe your idea'
            value={body || ""}
            onChange={e => this.setState({ body: e.target.value })}
            onClick={this.handleClick}
          >{body}</textarea>
        </form>
      </ActionCableConsumer>
    </div>
    )
  };
}

export default Idea;
