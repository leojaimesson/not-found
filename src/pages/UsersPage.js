import React from 'react';
import { Table, Modal, Row, Col, Button, Form, Input } from 'antd';

import UserClient from '../api/UserClient';
import DataList from '../helpers/DataList';

const FormItem = Form.Item;


class UsersPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.userClient = new UserClient('https://betatcc.herokuapp.com/users');
        this.state = {
            confirmDirty: false,
            modalVisible: false,
            visibleModalExcluir: false,
            users: []
        };
    }

    async componentWillMount() {
        const response = await this.userClient.getAll();
        this.setState({
            users: DataList.toUsersListData(response.data),
        });
    }

    modalExcluir(idUser) {
        Modal.error({
            title: 'Deseja realmente excluir este usuário?',
            cancelText: 'Cancelar',
            okCancel: true,
            okText: 'Excluir',
            onOk: async () => {
                const response = await this.userClient.remove(idUser);
                this.setState({
                    users: this.state.users.filter((user) => user.key !== response.data._id)
                })
            }
        });
    }

    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    }

    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const user = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password
                };
                const response = await this.userClient.save(user);
                this.setState({
                    users: [{ key: response.data._id, name: response.data.firstName, email: response.data.email }, ...this.state.users]
                })
                this.setState({
                    modalVisible: false,
                });
                this.props.form.resetFields();
            }
        });
    }

    handleCancel = (e) => {
        this.setState({
            modalVisible: false,
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('As duas senhas precisam ser iguais!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render = () => {

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            },
        };

        const columns = [{
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            width: 300,

        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 500,
        }, {
            title: 'Ação',
            key: 'action',
            render: (text, record) => (
                <Button type='danger' icon="delete" onClick={this.modalExcluir.bind(this, text.key)}></Button>
            ),
        }];

        return (
            <>  
                <Row type="flex" justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
                    <Col><Button type="primary" shape="circle" icon="plus" size="large" style={{height: '50px', width: '50px', position: 'fixed', bottom: '50px', right: '10px', zIndex:"999"}}onClick={this.showModal}></Button></Col>
                </Row>
                <Modal
                    title="Cadastrar Usuário"
                    visible={this.state.modalVisible}
                    okText={"Cadastrar"}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem {...formItemLayout} label="Primeiro nome">
                            {getFieldDecorator('firstName', {
                                rules: [{
                                    required: true, message: 'Por favor digite o primeiro nome do usuário',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="Último nome">
                            {getFieldDecorator('lastName', {
                                rules: [{
                                    required: true, message: 'Por favor digite o segundo nome do usuário',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="E-mail">
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'Por favor digite um E-mail valido!',
                                }, {
                                    required: true, message: 'Por favor digite o E-mail do usuário!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Password">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Por favor digite sua senha!',
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="Confirm Password">
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Por favor confirme sua senha!',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur} />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
                <Table columns={columns} bordered dataSource={this.state.users} scroll={window.innerWidth <= 600 ? { x: 800 } : undefined} style={{ background: "white" }} />
            </>
        );
    }
}

export default Form.create()(UsersPage);