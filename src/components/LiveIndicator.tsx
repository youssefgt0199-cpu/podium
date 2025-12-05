interface LiveIndicatorProps {
  lastUpdate: Date;
}

export function LiveIndicator({ lastUpdate }: LiveIndicatorProps) {
  return (
    <div 
      className="flex items-center gap-2 text-sm"
      role="status"
      aria-live="polite"
      aria-label={`Dernière mise à jour à ${lastUpdate.toLocaleTimeString()}`}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
      </span>
      <span className="font-bold text-success tracking-wider">EN DIRECT</span>
      <span className="text-muted-foreground">•</span>
      <span className="text-muted-foreground">Mis à jour {lastUpdate.toLocaleTimeString()}</span>
    </div>
  );
}