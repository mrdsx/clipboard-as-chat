import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router";
import { ConnectToSessionDialog } from "./ConnectToSessionDialog";

function Home() {
  return (
    <div className="flex h-screen justify-center pt-30">
      <Card className="h-fit w-[90%] p-0 py-10 text-center md:w-[50%]">
        <CardHeader>Welcome to "clipboard-as-chat" app</CardHeader>
        <CardContent className="flex w-full flex-col justify-center gap-3 sm:flex-row sm:items-center">
          <Button asChild>
            <Link to="/create">Create session</Link>
          </Button>
          <ConnectToSessionDialog />
        </CardContent>
      </Card>
    </div>
  );
}

export { Home };
