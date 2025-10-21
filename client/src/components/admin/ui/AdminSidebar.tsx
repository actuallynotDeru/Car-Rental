import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import {
  ChevronRight,
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Users,
  Car,
  Book,
} from 'lucide-react';
import React from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface SubMenuItem {
  name: string;
  href: string;
}

interface NavigationType {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  submenu?: SubMenuItem[];
}

const dashboardNavigation: NavigationType[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
];

const userNavigation: NavigationType[] = [
  {
    name: 'Users',
    href: 'users',
    icon: Users,
    submenu: [
      { name: 'All Users', href: '/admin/users' },
      { name: 'Applications', href: '/admin/application '}
    ],
  },
];

const carsNavigation: NavigationType[] = [
  {
    name: 'Cars',
    href: 'cars',
    icon: Car,
    submenu: [
      { name: 'All Cars', href: '/admin/cars' },
      { name: 'Add Car', href: '/admin/cars/create' },
    ],
  },
];

const bookingsNavigation: NavigationType[] = [
  {
    name: 'Bookings',
    href: 'bookings',
    icon: Book,
    submenu: [
      { name: 'All Bookings', href: '/admin/bookings' },
      { name: 'Add Booking', href: '/admin/bookings/create' },
    ],
  },
];

const user = {
  name: 'Admin User',
  email: 'admin@eehway.com',
  avatar: null,
};

const AdminSidebar = () => {
  const renderNavigationGroup = (
    items: NavigationType[],
    hasSubmenu: boolean = true
  ) => {
    return items.map((item) => {
      const IconComponent = item.icon;
      if (item.submenu && hasSubmenu) {
        return (
          <Collapsible key={item.name} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.name}>
                  <IconComponent size={16} />
                  <span>{item.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.submenu.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.name}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.href}>
                          <span>{subItem.name}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      }

      return (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild tooltip={item.name}>
            <a href={item.href}>
              <IconComponent size={16} />
              <span>{item.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarHeader>
          <div className="flex items-center gap-2 py-2">
            {/* Icon stays visible in collapsed state */}
            <div className="flex size-8 items-center justify-center">
              <img src="/BijouLOGO2(PINK).svg" alt="Logo" className="h-5" />
            </div>

            {/* This section hides in collapsed icon mode */}
            <div className="grid flex-1 text-left group-data-[collapsible=icon]:hidden">
              <span className="truncate text-xs font-semibold">Eehway</span>
              <span className="text-sidebar-foreground/70 truncate text-xs">
                Admin Dashboard
              </span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderNavigationGroup(dashboardNavigation, false)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderNavigationGroup(userNavigation)}
              {renderNavigationGroup(carsNavigation)}
              {renderNavigationGroup(bookingsNavigation)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {/* <SidebarGroupLabel>Customer & Analytics</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {/* {renderNavigationGroup(customerNavigation, false)}
                {renderNavigationGroup(reportsNavigation)} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/*<SidebarGroup>*/}
        {/*  <SidebarGroupLabel>System</SidebarGroupLabel>*/}
        {/*  <SidebarGroupContent>*/}
        {/*    <SidebarMenu>*/}
        {/*      {renderNavigationGroup(settingsNavigation)}*/}
        {/*    </SidebarMenu>*/}
        {/*  </SidebarGroupContent>*/}
        {/*</SidebarGroup>*/}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  tooltip={`${user.name} (${user.email})`}
                >
                  <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="size-8 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="text-sidebar-foreground/70 truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <User className="size-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="size-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 hover:text-red-700">
                  <LogOut className="size-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;