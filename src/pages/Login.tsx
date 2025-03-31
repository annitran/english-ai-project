import { MailOpen } from "lucide-react"
 
import { Button } from "@/components/ui/button"

export default function Login() {
  return <>
        <h1>Login</h1>
    <Button>
        <MailOpen /> Login with Email
    </Button>
    </>
}