import useLoginModal from '@/hooks/useLoginModal'
import { FC, useCallback, useEffect, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from "axios"
import {toast} from "react-hot-toast"
import { useSession, signIn, signOut } from "next-auth/react"
// interface LoginModalProps {
  
// }

const RegisterModal = () => {
  const { data: session } = useSession()
const loginModal = useLoginModal();
const registerModal = useRegisterModal();

const [email,setEmail] = useState("");
const [name,setName] = useState("");
const [username,setUsername] = useState("");
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
  if(registerModal.isOpen){
    registerModal.onClose()
    loginModal.onOpen()
  }
},[isLoading,registerModal,loginModal])

const onSubmit = useCallback(async () => {
  try {
    setIsLoading(true)

    await axios.post("/api/register", {
      email,
      password,
      username,
      name
    })
    toast.success("Account created.")
    signIn("credentials", {
      email,password
    })
    registerModal.onClose()
  } catch (error) {
    toast.error("Something went wrong.")
    console.log(error);
  } 
  finally{
    setIsLoading(false)
  }
},[email, password, registerModal, username, name])

const bodyContent = (
  <div className='flex flex-col gap-4'>
    <Input 
      placeholder="email"
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
      disabled={isLoading}
    />
    <Input 
      placeholder="name"
      onChange={(e)=>setName(e.target.value)}
      value={name}
      disabled={isLoading}
    />
    <Input 
      placeholder="username"
      onChange={(e)=>setUsername(e.target.value)}
      value={username}
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
    <p>Already have an account?
      <span onClick={onToggle} className='text-white cursor-pointer hover:underline font-semibold'> Sign in</span>
    </p>
  </div>
)

  return (
    <Modal
      disabled={isLoading}
      title="Create an account"
      actionLabel='Register'
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
      disableLogin={disableLogin}
    />  
  )
}

export default RegisterModal