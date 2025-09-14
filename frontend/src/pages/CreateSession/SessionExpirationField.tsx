import { FormField } from "@/components/FormField";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ExpirationTime } from "@/features/chat";
import type { ReactRef } from "@/lib";

function SessionExpirationField({ ref }: { ref: ReactRef<ExpirationTime> }) {
  return (
    <FormField>
      <Label htmlFor="expiry">Expires In</Label>
      <Select
        defaultValue="1h"
        onValueChange={(val) => (ref.current = val as ExpirationTime)}
      >
        <SelectTrigger id="expiry">
          <SelectValue placeholder="Select duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="15m">15 minutes</SelectItem>
          <SelectItem value="1h">1 hour</SelectItem>
          <SelectItem value="6h">6 hours</SelectItem>
          <SelectItem value="24h">24 hours</SelectItem>
        </SelectContent>
      </Select>
    </FormField>
  );
}

export { SessionExpirationField };
