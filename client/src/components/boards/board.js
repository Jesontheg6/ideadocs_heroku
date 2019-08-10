import React, { useState } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { debounce } from 'lodash';

import { put } from '../utils/headers';
import IdeasContainer from '../ideas/index';
import toast from '../../constants/toast';

const Board = ({ slug, title }) => {
    const [boardTitle, setTitle] = useState(title);
    const [editMode, setEditMode] = useState(false);

    const renameTitile = () => {
        put(`/boards/${slug}`, { title: boardTitle })
            .then(res => toast('success', 'board renamed'))
            .catch(error => toast('error', error))
    };

    const handleTitleChange = e => {
        e.preventDefault();
        setTitle(e.target.value);
        debounce(() => { renameTitile() }, 500, { trailing: true })
    }

    const handleKey = (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            setTitle(e.target.value);
            setEditMode(false);
            renameTitile();
        }
    };

    const handleBoardEvents = ({ event, board }) => {
        switch (event) {
            case 'updated':
                setTitle(board.title);
                break;
            default:
                toast('warn', 'unhandled event type');
                console.warn('Unhandled event type');
        }
    };

    return (
        <div className="title">
            <ActionCableConsumer
                channel={{ channel: "BoardsChannel" }}
                onReceived={handleBoardEvents} />
            {editMode ?
                <input
                    defaultValue={boardTitle}
                    onChange={handleTitleChange}
                    onBlur={() => setEditMode(false)}
                    onKeyDown={handleKey}
                    style={{ width: "100%", height: "30px", fontSize: "30px" }}
                    // onClick={changeTitle}
                />
     :
                <div className="titlediv" align="center">
                    <h1 className="boardtitle" onClick={() => setEditMode(true)}>{boardTitle}</h1>
                </div>
            }
            <IdeasContainer slug={slug} />
        </div>
    )
};

export default Board;
