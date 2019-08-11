import React, { useState } from 'react';
import { debounce } from 'lodash';
import { ActionCableConsumer } from 'react-actioncable-provider';

import { put } from '../utils/headers';
import toast from '../../constants/toast';

const Idea = React.forwardRef((props, ref) => {
  const [title, setTitle] = useState(props.idea.title);
  const [body, setBody] = useState(props.idea.body);
  // const [color, setColor] = useState('');
  const color = null;

  const prevProps = Object.assign({}, props.idea);

  // const changeBackground = color => {
  //   setColor(color);
  //   updateIdea(color);
  // }

  const handleInput = e => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        updateApi();
        break;
      case 'body':
        setBody(e.target.value);
        updateApi();
        break;
      default:
        break;
    }
  }
  const updateApi = debounce(() => {
    put(`/boards/${props.boardSlug}/ideas/${props.idea.id}`,
      {
        title,
        body,
        color,
      }
    )
      .then(response => { toast('success', 'updated item') })
      .catch(error => { toast('error', error) });
  }, 1000, { trailing: true });

  // const updateIdea = (force = false) => {
  //   if (color !== prevProps.color || body !== prevProps.body || title !== prevProps.title || force) {
  //     updateApi();
  //   }
  //   props.closeBox();
  // }

  const handleDelete = () => props.onDelete(props.idea.id);

  const handleClick = () => props.onClick();

  const handleReceivedIdeaEvent = idea => {
    console.log(idea);
    if (idea.title !== prevProps.title) {
      setTitle(idea.title);
    } else if (idea.body !== prevProps.body) {
      setBody(idea.body);
    }
  };

  return (
    <div
      className="tile"
      onClick={handleClick}
      ref={ref}
      style={{ background: color }} >
      <ActionCableConsumer
        channel={{ channel: 'IdeasChannel', id: props.idea.id }}
        onReceived={handleReceivedIdeaEvent} />
      <span className="deleteButton" onClick={handleDelete}>x</span>
      <form>
        <input
          style={{ fontSize: "16px", fontWeight: "bold" }}
          className='input'
          type="text"
          name="title"
          placeholder='Enter a Title'
          value={title || ""}
          onChange={handleInput}
          onClick={handleClick}
          autoComplete="off"
        />

        <textarea
          style={{ fontSize: "14px" }}
          className='input'
          name="body"
          placeholder='Describe your idea'
          value={body || ""}
          onChange={handleInput}
          onClick={handleClick}
        ></textarea>
      </form>
    </div>
  )
});

export default Idea;
