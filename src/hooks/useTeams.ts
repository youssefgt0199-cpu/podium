import { useState, useEffect, useCallback } from 'react';
import { Team } from '@/types/team';

const TEAM_COLORS = [
  '#00D4FF', '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3',
  '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA', '#FF9F43'
];

const generateId = () => Math.random().toString(36).substring(2, 9);

const initialTeams: Team[] = [
  { id: generateId(), name: 'Alpha Squad', score: 2450, color: TEAM_COLORS[0] },
  { id: generateId(), name: 'Beta Force', score: 2380, color: TEAM_COLORS[1] },
  { id: generateId(), name: 'Gamma Unit', score: 2290, color: TEAM_COLORS[2] },
  { id: generateId(), name: 'Delta Team', score: 2100, color: TEAM_COLORS[3] },
  { id: generateId(), name: 'Epsilon Crew', score: 1950, color: TEAM_COLORS[4] },
];

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Sort teams by score (descending) and track rank changes
  const sortedTeams = [...teams]
    .sort((a, b) => b.score - a.score)
    .map((team, index) => ({
      ...team,
      currentRank: index + 1,
    }));

  const addTeam = useCallback((name: string) => {
    const colorIndex = teams.length % TEAM_COLORS.length;
    const newTeam: Team = {
      id: generateId(),
      name,
      score: 0,
      color: TEAM_COLORS[colorIndex],
    };
    setTeams(prev => [...prev, newTeam]);
    setLastUpdate(new Date());
  }, [teams.length]);

  const removeTeam = useCallback((id: string) => {
    setTeams(prev => prev.filter(team => team.id !== id));
    setLastUpdate(new Date());
  }, []);

  const updateScore = useCallback((id: string, delta: number) => {
    setTeams(prev => prev.map(team => 
      team.id === id 
        ? { ...team, score: Math.max(0, team.score + delta) }
        : team
    ));
    setLastUpdate(new Date());
  }, []);

  const setScore = useCallback((id: string, newScore: number) => {
    setTeams(prev => prev.map(team => 
      team.id === id 
        ? { ...team, score: Math.max(0, newScore) }
        : team
    ));
    setLastUpdate(new Date());
  }, []);

  // Simulate polling with random score updates (for demo)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    teams: sortedTeams,
    addTeam,
    removeTeam,
    updateScore,
    setScore,
    lastUpdate,
    totalTeams: teams.length,
  };
}
