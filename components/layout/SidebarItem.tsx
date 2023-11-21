import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {IconType} from "react-icons"
import { BsDot } from 'react-icons/bs';
interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?:boolean,
  alert?: boolean;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,href,icon:Icon,onClick,auth,alert
}) => {

  const {data: currentUser} = useCurrentUser()
  const router = useRouter();
  const loginModal = useLoginModal()

  const handleClick = useCallback(()=>{
    if(onClick){
      return onClick();
    }
    if (auth && !currentUser){
      loginModal.onOpen()
    }
    else if(href){
      router.push(href)
    }
  },[router,onClick,href, currentUser, auth])

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
    <div className='
    relative
    rounded-full
    h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer xl:hidden'>
      <Icon size={28} color="white"/>
    </div>
    <div className="relative hidden xl:flex items-center justify-center gap-4 p-4 rounded-full items hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
    <Icon size={28} color="white"/>
    {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
    <p className="hidden lg:block text-white text-xl -mt-1 pr-2">{label}</p>
    </div>
      </div>
  )
}

export default SidebarItem