import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import { sendMess, getMessagesByHistoryId } from '../services/auth'
import { useSearchParams } from 'react-router-dom'
import type { IChat } from '../services/auth'

export default function Chat() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<IChat[]>([])
  const [input, setInput] = useState('')
  const [historyId, setHistoryId] = useState<number | null>(null)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const idParam = searchParams.get('history_id')
    if (idParam) {
      const id = parseInt(idParam)
      setHistoryId(id)
      getMessagesByHistoryId(id).then(res => setMessages(res.data.messages))
    } else {
    setMessages([])
    setHistoryId(null)
    }
  }, [searchParams])

  const handleSend = async () => {
    if (!input.trim()) return

    try {
      const res = await sendMess({
        message: input,
        history_id: historyId || 0,
      })
      setMessages((prev) => [...prev, ...res.data.messages])
      setInput('')
      if (!historyId) {
        setHistoryId(res.data.history_id) // Lưu lại ID để tiếp tục đoạn này
      }
    } catch (err) {
      console.error('Send message failed:', err)
    }
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold mb-4">What can I help with?</h1>
        <textarea
          placeholder="Please login to start..."
          className="textarea textarea-bordered w-full text-base"
          rows={3}
          disabled
        />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${(msg.is_bot) ? 'chat-start' : 'chat-end'}`}
          >
            <div className="chat-bubble">{msg.message}</div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-base-100 sticky bottom-0">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="textarea textarea-bordered w-full"
          rows={2}
        />
        <div className="mt-2 text-right">
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="btn btn-primary"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
