import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddTeamFormProps {
  onAddTeam: (name: string) => void;
}

export function AddTeamForm({ onAddTeam }: AddTeamFormProps) {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = teamName.trim();
    if (!trimmedName) {
      toast.error('Veuillez entrer un nom d\'équipe');
      return;
    }

    onAddTeam(trimmedName);
    setTeamName('');
    toast.success(`${trimmedName} ajoutée au classement !`);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex gap-3"
      role="form"
      aria-label="Formulaire d'ajout d'équipe"
    >
      <Input
        type="text"
        placeholder="Nom de l'équipe..."
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary rounded-xl"
        aria-label="Nom de l'équipe"
        maxLength={30}
      />
      <Button 
        type="submit" 
        className="bg-success text-success-foreground hover:bg-success/90 font-bold rounded-xl focus:ring-2 focus:ring-primary"
        aria-label="Ajouter l'équipe au classement"
      >
        <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
        Ajouter
      </Button>
    </form>
  );
}