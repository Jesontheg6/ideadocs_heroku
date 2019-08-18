import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { TwitterPicker } from 'react-color'

import { put } from '../utils/headers';
import toast from '../../constants/toast';

class Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.idea.title,
      body: props.idea.body,
      prevProps: Object.assign({}, props.idea),
      color: props.idea.color,
      showModal: false,
    }
    this.ref = React.createRef();
  }

  handleSave = e => {
    e.preventDefault();
    const {
      boardSlug,
      idea,
    } = this.props;

    const {
      title,
      body,
      color,
    } = this.state;

    put(`/boards/${boardSlug}/ideas/${idea.id}`,
      {
        title,
        body,
        color,
      }
    )
      .then(response => { toast('success', 'updated item') })
      .catch(error => { toast('error', error) });
    this.onToggleModal();
  };

  handleDelete = () => this.props.onDelete(this.props.idea.id);

  handleclick = () => this.props.onClick();

  handleReceivedIdeaEvent = idea => {
    const {
      title,
      body,
      color,
    } = idea;

    const { prevProps } = this.state;

    if (title !== prevProps.title) {
      this.setState({ title })
    } else if (body !== prevProps.body) {
      this.setState({ body });
    } else {
      this.setState({ color });
    }
  };

  onToggleModal = () => this.setState(prevState => ({ showModal: !prevState.showModal }));

  render() {
    const { idea } = this.props;
    const {
      title,
      body,
      color,
      showModal,
    } = this.state;
    return (<React.Fragment>
      <div
        className="tile"
        onClick={() => this.onToggleModal()}
        ref={this.ref}
        style={{ background: color }} >
        <ActionCableConsumer
          channel={{ channel: 'IdeasChannel', id: idea.id }}
          onReceived={this.handleReceivedIdeaEvent}>
          <span className="delete-button" onClick={this.handleDelete}>x</span>
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>{title.toUpperCase(0)}</div>
          <div style={{ fontSize: "14px" }}>{body}</div>
        </ActionCableConsumer>
      </div>
      <Modal show={showModal} onHide={this.onToggleModal}>
        <Form onSubmit={this.handleSave}>
          <Modal.Header>
            <Modal.Title>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Body</Form.Label>
              <Form.Control
                type="text"
                name="body"
                value={body}
                onChange={e => this.setState({ body: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Color</Form.Label>
              <TwitterPicker
                className="colorpicker"
                onChangeComplete={(color, e) => this.setState({ color: color.hex })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={this.onToggleModal}>
              Close
            </Button>
            <Button variant="outline-primary" type="submit" >
              Save Idea
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </React.Fragment>
    )
  };
}

export default Idea;
