'use client';

import { Avatar, AvatarFallback } from '@monorepo-starter/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@monorepo-starter/ui/components/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@monorepo-starter/ui/components/sidebar';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { ChevronsUpDown, LogIn, LogOut, Search, UserRoundIcon } from 'lucide-react';
import { useState } from 'react';
import { type AuthorizationPayload } from '~/lib/auth/check';
import { signoutAction } from '~/lib/auth/signout';
import { useSigninUrl } from './use-signin';

export function NavUser({ payload }: { payload?: AuthorizationPayload }) {
  const { isMobile } = useSidebar();
  const { handleClickSignin } = useSigninUrl();
  const [isOpen, setIsOpen] = useState(false);

  const Profile = () => (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarFallback className={cn(payload ? 'bg-blue-300 text-blue-900' : 'bg-gray-300')}>
          {payload ? (
            payload.sub?.charAt(0).toUpperCase()
          ) : (
            <UserRoundIcon size={16} className="opacity-60" aria-hidden="true" />
          )}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="text-foreground/70 truncate font-semibold">{payload ? payload.sub : 'Guest'}</span>
        {payload && <span className="truncate text-xs">test@gmail.com</span>}
      </div>
    </>
  );

  // 검색 키 이벤트 핸들러
  const handleClickOpenSearch = () => {
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true });
    document.dispatchEvent(event);
  };

  const handleClickLogout = () => {
    signoutAction();
  };

  const handleClickLogin = () => {
    handleClickSignin();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Profile />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Profile />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleClickOpenSearch}>
                <Search />
                검색
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClickLogout} className={payload ? '' : 'hidden'} disabled={!payload}>
                <LogOut />
                로그아웃
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClickLogin} className={payload ? 'hidden' : ''} disabled={!!payload}>
                <LogIn />
                로그인
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
