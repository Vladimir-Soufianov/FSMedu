import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper, Button } from '@mui/material';
import Navig from '../../../incs/Navig';
import AdminDrawer from '../../Drawers/AdminDrawer';
import { Form, Input, DatePicker, notification, Modal } from 'antd';
import dayjs from 'dayjs';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: ''
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleDateChange = (date, dateString) => {
    setNewEvent({ ...newEvent, date: dateString });
  };

  const handleCreateEvent = async (values) => {
    const eventToCreate = {
      ...values,
      date: values.date.format('YYYY-MM-DD')
    };

    try {
      const response = await fetch('http://localhost:8080/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventToCreate),
      });
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
      // Refresh events after successful creation
      fetchEvents();
      // Clear the form fields
      setNewEvent({ title: '', description: '', date: '' });

      // Show success notification
      notification.success({
        message: 'Success',
        description: 'Event created successfully!'
      });

      // Hide the modal
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error creating event:', error);
      // Show error notification
      notification.error({
        message: 'Error',
        description: 'Failed to create event'
      });
    }
  };

  return (
    <>
      <Navig />
      <AdminDrawer />
      <Grid container spacing={3} style={{ padding: '20px', marginLeft: '260px', boxSizing: 'border-box', width: '1100px' }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Evènements
          </Typography>
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            type="primary" 
            style={{marginTop:"-40px"}}
            variant="contained" color="primary"
            onClick={() => setIsModalVisible(true)}
          >
            Ajouter un evènement
          </Button>
        </Grid>

        <Modal
          title="Créer un  nouvel évènement"
          visible={isModalVisible}
          footer={null}
          onCancel={() => setIsModalVisible(false)}
          width={800}
        >
          <Form
            name="createEventForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleCreateEvent}
            style={{ maxWidth: '600px' }}
          >
            <Form.Item
              label="Titre"
              name="title"
              rules={[{ required: true, message: 'Please enter the title' }]}
            >
              <Input name="title" value={newEvent.title} onChange={handleInputChange} />
            </Form.Item>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: 'Please enter the date' }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                value={newEvent.date ? dayjs(newEvent.date) : null}
                onChange={handleDateChange}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the description' }]}
            >
              <Input.TextArea name="description" rows={4} value={newEvent.description} onChange={handleInputChange} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button 
                type="primary" 
                htmlType="submit"
                variant="contained" color="primary"
              >
                Créer évènement
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* List of Events */}
        {events.map((event) => (
          <Grid key={event.id} item xs={12} md={6} lg={4}>
            <Paper elevation={3} style={{ height: '220px',marginTop:"60px" ,padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom style={{marginTop:"10px"}}>
                {event.title}
              </Typography>
              <Typography variant="subtitle2" gutterBottom style={{marginTop:"10px"}}>
                Date: {new Date(event.date[0], event.date[1] - 1, event.date[2]).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" style={{marginTop:"30px"}}>
                {event.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Events;
