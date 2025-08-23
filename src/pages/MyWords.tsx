import { useEffect, useState } from "react"
import { getWords, createWord, updateWord, deleteWord } from "../services/auth"
import type { IWord } from "../services/auth"

export default function Words() {
  const [words, setWords] = useState<IWord[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  // state cho add
  const [newWord, setNewWord] = useState("")
  const [newMean, setNewMean] = useState("")
  const [newExample, setNewExample] = useState("")

  // state cho edit
  const [editWordData, setEditWordData] = useState<IWord | null>(null)

  // state cho search
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchWords()
  }, [search])

  const fetchWords = async () => {
    try {
      const res = await getWords(search)
      setWords(res.data.words)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAdd = async () => {
    if (!newWord.trim()) return
    try {
      const res = await createWord({ word: newWord, meaning: newMean, example: newExample })
      setWords([...words, res.data.word])
      setNewWord("")
      setNewMean("")
      setNewExample("")
      setShowAddModal(false) // đóng modal sau khi add
    } catch (err) {
      console.error(err)
    }
  }

  const handleEdit = async () => {
    if (!editWordData) return
    try {
      const res = await updateWord(editWordData.id, {
        word: editWordData.word,
        meaning: editWordData.meaning,
        example: editWordData.example,
      })
      setWords(words.map(w => w.id === res.data.word.id ? res.data.word : w))
      setEditWordData(null)
      setShowEditModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xoá từ này?")) return
    try {
      await deleteWord(id)
      setWords(words.filter(w => w.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="overflow-x-auto">
      {/* Search */}
      <label className="input input-sm mb-10">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          required
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
      </label>

      {/* Nút mở modal Add */}
      <button
        className="btn btn-primary mb-10"
        onClick={() => setShowAddModal(true)}
      >
        Add
      </button>

      {/* Modal Add */}
      {showAddModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add New Word</h3>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Word"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Meaning"
                value={newMean}
                onChange={(e) => setNewMean(e.target.value)}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Example"
                value={newExample}
                onChange={(e) => setNewExample(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleAdd}>
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Table */}
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th></th>
            <td>Word</td>
            <td>Mean</td>
            <td>Example</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {words.map((w, idx) => (
            <tr key={w.id}>
              <th>{idx + 1}</th>
              <td>{w.word}</td>
              <td>{w.meaning}</td>
              <td>{w.example}</td>
              <td>
                <button
                  onClick={() => {
                    setEditWordData(w)
                    setShowEditModal(true)
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(w.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Edit */}
      {showEditModal && editWordData && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Word</h3>

            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={editWordData.word}
                onChange={(e) => setEditWordData({ ...editWordData, word: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={editWordData.meaning}
                onChange={(e) => setEditWordData({ ...editWordData, meaning: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={editWordData.example}
                onChange={(e) => setEditWordData({ ...editWordData, example: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleEdit}>
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}
