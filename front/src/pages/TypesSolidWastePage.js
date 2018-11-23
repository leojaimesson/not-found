import React, { Component } from 'react';
import { Table, Modal, Row, Col, Button, Form, Input, Checkbox, Tag } from 'antd';

import TypeSolidWasteClient from '../api/TypeSolidWasteClient';
import DataList from '../helpers/DataList';

const FormItem = Form.Item;


class TypesSolidWastePage extends Component {

    constructor(props) {
        super(props);
        this.typeSolidWasteClient = new TypeSolidWasteClient('http://localhost:3001/types-solid-waste');
        this.state = {
            modalVisible: false,
            visibleModalExcluir: false,
            isRecyclable: false,
            isReutilable: false,
            typesSolidWaste: []
        };
    }

    async componentWillMount() {
        const response = await this.typeSolidWasteClient.getAll();
        this.setState({
            typesSolidWaste: response ? DataList.toTypesSolidWasteData(response.data).reverse() : [],
        });
    }

    modalExcluir(idTypeSolidWaste) {
        Modal.error({
            title: 'Deseja realmente excluir este tipo de residuo?',
            cancelText: 'Cancelar',
            okCancel: true,
            okText: 'Excluir',
            onOk: async () => {
                const response = await this.typeSolidWasteClient.remove(idTypeSolidWaste);
                this.setState({
                    typesSolidWaste: this.state.typesSolidWaste.filter((typeSolidWast) => typeSolidWast.key !== response.data._id)
                })
            }
        });
        console.log(idTypeSolidWaste)
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
                const typeSolidWaste = {
                    name: values.name,
                    description: values.description,
                    recyclable: this.state.isRecyclable,
                    reutilable: this.state.isReutilable,
                    color: values.color
                };
                const response = await this.typeSolidWasteClient.save(typeSolidWaste);
                this.setState({
                    typesSolidWaste: [{ key: response.data._id, name: response.data.name, description: response.data.description, tags: DataList.toTags(response.data) }, ...this.state.typesSolidWaste],
                    modalVisible: false,
                    isRecyclable: false,
                    isReutilable: false,
                })
            }

        });
        this.props.form.resetFields();
    }

    handleCancel = (e) => {
        this.setState({
            modalVisible: false,
            isRecyclable: false,
            isReutilable: false,
        });
    }

    handleChangeCheckRecyclable = (e) => {
        this.setState({
            isRecyclable: e.target.checked,
        });
    }

    handleChangeCheckReutilable = (e) => {
        this.setState({
            isReutilable: e.target.checked,
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

        const columns = [
            {
                title: '',
                dataIndex: 'color',
                key: 'color',
                width: 20,
                render: color => (
                    <div style={{width: '10px', height: '10px', background: color}}></div>
                )
            },
            {
                title: 'Nome',
                dataIndex: 'name',
                key: 'name',
                width: 200,

            }, {
                title: 'Descrição',
                dataIndex: 'description',
                key: 'description',
                width: 400,

            }, {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
                        {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
                    </span>
                )
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
                    <Col><Button type="primary" shape="circle" icon="plus" size="large" style={{ height: '50px', width: '50px', position: 'fixed', bottom: '50px', right: '10px', zIndex: "999" }} onClick={this.showModal}></Button></Col>
                </Row>
                <Modal
                    title="Cadastrar no tipo de resíduo"
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
                                    required: true, message: 'Por favor digite a descrição do tipo de resí  duo',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="Cor">
                            {getFieldDecorator('color', {
                                rules: [{
                                    required: true, message: 'Por favor selecione uma cor para este tipo de resíduo',
                                }],
                            })(
                                <Input type='color' onChange={(e) => { console.log(e.target.value) }} />
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
                <Table columns={columns} bordered dataSource={this.state.typesSolidWaste} scroll={window.innerWidth <= 600 ? { x: 900 } : undefined} style={{ background: "white" }} />
            </>
        );
    }
}

export default Form.create()(TypesSolidWastePage);