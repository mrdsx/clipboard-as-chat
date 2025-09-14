import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  postChatSession,
  type CreateChatSession,
  type ExpirationTime,
} from "@/features/chat";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { PasswordField } from "./PasswordField";
import { SessionExpirationField } from "./SessionExpirationField";
import { SessionNameField } from "./SessionNameField";
import { SubmitButton } from "./SubmitButton";

function CreateSession() {
  const sessionNameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const expirationRef = useRef<ExpirationTime>("1h");

  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create_session"],
    mutationFn: postChatSession,
    onSuccess: ({ session_uuid }) => {
      navigate(`/chat/${session_uuid}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();

    const payload: CreateChatSession = {
      session_name: sessionNameInputRef.current?.value || "Untitled Session",
      password: passwordInputRef.current?.value || null,
      expires_in: expirationRef.current,
    };
    mutate(payload);
  }

  return (
    <Card className="mx-auto mt-10 max-w-md py-8">
      <CardHeader>
        <CardTitle>Create New Session</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <SessionNameField ref={sessionNameInputRef} />
          <PasswordField ref={passwordInputRef} />
          <SessionExpirationField ref={expirationRef} />
          <SubmitButton disabled={isPending} aria-disabled={isPending} />
        </form>
      </CardContent>
    </Card>
  );
}
export { CreateSession };
