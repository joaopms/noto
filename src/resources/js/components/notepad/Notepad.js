import React, { Component } from 'react';
import BaseBlock from './BaseBlock';
import Extensions from './extensions/Extensions';

export default class Notepad extends Component {
    render() {
        const blocks = this.props.data.map(block => {
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
                {blocks}
            </div>
        );
    }
}
