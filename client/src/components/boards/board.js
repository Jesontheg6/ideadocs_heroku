import React, { useState } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { debounce } from 'lodash';

import { put } from '../utils/headers';
import IdeasContainer from '../ideas/index';
import toast from '../../constants/toast';

const Board = ({ slug, title, id }) => {
    const [boardTitle, setTitle] = useState(title);
    const [editMode, setEditMode] = useState(false);

    const renameTitile = () => {
        put(`/boards/${slug}`, { title: boardTitle })
            .then(res => toast('success', 'board renamed'))
            .catch(error => toast('error', error))
    };

    const handleTitleChange = e => {
        setTitle(e.target.value);
        debounce(() => { renameTitile() }, 500, { trailing: true })
    }

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            setTitle(e.target.value);
            setEditMode(false);
            renameTitile();
        }
    };

    return (
        <div className="title">
            <ActionCableConsumer
                channel={{ channel: `board_channel_${id}`, id }}
                onReceived={response => setTitle(response.title)} />
            {editMode ?
                <input
                    defaultValue={boardTitle}
                    onChange={handleTitleChange}
                    onBlur={() => setEditMode(false)}
                    onKeyDown={handleKey}
                    style={{ width: "100%", height: "30px", fontSize: "30px" }}
                    onClick={() => setEditMode(true)}
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
