import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import Navig from '../../incs/Navig';

const LoginForgot = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8080/api/emp/forgot', null, {
        params: {
          cin: values.cin,
          matricule: values.matricule,
        },
      });

      if (response.status === 200) {
        message.success('Un email a été envoyé avec votre mot de passe.');
        setTimeout(() => {
          window.location.href = '/login/Personnel';
        }, 1000); // Redirect after 1 second
      } else {
        message.error('Employé non trouvé.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      message.error('Échec de l\'envoi de l\'email.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Veuillez remplir tous les champs correctement.');
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
                message: 'Veuillez entrer votre CIN!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} style={{ height: '40px', borderRadius: '20px' }} />
          </Form.Item>

          <Form.Item
            label="Matricule"
            name="matricule"
            rules={[
              {
                required: true,
                message: 'Veuillez entrer votre Matricule!',
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
