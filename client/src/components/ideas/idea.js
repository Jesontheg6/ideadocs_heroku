import React, { useState } from 'react';

import { put } from '../utils/headers';
import toast from '../../constants/toast';

const Idea = (props) => {
  const [title, setTitle] = useState(props.idea.title);
  const [body, setBody] = useState(props.idea.body);
  // const [color, setColor] = useState('');
  const color = props.idea.color

  const prevProps = Object.assign({}, props.idea);

  // const changeBackground = color => {
  //   setColor(color);
  //   updateIdea(color);
  // }

  const handleInput = e => {
    e.preventDefault();
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'body':
        setBody(e.target.value);
        break;
      default:
        break;
    }
  }

  const updateIdea = (color, force=false) => {
    if (color !== prevProps.color || body !== prevProps.body || title !== prevProps.title || force) {
      put(`/boards/${props.boardSlug}/ideas/${props.idea.id}`,
        {
          title,
          body,
          color,
        }
      )
        .then(response => toast('success', 'updated idea'))
        .catch(error => toast('warn', error));
    }
    props.closeBox();
  }

  const handleDelete = () => props.onDelete(props.idea.id);

  const handleClick = () => props.onClick(props.idea.id);

  return (
    <div
      className="tile"
      onClick={handleClick}
      style={{ background: color }} >
      <span className="deleteButton" onClick={handleDelete}>x</span>
      <form onBlur={updateIdea(color)}>
        <input
          style={{ fontSize: "16px", fontWeight: "bold" }}
          className='input'
          type="text"
          name="title"
          placeholder='Enter a Title'
          value={title || ""}
          onChange={handleInput}
          ref={props.titleRef}
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
};

export default Idea;
