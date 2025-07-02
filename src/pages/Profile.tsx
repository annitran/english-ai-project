import { useAuth } from '../contexts/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="text-center mt-10">
        <div role="alert" className="alert alert-vertical sm:alert-horizontal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Login to view your profile!</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-base-100 shadow rounded">

        <div className="space-y-4">
          <div>
            <p className="font-semibold">Name: {user.name}</p>
          </div>
          <div>
            <p className="font-semibold">Email: {user.email}</p>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button className="btn btn-outline">Edit Profile</button>
        </div>
      </div>
    </>
  )
}
