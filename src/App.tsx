import AppRouter from "./routes/AppRouter";
import AppSidebar from "./components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import Login from "./pages/Login";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarTrigger/>
        <div className="flex flex-1 flex-col w-full">
          <main className="flex flex-1 flex-col w-full">
            { children }
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function App() {

  return (
    <Layout>
      <div>
        <Login/>
      </div>
      <div>
        <AppRouter />
      </div>
    </Layout>
  )
}

export default App
