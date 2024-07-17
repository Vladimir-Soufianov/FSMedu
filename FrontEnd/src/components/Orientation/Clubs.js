import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navig from '../incs/Navig';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import styles from './Clubs.module.css';

const Clubs = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Extract club ID from the URL

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log('Sending login request with values:', values);
      const response = await axios.post('http://localhost:8080/api/login/student', null, {
        params: {
          ce: values.ce,
          mdp: values.mdp,
        },
      });
      console.log('Response received:', response.data);
  
      if (response.data && response.data.success && response.data.student && response.data.student.id) {
        // Extract the student ID from the response
        const studentId = response.data.student.id;
        const selectedClubId = localStorage.getItem('selectedClubId'); // Get the club ID from local storage
  
        // Update the student's clubIds array with the new club ID
        const clubIds = [parseInt(selectedClubId)];
        await axios.put(`http://localhost:8080/api/students/${studentId}`, { clubIds });
  
        // Redirect to /orientation or handle success as needed
        message.success('Club registration successful');

      } else {
        message.error('Student not registered');
      }
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Student not registered');
    } finally {
      setLoading(false);
    }
  };
  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Navig />
      <div className={styles.body}></div>
      <div className={styles.formulaire}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item>
            <h3>S'inscrire au club</h3>
          </Form.Item>
          <Form.Item
            label="CE"
            name="ce"
            rules={[{ required: true, message: 'Entrez votre CE!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="MDP"
            name="mdp"
            rules={[{ required: true, message: 'Entrez votre mot de passe!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Clubs;
