import { useTeams } from '@/hooks/useTeams';
import { TeamCard } from './TeamCard';
import { AddTeamForm } from './AddTeamForm';
import { LiveIndicator } from './LiveIndicator';
import { Rocket, Users } from 'lucide-react';

export function Leaderboard() {
  const { teams, addTeam, removeTeam, updateScore, lastUpdate, totalTeams } = useTeams();

  return (
    <div className="min-h-screen bg-background">
      {/* Mars ambient glow effect */}
      <div 
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <Rocket className="w-10 h-10 text-primary animate-pulse-soft" aria-hidden="true" />
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-wider">
              <span className="text-gradient-mars">Mission Mars Colony</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto font-medium tracking-wide">
            Protocole de Progression • Classement en Temps Réel
          </p>
        </header>

        {/* Stats Bar */}
        <div className="flex items-center justify-between mb-6 console-panel p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="font-semibold text-foreground">{totalTeams}</span>
            <span>Équipes</span>
          </div>
          <LiveIndicator lastUpdate={lastUpdate} />
        </div>

        {/* Add Team Form */}
        <section className="mb-8" aria-labelledby="add-team-heading">
          <h2 id="add-team-heading" className="sr-only">Ajouter une nouvelle équipe</h2>
          <AddTeamForm onAddTeam={addTeam} />
        </section>

        {/* Leaderboard */}
        <section aria-labelledby="leaderboard-heading">
          <h2 id="leaderboard-heading" className="sr-only">Classement des Équipes</h2>
          
          {teams.length === 0 ? (
            <div 
              className="console-panel p-12 text-center"
              role="alert"
            >
              <Rocket className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" aria-hidden="true" />
              <p className="text-xl font-semibold text-foreground">Aucune équipe enregistrée</p>
              <p className="text-muted-foreground mt-2">Ajoutez votre première équipe pour démarrer la mission !</p>
            </div>
          ) : (
            <div className="space-y-3" role="list" aria-label="Classement des équipes">
              {teams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onUpdateScore={(delta) => updateScore(team.id, delta)}
                  onRemove={() => removeTeam(team.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p className="tracking-wide">Accessible • Temps Réel • Conforme WCAG</p>
        </footer>
      </div>
    </div>
  );
}