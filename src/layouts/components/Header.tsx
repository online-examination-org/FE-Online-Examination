import { Logo, LogoutIcon, ProfileIcon } from '@/assets/logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

function Header() {
  return (
    <div className='fixed top-0 left-0 right-0 h-[56px] border-b z-50 bg-white'>
      <div className='lg:w-[1128px] w-full h-full lg:px-0 px-[24px] mx-auto flex items-center justify-between'>
        <div className='flex gap-[24px] items-center'>
          <Logo />
          <Input
            type='text'
            id='search'
            placeholder='Search'
            className='lg:w-[300px] lg:focus:w-[480px] lg:transition-all lg:duration-300'
          />
        </div>
        <div className='flex items-center gap-[24px]'>
          <Button>Create</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className='cursor-pointer'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className='gap-[8px] cursor-pointer'>
                  <ProfileIcon />
                  My profile
                </DropdownMenuItem>
                <DropdownMenuItem className='gap-[8px] cursor-pointer'>
                  <LogoutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Header
