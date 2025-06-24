import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import api from '../services/api'

type Word = {
  id: number
  word: string
  meaning: string
}

export default function MyWords() {
  const { user } = useAuth()
  const [words, setWords] = useState<Word[]>([])

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await api.get('/users/words') // GET /api/v1/users/words
        setWords(res.data.words)
      } catch (err) {
        console.error('Failed to fetch words:', err)
      }
    }

    if (user) fetchWords()
  }, [user])

  if (!user) {
    return (
      <div className="text-center mt-10">
        <div role="alert" className="alert alert-vertical sm:alert-horizontal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Login to view your word list!</span>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>No.</th>
            <th>Word</th>
            <th>Mean</th>
          </tr>
        </thead>
        <tbody>
          {words.map((item, index) => (
            <tr key={item.id}>
              <td className="font-medium">{index + 1}</td>
              <td>{item.word}</td>
              <td>{item.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
