import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import Navig from '../../incs/Navig';
import { redirect } from 'react-router-dom';

const LoginForgot = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/students/forgot', {
        params: {
          cin: values.cin,
          ce: values.ce,
        },
      });

      if (response.status === 200) {
        message.success('An email has been sent with your password.');
        setTimeout(() => {
          redirect('/login/Etudiant');
        }, 1000); // Redirect after 2 seconds
      } else {
        message.error('Student not found.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      message.error('Failed to send email.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please fill in all fields correctly.');
  };

  return (
    <>
      <Navig />
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
        <h2>Mot de passe Oublié</h2>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          style={{ display: 'flex', flexDirection: 'column' }} // Inline style for form layout
        >
          <Form.Item
            label="CIN"
            name="cin"
            rules={[
              {
                required: true,
                message: 'Please enter your CIN!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} style={{ height: '40px', borderRadius: '20px' }} />
          </Form.Item>

          <Form.Item
            label="CE"
            name="ce"
            rules={[
              {
                required: true,
                message: 'Please enter your CE!',
              },
            ]}
          >
            <Input.Password prefix={<UserOutlined />} style={{ height: '40px', borderRadius: '20px' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ marginLeft: '50px' }}>
              Soumettre
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default LoginForgot;
