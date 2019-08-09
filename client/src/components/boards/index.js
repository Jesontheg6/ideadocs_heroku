import React, { Component } from 'react';
import { Card, Button, Container } from 'react-bootstrap';

import { get } from '../utils/headers';
import Board from './board';


class BoardTitle extends Component {
  state = {
    boards: [],
    slug: '',
    title: '',
    showBoard: false,
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

  showIdeas = (slug, title) => {
    this.setState({
      showBoard: true,
      slug,
      title,
    });
  }

  renderBoards = () => {
    return this.state.boards.map(board => {
      return <Card className="board-card" key={board.slug}>
        <Card.Body>
          <Card.Title>{board.title.toUpperCase()}</Card.Title>
          <Card.Text>
            Probably include board description to go here
          </Card.Text>
          <Button variant="outline-dark" onClick={() => this.showIdeas(board.slug, board.title)}>View Board</Button>
        </Card.Body>
      </Card>
    })
  };

  render() {
    const {
      slug,
      title,
      showBoard,
    } = this.state;
    const { onChange } = this.props;
    return (
      <Container className="boards">
        {showBoard ?
          <Board id={slug} title={title} onChange={onChange} />
          :
          this.renderBoards()
        }
      </Container>
    )
  }
};

export default BoardTitle
