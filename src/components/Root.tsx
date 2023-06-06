import React, { Dispatch, useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import "regenerator-runtime/runtime";

import PrivateRoute from "../routes/PrivateRoute";
import { AppState } from "../redux/reducers";
import { RedirectActionTypes, REDIRECTED } from "../redux/types/redirectTypes";
import { createFileVistor } from "../redux/asyncActions/fileAsyncActions";
import { createNewProjectVistior } from "../redux/asyncActions/projectAsyncActions";
import { isMobile } from 'react-device-detect';



import App from "./app/App";
import About from "./app/About";
import AuthIcon from "./auth/AuthIcon";
import Project from "./project/Project";
import ProjectOverview from "./project_overview/ProjectOverview";
import EmptyProject from "./project/EmptyProject";
import Error from "./Error";
import Terms from "./app/Terms";
import Poster from "./app/Poster";
import Header from "./app/Header";
import Footer from "./app/Footer";

export default function Root(props) {
  const { isLoggedIn } = useSelector((state: AppState) => state.auth);
  const [makeLogin, setMakeLogIn] = React.useState(false);
  const location = useLocation();

  // Redux redirection
  const history = useHistory();
  const dispatch = useDispatch<Dispatch<RedirectActionTypes>>();
  const redirect = useSelector((state: AppState) => state.redirect);
  const addProjectFile = (pdf: File) => {
    dispatch(
      createNewProjectVistior("Unbenannt", (id) => {
        dispatch(createFileVistor(id, pdf));
      })
    );
  };
  useEffect(() => {
    if (redirect.url) {
      dispatch({
        type: REDIRECTED,
      });
      history.push(redirect.url);
    }
  }, [redirect, history]);

  return (
    <Box flexDirection="column" display="flex" position="relative" style={location.pathname == "/new-project" ? { height: "100%" } : {}}>
      { }
      <Header />
      <Box
        flexGrow={1}
        style={{
          minHeight: "0",
          overflowX: "hidden",
        }}
      >
        {isMobile ? <Dialog aria-labelledby="customized-dialog-title" open={true}>
          <DialogTitle id="alert-dialog-title">
            Welcome!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              CosmoNote is a Desktop Web Application and currently not working on mobile devices. Please visit us on a PC
            </DialogContentText>
          </DialogContent>

        </Dialog> :
          <Switch>
            <Route exact path="/">
              <App loginCallback={setMakeLogIn} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/poster">
              <Poster />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
            <PrivateRoute path="/projects">
              <ProjectOverview />
            </PrivateRoute>
            <Route path="/new-project">
              <EmptyProject addFile={addProjectFile} />
            </Route>

            <PrivateRoute
              exact
              path="/project/:id/:urlFileId?"
              children={<Project />}
            />
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        }
      </Box>
      {location.pathname.includes("/project/") ? null : <Footer />}
    </Box>
  );
}
