import { Textarea } from "@/components/ui/textarea"

function Chat() {
    return <>
        <div className="flex flex-col items-center justify-start min-h-screen w-full px-4 pt-40">
            <h1 className="text-center font-bold text-2xl mb-4">What can I help with?</h1>
            <Textarea className="w-full max-w-3xl px-3 py-3" placeholder="Any question..."></Textarea>
        </div>
    </>
}

export default Chat
