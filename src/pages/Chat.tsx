import { Textarea } from "@/components/ui/textarea"

function Chat() {
    return <>
        <div className="flex flex-col items-center justify-center w-full max-w-3xl h-screen">
            <h1 className="text-center font-bold text-2xl">Can I help you?</h1>
            <Textarea className="w-full min-w-[600px] px-3 py-3" placeholder="Any question..."></Textarea>
        </div>
    </>
}

export default Chat
