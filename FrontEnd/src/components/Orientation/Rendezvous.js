import React from 'react';
import axios from 'axios';
import styles from './Rendezvous.module.css';
import { Button, Form, Input, DatePicker, message } from 'antd';
import Navig from '../incs/Navig';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const disabledDate = (current) => {
  return current && (current.day() === 6 || current.day() === 0); // Disable Saturdays and Sundays
};

const disabledDateTime = () => ({
  disabledHours: () => {
    const allHours = range(0, 24);
    const allowedHours = [8, 9, 10, 11, 14, 15, 16];
    return allHours.filter(hour => !allowedHours.includes(hour));
  },
  disabledMinutes: () => {
    const allMinutes = range(0, 60);
    const allowedMinutes = [0, 10, 15, 30];
    return allMinutes.filter(minute => !allowedMinutes.includes(minute));
  }
});

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const onFinish = async (values) => {
  const { Nom, Prenom, email, datetime } = values;
  const rendezvousData = {
    nom: Nom,
    prenom: Prenom,
    email: email,
    date: [
      datetime.year(),
      datetime.month() + 1,
      datetime.date(),
      datetime.hour(),
      datetime.minute()
    ]
  };

  try {
    const response = await axios.post('http://localhost:8080/api/rendezvous', rendezvousData);
    message.success('Rendez-vous successfully created');
    console.log('Success:', response.data);
  } catch (error) {
    message.error('Failed to create rendez-vous');
    console.error('Failed:', error);
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Rendezvous = () => {
  return (
    <>
      <Navig />
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
            <h3>Prener un Rendez-vous</h3>
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Entrez votre email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date and Time"
            name="datetime"
            rules={[
              {
                required: true,
                message: 'Choisissez la date et l\'heure!',
              },
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm"
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{
                defaultValue: dayjs('00:00:00', 'HH:mm'),
              }}
            />
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

export default Rendezvous;
