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
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        width: '800px',
        height: '600px',
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        border: '1px solid #646cff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          borderBottom: '1px solid #646cff'
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#fff',
            fontSize: '1.5rem'
          }}>
            Comments
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              border: '1px solid #646cff',
              color: '#646cff',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Close
          </button>
        </div>

        <div style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden'
        }}>
          {/* Left side - Comments list */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            borderRight: '1px solid #646cff'
          }}>
            {comments.map((comment, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#2a2a2a',
                  padding: '12px',
                  marginBottom: '12px',
                  borderRadius: '6px',
                  border: '1px solid #646cff',
                  color: '#fff'
                }}
              >
                <div style={{
                  fontSize: '0.9rem',
                  marginBottom: '4px',
                  color: '#646cff'
                }}>
                  {index % 2 === 0 ? 'Rejection message' : 'Your message'} #{Math.floor(index/2) + 1}
                </div>
                {comment}
              </div>
            ))}
          </div>

          {/* Right side - Add comment form */}
          <div style={{
            flex: 1,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <form onSubmit={handleSubmit} style={{ height: '100%' }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment ...."
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #646cff',
                    borderRadius: '6px',
                    color: '#fff',
                    fontSize: '1rem',
                    resize: 'none',
                    marginBottom: '16px'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '12px',
                    backgroundColor: '#646cff',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    alignSelf: 'flex-end'
                  }}
                >
                  Add Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
