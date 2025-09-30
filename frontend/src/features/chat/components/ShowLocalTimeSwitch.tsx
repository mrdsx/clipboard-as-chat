import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useChatContext } from "../ChatContextProvider";

function ShowLocalTimeSwitch() {
  const { showLocalTime, setShowLocalTime } = useChatContext();

  return (
    <div className="flex gap-2 px-2">
      <Switch
        id="local-time"
        checked={showLocalTime}
        onCheckedChange={(value) => setShowLocalTime(value)}
      />
      <Label htmlFor="local-time">Show local time</Label>
    </div>
  );
}

export { ShowLocalTimeSwitch };
