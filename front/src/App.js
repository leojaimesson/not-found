import React, { Component } from 'react';

import Base from './pages/base/Base';

import General from './pages/general/General';

export default class App extends Component {

    render() {
        return (
            <Base>
                <General />
            </Base>
        );
    }
}