import {
    Container, Button, Dialog, DialogTitle, DialogContent, DialogActions, ListItem, ListItemText,
    TextField, ListItemIcon, List, Typography, Box
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import React, { Dispatch, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { AppState } from '../../redux/reducers';
import { ProjectsActionTypes } from '../../redux/types/projectsTypes';
import { createNewProject } from '../../redux/actions/projectsActions';

export default React.memo(() => {
    const history = useHistory();

    const projects = useSelector((state: AppState) => state.projects);
    const projectDispatch = useDispatch<Dispatch<ProjectsActionTypes>>();

    const newProject = (name: string) => {
        const project = createNewProject(name);
        projectDispatch(project);
        history.push(`/project/${project.payload.uuid}`);
    };

    const [isNewProjectOpen, setNewProjectOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const newProjectFormRef = useRef<HTMLFormElement>(null);

    return (
        <>
            <Dialog fullWidth={true} maxWidth="sm" open={isNewProjectOpen} onClose={() => setNewProjectOpen(false)}>
                <Box m={1}>
                    <DialogTitle>New Project</DialogTitle>
                    <DialogContent>
                        <Box style={{ display: 'flex' }} m={0}>
                            <form ref={newProjectFormRef} onSubmit={(e) => {
                                e.preventDefault();
                                newProject(newProjectName);
                            }}>
                                <TextField label="Project name" value={newProjectName} onChange={e => { setNewProjectName(e.target.value); }} />
                            </form>
                            <DialogActions disableSpacing={true} style={{ marginLeft: 'auto' }}>
                                <Button variant="contained" color="primary" onClick={() => newProject(newProjectName)}>Create</Button>
                            </DialogActions>
                        </Box>
                    </DialogContent>
                </Box>
            </Dialog>

            <Box my={7}  >
                <Container fixed>
                    <Typography variant="h3" align="center" color="textPrimary" style={{ fontWeight: 'bold' }}>Projects</Typography>
                    <Button onClick={() => setNewProjectOpen(true)}><AddIcon color="primary" /> New project </Button>
                    <Box>
                        <List>
                            {Object.keys(projects).map((uuid) => <ProjectListItem key={uuid} uuid={uuid} name={projects[uuid].name} />)}
                        </List>
                    </Box>
                </Container>
            </Box>
        </>
    );
});

const ProjectListItem = React.memo(({ uuid, name }: { uuid: string, name: string }) => {
    const CustomLink = (props: any) => <Link to={`/project/${uuid}`} {...props} />;

    return (
        <ListItem button component={CustomLink}>
            <ListItemIcon ><DescriptionIcon color="primary" /></ListItemIcon>
            {/* This seem to alighn the icons and the text but god damn material ui just center things */}
            <ListItemText disableTypography={true}><p style={{ fontFamily: 'Sans serif' }}>{name}</p></ListItemText>
        </ListItem>
    );
});