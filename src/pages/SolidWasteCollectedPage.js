import React from 'react';
import { Table, Modal, Row, Col, Button, Form, Select, DatePicker, InputNumber } from 'antd';

import moment from 'moment';

import SolidWasteCollectedClient from '../api/TypeSolidWasteClient';
import TypeSolidWasteClient from '../api/TypeSolidWasteClient';
import DataList from '../helpers/DataList';
import DataFilters from '../helpers/DataFilters';

const FormItem = Form.Item;
const Option = Select.Option;

class SolidWasteCollectedPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.solidWasteCollectedClient = new SolidWasteCollectedClient('https://betatcc.herokuapp.com/solid-waste-collected');
        this.typeSolidWasteClient = new TypeSolidWasteClient('https://betatcc.herokuapp.com/types-solid-waste');
        this.state = {
            modalVisible: false,
            visibleModalExcluir: false,
            isRecyclable: false,
            isReutilable: false,
            solidsWasteCollected: [],
            typesSolidWaste: [],
            filters: [],
            filteredInfo: {},
            sortedInfo: {}
        };
    }

    async componentWillMount() {
        const responseCollected = await this.solidWasteCollectedClient.getAll();
        const responseType = await this.typeSolidWasteClient.getAll();

        this.setState({
            solidsWasteCollected: DataList.toSolidWasteCollectedData(responseCollected.data).reverse(),
            typesSolidWaste: responseType.data,
            filters: DataFilters.toTypesSolidWasteFiltersData(responseType.data)
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
                this.setState({
                    solidsWasteCollected: this.state.solidsWasteCollected.filter((solidWasteCollected) => solidWasteCollected.key !== response.data._id)
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
            console.log(values);
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
                        color: response.data.typeWasted.color,
                        collectionDate: moment(new Date(response.data.collectionDate)).format('DD/MM/YYYY'),
                        quantityCollected: response.data.quantityCollected
                    }, ...this.state.solidsWasteCollected],
                    modalVisible: false,
                })
                this.props.form.resetFields();
            }
        });
    }

    handleCancel = (e) => {
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

    handleChangeTable = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
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

        const columns = [
            {
                title: '',
                dataIndex: 'color',
                key: 'color',
                width: 20,
                render: color => (
                    <div style={{ width: '10px', height: '10px', background: color }}></div>
                )
            }, {
                title: 'Data',
                dataIndex: 'collectionDate',
                key: 'collectionDate',
                width: 150,
                sorter: (a, b) => {
                    const firstSplit = a.collectionDate.split('/');
                    const secondSplit = b.collectionDate.split('/');

                    const first = new Date(parseInt(firstSplit[2]), parseInt(firstSplit[1]) - 1, parseInt(firstSplit[0]));
                    const second = new Date(parseInt(secondSplit[2]), parseInt(secondSplit[1]) - 1, parseInt(secondSplit[0]));

                    return first - second;
                },
                sortOrder: this.state.sortedInfo.columnKey === 'collectionDate' && this.state.sortedInfo.order,
            }, {
                title: 'Total coletado',
                dataIndex: 'quantityCollected',
                key: 'quantityCollected',
                width: 200,
                render: (text, record) => (
                    `${text} Kg`
                ),
                sorter: (a, b) => a.quantityCollected - b.quantityCollected,
                sortOrder: this.state.sortedInfo.columnKey === 'quantityCollected' && this.state.sortedInfo.order,
            }, {
                title: 'Tipo',
                dataIndex: 'typeWasted',
                key: 'typeWasted',
                filters: this.state.filters,
                filteredValue: this.state.filteredInfo.typeWasted || null,
                onFilter: (value, record) => record.typeWasted.includes(value),
            }, {
                title: 'Ação',
                key: 'acti  on',
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
                    title="Cadastrar Coleta"
                    visible={this.state.modalVisible}
                    okText={"Cadastrar"}
                    cancelText={"Cancelar"}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem {...formItemLayout} label="Tipo de Resíduo">
                            {getFieldDecorator('typeWasted', {
                                rules: [{
                                    required: true, message: 'Por favor selecione o tipo de resíduo coletado',
                                }],
                            })(
                                <Select placeholder="Selecione o tipo de resíduo" onChange={this.handleChangeSelect}>
                                    {this.state.typesSolidWaste.map((value) => <Option value={value._id} key={value._id}>{value.name}</Option>)}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="Quantidade em Kg">
                            {getFieldDecorator('quantityCollected', {
                                rules: [{
                                    required: true, message: 'Por favor informe a quantidade coletada',
                                }],
                            })(
                                <InputNumber min={0} style={{width: '100%'}}/>,
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
                <Table columns={columns} onChange={this.handleChangeTable} bordered dataSource={this.state.solidsWasteCollected} scroll={window.innerWidth <= 600 ? { x: 1000 } : undefined} style={{ background: "white" }} />
            </>
        );
    }
}

export default Form.create()(SolidWasteCollectedPage);