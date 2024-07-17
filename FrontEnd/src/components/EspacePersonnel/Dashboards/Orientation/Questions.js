import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, createTheme, ThemeProvider, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar } from '@mui/material';
import Navig from '../../../incs/Navig';
import OrientationDrawer from '../../Drawers/OrientationDrawer';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/questions');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Open modal with selected question
  const handleOpenModal = (question) => {
    setSelectedQuestion(question);
    setAnswer(question.resp || '');
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedQuestion(null);
    setAnswer('');
  };

  // Handle answer change
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  // Handle form submission
  const handleSubmitAnswer = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/questions/${selectedQuestion.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...selectedQuestion, resp: answer }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }
      console.log(`Submitted answer for question ${selectedQuestion.id}: ${answer}`);
      // Refresh questions after successful submission
      fetchQuestions();
      // Show success message
      setSuccessMessage('Answer submitted successfully');
      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  // Material-UI dark theme configuration
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <>
        <Navig />
        <OrientationDrawer />
        <div style={{ marginLeft: "260px", width: "1080px" }}>
          <h2 style={{ color: 'white' }}>Questions</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Answer</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell>{question.nom}</TableCell>
                    <TableCell>{question.prenom}</TableCell>
                    <TableCell>{question.qst}</TableCell>
                    <TableCell>{question.email}</TableCell>
                    <TableCell>{question.resp || '-'}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenModal(question)}
                      >
                        Answer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Modal for answering questions */}
        <Dialog open={selectedQuestion !== null} onClose={handleCloseModal}>
          <DialogTitle>Answer Question</DialogTitle>
          <DialogContent>
            <p>{selectedQuestion?.qst}</p>
            <TextField
              autoFocus
              margin="dense"
              label="Answer"
              type="text"
              fullWidth
              value={answer}
              onChange={handleAnswerChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitAnswer} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success Snackbar */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage('')}
          message={successMessage}
        />
      </>
    </ThemeProvider>
  );
};

export default Questions;
