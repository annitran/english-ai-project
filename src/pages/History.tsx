import { useAuth } from '../contexts/AuthContext'

const history = [
    {
      title: "thông tin cá nhân",
    }, {
      title: "chào hỏi",
    }, {
      title: "thông tin cá nhân",
    },
  ]

export default function History() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="text-center mt-10">
        <div role="alert" className="alert alert-vertical sm:alert-horizontal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Login to view your history!</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td className="font-medium">{index + 1}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
