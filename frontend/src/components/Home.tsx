import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

function Home() {
  return (
    <div className="flex h-screen justify-center pt-30">
      <Card className="h-fit w-[90%] p-0 py-10 text-center md:w-[50%]">
        <CardHeader>Welcome to "clipboard-as-chat" app</CardHeader>
        <CardContent className="flex w-full flex-col justify-center gap-3 sm:flex-row sm:items-center">
          <Button asChild>
            <Link to="/create">Create session</Link>
          </Button>
          <Button variant="outline">Connect to session</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export { Home };
