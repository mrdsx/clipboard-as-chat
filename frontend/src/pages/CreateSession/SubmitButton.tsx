import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

function SubmitButton(props: React.ComponentProps<"button">) {
  return (
    <Button type="submit" className="w-full" {...props}>
      {props.disabled && <LoaderCircle className="animate-spin" />}
      Start Session
    </Button>
  );
}

export { SubmitButton };
