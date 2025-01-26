import { ThemeProvider } from "./context/theme-provider";
import Layout from "./layout/layout";
import Dashboard from "./pages/weatherDashboard";
import City from "./pages/cityPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="dark">
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/city/:cityName" element={<City />} />
              </Routes>
            </Layout>
            <Toaster richColors />
          </ThemeProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
