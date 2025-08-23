import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import { sendMess, getHistoryMessages } from '../services/auth'
import { useParams, useNavigate } from 'react-router-dom'
import type { IChat } from '../services/auth'

export default function Chat() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<IChat[]>([])
  const [input, setInput] = useState('')
  const [historyId, setHistoryId] = useState<number | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  // Load messages khi có id (history cũ)
  useEffect(() => {
    if (id) {
      const hId = parseInt(id)
      setHistoryId(hId)
      getHistoryMessages(hId)
        .then(res => {
          setMessages(res.data.messages || [])
        })
        .catch(err => {
          console.error('Load history failed:', err)
        })
    } else {
      setMessages([])
      setHistoryId(null)
    }
  }, [id])

  const handleSend = async () => {
    if (!input.trim()) return

    try {
      const res = await sendMess({
        message: input,
        history_id: historyId || 0, // nếu id = 0 thì BE tự tạo history mới
      })

      // append message user + bot
      setMessages((prev) => [...prev, ...res.data.messages])
      setInput('')

      // nếu chưa có history thì tạo mới + redirect
      if (!historyId) {
        setHistoryId(res.data.history_id)
        window.dispatchEvent(new Event('history:refresh'))
        navigate(`/chat/${res.data.history_id}`)
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
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${msg.is_bot ? 'chat-start' : 'chat-end'}`}
          >
            <div className="chat-bubble">{msg.message}</div>
          </div>
        ))}
      </div>

      {/* Input */}
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
