import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { History } from "lucide-react";
import { Link } from "react-router";
import { ConnectToSessionDialog } from "./ConnectToSessionDialog";
import { HomeSidebar } from "./HomeSidebar";

function Home() {
  return (
    <SidebarProvider>
      <div className="relative flex h-screen w-full justify-center pt-30">
        <HomeSidebar />
        <SidebarTrigger className="absolute top-3 left-3">
          <History />
        </SidebarTrigger>
        <div className="flex w-full justify-center">
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
      </div>
    </SidebarProvider>
  );
}

export { Home };
