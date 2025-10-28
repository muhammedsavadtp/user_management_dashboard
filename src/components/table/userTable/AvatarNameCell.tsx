import React from 'react';

interface AvatarNameCellProps {
  name: string;
  username: string;
  avatarUrl: string;
}

const AvatarNameCell: React.FC<AvatarNameCellProps> = ({
  name,
  username,
  avatarUrl,
}) => {
  return (
    <div className="avatar-name-cell">
      <div className="avatar">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} />
        ) : (
          <div className="avatar-placeholder">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="name-info">
        <div className="full-name">{name}</div>
        <div className="username">@{username}</div>
      </div>
    </div>
  );
};

export default AvatarNameCell;