import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef } from "react";
import { FormField } from "./FormField";

export default function CreateSessionPage() {
  const sessionNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const expiryRef = useRef<string>("1h");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      sessionName: sessionNameRef.current?.value || "Untitled Session",
      password: passwordRef.current?.value || null,
      expiry: expiryRef.current,
    };
    console.table(payload);
  };

  return (
    <Card className="mx-auto mt-10 max-w-md py-8">
      <CardHeader>
        <CardTitle>Create New Session</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Session Name */}
          <FormField>
            <Label htmlFor="sessionName">Session Name</Label>
            <Input
              id="sessionName"
              type="text"
              placeholder="My Clipboard Session"
              ref={sessionNameRef}
            />
          </FormField>

          {/* Password */}
          <FormField>
            <Label htmlFor="password">Password (optional)</Label>
            <Input
              id="password"
              type="password"
              placeholder="Leave blank for no password"
              ref={passwordRef}
            />
          </FormField>

          {/* Expiration */}
          <FormField>
            <Label htmlFor="expiry">Expires In</Label>
            <Select
              defaultValue="1h"
              onValueChange={(val) => (expiryRef.current = val)}
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

          {/* Submit */}
          <Button type="submit" className="w-full">
            Start Session
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
