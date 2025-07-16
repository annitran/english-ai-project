import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import api from '../services/api'

type IHistory = {
  id: number
  title: string
}

export default function History() {
  const { user } = useAuth()
  const [histories, setHistories] = useState<IHistory[]>([])

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const res = await api.get<{ histories: IHistory[] }>('/histories')
        setHistories(res.data.histories)
      } catch (err) {
        console.error('Failed to load history:', err)
      }
    }

    if (user) fetchHistories()
  }, [user])

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
          {histories.map((item, index) => (
            <tr key={item.id}>
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
