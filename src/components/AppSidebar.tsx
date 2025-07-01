
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  Home, 
  Clock, 
  Map, 
  BookOpen, 
  Zap,
  Sparkles
} from 'lucide-react';

const navigationItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Cosmic Timeline', url: '/timeline', icon: Clock },
  { title: 'Star Map Explorer', url: '/starmap', icon: Map },
  { title: 'Cosmic Storybook', url: '/storybook', icon: BookOpen },
  { title: 'Event Simulator', url: '/simulator', icon: Zap },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="border-r border-purple-500/20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-300 font-bold text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {!collapsed && 'Cosmic Chronicles'}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-purple-600/30 text-purple-200 border border-purple-500/30' 
                            : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-200'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
