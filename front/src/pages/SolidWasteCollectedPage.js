import React, { Component } from 'react';
import { Table, Modal, Row, Col, Button, Form, Input, Select, DatePicker } from 'antd';

import moment from 'moment';

import SolidWasteCollectedClient from '../api/TypeSolidWasteClient';
import TypeSolidWasteClient from '../api/TypeSolidWasteClient';
import DataList from '../helpers/DataList';

const FormItem = Form.Item;
const Option = Select.Option;

class SolidWasteCollectedPage extends Component {

    constructor(props) {
        super(props);
        this.solidWasteCollectedClient = new SolidWasteCollectedClient('http://localhost:3001/solid-waste-collected');
        this.typeSolidWasteClient = new TypeSolidWasteClient('http://localhost:3001/types-solid-waste');
        this.state = {
            modalVisible: false,
            visibleModalExcluir: false,
            isRecyclable: false,
            isReutilable: false,
            solidsWasteCollected: [],
            typesSolidWaste: [],
        };
    }

    async componentWillMount() {
        const responseCollected = await this.solidWasteCollectedClient.getAll();
        const responseType = await this.typeSolidWasteClient.getAll();

        console.log(responseCollected);

        this.setState({
            solidsWasteCollected: DataList.toSolidWasteCollectedData(responseCollected.data),
            typesSolidWaste: responseType.data
        });
    }

    modalExcluir = (idSolidWasteCollected) => {
        Modal.error({
            title: 'Deseja realmente excluir esta coleta?',
            cancelText: 'Cancelar',
            okCancel: true,
            okText: 'Excluir',
            onOk: async () => {
                const response = await this.solidWasteCollectedClient.remove(idSolidWasteCollected);
                console.log(response)
                this.setState({
                    solidsWasteCollected: this.state.solidsWasteCollected.filter((solidWasteCollected) => solidWasteCollected.key !== response.data._id)
                })
            }
        });
        console.log(idSolidWasteCollected)
    }

    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    }

    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            console.log(values.collectionDate)
            if (!err) {
                const solidWasteCollected = {
                    typeWasted: values.typeWasted,
                    quantityCollected: values.quantityCollected - 0,
                    collectionDate: values.collectionDate ? values.collectionDate : null,
                };
                const response = await this.solidWasteCollectedClient.save(solidWasteCollected);
                this.setState({
                    solidsWasteCollected: [{
                        key: response.data._id,
                        typeWasted: response.data.typeWasted.name,
                        collectionDate: moment(new Date(response.data.collectionDate)).format('DD/MM/YYYY'),
                    }, ...this.state.solidsWasteCollected]
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

    handleChangeSelect = (value) => {
        this.setState({
            typeSelected: value,
        });
    }

    handleChangeDate = (date, dateString) => {
        this.setState({
            collectionDate: dateString,
        })
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
            title: 'Tipo',
            dataIndex: 'typeWasted',
            key: 'typeWasted'
        }, {
            title: 'Data',
            dataIndex: 'collectionDate',
            key: 'collectionDate',
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
                    <Col><h2>Coletados</h2></Col>
                    <Col><Button type="primary" shape="circle" icon="plus" size="large" style={{height: '50px', width: '50px', position: 'fixed', bottom: '50px', right: '10px', zIndex:"999"}}onClick={this.showModal}></Button></Col>
                </Row>
                <Modal
                    title="Cadastrar Coleta"
                    visible={this.state.modalVisible}
                    okText={"Cadastrar"}
                    cancelText={"Cancelar"}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem {...formItemLayout} label="Tipo de Residuo">
                            {getFieldDecorator('typeWasted', {
                                rules: [{
                                    required: true, message: 'Por favor digite o nome do tipo de residuo',
                                }],
                            })(
                                <Select placeholder="Selecione o tipo de residuo" onChange={this.handleChangeSelect}>
                                    {this.state.typesSolidWaste.map((value) => <Option value={value._id} key={value._id}>{value.name}</Option>)}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="Quantidade">
                            {getFieldDecorator('quantityCollected', {
                                rules: [{
                                    required: true, message: 'Por favor digite a descrição do tipo de residuo',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="Data">
                            {getFieldDecorator('collectionDate', {
                                rules: [{
                                    required: false,
                                }],
                                initialValue: moment(new Date())
                            })(
                                <DatePicker />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
                <Table columns={columns} dataSource={this.state.solidsWasteCollected} scroll={window.innerWidth <= 500 ? { x: 500 } : undefined} style={{ background: "white" }} />
            </>
        );
    }
}

export default Form.create()(SolidWasteCollectedPage);