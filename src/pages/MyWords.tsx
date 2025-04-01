import { Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const words = [
    {
        word: "name",
        mean: "tên"
    },
    {
        word: "hello",
        mean: "xin chào"
    },
    {
        word: "smartphone",
        mean: "điện thoại thông minh"
    },
]

export default function MyWords() {
  return (
    <div className="px-5">
        {words.map((item, index) => (
            <Alert key={ index } className="max-w-100 mb-5">
                <Terminal className="h-4 w-4" />
                <AlertTitle>{ item.word }</AlertTitle>
                <AlertDescription>
                    { item.mean }
                </AlertDescription>
            </Alert>
        ))}
    </div>
  )
}
