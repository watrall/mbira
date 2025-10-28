import { Badge, Button, Card } from "@/components/ui";

export default function ProjectSettingsFrontEndPage() {
  return (
    <div className="space-y-6">
      <Card
        heading="Connection status"
        description="Configure the public build target for this project."
      >
        <div className="flex items-center gap-3">
          <Badge variant="solid">Connected</Badge>
          <span className="text-body text-textSecondary">Vercel deployment · Updated Oct 12</span>
        </div>
      </Card>

      <Card
        heading="Tokens"
        description="Rotate keys used by the visitor front-end to fetch published data."
      >
        <div className="flex items-center justify-between gap-4 rounded-md border border-borderDivider bg-bgContent px-4 py-3">
          <code className="truncate text-caption text-textSecondary">pk_live_12f9d0...8e3</code>
          <Button variant="secondary" type="button">
            Rotate key
          </Button>
        </div>
      </Card>
    </div>
  );
}
