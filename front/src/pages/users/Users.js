import React, { Component } from 'react';
import { Card, Table, Modal } from 'antd';

import UserRegister from '../../components/user-register/UserRegister';

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = { visible: false }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render = () => {
        const columns = [{
            title: 'Nome',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="javascript:;">Delete</a>
                </span>
            ),
        }];

        const data = [{
            key: '1',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '2',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '3',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        },
        {
            key: '4',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '5',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '6',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '7',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '8',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '9',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '10',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '11',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '12',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '13',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '14',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }, {
            key: '15',
            name: 'John Brown',
            email: 'leo.jaimesson@gmail.com',
        }];

        return (
            <Card
                title="Usuários"
                type="inner"
                extra={<a href="#" onClick={this.showModal}>Adicionar</a>}
            >
                <Modal
                    title="Cadastrar Usuário"
                    visible={this.state.visible}
                    okText={"Cadastrar"}
                    onCancel={this.handleCancel}
                >
                    <UserRegister/>
                </Modal>
                <Table columns={columns} dataSource={data} scroll={window.innerWidth <= 500 ? { x: 500 } : undefined} />
            </Card>
        );
    }
}