import React from 'react'
import {BsHouseFill, BsBellFill,} from "react-icons/bs"
import {HiUser} from "react-icons/hi"
import {HiMiniBell} from "react-icons/hi2"
import {RiHome7Fill,RiLogoutCircleLine} from "react-icons/ri"
import {BiLogOut} from "react-icons/bi"
import SidebarLogo from '../SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTweetButton from './SidebarTweetButton'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from "next-auth/react"
const Sidebar = () => {
  const {data:currentUser} = useCurrentUser()
 const items = [
    {
      label:"Home",
      href:"/",
      icon: RiHome7Fill,
    },
    {
      label:"Notifications",
      href:"/notifications",
      icon: HiMiniBell,
      auth:true,
      alert:currentUser?.hasNotification
    },
    {
      label:"Profile",
      href:`/users/${currentUser?.id}`,
      icon: HiUser,
      auth:true
    },

  ]
  console.log(currentUser);
  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className="flex flex-col items-end">
        <div className="space-y-2 xl:w-[230px]">
          <SidebarLogo/>
          {items.map((item)=>(<SidebarItem key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          auth={item.auth}
          alert={item.alert}
          />))}
          {currentUser && <SidebarItem onClick={signOut} icon={RiLogoutCircleLine} label="Logout"/>}
          <SidebarTweetButton/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
