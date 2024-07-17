import React, { useState } from 'react';
import Navig from '../incs/Navig';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, InputNumber } from 'antd';
import styles from './Location.module.css';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Location = () => {
  const { id } = useParams();
  console.log(id); 

  return (
    <>
      <Navig />
      <div className={styles.boody}></div>
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
            <h3>Louer livre</h3>
          </Form.Item>
          <Form.Item
            label="Nom"
            name="Nom"
            rules={[
              {
                required: true,
                message: 'Entrez votre nom!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Prenom"
            name="Prenom"
            rules={[
              {
                required: true,
                message: 'Entrez votre prenom!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Filiere"
            name="filiere"
            rules={[
              {
                required: true,
                message: 'Entrez votre filiere!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Durée"
            name="duration"
            rules={[
              {
                required: true,
                message: 'Entrez la durée de location!',
              },
            ]}
          >
            <InputNumber min={3} max={15} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Location;
