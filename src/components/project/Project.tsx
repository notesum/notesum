import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  InputBase,
  makeStyles,
  Toolbar,
  CircularProgress,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//import { Project } from "../../redux/types/projectTypes";
import { Files } from "../../redux/types/filesTypes";
import {
  createFile,
  createFileVistor,
  loadFiles,
  saveFile,
} from "../../redux/asyncActions/fileAsyncActions";
import { BASE_URL } from "../../redux/asyncActions/ServerSettings";
import {
  setLastOpenFile,
  deleteProject,
} from "../../redux/actions/projectActions";
import { loadProjects } from "../../redux/asyncActions/projectAsyncActions";
import Error from "../Error";
import { AppState } from "../../redux/reducers";
import {loadNotes} from '../../redux/asyncActions/noteAsyncActions';

import EmptyProject from "./EmptyProject";
import DocumentView from "./DocumentView";


const useStyles = makeStyles(() => ({
  name: {
    marginBottom: "-5px",
    width: "auto",
    color: "white",
    fontWeight: "bold",
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function Project() {
  const { isLoggedIn } = useSelector((state: AppState) => state.auth);
  const { id, urlFileId } = useParams<{ id: string; urlFileId?: string }>();
  const project: Project = useSelector((state: any) => state.projects[id]);
  const files: Files = useSelector((state: any) => state.files);
  const dispatch = useDispatch();
  const authToken = useSelector((state: any) => state.auth.token);
  const history = useHistory();


  // Update project & files list
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadProjects());
      dispatch(loadFiles());
      dispatch(loadNotes());
    }
  }, []);

  const currentFile = urlFileId;

  useEffect(() => {
    if (!currentFile && project.files.length > 0) {
      history.push(
        `/project/${id}/${project.lastOpenFile ? project.lastOpenFile : project.files[0]
        }`
      );
    }
  }, [currentFile, project.files]);

  // On unmount, save file
  useEffect(() => {
    return () => {
      if (isLoggedIn) {
        if (currentFile) dispatch(saveFile(currentFile));
      }
    };
  }, [currentFile]);

  // Update last opened file
  useEffect(() => {
    if (currentFile) {
      setFileDrawerOpen(false);
      dispatch(setLastOpenFile(id, currentFile));
    }
  }, [currentFile]);


  const addProjectFile = (pdf: File) => {
    if (isLoggedIn) {
      dispatch(createFile(id, pdf));
    } else {
      dispatch(createFileVistor(id, pdf));
    }
  };

  const [isFileDrawerOpen, setFileDrawerOpen] = useState(false);
  const [isAddFilesModalOpen, setAddFilesModalOpen] = useState(false);
  // const [isBenefitModalOpen, setBenefitModalOpen] = useState(true);
  const classes = useStyles();

  // Project wasn't found, return 404
  if (!project) return <Error />;

  return (
    <div>
      <Drawer
        anchor="left"
        open={isFileDrawerOpen}
        onClose={() => setFileDrawerOpen(false)}
      >
        <List
          component="nav"
          subheader={
            <ListSubheader
              color="primary"
              component="div"
              style={{ fontWeight: "bold" }}
            >
              Project files
            </ListSubheader>
          }
          style={{ minWidth: "300px", maxWidth: "500px" }}
        >
          {project.files.map((fileId: string) => {
            if (!(fileId in files)) return;

            return (
              <ListItem
                key={fileId}
                button
                onClick={() => history.push(`/project/${id}/${fileId}`)}
                selected={`${fileId}` === currentFile}
              >
                <ListItemText primary={files[fileId].title} />
              </ListItem>
            );
          })}
        </List>
        {isLoggedIn && (
          <Button onClick={() => setAddFilesModalOpen(true)}>
            Add new files
          </Button>
        )}

        {isLoggedIn && (
          <Button href="/projects">
            {" "}
            <ArrowBackIcon fontSize="small" color="primary" />
            Back to Projects
          </Button>
        )}
      </Drawer>

      <Dialog
        onClose={() => setAddFilesModalOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={isAddFilesModalOpen}
      >
        <DialogTitle>Add files to your project</DialogTitle>
        <DialogContent dividers>
          <EmptyProject addFile={addProjectFile} />
        </DialogContent>
      </Dialog>

      <Box flexDirection="column" display="flex" height="100%">
        <Box m={0} bgcolor="#0b214a">
          <Toolbar variant="dense" style={{ padding: 0 }}>
            <IconButton onClick={() => setFileDrawerOpen(true)}>
              <MenuIcon style={{ color: "#fff" }} />
            </IconButton>
            <InputBase
              value={project.name}
              className={classes.name}
              onChange={(e) => {
              }}
            />
          </Toolbar>
        </Box>

        <Box
          flexGrow={1}
          style={{
            height: "82vh",
          }}
        >
          {isLoggedIn ? (
            currentFile && currentFile in files ? (
              <>
                <DocumentView
                  pdf={`${BASE_URL}${files[currentFile].pdf}?token=${authToken}`}
                  fileId={currentFile}
                />
              </>
            ) : currentFile || project.files.length > 0 ? (
              <>
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "200px",
                    width: "40px",
                  }}
                >
                  <CircularProgress />
                </div>
              </>
            ) : (
              <>
                <EmptyProject addFile={addProjectFile} />
              </>
            )
          ) : (
            <DocumentView
              pdf={`${BASE_URL}${files[currentFile].pdf}`}
              fileId={currentFile}
            />
          )}
        </Box>
      </Box>
    </div>
  );
}
