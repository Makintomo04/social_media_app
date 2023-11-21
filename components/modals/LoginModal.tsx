import useLoginModal from '@/hooks/useLoginModal'
import { FC, useCallback, useEffect, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { useSession, signIn } from "next-auth/react"
import {toast} from "react-hot-toast"
// interface LoginModalProps {
  
// }

const LoginModal = () => {

const loginModal = useLoginModal();
const registerModal = useRegisterModal();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [isLoading,setIsLoading] = useState(false);
const [disableLogin,setDisableLogin] = useState(false);

useEffect(()=>{
if(email.length===0 || password.length===0){
  setDisableLogin(true)
}else{
  setDisableLogin(false)
}
},[password,email])

const onToggle = useCallback(() => {
  if(isLoading){
    return
  }
  loginModal.onClose()
  registerModal.onOpen()
  
},[isLoading,registerModal,loginModal])

const onSubmit = useCallback(async () => {
  try {
    setIsLoading(true)
    await signIn("credentials",{
      email, password
    })
    toast.success("success.")
    loginModal.onClose()
  } catch (error) {
    toast.error("Couldn't find account.")
    console.log(error);
  } 
  finally{
    setIsLoading(false)
  }
},[loginModal,email,password])

const bodyContent = (
  <div className='flex flex-col gap-4'>
    <Input 
      placeholder="email"
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
      disabled={isLoading}
    />
    <Input 
      placeholder="Password"
      onChange={(e)=>setPassword(e.target.value)}
      value={password}
      type="password"
      disabled={isLoading}
    />
  </div>
)

const footerContent = (
  <div className="text-neutral-400 text-center mt-4">
    <p>First time using Tweety?
      <span onClick={onToggle} className='text-white cursor-pointer hover:underline font-semibold'> Create an account</span>
    </p>
  </div>
)

  return(
  <Modal
    disabled={isLoading}
    title="Login"
    actionLabel='Sign In'
    isOpen={loginModal.isOpen}
    onClose={loginModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    footer={footerContent}
    disableLogin={disableLogin}
  />  
    
  )
}

export default LoginModal