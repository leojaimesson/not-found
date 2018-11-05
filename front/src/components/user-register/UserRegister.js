import React, { Component } from 'react';

import { Form, Input, Button } from 'antd';

import UserClient from '../../api/UserClient';

const FormItem = Form.Item;

class UserRegister extends Component {

    constructor(props) {
        super(props);
        this.userClient = new UserClient();
        this.state = {
            confirmDirty: false,
        };
    }

    handleSubmit = (e) => {
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
            }
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

    render() {
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

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 8,
                    offset: 6,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit}>
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
                {/* <FormItem
                    {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Cadastrar</Button>
                </FormItem> */}
            </Form>
        );
    }
}

export default Form.create()(UserRegister);
