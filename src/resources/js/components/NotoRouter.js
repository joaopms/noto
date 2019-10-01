import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from './auth/Login';

import Header from './Header';
import NotepadList from './notepad/NotepadList';
import NotepadPageList from './notepad/pages/NotepadPageList';
import NotepadPage from './notepad/pages/NotepadPage';

function mapStateToProps(state, ownProps) {
    return {
        loggedIn: state.noto.loggedIn
    }
}

class NotoRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login">
                        {/* Redirect to the main page if the user is logged in */}
                        {this.props.loggedIn ? <Redirect to='/' /> : ''}

                        <Login />
                    </Route>

                    <Route path="/">
                        {/* Redirect to the login page if the user is not logged in */}
                        {!this.props.loggedIn ? <Redirect to='/login' /> : ''}

                        <Header />

                        <Route exact path="/" component={NotepadList} />
                        <Route exact path="/notepad/:notepadId" component={NotepadPageList} />
                        <Route exact path="/notepad/:notepadId/page/:pageId" component={NotepadPage} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default connect(
    mapStateToProps,
    null
)(NotoRouter)
