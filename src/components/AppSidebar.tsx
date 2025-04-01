import { Link } from 'react-router-dom'
import { Inbox, History, BookOpenText, User } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
      title: "Chat",
      url: "/",
      icon: Inbox,
    },
    {
      title: "My Words",
      url: "/mywords",
      icon: BookOpenText,
    },
    {
      title: "History",
      url: "/history",
      icon: History,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ]

function AppSidebar() {
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>English App</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className='flex items-center space-x-2'>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }

export default AppSidebar
