import React, { Component } from 'react';
import { Table, Modal, Row, Col, Button, Form, Input, Checkbox } from 'antd';

import TypeSolidWastClient from '../api/TypeSolidWastClient';
import DataList from '../helpers/DataList';

const FormItem = Form.Item;


class TypesSolidWastePage extends Component {

    constructor(props) {
        super(props);
        this.typeSolidWastClient = new TypeSolidWastClient('http://localhost:3001/types-solid-waste');
        this.state = {
            confirmDirty: false,
            modalVisible: false,
            visibleModalExcluir: false,
            checkRecyclable: false,
            chckReutilable: false,
            typesSolidWaste: []
        };
    }

    async componentWillMount() {
        const response = await this.typeSolidWastClient.getAll();
        this.setState({
            typesSolidWaste: [],
        });
    }

    modalExcluir(idTypeSolidWast) {
        Modal.error({
            title: 'Deseja realmente excluir este usuário?',
            cancelText: 'Cancelar',
            okCancel: true,
            okText: 'Excluir',
            onOk: async () => {
                const response = await this.typeSolidWastClient.remove(idTypeSolidWast);
                console.log(response)
                this.setState({
                    typesSolidWaste: this.state.typesSolidWaste.filter((typeSolidWast) => typeSolidWast.key !== response.data._id)
                })
            }
        });
        console.log(idTypeSolidWast)
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
                const response = await this.typeSolidWastClient.save(user);
                this.setState({
                    typesSolidWaste: [...this.state.typesSolidWaste, { key: response.data._id, name: response.data.firstName, email: response.data.email }]
                })
            }
            this.setState({
                modalVisible: false,
            });
        });
    }

    handleCancel = (e) => {
        console.log(e);
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

    handleChangeCheckRecyclable = (e) => {
        this.setState({
            checkRecyclable: e.target.checked,
        });
    }

    handleChangeCheckReutilable = (e) => {
        this.setState({
            checkReutilable: e.target.checked,
        });
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

        const formTailLayout = {
            labelCol: { span: 4 },
            wrapperCol: {
                xs: {
                    span: 12, offset: 0
                },
                sm: {
                    span: 12, offset: 7
                }
            }
        }

        const columns = [{
            title: 'Nome',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: 'Ação',
            key: 'action',
            render: (text, record) => (
                <Button type='danger' onClick={this.modalExcluir.bind(this, text.key)}>Excluir</Button>
            ),
        }];

        return (
            <>
                <Row type="flex" justify="space-between" align="middle" style={{ marginBottom: "20px" }}>
                    <Col><h2>Cadastrar Tipo de Residuo Solido</h2></Col>
                    <Col><Button type="primary" onClick={this.showModal}>Adicionar</Button></Col>
                </Row>
                <Modal
                    title="Cadastrar Usuário"
                    visible={this.state.modalVisible}
                    okText={"Cadastrar"}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem {...formItemLayout} label="Nome">
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: 'Por favor digite o nome do tipo de residuo',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="Descrição">
                            {getFieldDecorator('description', {
                                rules: [{
                                    required: true, message: 'Por favor digite a descrição do tipo de residuo',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...formTailLayout}>
                            <Checkbox onClick={this.handleChangeCheckRecyclable}>
                                Reciclável
                            </Checkbox>
                            <Checkbox onClick={this.handleChangeCheckReutilable}>
                                Reutilizável
                            </Checkbox>
                        </FormItem>
                    </Form>
                </Modal>
                <Table columns={columns} dataSource={this.state.typesSolidWaste} scroll={window.innerWidth <= 500 ? { x: 500 } : undefined} style={{ background: "white" }} />
            </>
        );
    }
}

export default Form.create()(TypesSolidWastePage);