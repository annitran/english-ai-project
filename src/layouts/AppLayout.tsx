import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AppSidebar from '@/components/AppSidebar'

export default function AppLayout() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) return <div className="text-center p-8"></div>

  return (
    <div className="drawer lg:drawer-open">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="navbar bg-base-300 px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="app-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>

          <div className="flex-1 font-bold text-lg">English App</div>
          <div className="hidden lg:flex gap-2">
            {!user ? (
              <>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/login')}>Log In</button>
                <button className="btn btn-outline btn-sm" onClick={() => navigate('/register')}>Sign Up</button>
              </>
            ) : (
              <>
                <button className="btn btn-error btn-sm" onClick={() => navigate('/logout')}>Log Out</button>
              </>
            )}
          </div>
        </div>

        <main className="p-4 flex-1">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="app-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <AppSidebar />
        </ul>
      </div>
    </div>
  )
}

