import { useAuth } from '../contexts/AuthContext'

export default function Chat() {
  const { user } = useAuth()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">What can I help with?</h1>

      <textarea
        placeholder="Any question..."
        className="textarea textarea-bordered w-full text-base"
        rows={3}
        disabled={!user}
      />
    </div>
  )
}
