import React, { useState, useEffect } from 'react';
import update from 'immutability-helper';

import Idea from './idea';
import { get, post, del } from '../utils/headers';
import toast from '../../constants/toast';

const IdeasContainer = ({ slug }) => {
  const [ideas, setIdeas] = useState([]);
  const url = `/boards/${slug}/ideas`;
  const ideaRef = React.createRef();

  useEffect(() => {
    get(url)
      .then(response => setIdeas(response.data.ideas))
      .catch(error => toast('error', error));
  }, []); /* eslint-disable-line */

  const addNewIdea = () => {
    post(url,
      {
        title: 'Add a title.',
        body: 'Add a description.',
        color: ''
      })
      .then(response => {
        toast('success', 'item added')
        const currentIds = ideas.map(i => i.id)
        const isIdeaNotRendered = !currentIds.includes(response.data.idea.id)
        if (isIdeaNotRendered) {
          setIdeas(update(ideas, { $push: [response.data.idea] }));
        }
      })
      .catch(error => toast('error', error));
  }

  const deleteIdea = id => {
    del(url + '/' + id)
      .then(response => {
        const ideaIndex = ideas.findIndex(x => x.id === id)
        setIdeas(update(ideas, { $splice: [[ideaIndex, 1]] }));
        toast('success', 'item deleted')
      })
      .catch(error => toast('error', error));
  }


  const renderIdeas = () => {
    return ideas.map((idea) => {
      return (
        <Idea
          className="tile"
          idea={idea}
          key={`${idea.id}-${idea.updated_at}`}
          onDelete={deleteIdea}
          ref={ideaRef}
          boardSlug={slug}
        />
      )
    })
  };

  return (
    <div className="App-header">
      {renderIdeas()}
      <button className="newButton newIdeaButton" onClick={addNewIdea}>+</button>
    </div>
  )
};

export default IdeasContainer;
