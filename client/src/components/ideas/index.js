import React, { Component } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import update from 'immutability-helper';

import Idea from './idea';
import Color from '../utils/color';
import { get, post, del } from '../utils/headers';

class IdeasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      selected: null,
      displayColorPicker: false,
      url: `/boards/${props.slug}/ideas`,
    }
  }

  references = new Map()
  title = null

  componentDidMount() {
    get(this.state.url)
      .then(response => { this.setState({ ideas: response.data.ideas }) })
      .catch(error => console.warn(error))
  }

  handleReceivedIdeaEvent = ({ event, idea }) => {
    switch (event) {
      case 'created':
        this.setState(prevState => {
          const currentIds = prevState.ideas.map(i => i.id)
          const isIdeaNotRendered = !currentIds.includes(idea.id)

          if (isIdeaNotRendered) {
            const ideas = update(this.state.ideas, { $push: [idea] })
            this.setState({ ideas })
          }
        })
        break
      case 'updated':
        this.setState(prevState => {
          const index = prevState.ideas.map(i => i.id).indexOf(idea.id)
          const ideas = update(prevState.ideas, { [index]: { $set: idea } })
          return { ideas }
        })
        break
      case 'deleted':
        this.setState(prevState => {
          const ideas = prevState.ideas.filter((item) => item.id !== idea.id)

          return { ideas }
        })
        break
      default:
        console.warn("Unhandled event type")
    }
  }

  addNewIdea = () => {
    post(
      this.state.url,
      { title: '', body: '', color: '' }
    )
      .then(response => {
        const currentIds = this.state.ideas.map(i => i.id)
        const isIdeaNotRendered = !currentIds.includes(response.data.id)

        if (isIdeaNotRendered) {
          const ideas = update(this.state.ideas, { $push: [response.data] })
          this.setState(
            { ideas: ideas },
            () => this.selected(response.data.id, true)
          )
        }
      })
      .catch(error => console.error(error))
  }

  updateIdea = (idea) => {
    this.props.onChange("All changes saved");
  }

  deleteIdea = id => {
    del(this.state.url + '/' + id)
      .then(response => {
        const ideaIndex = this.state.ideas.findIndex(x => x.id === id)
        const ideas = update(this.state.ideas, { $splice: [[ideaIndex, 1]] })
        this.setState({ ideas: ideas })
      })
      .catch(error => console.log(error))
  }

  // color

  selected(ideaId, enforceFocus = false) {
    let selectedRef = this.references.get(ideaId)
    this.setState(
      {
        selected: selectedRef,
        displayColorPicker: true,
      },
      () => enforceFocus ? this.title.focus() : null

    )
  }

  closeBox = () => {
    setTimeout(() => {
      this.setState({ displayColorPicker: false })
    }, 200);
  }

  render() {
    const ideas = this.state.ideas.map((idea) => {
      return (
        <Idea
          closeBox={this.closeBox}
          className="tile"
          idea={idea}
          key={`${idea.id}-${idea.updated_at}`}
          updateIdea={this.updateIdea}
          titleRef={input => this.title = input}
          onDelete={this.deleteIdea}
          onChangeComplete={this.handleChangeComplete}
          ref={c => this.references.set(idea.id, c)}
          onClick={() => { this.selected(idea.id) }}
          boardSlug={this.props.slug}
        />
      )
    })

    return (
      <div className="App-header">
        <ActionCableConsumer
          channel={{ channel: 'IdeasChannel' }}
          onReceived={this.handleReceivedIdeaEvent}
        />

        <div className="main-div">
          <div className="newideabtn-div"></div>

          <div className="color-div">
            <div onClick={this.handleUnselect} />

            <Color
              className="color-div"
              selected={this.state.selected}
              displayColorPicker={this.state.displayColorPicker}
            />
          </div>

          <div className="pretty-div"></div>
        </div>

        <div>
          {ideas}
        </div>

        <button className="newButton newIdeaButton" onClick={() => this.addNewIdea()}>+</button>
      </div>
    )
  }
}

export default IdeasContainer
