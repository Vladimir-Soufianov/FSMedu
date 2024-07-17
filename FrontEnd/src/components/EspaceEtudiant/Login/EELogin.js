import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navig from '../../incs/Navig';
import styles from './EELogin.module.css';

const EELogin = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log('Sending login request with values:', values);
      const response = await axios.post('http://localhost:8080/api/login/student', null, {
        params: {
          ce: values.ce,
          mdp: values.mdp,
        },
      });

      console.log('Response received:', response);

      if (response.status === 200) {
        const { id, nom, prenom } = response.data;
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('studentId', id); // Store studentId in localStorage
        localStorage.setItem('user', JSON.stringify({ nom, prenom }));
        setTimeout(() => {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('user');
          navigate('/');
        }, 20 * 60 * 1000);

        console.log("student id is :"+ id)
        navigate('/EspaceEtudiant'); 
      }
    } catch (error) {
      console.error('Error occurred:', error);
      if (error.response && error.response.status === 400) {
        setError('Bad Request: ' + error.response.data);
      } else {
        setError('Code étudiant ou mot de passe invalide');
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setError('Veuillez remplir tous les champs correctement.');
  };

  const handleFieldChange = () => {
    setError(null);
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
              label="Code Étudiant"
              name="ce"
              rules={[
                {
                  required: true,
                  message: 'Entrez votre code étudiant!',
                },
                {
                  pattern: /^[0-9]{6}$/,
                  message: 'Le code étudiant doit contenir exactement 6 chiffres!',
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
                <Button type="primary" htmlType="submit" style={{marginLeft:"50px"}} >
                  Soumettre
                </Button>
                <Link to="/login/Etudiant/forgot" className={styles.forgotPassword} style={{marginLeft:"80px"}}>
                  Mot de passe oublié ?
                </Link>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EELogin;
