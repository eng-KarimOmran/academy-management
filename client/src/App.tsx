import { ThemeProvider } from "./Provider/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/queryClient";
import AuthInitializer from "./features/auth/components/AuthInitializer";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "sonner";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthInitializer>
            <AppRoutes />
          </AuthInitializer>
          <Toaster richColors position="top-center" />
        </TooltipProvider>
      </ThemeProvider>
      <ReactQueryDevtools
        position="left"
        buttonPosition="bottom-left"
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
}

export default App;