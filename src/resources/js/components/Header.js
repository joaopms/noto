import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { SYNC_STATUS } from '../redux/constants';

import { clearData } from '../redux/actions/noto';

function mapStateToProps(state) {
    const isSyncing = state.noto.sync.status === SYNC_STATUS.SYNCING;
    const lastSyncTime = state.noto.sync.syncEnd ? moment(state.noto.sync.syncEnd).format("LTS") : "Never";
    const lastSyncDisplay = state.noto.sync.syncEnd ? moment(state.noto.sync.syncEnd).calendar() : "Never";
    const needsSync = state.noto.sync.pendingActions.length > 0 || state.noto.sync.syncingActions.length > 0;

    return {
        isSyncing,
        lastSyncTime,
        lastSyncDisplay,
        needsSync
    }
}

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        // TODO Check if syncing is needed
        this.props.clearData();
        localStorage.clear();
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <span className="navbar-brand">Noto</span>

                <span title={"Time of sync: " + this.props.lastSyncTime}>{
                    this.props.isSyncing ?
                        "Syncing..." :
                        "Last sync: " + this.props.lastSyncDisplay + (this.props.needsSync ? "*" : "")
                }
                </span>

                <button className="btn btn-outline-light btn-sm" onClick={this.handleLogout}>Logout</button>
            </nav>
        );
    }
}

export default connect(
    mapStateToProps,
    { clearData }
)(Header);
