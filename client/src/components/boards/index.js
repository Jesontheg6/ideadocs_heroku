import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Modal, Form } from 'react-bootstrap';

import { get, post } from '../utils/headers';
import Board from './board';
import toast from '../../constants/toast';
import { authorize } from '../../utils/session';


const BoardTitle = () => {

  const [slug, setSlug] = useState('');
  const [bId, setId] = useState('');
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState('');
  const [showBoard, setShowBoard] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = () => {
    get('/boards')
      .then(response => setBoards(response.data.boards))
      .catch(error => toast('error', error));
  }

  const showIdeas = (slug, title, id) => {
    setShowBoard(true);
    setSlug(slug);
    setTitle(title);
    setId(id);
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleShowAdd = () => {
    setShowModal(true);
  }

  const handleSave = e => {
    e.preventDefault();
    const title = e.target.newBoard.value;
    post('/boards', { title })
      .then(res => { toast('success', title + ' board added'); getBoards(); })
      .catch(error => { toast('error', error) });
    handleClose();
  }

  const renderBoards = () => {
    return boards.map(board => {
      return <Card className="board-card" key={board.slug}>
        <Card.Body>
          <Card.Title>{board.title.toUpperCase()}</Card.Title>
          <Card.Text>
            Probably include board description to go here
          </Card.Text>
          <Button variant="outline-dark" onClick={() => showIdeas(board.slug, board.title, board.id)}>View Board</Button>
        </Card.Body>
      </Card>
    })
  };
  return (
    <Container className="boards">
      {showBoard ?
        <Board slug={slug} title={title} id={bId} />
        :
        renderBoards()
      }
      {!showBoard && <button className="newButton board-card" onClick={handleShowAdd} >+</button>}
      <Modal show={showModal} onHide={handleClose}>
        <Form onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title>Add Board</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control type="text" name="newBoard" placeholder="Enter new board title" required />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
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
};

export default authorize(BoardTitle);
