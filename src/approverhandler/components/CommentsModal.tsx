import React, { useState, useEffect } from 'react';
import { FlowServiceResponseHandler } from '../FlowServiceResponseHandler';

interface Comment {
  id: string;
  text: string;
  userId: string;
  timestamp: string;
  type: 'rejection' | 'response';
}

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cellId: string;
  userId: string;
}

export const CommentsModal: React.FC<CommentsModalProps> = ({
  isOpen,
  onClose,
  cellId,
  userId
}) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const flowService = new FlowServiceResponseHandler();

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, cellId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await flowService.executeApi("fetch-comments", { cellId });
      setComments(response.content[0].text);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        setIsLoading(true);
        await flowService.executeApi("add-comment", {
          cellId,
          comment: newComment.trim(),
          userId
        });
        
        // Refresh comments after adding new one
        await fetchComments();
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

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
            Comments {isLoading && '(Loading...)'}
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
            {comments.map((comment) => (
              <div
                key={comment.id}
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
                  color: comment.type === 'rejection' ? '#ff4646' : '#646cff'
                }}>
                  {comment.type === 'rejection' ? 'Rejection message' : 'Your message'} - {new Date(comment.timestamp).toLocaleString()}
                </div>
                {comment.text}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  style={{
                    padding: '12px',
                    backgroundColor: '#646cff',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    alignSelf: 'flex-end',
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? 'Adding...' : 'Add Comment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
