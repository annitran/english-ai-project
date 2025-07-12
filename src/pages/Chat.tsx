import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import { getAllMess, sendMess } from '../services/auth'
import type { IChat } from '../services/auth'

export default function Chat() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<IChat[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getAllMess()
        setMessages(res.data.messages)
      } catch (err) {
        console.error('Failed to fetch messages:', err)
      }
    }

    if (user) fetchMessages()
  }, [user])

  const handleSend = async () => {
    if (!input.trim()) return

    try {
      const res = await sendMess({
        message: input,
      })
      setMessages(res.data)
      setInput('')
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
