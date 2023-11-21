import { useRouter } from 'next/router';
import React, { useCallback } from 'react'
import {BiArrowBack} from "react-icons/bi"
interface HeaderProps {
  showBackArrow?: boolean;
  label:string;
}
const Header: React.FC<HeaderProps> = ({label,showBackArrow}) => {
  const router = useRouter()
  const handleBack = useCallback(() => {
    router.back();
  },[router])
  return (
    <div className='border-b-[1px] border-neutral-800 p-5'>
      <div className="flex flex-row items-center gap-2 p-1">
        {
          showBackArrow && (<div className="group cursor-pointer rounded-full p-1 hover:bg-slate-300 hover:bg-opacity-10">
        
            <BiArrowBack className='cure
            sor-pointer group-hover:opacity-70 transition' size={24} onClick={handleBack} color="white"/>
          
        </div>  )
      
        }
        <p className='text-white font-semibold text-xl -mt-1'>{label}</p>
      </div>
    </div>
  )
}

export default Header