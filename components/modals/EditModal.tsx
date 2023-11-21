import { FC, useCallback, useEffect, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { useSession, signIn } from "next-auth/react"
import {toast} from "react-hot-toast"
import useEditModal from '@/hooks/useEditModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import ImageUpload from '../ImageUpload';
// interface editModalProps {
  
// }

const EditModal = () => {

  const {data: currentUser} = useCurrentUser();
  const {mutate: mutateFetchedUser} = useUser(currentUser?.id)
  const editModal = useEditModal();

  const [profileImage,setProfileImage] = useState("");
  const [coverImage,setCoverImage] = useState("");
  const [name,setName] = useState("");
  const [username,setUsername] = useState("");
  const [bio,setBio] = useState("");
  const [location,setLocation] = useState("");


  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
    setLocation(currentUser?.location);
    console.log(username);
  }, [currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.location
  ])
  
  const [isLoading,setIsLoading] = useState(false);
  
  const onSubmit = useCallback(async()=>{
    try {
      setIsLoading(true)
      await axios.patch("/api/edit",{
        name,
        username,
        bio,
        profileImage,
        coverImage,
        location
      });
      mutateFetchedUser();
      toast.success("Updated");
      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong")
    } finally{
      setIsLoading(false)
    }
  },[name, username, bio, profileImage,location, coverImage, editModal,mutateFetchedUser])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <ImageUpload value={profileImage} disabled={isLoading} onChange={(image)=>setProfileImage(image)} label="Upload profile image"/>
      <ImageUpload value={coverImage} disabled={isLoading} onChange={(image)=>setCoverImage(image)} label="Upload cover image" cover={true}/>
      <Input
      placeholder='Name'
      onChange={(e)=>setName(e.target.value)}
      value={name}
      disabled={isLoading}
      />
      <Input
      placeholder='Bio'
      onChange={(e)=>setBio(e.target.value)}
      value={bio}
      disabled={isLoading}
      />
      <Input
      placeholder='Location'
      onChange={(e)=>setLocation(e.target.value)}
      value={location}
      disabled={isLoading}
      />
    </div>
  )

  return(
  <Modal
    disabled={isLoading}
    title="Edit profile"
    actionLabel='Save'
    isOpen={editModal.isOpen}
    onClose={editModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    isEdit
  />  
    
  )
}

export default EditModal