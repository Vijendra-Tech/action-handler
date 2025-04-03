import React, { useState } from 'react';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: string[];
  onAddComment: (comment: string) => void;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({
  isOpen,
  onClose,
  comments,
  onAddComment
}) => {
  const [newComment, setNewComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h3 style={{ color: '#333', marginTop: 0 }}>Comments</h3>
        
        <div style={{
          maxHeight: '300px',
          overflowY: 'auto',
          marginBottom: '20px'
        }}>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} style={{
                padding: '8px',
                borderBottom: '1px solid #eee',
                color: '#333'
              }}>
                {comment}
              </div>
            ))
          ) : (
            <p style={{ color: '#666' }}>No comments yet</p>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              minHeight: '80px',
              color: '#333'
            }}
          />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: '#fff',
                color: '#333',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#646cff',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Add Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
