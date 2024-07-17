// CommentsSection.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './BookDetailsPage.module.css'; // Import CSS file for styling

const CommentsSection = ({ bookId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch comments from the API
    axios.get(`http://localhost:8080/api/books/${bookId}/comments`)
      .then(res => {
        setComments(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching comments:', err);
        setLoading(false);
      });
  }, [bookId]);

  // Example comments to display
  const exampleComments = [
    { user: "John Doe", text: "Great book, very informative!" },
    { user: "Jane Smith", text: "I loved the characters and the plot." }
  ];

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className={styles.commentsSection}>
      <h2>Commentaires</h2>
      <ul className={styles.commentList}>
        {/* Display example comments */}
        {exampleComments.map((comment, index) => (
          <li key={index} className={styles.commentItem}>
            <strong>{comment.user}</strong>: {comment.text}
          </li>
        ))}
        {/* Display fetched comments */}
        {comments.map((comment, index) => (
          <li key={index} className={styles.commentItem}>
            <strong>{comment.user}</strong>: {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
