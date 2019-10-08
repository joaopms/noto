import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { clearData, clearPendingActions } from '../redux/actions/noto';

function mapStateToProps(state) {
    const pendingActions = state.noto.pendingActions;

    return {
        pendingActions
    }
}

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleSync = this.handleSync.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleSync() {
        // TODO Handle this better: save the transactions, clear them and sync them. Also handle errors
        axios.post('/api/sync', this.props.pendingActions)
            .then(response => console.log(response))
            .then(error => console.error(error));
        this.props.clearPendingActions();
    }

    handleLogout() {
        this.props.clearData();
        localStorage.clear();
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">Noto</Link>

                <button className="btn btn-outline-light btn-sm" onClick={this.handleSync}>Sync</button>
                <button className="btn btn-outline-light btn-sm" onClick={this.handleLogout}>Logout</button>
            </nav>
        );
    }
}

export default connect(
    mapStateToProps,
    { clearData, clearPendingActions }
)(Header);
