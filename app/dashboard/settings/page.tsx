export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and application settings.
        </p>
      </div>
      <div className="flex-1 rounded-xl border bg-muted/50 min-h-[400px]" />
    </div>
  );
}
