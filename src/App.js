import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './Routes';

import 'antd/es/grid/style/index.css';
import 'antd/es/button/style/index.css';
import 'antd/es/form/style/index.css';
import 'antd/es/select/style/index.css';
import 'antd/es/input-number/style/index.css';
import 'antd/es/input/style/index.css';
import 'antd/es/date-picker/style/index.css';
import 'antd/es/divider/style/index.css';
import 'antd/es/layout/style/index.css';
import 'antd/es/icon/style/index.css';
import 'antd/es/drawer/style/index.css';
import 'antd/es/table/style/index.css';
import 'antd/es/modal/style/index.css';
import 'antd/es/checkbox/style/index.css';
import 'antd/es/tag/style/index.css';
import 'antd/es/menu/style/index.css';
import 'antd/es/pagination/style/index.css';
import 'antd/es/dropdown/style/index.css';
// import 'antd/es/style/index.css'

import './theme/index.css';
import './App.css';

export default class App extends Component {
    render = () => (
        <Routes />
    );
}