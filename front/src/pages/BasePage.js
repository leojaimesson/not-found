import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Layout, Icon, Drawer, Row, Col } from 'antd';

const { Header, Content, Sider, Footer } = Layout;

export default class BasePage extends Component {

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

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            placement: 'left',
        };
    }

    render = () => (
        <Layout style={{ height: '100%', overflow: 'auto' }}>
            <Drawer
                title={<span style={{
                    fontWeight: 'bolder',
                    fontSize: '1.5em',
                    color: '#618833'
                }}>NotFound</span>}
                placement={this.state.placement}
                onClose={this.onClose}
                visible={this.state.visible}
                style={{ padding: "24px 0px" }}
            >
                {this.props.menu}
            </Drawer>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                width={250}
                onBreakpoint={(broken) => { console.log(broken); }}
                onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                style={{ background: '#fff' }}
            >
                <div className="logo">NotFound</div>
                {this.props.menu}
            </Sider>
            <Layout>
                <Header style={{ background: '#8bc34a', padding: "0px 14px" }}>
                    <Row type="flex" justify="space-between" align="middle" style={{ height: '100%' }}>
                        <Col className="hide"><Icon className="trigger" type="menu-fold" onClick={this.showDrawer} /></Col>
                        <Col><h2 style={{margin: '0px'}}>{this.props.titlePage}</h2></Col>
                        <Col><Row type="flex" justify="space-between" align="middle" style={{ height: '100%' }}>
                            {/* <span style={{ margin: '0px 2px 0px 8px' }}>Sair</span> */}
                        </Row>
                        </Col>
                    </Row>
                </Header>
                <Content style={{ padding: '20px 14px 45px 14px', boxSizing: 'border-box', height: '100%', overflow: 'auto' }}>
                    {this.props.content}
                </Content>
                <Footer style={{ textAlign: 'center', bottom: '0px', width: '100%', background: '#618833', padding: '10px ' }}>
                    NotFound ©2018 Created by Leo Jaimesson
                </Footer>
            </Layout>
        </Layout>
    );
}

BasePage.propTypes = {
    menu: PropTypes.node,
    content: PropTypes.node
}