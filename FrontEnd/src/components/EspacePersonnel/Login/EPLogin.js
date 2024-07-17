import React, { useState } from 'react';
import Navig from '../../incs/Navig';
import { Button, Form, Input, Modal } from 'antd'; // Import Modal from Ant Design
import styles from "./EPLogin.module.css";
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const EELogin = () => {
  const [error, setError] = useState(null);
  const [forgotModalVisible, setForgotModalVisible] = useState(false); // State for Forgot Password modal
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/api/login/personnel', null, {
        params: {
          cin: values.cin,
          mdp: values.mdp,
        },
      });

      console.log('Login Response:', response.data); // Log response for debugging

      if (response.status === 200) {
        const { nom, prenom, role, id } = response.data;

        // Store user data in localStorage
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('user', JSON.stringify({ nom, prenom, role }));

        // Store professor ID if the role is 'prof' and on appropriate page
        if (role === 'prof') {
          console.log('Professor ID:', id); // Log professor's ID for debugging
          localStorage.setItem('profoId', id); // Set professor's ID in localStorage
        }
        if (role === 'admin') {
          console.log('Admin ID:', id); // Log professor's ID for debugging
          localStorage.setItem('adminoId', id); // Set professor's ID in localStorage
        }
        if (role === 'cheffiliere') {
          console.log('ChefF ID:', id); // Log professor's ID for debugging
          localStorage.setItem('cheffId', id); // Set professor's ID in localStorage
        }
        if (role === 'chefd') {
          console.log('ChefD ID:', id); // Log professor's ID for debugging
          localStorage.setItem('chefd', id); // Set professor's ID in localStorage
        }
        if (role === 'orientation') {
          console.log('Orientation ID:', id); // Log professor's ID for debugging
          localStorage.setItem('orioId', id); // Set professor's ID in localStorage
        }

        // Redirect based on the role
        switch(role) {
          case 'admin':
            navigate('/Admin/Dashboard');
            break;
          case 'cheffiliere':
            navigate('/Chef-Filiere/Dashboard');
            break;
          case 'orientation':
            navigate('/Orientation/Dashboard');
            break;
          case 'prof':
            navigate('/Prof/Dashboard');
            break;
          case 'chefd':
            navigate('/Chef-Departement/Dashboard');
            break;
          default:
            navigate('/');
            break;
        }
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        setError('Bad Request: ' + error.response.data);
      } else {
        setError('Cin ou mot de passe invalide');
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setError('Veuillez remplir tous les champs correctement.');
  };

  const handleFieldChange = () => {
    setError(null); // Clear error on field change
  };

  const handleForgotPassword = () => {
    navigate('/Login/Personnel/forgot'); // Redirect to Forgot Password page
  };

  return (
    <>
      <Navig />
      <div className={styles.booody}>
        <div className={styles.formulaire}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item>
              <h3>Se connecter</h3>
            </Form.Item>
            <Form.Item
              label="CIN"
              name="cin"
              rules={[
                {
                  required: true,
                  message: 'Entrez votre CIN!',
                },
              ]}
            >
              <Input
                suffix={<UserOutlined />}
                style={{ height: '40px', borderRadius: '40px' }}
                onChange={handleFieldChange}
              />
            </Form.Item>
            <Form.Item
              label="Mot de passe"
              name="mdp"
              rules={[
                {
                  required: true,
                  message: 'Entrez votre mot de passe!',
                },
              ]}
              validateStatus={error ? 'error' : ''}
              help={error}
            >
              <Input.Password
                style={{ height: '40px', borderRadius: '40px' }}
                onChange={handleFieldChange}
              />
            </Form.Item>
            <div className={styles.butona}>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Se connecter
                </Button>
                <Button type="link" onClick={handleForgotPassword}>Mot de passe oublié ?</Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EELogin;
