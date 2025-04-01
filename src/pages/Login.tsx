import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 
export default function Login() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end space-x-1 p-4">
            <Button>Log In</Button>
            <Button variant="secondary">Sign Up</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log In</DialogTitle>
          <DialogDescription>
            Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="Pedro Duarte" className="col-span-3"/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" placeholder="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// import { Button } from "@/components/ui/button"
// import { Link } from 'react-router-dom'

// export default function Login() {
//   return (
//     <div className="flex justify-end space-x-1 p-4">
//         <Button>
//             <Link to="/login">Log In</Link>
//         </Button>
//         <Button variant="secondary">Sign Up</Button>
//     </div>
//   )
// }
