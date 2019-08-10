import React, { useState, useEffect } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import update from 'immutability-helper';

import Idea from './idea';
import Color from '../utils/color';
import { get, post, del } from '../utils/headers';
import toast from '../../constants/toast';

const IdeasContainer = ({ slug }) => {
  const [ideas, setIdeas] = useState([]);
  const [selected, setSelected] = useState('');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const url = `/boards/${slug}/ideas`;

  let references = new Map()
  let title = null

  useEffect(() => {
    get(url)
      .then(response => setIdeas(response.data.ideas))
      .catch(error => toast('error', error));
  }, []); /* eslint-disable-line */

  const handleReceivedIdeaEvent = ({ event, idea }) => {
    switch (event) {
      case 'created':
        const currentIds = ideas.map(i => i.id)
        const isIdeaNotRendered = !currentIds.includes(idea.id)
        if (isIdeaNotRendered) {
          setIdeas(update(ideas, { $push: [idea] }));
        }
        break;
      case 'updated':
        const index = ideas.map(i => i.id).indexOf(idea.id)
        const returnIdeas = update(ideas, { [index]: { $set: idea } })
        return { returnIdeas };
      case 'deleted':
        const ideasDeleted = ideas.filter((item) => item.id !== idea.id)
        return { ideasDeleted };
      default:
        toast('warn', 'unhandeled event type');
        console.warn("Unhandled event type");
    }
  }

  const addNewIdea = () => {
    post(url, { title: '', body: '', color: '' })
      .then(response => {
        const currentIds = ideas.map(i => i.id)
        const isIdeaNotRendered = !currentIds.includes(response.data.idea.id)
        if (isIdeaNotRendered) {
          setIdeas(update(ideas, { $push: [response.data] }));
          selectIdea(response.data.id, true);
        }
      })
      .catch(error => toast('error', error));
  }

  const deleteIdea = id => {
    del(url + '/' + id)
      .then(response => {
        const ideaIndex = ideas.findIndex(x => x.id === id)
        setIdeas(update(ideas, { $splice: [[ideaIndex, 1]] }));
      })
      .catch(error => toast('error', error));
  }

  // color
  const selectIdea = (ideaId, enforceFocus = false) => {
    let selectedRef = references.get(ideaId);
    setSelected(selectedRef);
    setDisplayColorPicker(true);
    if (enforceFocus) title.focus();
  }

  const closeBox = () => {
    setTimeout(() => {
      setDisplayColorPicker(false);
    }, 200);
  }

  const renderIdeas = ideas.map((idea) => {
    return (
      <Idea
        closeBox={closeBox}
        className="tile"
        idea={idea}
        key={`${idea.id}-${idea.updated_at}`}
        titleRef={input => title = input}
        onDelete={deleteIdea}
        // onChangeComplete={handleChangeComplete}
        ref={c => references.set(idea.id, c)}
        onClick={selectIdea}
        boardSlug={slug}
      />
    )
  });

  return (
    <div className="App-header">
      <ActionCableConsumer
        channel={{ channel: 'IdeasChannel' }}
        onReceived={handleReceivedIdeaEvent} />

      <div className="main-div">
        <div className="newideabtn-div"></div>
        <div className="color-div">
          {/* <div onClick={handleUnselect} /> */}
          <Color
            className="color-div"
            selected={selected}
            displayColorPicker={displayColorPicker} />
        </div>
        <div className="pretty-div"></div>
      </div>
      <div>
        {renderIdeas()}
      </div>
      <button className="newButton newIdeaButton" onClick={addNewIdea}>+</button>
    </div>
  )
};

export default IdeasContainer;
