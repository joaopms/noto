import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addBlock } from '../../redux/actions';

import BaseBlock from './BaseBlock';
import Extensions from './extensions/Extensions';

function mapStateToProps(state) {
    return state.notepads[1];
}

class Notepad extends Component {
    constructor(props) {
        super(props);
        this.handleAddBlock = this.handleAddBlock.bind(this);
    }

    handleAddBlock() {
        this.props.addBlock();
    }

    render() {
        const blocks = this.props.blocks.map(block => {
            const extensions = block.extensions.map(extension => {
                const Extension = Extensions[extension.type];
                return (
                    <Extension key={extension.id} {...extension} />
                )
            });

            return (
                <BaseBlock key={block.id}>
                    {extensions}
                </BaseBlock>
            );
        });

        return (
            <div className="notepad">
                <button onClick={this.handleAddBlock}>Add block</button>
                {blocks}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { addBlock }
)(Notepad)
