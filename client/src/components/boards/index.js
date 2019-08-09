import React, { Component } from 'react';
import { Card, Button, Container, Modal, Form } from 'react-bootstrap';

import { get, post } from '../utils/headers';
import Board from './board';


class BoardTitle extends Component {
  state = {
    boards: [],
    slug: '',
    title: '',
    showBoard: false,
    showModal: false,
  };

  componentDidMount() {
    this.getBoards();
  };

  getBoards = () => {
    get('/boards')
      .then(response => {
        this.setState({
          boards: response.data.boards,
        })
      })
      .catch(error => console.error(error))
  }

  showIdeas = (slug, title) => {
    this.setState({
      showBoard: true,
      slug,
      title,
    });
  }

  handleClose = () => {
    this.setState({ showModal: false });
  }

  handleShowAdd = () => {
    this.setState({ showModal: true });
  }

  handleSave = e => {
    e.preventDefault();
    post('/boards', { title: e.target.newBoard.value })
      .then(res => { this.props.onChange('Added board!'); this.getBoards(); })
      .catch(error => { console.log(error) });
    this.handleClose();
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
      showModal,
    } = this.state;
    const { onChange } = this.props;
    return (
      <Container className="boards">
        {showBoard ?
          <Board id={slug} title={title} onChange={onChange} />
          :
          this.renderBoards()
        }
        {!showBoard && <button className="newButton board-card" onClick={this.handleShowAdd} >+</button>}
        <Modal show={showModal} onHide={this.handleClose}>
          <Form onSubmit={this.handleSave}>
            <Modal.Header closeButton>
              <Modal.Title>Add Board</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control type="text" name="newBoard" placeholder="Enter new board title" required />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={this.handleClose}>
                Close
            </Button>
              <Button variant="outline-primary" type="submit" >
                Save Board
            </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    )
  }
};

export default BoardTitle
