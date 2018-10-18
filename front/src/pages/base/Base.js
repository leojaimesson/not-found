import React, { Component } from 'react';
import { Layout, Menu, Icon, Drawer } from 'antd';

import 'antd/lib/layout/style/index.css';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/icon/style/index.css';
import 'antd/lib/drawer/style/index.css';

const { Header, Content } = Layout;

export default class Base extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
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
            <Layout style={{position: 'relative'}}>
                <Drawer
                    title="Basic Drawer"
                    placement={this.state.placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    style={{ padding: '0px' }}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        inlineCollapsed={this.state.collapsed}>
                        <Menu.Item key="1">
                            <span>Visão Geral</span>
                        </Menu.Item>
                    </Menu>
                </Drawer>
                <Header style={{ background: '#fff' }}>
                    <Icon
                        className="trigger"
                        type="menu-fold"
                        onClick={this.showDrawer}
                    />
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                    {this.props.children}
                </Content>
            </Layout>
        );
    }
}