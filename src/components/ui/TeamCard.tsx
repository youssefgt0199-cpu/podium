import { useState } from 'react';
import { cn } from '@/lib/utils';
import { RankBadge } from './RankBadge';
import { ScoreControls } from './ScoreControls';
import { Button } from '@/components/ui/button';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Team } from '@/types/team';

interface TeamCardProps {
  team: Team & { currentRank: number };
  onUpdateScore: (delta: number) => void;
  onRemove: () => void;
}

export function TeamCard({ team, onUpdateScore, onRemove }: TeamCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [scoreAnimating, setScoreAnimating] = useState(false);

  const handleScoreChange = (delta: number) => {
    setScoreAnimating(true);
    onUpdateScore(delta);
    setTimeout(() => setScoreAnimating(false), 300);
  };

  const getCardStyles = () => {
    switch (team.currentRank) {
      case 1:
        return 'border-gold/60 bg-gradient-to-r from-gold/15 via-card to-card glow-gold';
      case 2:
        return 'border-silver/50 bg-gradient-to-r from-silver/12 via-card to-card glow-silver';
      case 3:
        return 'border-bronze/50 bg-gradient-to-r from-bronze/12 via-card to-card glow-bronze';
      default:
        return 'border-border bg-card hover:border-primary/40 transition-colors';
    }
  };

  return (
    <article
      className={cn(
        'console-panel p-4 transition-all duration-300 animate-fade-in',
        getCardStyles()
      )}
      aria-label={`${team.name}, Rang ${team.currentRank}, Score ${team.score}`}
    >
      <div className="flex items-center gap-4">
        <RankBadge rank={team.currentRank} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full shrink-0 ring-2 ring-background/50"
              style={{ backgroundColor: team.color }}
              aria-hidden="true"
            />
            <h3 className="font-display font-bold text-lg truncate text-foreground tracking-wide">
              {team.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div
            className={cn(
              'score-display text-2xl font-extrabold text-primary transition-transform',
              scoreAnimating && 'animate-score-change'
            )}
            aria-live="polite"
            aria-atomic="true"
          >
            {team.score.toLocaleString()}
            <span className="text-xs text-muted-foreground ml-1 font-medium">pts</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 focus:ring-2 focus:ring-primary"
            aria-expanded={expanded}
            aria-label={expanded ? 'Réduire les contrôles' : 'Afficher les contrôles'}
          >
            {expanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between gap-4 animate-fade-in">
          <ScoreControls
            teamName={team.name}
            onAdd={(amount) => handleScoreChange(amount)}
            onSubtract={(amount) => handleScoreChange(-amount)}
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-destructive hover:text-destructive hover:bg-destructive/15 focus:ring-2 focus:ring-destructive"
            aria-label={`Supprimer ${team.name} du classement`}
          >
            <Trash2 className="w-4 h-4 mr-2" aria-hidden="true" />
            Supprimer
          </Button>
        </div>
      )}
    </article>
  );
}