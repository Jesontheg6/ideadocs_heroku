import React, { Component } from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'

import { put } from '../utils/headers';


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            editMode: false,
            id: this.props.id
        }
    }

    editTitle = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    };
    handleEdit = (title) => {
        this.setState({ title });
    }

    unFocus = (event) => {
        event.preventDefault();
        this.setState({
            editMode: false,
            title: event.target.value,
        });

        put(`/boards/${this.state.id}`,
            { title: this.state.title }
        ).then(res => { this.props.onChange("Board renamed") }).catch(error => console.error(error))
    };

    handleKey = (e) => {
        if (e.key === 'Enter') {
            this.setState({
                title: e.target.value,
                editMode: false
            });
            put(`/boards/${this.state.id}`,
                {
                    title: e.target.value
                })
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
        )
    }
};

export default Board
