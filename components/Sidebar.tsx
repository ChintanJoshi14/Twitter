import React from 'react'
import {HomeIcon, BellIcon, HashtagIcon, BookmarkIcon, CollectionIcon, DotsCircleHorizontalIcon, MailIcon, UserIcon} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className='demo'>
        <img className='m-3 h-10 w-10 object-contain cursor-pointer' src="https://links.papareact.com/drq" alt="this is twitter logo" />
        <SidebarRow Icon={HomeIcon} text="Home" />
        <SidebarRow Icon={HashtagIcon} text="Explore" />
        {session && (
          <div className='demo px-0'>
        <SidebarRow Icon={BellIcon} text="Notifications" />
        <SidebarRow Icon={MailIcon} text="Messages" />
        <SidebarRow Icon={BookmarkIcon} text="Bookmarks" />
        <SidebarRow Icon={CollectionIcon} text="Lists" />
        </div>
        )
        }
        {/* we'll use them once we setup sign in funcitonality */}
        <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} text={session ? "Sign Out" : "Sign In"} />
        {session && <SidebarRow Icon={DotsCircleHorizontalIcon} text="More" />}
    </div>
  )
}

export default Sidebar