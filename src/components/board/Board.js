import React, { Component } from 'react';

import './Board.css';

export default class Board extends Component {

    render() {
        return (
            <div className="board" style={{height: this.props.height, width: this.props.width }}>
                {this.props.children}
            </div>
        );
    }
}