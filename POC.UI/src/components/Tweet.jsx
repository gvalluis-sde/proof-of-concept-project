import React, { useState } from 'react';
import rePost from '../services/rePost';
import { globalUser } from '../helper/helper.js'
import ConfirmActionWithModal from '../components/ConfirmAction.jsx'

const Tweet = ({ username, userId, content, createdAt, initialLikes, initialRetweets, repostId }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleRetweet = () => {
        setOpenModal(true);
    };


    return (
        <div style={styles.tweetContainer}>
            <div style={styles.header}>
                <span style={styles.username}>{username}</span>
                <span style={styles.timestamp}>{new Date(createdAt).toLocaleString()}</span>
            </div>
            <div style={styles.content}>
                <p>{content}</p>
            </div>
            <div style={styles.actions}>
                <button onClick={handleRetweet} style={styles.actionButton}>RePost {initialRetweets}</button>
            </div>
            <ConfirmActionWithModal
                open={openModal}
                setOpen={setOpenModal}
                confirmAction={() => {
                    rePost.rePost(repostId, globalUser)
                }} 
                confirmText={"Confirm RePost?"}
            />
        </div>
    );
};

const styles = {
    tweetContainer: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '500px',
        margin: '2 auto',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    username: {
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#888',
    },
    timestamp: {
        fontSize: '12px',
        color: '#888',
    },
    content: {
        fontSize: '14px',
        marginBottom: '10px',
        color: 'rgb(36, 36, 36)',
    },
    actions: {
        display: 'flex',
        gap: '10px',
    },
    actionButton: {
        backgroundColor: '#1DA1F2',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
};

export default Tweet;