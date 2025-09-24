import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SessionNameField({ ref }: React.ComponentPropsWithRef<"input">) {
  return (
    <FormField>
      <Label htmlFor="sessionName">Session Name (optional)</Label>
      <Input
        id="sessionName"
        type="text"
        placeholder="Untitled session"
        ref={ref}
      />
    </FormField>
  );
}

export { SessionNameField };
