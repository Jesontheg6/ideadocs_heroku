import React, { Component } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { debounce } from 'lodash';

import { put } from '../utils/headers';
import IdeasContainer from '../ideas/index';


class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            editMode: false,
            id: props.id
        }
    }

    editTitle = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    };

    handleTitleChange = e => {
        this.setState({
            title: e.target.value,
        })
        debounce(() => {
            put(`/boards/${this.state.id}`,
                { title: this.state.title }
            ).then(res => { this.props.onChange("Board renamed") }).catch(error => console.error(error))
        }, 500, { trailing: true })
    }

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
        const {
            onChange,
            id,
        } = this.props;
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
                            onChange={this.handleTitleChange}
                            onBlur={e => console.log(e.target.value)}
                            onKeyDown={this.handleKey}
                            style={{ width: "100%", height: "30px", fontSize: "30px" }}
                            onClick={this.changeTitle}
                        />
                        :
                        <div className="titlediv" align="center">
                            <h1 className="boardtitle" onClick={this.editTitle}>{this.state.title}</h1>
                        </div>
                }
                <IdeasContainer onChange={onChange} slug={id}/>
            </div>
        )
    }
};

export default Board
