import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { wordGetList } from '../services/auth'
import type { IWord } from '../services/auth'

export default function MyWords() {
  const { user } = useAuth()
  const [words, setWords] = useState<IWord[]>([])

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await wordGetList()
        setWords(res.data.words)
      } catch (err) {
        console.error('Failed to fetch words:', err)
      }
    }

    if (user) fetchWords()
  }, [user])

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
