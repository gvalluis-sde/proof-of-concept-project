import React, { useState } from 'react';

const SearchWithUserHover = ({ user, postCount }) => {
    const [showUser, setShowUser] = useState(false);

    return (
        <>
            <button style={styles.userButton}
                onMouseEnter={() => setShowUser(true)}
                onMouseLeave={() => setShowUser(false)}
            >i</button>
            {showUser && (
                <div style={styles.userInfo}>
                    <p style={styles.userField}>ID: {user.id}</p>
                    <p style={styles.userField}>Username: {user.username}</p>
                    <p style={styles.userField}>Total Posts: {postCount}</p>
                </div>
            )}
        </>
    );
};

const styles = {
    container: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '10px',
        marginBottom: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        maxWidth: '550px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
    },
    userContainer: {
        position: 'relative',
        flexShrink: 0,
    },
    userButton: {
        width: '30px',
        borderRadius: '5px',
        border: 'none',
        padding: '10px 1px',
        cursor: 'pointer',
        margin: '4px',
        backgroundColor: '#1DA1F2',
        color: 'white',
    },
    userInfo: {
        position: 'relative',
        // top: '40px',
        // right: '0',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        // zIndex: 10,
        color: 'rgb(115, 114, 114)',
    },
    userField: {
        fontSize: '15px'
    }
};

export default SearchWithUserHover;