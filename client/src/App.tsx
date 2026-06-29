import { ThemeProvider } from "./Provider/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/queryClient";
import AuthInitializer from "./components/AuthInitializer/AuthInitializer";
import AppRoutes from "./components/AppRoutes/AppRoutes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthInitializer>
          <AppRoutes />
        </AuthInitializer>
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
