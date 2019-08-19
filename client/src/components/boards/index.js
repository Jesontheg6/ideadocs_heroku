import React, { useState, useEffect } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { Card, Button, Container, Modal, Form } from 'react-bootstrap';

import { get, post } from '../utils/headers';
import toast from '../../constants/toast';
import { withAuthorization } from '../../utils/session';


const BoardTitle = ({history}) => {

  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = () => {
    get('/boards')
      .then(response => setBoards(response.data.boards))
      .catch(error => toast('error', error.response.data.error));
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
      .catch(error => { toast('error', error.data.error) });
    handleClose();
  }

  const renderBoardIdeas = ({ slug }) => {
    history.push(`/boards/${slug}`);
  };

  const recieveBoard = (board) => {
    let newBoards = boards.filter(b => b.id !== board.id);
    newBoards.push(board)
    setBoards(newBoards);
  }

  const renderBoards = () => {
    return boards.map(board => {
      return <ActionCableConsumer
        channel={{ channel: 'BoardsChannel', id: board.id }}
        onReceived={recieveBoard}
        key={board.slug}>
        <Card className="board-card" >
          <Card.Body>
            <Card.Title>{board.title.toUpperCase()}</Card.Title>
            <Card.Text>
              Probably include board description to go here
          </Card.Text>
            <Button variant="outline-dark" onClick={() => renderBoardIdeas({ ...board })}>View Board</Button>
          </Card.Body>
        </Card>
      </ActionCableConsumer>
    })
  };

  return (
    <Container className="boards">
      {renderBoards()}
      {<button className="newButton board-card" onClick={handleShowAdd} >+</button>}
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
const condition = authUser => !!authUser;
export default withAuthorization(condition)(BoardTitle);
