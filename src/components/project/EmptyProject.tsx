import React, { useState, useRef } from 'react';
import { Paper } from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';

import './EmptyProject.css';

export default function EmptyProject({ addFile }: { addFile: (name: string, file: Int8Array) => void }) {

    const dragEvent = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        (async () => {
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                addFile(e.dataTransfer.files[i].name, new Int8Array(await e.dataTransfer.files[i].arrayBuffer()));
            }
        })();

    };

    const inputEvent = () => {
        (async () => {
            for (let i = 0; i < fileInputRef.current.files.length; i++) {
                addFile(fileInputRef.current.files[i].name, new Int8Array(await fileInputRef.current.files[i].arrayBuffer()));
            }
        })();
    };

    const [isDropping, setIsDropping] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const fileInputRef = useRef(null);

    return (
        <div className="projectUploadScreen" onDrop={dragEvent}
            onDragOver={(e) => { e.preventDefault(); setIsDropping(() => true); }} onDragLeave={() => setIsDropping(() => false)}>

            <input hidden type="file" accept=".pdf" ref={fileInputRef} onChange={inputEvent} />

            <Paper onClick={() => fileInputRef.current.click()} elevation={isDropping ? 6 : (isHovering ? 4 : 2)} className="projectUploadDialog"
                onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>

                <BackupIcon style={{ display: 'block', fontSize: 120, margin: '0 auto 0 auto' }} />
                <p>Add a file to the project.</p>
                <i style={{ color: 'grey' }}>Supported filetypes: pdf</i>
            </Paper>
        </div>);
}