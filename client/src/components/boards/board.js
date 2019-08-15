import React, { useState, useEffect } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { withRouter } from 'react-router-dom';
import { Form, Modal, Button } from 'react-bootstrap';

import { put, get, del } from '../utils/headers';
import IdeasContainer from '../ideas/index';
import toast from '../../constants/toast';
import * as ROUTES from '../../constants/routes';

const Board = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [slug, setSlug] = useState(props.match.params.slug)

  useEffect(() => {
    get(`/boards/${slug}`)
      .then(res => {
        setTitle(res.data.board.title);
        setId(res.data.board.id);
      })
      .catch(err => {
        toast('error', err);
        props.history.push(ROUTES.BOARDS);
      });
  }, [slug, props.history]);

  const renameTitile = e => {
    e.preventDefault();
    put(`/boards/${slug}`, { title: title })
      .then(res => toast('success', 'board renamed'))
      .catch(error => toast('error', error));
    setEditMode(false);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  }

  const handleKey = e => {
    if (e.key === 'Enter') {
      setTitle(e.target.value);
      setEditMode(false);
    }
  };
  const handleDelete = () => {
    del(`/boards/${slug}`)
      .then(res => toast('success', 'board deleted'))
      .catch(err => toast('error', err));
    props.history.push(ROUTES.BOARDS)
  };

  const recieveTitle = (board) => {
    setTitle(board.title);
    setSlug(board.slug);
  }

  return (
    <div className="title">
      <Button variant="link" onClick={() => props.history.push(ROUTES.BOARDS)}>Back to Boards</Button>
      <ActionCableConsumer
        channel={{ channel: 'BoardsChannel', id: id }}
        onReceived={recieveTitle}>
        <div className="titlediv" align="center">
          <h1 className="title" onClick={() => setEditMode(true)}>{title}</h1>
        </div>
      </ActionCableConsumer>
      <IdeasContainer slug={slug} />
      <Modal show={editMode} onHide={() => setEditMode(false)}>
        <Form onSubmit={renameTitile}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Board</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              name="title"
              defaultValue={title}
              onChange={handleTitleChange}
              onKeyPress={handleKey}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setEditMode(false)}>
              Close
            </Button>
            <Button variant="outline-danger" onClick={handleDelete} >
              Delete
            </Button>
            <Button variant="outline-primary" type="submit" >
              Edit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
};

export default withRouter(Board);
