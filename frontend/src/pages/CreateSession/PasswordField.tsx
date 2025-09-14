import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function PasswordField({ ref }: React.ComponentPropsWithRef<"input">) {
  return (
    <FormField>
      <Label htmlFor="password">Password (optional)</Label>
      <Input
        id="password"
        type="password"
        placeholder="Leave blank for no password"
        ref={ref}
      />
    </FormField>
  );
}

export { PasswordField };
