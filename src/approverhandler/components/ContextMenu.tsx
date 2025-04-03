import React from 'react';
import './ContextMenu.css';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAddComment: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onClose,
  onAddComment
}) => {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.context-menu')) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="context-menu"
      style={{
        position: 'fixed',
        top: y,
        left: x,
        zIndex: 1000
      }}
    >
      <div
        onClick={onAddComment}
        className="context-menu-item"
        style={{
          position: 'relative'
        }}
      >
        Add/View Comments
      </div>
    </div>
  );
};
