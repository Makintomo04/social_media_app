import React, { useCallback } from 'react'
import {AiOutlineClose} from "react-icons/ai"
import Button from './Button';
import { cn } from '@/lib/utils';


interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  disableLogin?:boolean;
  isEdit?:boolean;
}
const Modal:React.FC<ModalProps> = ({isOpen,onClose,onSubmit,title,body,footer,actionLabel,disabled,disableLogin,isEdit}) => {
  const handleClose = useCallback(() => {
    if(disabled){
      return
    }
    onClose();
  },[disabled, onClose])

  const handleSubmit = useCallback(() => {
    if(disabled){
      return
    }
    onSubmit();
  },[disabled,onSubmit])

if(!isOpen){
  return null
}

  return (
    <>
    <div className="
    justify-center
    items-center
    flex
    overflow-x-hidden
    overflow-y-auto
    fixed
    inset-0
    z-50
    outline-none
    focus:outline-none
    bg-neutral-800
    bg-opacity-70
    ">
        <div className="
        relative
        w-full
        lg:w-3/6
        my-6
        mx-auto
        lg:max-w-3xl
        h-full
        lg:h-auto
        ">
          <div className="
          h-full
          lg:h-auto
          border-0
          rounded-lg
          shadow-lg
          relative
          flex-col
          bg-black
          w-full
          outline-none
          focus:outline-none
          ">
            <div className="
            flex
            items-center
            justify-between
            p-10
            rounded-t
            ">
              {isEdit &&<button
              className="p-1  border-0 text-white hover:opacity-20 transition"
              onClick={handleClose}>
                <AiOutlineClose size={20} color="white"/>
              </button>}
              <h3 className={cn(isEdit && "mr-auto ml-6","text-2xl font-semibold text-white")}>{title}</h3>
              {!isEdit &&<button
              className="p-1 ml-auto border-0 text-white hover:opacity-20 transition"
              onClick={handleClose}>
                <AiOutlineClose size={20} color="white"/>
              </button>}
              {isEdit && <div className="flex flex-col gap-2">
              <Button disabled={disabled} label={actionLabel} secondary fullWidth onClick={handleSubmit} disableLogin={disableLogin}/>
            {footer}
            </div>}
            </div>
            <div className="relative p-10 flex-auto">
              {body}
            </div>
            {!isEdit && <div className="flex flex-col gap-2 p-10">
              <Button disabled={disabled} label={actionLabel} secondary large fullWidth onClick={handleSubmit} disableLogin={disableLogin}/>
            {footer}
            </div>}
          </div>
        </div>
    </div>
    </>
  )
}

export default Modal