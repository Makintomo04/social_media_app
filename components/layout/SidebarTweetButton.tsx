import useLoginModal from '@/hooks/useLoginModal'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import {FaFeather} from "react-icons/fa"
const SidebarTweetButton = () => {

  const router = useRouter()
const loginModal = useLoginModal()

  const handleClick = useCallback(()=>{
    loginModal.onOpen()
  },[loginModal])

  return (
    <div onClick={handleClick}>
      <div className="mt-6 xl:hidden rounded-full
      w-14
      p-4
      flex
      item-center
      justify-center
      bg-emerald-500
      hover:bg-opacity-80
      transition
      cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 hidden xl:block rounded-full
      px-4
      py-4
      bg-emerald-500
      hover:bg-opacity-90
      transition
      cursor-pointer">
        <p className="hidden xl:block text-center text-white font-semibold text-[20px]">Tweet</p>
      </div>
    </div>
  )
}

export default SidebarTweetButton