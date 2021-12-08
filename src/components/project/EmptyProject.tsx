import React, { useState, useRef } from "react";
import { Paper } from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";

import "./EmptyProject.css";
import { useDispatch, useSelector } from "react-redux";


export default function EmptyProject({
  addFile,
}: {
  addFile: (file: File) => void;
}) {
  const loader = useSelector((state: any) => state.ui.loading);

  const dragEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    (async () => {
      const newFiles: File[] = [];
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        newFiles.push(e.dataTransfer.files[i]);
      }

      newFiles.forEach((file) => {
        addFile(file);
      });
    })();
  };

  const inputEvent = () => {
    (async () => {
      const newFiles: File[] = [];
      for (let i = 0; i < fileInputRef.current.files.length; i++) {
        newFiles.push(fileInputRef.current.files[i]);
      }

      newFiles.forEach((file) => {
        addFile(file);
      });
    })();
  };

  const [isDropping, setIsDropping] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef(null);
  if (loader) {
    return (
      <div
        className="projectUploadScreen custom_spacing d-flex">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>

        <Paper
          className="projectUploadDialog padding_top"
        >
          <p>One moment please</p>
          <i style={{ color: "grey" }}>your file is being uploaded</i>
        </Paper>
      </div>
    )
  }
  return (
    <div
      className="projectUploadScreen custom_spacing"
      onDrop={dragEvent}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDropping(() => true);
      }}
      onDragLeave={() => setIsDropping(() => false)}
    >
      <input
        hidden
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={inputEvent}
      />

      <Paper
        onClick={() => fileInputRef.current.click()}
        elevation={isDropping ? 6 : isHovering ? 4 : 2}
        className="projectUploadDialog"
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <BackupIcon
          style={{ display: "block", fontSize: 120, margin: "0 auto 0 auto" }}
        />
        <p>Add a file to the project.</p>
        <i style={{ color: "grey" }}>Supported filetypes: pdf</i>
      </Paper>
    </div>
  );
}
