import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setUserData } from '../../redux/actions/noto';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'meh@meh.meh',
            password: '12345678',
            errors: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(ev) {
        ev.preventDefault();

        try {
            var response = await axios.post('/api/login', {
                email: this.state.email,
                password: this.state.password
            });

            var { data } = response;
            this.setState({ errors: [] });
            this.props.setUserData(data);

            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            var { data } = error.response;
            this.setState({
                errors: data.errors
            });
        }
    }

    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h1>Noto</h1>
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" name="email" id="inputEmail" className={'form-control ' + (this.state.errors.email ? 'is-invalid' : '')} placeholder="Email address" value={this.state.email} onChange={this.handleChange} required autoFocus />
                    <div className="invalid-feedback">{this.state.errors.email ? this.state.errors.email[0] : ''}</div>

                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" name="password" id="inputPassword" className={'form-control ' + (this.state.errors.email ? 'is-invalid' : '')} placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                    <div className="invalid-feedback">{this.state.errors.password ? this.state.errors.password[0] : ''}</div>

                    <button className="btn btn-primary btn-block" type="submit">Log in</button>
                </form>
            </div>
        );
    }
}

export default connect(
    null,
    { setUserData }
)(Login);
