import React, { useState, useEffect } from 'react';
import update from 'immutability-helper';

import Idea from './idea';
import Color from '../utils/color';
import { get, post, del } from '../utils/headers';
import toast from '../../constants/toast';

const IdeasContainer = ({ slug }) => {
  const [ideas, setIdeas] = useState([]);
  // const [selected, setSelected] = useState('');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const url = `/boards/${slug}/ideas`;
  const ideaRef = React.createRef();
  let title = null

  useEffect(() => {
    get(url)
      .then(response => setIdeas(response.data.ideas))
      .catch(error => toast('error', error));
  }, []); /* eslint-disable-line */

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
  const selectIdea = (enforceFocus = false) => {
    // setSelected(ideaRef);
    setDisplayColorPicker(true);
    if (enforceFocus) title.focus();
  }

  const closeBox = () => {
    setTimeout(() => {
      setDisplayColorPicker(false);
    }, 1000);
  }

  const renderIdeas = () => {
    return ideas.map((idea) => {
      return (
        <Idea
          closeBox={closeBox}
          className="tile"
          idea={idea}
          key={`${idea.id}-${idea.updated_at}`}
          titleRef={input => title = input}
          onDelete={deleteIdea}
          // onChangeComplete={handleChangeComplete}
          ref={ideaRef}
          onClick={selectIdea}
          boardSlug={slug}
        />
      )
    })
  };

  return (
    <div className="App-header">
      <div className="main-div">
        <div className="newideabtn-div"></div>
        <div className="color-div">
          {/* <div onClick={handleUnselect} /> */}
          <Color
            className="color-div"
            selected={selectIdea}
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
