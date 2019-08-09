import React, { Component } from 'react'

import { get } from '../utils/headers';
import Board from './board';


class BoardTitle extends Component {
  state = {
    boards: []
  };

  componentDidMount() {
    get('/boards')
      .then(response => {
        this.setState({
          boards: response.data.boards,
        })
      })
      .catch(error => console.error(error))
  };

  renderBoards = () => {
    return this.state.boards.map(board => {
      return <Board id={board.slug} key={board.slug} title={board.title} onChange={this.props.onChange} />
    })
  }

  render() {
    return (
      <div className="title-container">
        <div className="title">
          {this.renderBoards()}
        </div>
      </div>
    )
  }
};

export default BoardTitle
