import useSWR from "swr"
import fetcher from "@/lib/fetcher"
import useCurrentUser from "./useCurrentUser"
import useUser from "./useUser"
import useLoginModal from "./useLoginModal"
import { useCallback, useMemo } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

const useFollow = (userId:string) => {

  const {data: currentUser, mutate: mutateCurrentUser} = useCurrentUser()
  const {mutate: mutateFetchedUser} = useUser(userId)
  const loginModal = useLoginModal();

  const isFollowing = useMemo(()=>{
    const list = currentUser?.followingIds || []
    console.log(list,"asfasfasf");
    return list.includes(userId)
  },[userId,currentUser])
  
  const toggleFollow = useCallback(async()=>{
    if(!currentUser){
      loginModal.onOpen()
    }
      try {
        console.log("following: ",isFollowing);
        let request;
        if(!isFollowing){
          request = () => axios.post("/api/follow",{userId})
        }else{
          request = () => axios.delete("/api/follow",{data:{userId}})
        }
        await request();
        mutateCurrentUser();
        mutateFetchedUser();
        console.log("222222",currentUser);
        // toast.success("success")
      } catch (error) {
        toast.error("Something went wrong")
      }
    
    
  },[loginModal,currentUser,isFollowing,mutateCurrentUser,mutateFetchedUser,userId])

  return {
    isFollowing,
    toggleFollow
  }
}
export default useFollow;