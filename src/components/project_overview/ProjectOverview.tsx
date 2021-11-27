import {
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItem,
  ListItemText,
  TextField,
  ListItemIcon,
  List,
  Typography,
  Box,
} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import AddIcon from "@material-ui/icons/Add";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AppState } from "../../redux/reducers";
import {
  loadProjects,
  createNewProject,
} from "../../redux/asyncActions/projectAsyncActions";

export default React.memo(() => {
  const projects = useSelector((state: AppState) => state.projects);
  const dispatch = useDispatch();

  const newProject = (name: string) => {
    dispatch(createNewProject(name));
  };

  // Load projects
  useEffect(() => {
    dispatch(loadProjects());
  }, []);

  const [isNewProjectOpen, setNewProjectOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={isNewProjectOpen}
        onClose={() => setNewProjectOpen(false)}
      >
        <Box m={1}>
          <DialogTitle>New Project</DialogTitle>
          <DialogContent>
            <Box style={{ display: "flex" }} m={0}>
              <TextField
                label="Project name"
                onChange={(e) => {
                  setNewProjectName(e.target.value);
                }}
              />
              <DialogActions
                disableSpacing={true}
                style={{ marginLeft: "auto" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    newProject(newProjectName);
                    setNewProjectOpen(false);
                  }}
                >
                  Create
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>

      <Box my={7} style={{ minHeight: "70vh" }}>
        <Container fixed style={{ marginTop: 120 }}>
          <Typography
            variant="h3"
            align="center"
            color="textPrimary"
            style={{ fontWeight: "bold" }}
          >
            Projects
          </Typography>
          <Button onClick={() => setNewProjectOpen(true)}>
            <AddIcon color="primary" /> New project{" "}
          </Button>
          <Box>
            <List>
              {Object.keys(projects).map((uuid) => (
                <ProjectListItem
                  key={uuid}
                  uuid={uuid}
                  name={projects[uuid].name}
                />
              ))}
            </List>
          </Box>
        </Container>
      </Box>
    </>
  );
});

const ProjectListItem = React.memo(
  React.forwardRef(({ uuid, name }: { uuid: string; name: string }, ref) => {
    const CustomLink = React.forwardRef((props: any, iref) => (
      <Link to={`/project/${uuid}`} {...props} ref={iref} />
    ));

    return (
      <li>
        <ListItem button component={CustomLink} ref={ref}>
          <ListItemIcon>
            <DescriptionIcon color="primary" />
          </ListItemIcon>
          {/* This seem to align the icons and the text but god damn material ui just center things */}
          <ListItemText disableTypography={true}>
            <p style={{ fontFamily: "Sans serif" }}>{name}</p>
          </ListItemText>
        </ListItem>
      </li>
    );
  })
);
