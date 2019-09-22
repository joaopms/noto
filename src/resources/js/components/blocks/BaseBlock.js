import React, { Component } from 'react';

export default class BaseBlock extends Component {
    render() {
        const wrappedChildren = React.Children.map(this.props.children, extension => {
            return (
                <div className="col">
                    {extension}
                </div>
            );
        });

        return (
            <div className="row no-gutters">
                {wrappedChildren}
            </div>
        );
    }
}
