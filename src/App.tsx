import AppRouter from "./routes/AppRouter";
import AppSidebar from "./components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarTrigger/>
        <main className="flex flex-1 flex-col items-center justify-center w-full">
          { children }
        </main>
      </div>
    </SidebarProvider>
  )
}

function App() {

  return (
    <Layout>
      <div>
        <AppRouter />
      </div>
    </Layout>
  )
}

export default App
