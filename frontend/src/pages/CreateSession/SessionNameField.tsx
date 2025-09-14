import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SessionNameField({ ref }: React.ComponentPropsWithRef<"input">) {
  return (
    <FormField>
      <Label htmlFor="sessionName">Session Name</Label>
      <Input
        id="sessionName"
        type="text"
        placeholder="My Clipboard Session"
        ref={ref}
      />
    </FormField>
  );
}

export { SessionNameField };
