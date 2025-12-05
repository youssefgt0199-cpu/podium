import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface ScoreControlsProps {
  teamName: string;
  onAdd: (amount: number) => void;
  onSubtract: (amount: number) => void;
}

export function ScoreControls({ teamName, onAdd, onSubtract }: ScoreControlsProps) {
  const amounts = [1, 5, 10, 50];

  return (
    <div className="flex items-center gap-2" role="group" aria-label={`Contrôles de score pour ${teamName}`}>
      <div className="flex gap-1">
        {amounts.map((amount) => (
          <Button
            key={`sub-${amount}`}
            variant="outline"
            size="sm"
            onClick={() => onSubtract(amount)}
            className="h-8 px-2 text-xs bg-destructive/15 border-destructive/40 text-destructive hover:bg-destructive/25 hover:text-destructive font-bold rounded-lg focus:ring-2 focus:ring-primary"
            aria-label={`Retirer ${amount} points à ${teamName}`}
          >
            <Minus className="w-3 h-3 mr-1" aria-hidden="true" />
            {amount}
          </Button>
        ))}
      </div>
      <div className="w-px h-6 bg-border" aria-hidden="true" />
      <div className="flex gap-1">
        {amounts.map((amount) => (
          <Button
            key={`add-${amount}`}
            variant="outline"
            size="sm"
            onClick={() => onAdd(amount)}
            className="h-8 px-2 text-xs bg-success/15 border-success/40 text-success hover:bg-success/25 hover:text-success font-bold rounded-lg focus:ring-2 focus:ring-primary"
            aria-label={`Ajouter ${amount} points à ${teamName}`}
          >
            <Plus className="w-3 h-3 mr-1" aria-hidden="true" />
            {amount}
          </Button>
        ))}
      </div>
    </div>
  );
}