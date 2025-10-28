import React from 'react';

interface TeamTagProps {
  teamName: string;
}

const TeamTag: React.FC<TeamTagProps> = ({ teamName }) => {
  const getTeamColor = (team: string): string => {
    const teamColors: { [key: string]: string } = {
      'Design': 'purple',
      'Product': 'blue',
      'Marketing': 'pink',
      'Engineering': 'green',
      'Sales': 'orange',
      'Support': 'cyan',
    };
    return teamColors[team] || 'gray';
  };

  const colorClass = getTeamColor(teamName);

  return (
    <span className={`team-tag team-${colorClass}`}>
      {teamName}
    </span>
  );
};

export default TeamTag;