import React, { useState } from "react";
import { globalUser } from '../helper/helper.js'


const ConfirmActionWithModal = ({ open, setOpen, confirmAction, confirmText }) => {

    const handleConfirm = () => {
        confirmAction()
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div style={styles.content}>
                        <p>{confirmText}</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={handleCancel} style={styles.actionButton}>
                                Cancel
                            </button>
                            <button onClick={handleConfirm} style={styles.actionButton}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    actionButton: {
        backgroundColor: '#1DA1F2',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    content: {
        fontSize: '14px',
        marginBottom: '10px',
        color: 'rgb(36, 36, 36)',
    },
};

export default ConfirmActionWithModal;