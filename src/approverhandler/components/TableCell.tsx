import React, { useState } from 'react';
import { ContextMenu } from './ContextMenu';
import { CommentsModal } from './CommentsModal';

interface TableCellProps {
  cellId: string;
  color?: string;
  icon?: string;
  enabled: boolean;
  employeeDetails?: {
    name: string;
    timeSlot: string;
    comments?: string;
    [key: string]: any;
  };
}

export const TableCell: React.FC<TableCellProps> = ({ 
  cellId, 
  color = '#1a1a1a', 
  icon, 
  enabled,
  employeeDetails 
}) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [comments, setComments] = useState<string[]>(
    employeeDetails?.comments ? [employeeDetails.comments] : []
  );
  
  if (!employeeDetails?.timeSlot) return null;

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleAddComment = () => {
    setContextMenu(null);
    setIsCommentsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCommentsModalOpen(false);
  };

  const handleAddNewComment = (comment: string) => {
    setComments([...comments, comment]);
  };

  return (
    <div
      className="table-cell"
      onContextMenu={handleContextMenu}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      <div style={{
        color: '#00ff00',
        fontFamily: 'monospace',
        fontSize: '14px',
        padding: '4px'
      }}>
        {employeeDetails.timeSlot}
      </div>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          onAddComment={handleAddComment}
        />
      )}
      <CommentsModal
        isOpen={isCommentsModalOpen}
        onClose={handleCloseModal}
        comments={comments}
        onAddComment={handleAddNewComment}
      />
    </div>
  );
};
