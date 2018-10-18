import React, { Component } from 'react';

import { Layout, Icon, Drawer, Avatar } from 'antd';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import General from './pages/general/General';

import 'antd/lib/layout/style/index.css';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/icon/style/index.css';
import 'antd/lib/drawer/style/index.css';
import 'antd/lib/avatar/style/index.css';
import './App.css';

const { Header, Content } = Layout;

const Teste = () => (
    <div>
        <h2>teste</h2>
    </div>
);

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            placement: 'left',
        };
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <Router>

                <Layout style={{ height: '100%', overflow: 'auto' }}>
                    <Drawer
                        title="Basic Drawer"
                        placement={this.state.placement}
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}>

                        <p><Link to="/">Visão Geral</Link></p>
                        <p><Link to="/teste">Teste</Link></p>

                    </Drawer>
                    <Header className="header">
                        <Icon
                            className="trigger"
                            type="menu-fold"
                            onClick={this.showDrawer}
                        />
                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                    </Header>
                    <Content style={{ padding: '20px 14px', boxSizing: 'border-box' }}>
                        <Route exact path="/" component={General} />
                        <Route exact path="/teste" component={Teste} />
                        <br />
                    </Content>
                </Layout>
            </Router>
        );
    }
}