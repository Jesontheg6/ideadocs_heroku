import React, { Component } from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'

import { get, put } from '../utils/headers';


class BoardTitle extends Component {
  state = {
    title: "",
    editMode: false,
    id: null
  };

  componentDidMount() {
    get('/boards')
      .then(response => {
        const title = response.data[0].boardtitle;
        this.setState({
          boards: response.data,
          title: !title ? "DEFAULT TITLE" : title,
          id: response.data[0].id
        })
      })
      .catch(error => console.error(error))
  };

  editTitle = (title) => {
    this.setState({
      editMode: !this.state.editMode
    })
  };

  unFocus = (event) => {
    this.setState({
      editMode: false,
      title: event.target.value ? event.target.value : "DEFAULT TITLE"
    });

    put(
      `/api/v1/boards/${this.state.id}`,
      {
        board: {
          boardtitle: event.target.value
        }
      }
    )
      .then(res => {
      })
      .catch(error => console.error(error))
  };

  handleKey = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        title: e.target.value ? e.target.value : "DEFAULT TITLE",
        editMode: false
      });
      put(
        `/api/v1/boards/${this.state.id}`,
        {
          board: {
            boardtitle: e.target.value
          }
        }
      )
      .then(res => this.props.onChange("Board renamed"))
      .catch(error => console.error(error))
    }
  };

  handleBoardEvents = ({ event, board }) => {
    switch (event) {
      case 'updated':
        this.setState({ title: board.boardtitle });
        break;
      default:
        console.warn("Unhandled event type")
    }
  };

  render() {
    return (
      <div className="title-container">
        <div className="title">
          <ActionCableConsumer
            channel={{ channel: "BoardsChannel" }}
            onReceived={this.handleBoardEvents}
          />
          {
            this.state.editMode ?
              <input
                defaultValue={this.state.title}
                onBlur={this.unFocus}
                onKeyDown={this.handleKey}
                style={{ width: "100%", height: "30px", fontSize: "30px" }}
                onClick={this.changeTitle}
              />
              :
              <div className="titlediv" align="center">
                <h1 className="boardtitle" onClick={this.editTitle}>{this.state.title}</h1>
              </div>
          }
        </div>
      </div>
    )
  }
};

export default BoardTitle
