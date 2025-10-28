import React from 'react';
import './OnlineStatusIndicator.scss';

interface OnlineStatusIndicatorProps {
  isOnline: boolean;
}

const OnlineStatusIndicator: React.FC<OnlineStatusIndicatorProps> = ({ isOnline }) => {
  const statusText = isOnline ? 'Online' : 'Offline';
  const statusClass = isOnline ? 'online' : 'offline';

  return (
    <div className={`online-status-indicator ${statusClass}`}>
      <div className="status-dot"></div>
      <span className="status-text">{statusText}</span>
    </div>
  );
};

export default OnlineStatusIndicator;
