import React, { useState } from 'react';
import createPost from '../services/createPost';


const NewTweet = () => {
  const [tweetContent, setTweetContent] = useState('');

  const handleInputChange = (e) => {
    setTweetContent(e.target.value);
  };


  const handleSubmit = () => {
    if (tweetContent.trim()) {
      const newTweet = {
        content: tweetContent,
        createdAt: new Date().toISOString(),
        userId: 1, //Change to get it from parent
        repostCount: 0,
      };
      createPost.createPost(newTweet);
      setTweetContent('');  // Clears Input field
    }
  };

  return (
    <div style={styles.createTweetContainer}>

      <textarea
        value={tweetContent}
        onChange={handleInputChange}
        placeholder="What's happening?"
        rows="4"
        style={styles.textArea}
      />
      <div style={styles.footer}>
        <button onClick={handleSubmit} style={styles.submitButton}>
          Posterr
        </button>
      </div>
    </div>
  );
};

const styles = {
  createTweetContainer: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  textArea: {
    width: '96%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    resize: 'none',
    marginBottom: '10px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submitButton: {
    backgroundColor: '#1DA1F2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 15px',
    cursor: 'pointer',
  },
};

export default NewTweet;