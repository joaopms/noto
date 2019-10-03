import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { clearData } from '../redux/actions/noto';

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.clearData();
        localStorage.clear();
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">Noto</Link>

                <button className="btn btn-outline-light btn-sm" onClick={this.handleLogout}>Logout</button>
            </nav>
        );
    }
}

export default connect(
    null,
    { clearData }
)(Header);
