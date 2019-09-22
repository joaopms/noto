import React, { Component } from 'react';

export default class BaseBlock extends Component {
    render() {
        const wrappedChildren = React.Children.map(this.props.children, extension => {
            return (
                <div className="col" >{extension}</div>
            );
        });

        return (
            <div className="block row no-gutters">
                <div className="block__options">
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-secondary">
                            {/* Add button */}
                            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                        </button>
                        <button type="button" class="btn btn-secondary">
                            {/* More options button */}
                            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path></svg>
                        </button>
                    </div>
                </div>
                {wrappedChildren}
            </div>
        );
    }
}
