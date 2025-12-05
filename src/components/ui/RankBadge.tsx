import { cn } from '@/lib/utils';
import { Trophy, Medal, Award } from 'lucide-react';

interface RankBadgeProps {
  rank: number;
  className?: string;
}

export function RankBadge({ rank, className }: RankBadgeProps) {
  const getRankStyles = () => {
    switch (rank) {
      case 1:
        return {
          badge: 'rank-gold glow-gold',
          icon: Trophy,
          size: 'w-14 h-14 text-xl',
        };
      case 2:
        return {
          badge: 'rank-silver glow-silver',
          icon: Medal,
          size: 'w-12 h-12 text-lg',
        };
      case 3:
        return {
          badge: 'rank-bronze glow-bronze',
          icon: Award,
          size: 'w-11 h-11 text-base',
        };
      default:
        return {
          badge: 'bg-secondary text-foreground border border-border',
          icon: null,
          size: 'w-10 h-10 text-sm',
        };
    }
  };

  const { badge, icon: Icon, size } = getRankStyles();

  return (
    <div
      className={cn('rank-badge', badge, size, className)}
      role="img"
      aria-label={`Rang ${rank}${rank === 1 ? ' - Première place' : rank === 2 ? ' - Deuxième place' : rank === 3 ? ' - Troisième place' : ''}`}
    >
      {Icon ? (
        <Icon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <span className="font-bold">{rank}</span>
      )}
    </div>
  );
}