import React, { Component } from 'react';

import BasePage from './pages/BasePage';
import GeneralPage from './pages/GeneralPage';
import { Icon, Menu } from 'antd';

import 'antd/es/grid/style/index.css';
import 'antd/es/button/style/index.css';
import 'antd/es/form/style/index.css';
import 'antd/es/select/style/index.css';
import 'antd/es/input-number/style/index.css';
// import 'antd/es/input/style/index.css';
// import 'antd/es/date-picker/style/index.css';
import 'antd/es/divider/style/index.css';
import 'antd/es/layout/style/index.css';
import 'antd/es/icon/style/index.css';
// import 'antd/es/drawer/style/index.css';
// import 'antd/es/table/style/index.css';
// import 'antd/es/modal/style/index.css';
// import 'antd/es/checkbox/style/index.css';
// import 'antd/es/tag/style/index.css';
import 'antd/es/menu/style/index.css';
// import 'antd/es/pagination/style/index.css';
// import 'antd/es/dropdown/style/index.css';

// import { Row, Col, Button, Form, Select, InputNumber, Divider } from 'antd';

// import 'antd/dist/antd.css';

import './theme/index.css';
import './App.css';

export default class App extends Component {
    render = () => (
        <BasePage
        menu={
            <Menu mode="inline" style={{ zIndex: '999' }}>
                <Menu.Item key="1">
                    <Icon type="home" />
                    <span className="nav-text">Visão Geral</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="tag" />
                    <span className="nav-text">Tipos de Resíduos Sólidos</span>
                </Menu.Item>
                <Menu.Item key="4">
                    <Icon type="delete" />
                    <span className="nav-text">Coletas</span>
                </Menu.Item>
                <Menu.Item key="5" >
                    <Icon type="line-chart" />
                    <span className="nav-text">Análises</span>
                </Menu.Item>
                <Menu.Item key="6">
                    <Icon type="file-text" />
                    <span className="nav-text">Relatórios</span>
                </Menu.Item>
            </Menu>
        }

        content={
            <GeneralPage/>
        }

        titlePage={"Visão Geral"}
    />
    );
}