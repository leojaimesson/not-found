import React from 'react';
import { Table, Modal, Row, Col, Button, Form, Input, Checkbox, Tag } from 'antd';

import TypeSolidWasteClient from '../api/TypeSolidWasteClient';
import DataList from '../helpers/DataList';

const FormItem = Form.Item;


class TypesSolidWastePage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.typeSolidWasteClient = new TypeSolidWasteClient('https://betatcc.herokuapp.com/types-solid-waste');
        this.state = {
            modalVisible: false,
            visibleModalExcluir: false,
            isRecyclable: false,
            isReutilable: false,
            typesSolidWaste: [],
            filters: [],
            filteredInfo: {},
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
                console.log(values)
                const typeSolidWaste = {
                    name: values.name.toUpperCase(),
                    description: values.description,
                    recyclable: this.state.isRecyclable,
                    reutilable: this.state.isReutilable,
                    color: values.color
                };
                const response = await this.typeSolidWasteClient.save(typeSolidWaste);
                this.setState({
                    typesSolidWaste: [{
                        color: response.data.color,
                        key: response.data._id, name: response.data.name, description: response.data.description, tags: DataList.toTags(response.data)
                    }, ...this.state.typesSolidWaste],
                    modalVisible: false,
                    isRecyclable: false,
                    isReutilable: false,
                });
                this.props.form.resetFields();
            }

        });
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

    handleChangeTable = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
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
                    <div style={{ width: '10px', height: '10px', background: color }}></div>
                )
            },
            {
                title: 'Nome',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: 'Descrição',
                dataIndex: 'description',
                key: 'description',

            }, {
                title: '',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => {
                    function tagT(t) {
                        if (t === 'recyclable') {
                            return 'Reciclável';
                        } else if (t === 'reutilable') {
                            return 'Reutilizável';
                        } else {
                            return '';
                        }
                    }
                    return (
                        <span>
                            {tags.map(tag => <Tag color="blue" key={tag}>{tagT(tag)}</Tag>)}
                        </span>
                    )
                },
                filters: this.state.filters,
                filteredValue: this.state.filteredInfo.tags || null,
                onFilter: (value, record) => {
                    return record.tags.includes(value)
                },
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
                                    required: true, message: 'Por favor digite o nome do tipo de resíduo',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="Descrição">
                            {getFieldDecorator('description', {
                                rules: [{
                                    required: true, message: 'Por favor digite a descrição do tipo de resíduo',
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
                                <Input type='color' onChange={(e) => { }} />
                            )}
                        </FormItem>

                        <FormItem {...formTailLayout}>
                            <Checkbox checked={this.state.isRecyclable} onClick={this.handleChangeCheckRecyclable}>
                                Reciclável
                            </Checkbox>
                            <Checkbox checked={this.state.isReutilable} onClick={this.handleChangeCheckReutilable}>
                                Reutilizável
                            </Checkbox>
                        </FormItem>
                    </Form>
                </Modal>
                <Table columns={columns} onChange={this.handleChangeTable} bordered dataSource={this.state.typesSolidWaste} scroll={window.innerWidth <= 600 ? { x: 900 } : undefined} style={{ background: "white" }} />
            </>
        );
    }
}

export default Form.create()(TypesSolidWastePage);