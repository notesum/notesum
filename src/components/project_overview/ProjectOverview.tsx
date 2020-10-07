import { Container, Button, Dialog, DialogTitle, DialogContent, DialogActions, ListItem, ListItemText,
    TextField, ListItemIcon, List } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
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
                <DialogTitle>New Project</DialogTitle>
                <DialogContent>
                    <form ref={newProjectFormRef} onSubmit={(e) => {
                        e.preventDefault();
                        newProject(newProjectName);
                    }}>
                        <TextField label="Project name" value={newProjectName} onChange={e => { setNewProjectName(e.target.value); }} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => newProject(newProjectName)} color="primary">Create</Button>
                    <Button onClick={() => setNewProjectOpen(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            <Container fixed>
                <h1>Projects</h1>
                <List>
                    {Object.keys(projects).map((uuid) => <ProjectListItem key={uuid} uuid={uuid} name={projects[uuid].name} />)}
                </List>
                <Button onClick={() => setNewProjectOpen(true)}>New project</Button>
            </Container>
        </>
    );
});

const ProjectListItem = React.memo(({ uuid, name }: { uuid: string, name: string}) => {
    const CustomLink = (props: any) => <Link to={`/project/${uuid}`} {...props} />;

    return (
        <li>
            <ListItem button component={CustomLink}>
                <ListItemIcon><DescriptionIcon /></ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>
        </li>
    );
});