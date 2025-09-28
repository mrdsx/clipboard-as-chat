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

const LOCAL_STORAGE_KEY = "expires-in";
const SELECT_OPTIONS: ExpirationTime[] = ["15m", "1h", "6h", "24h"];

function SessionExpirationField({ ref }: { ref: ReactRef<ExpirationTime> }) {
  const expirationTime = localStorage.getItem(LOCAL_STORAGE_KEY) ?? "1h";
  const selectDefaultValue = SELECT_OPTIONS.includes(
    expirationTime as ExpirationTime,
  )
    ? expirationTime
    : "1h";

  return (
    <FormField>
      <Label htmlFor="expiry">Expires In</Label>
      <Select
        defaultValue={selectDefaultValue}
        onValueChange={(value) => {
          ref.current = value as ExpirationTime;
          localStorage.setItem(LOCAL_STORAGE_KEY, value);
        }}
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
