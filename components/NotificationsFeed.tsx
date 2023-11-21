import useCurrentUser from "@/hooks/useCurrentUser"
import useNotifications from "@/hooks/useNotifications";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useMemo } from "react";
import { BsTwitter } from "react-icons/bs";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  const createdAt = useMemo(()=> (i:number)=> {
    
    if(!fetchedNotifications[i]?.createdAt){
      return null
    }
    return formatDistanceToNowStrict(new Date(fetchedNotifications[i]?.createdAt))
  },[fetchedNotifications[0]?.createdAt])


  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    )
  }

  return ( 
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>,i:number) => (
        <div key={notification.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800 justify-between">
          <div className="flex gap-4 items-center">
          <BsTwitter color="white" size={32} />
          <p className="text-white">
            {notification.body}
          </p>
          </div>
          <span className="text-neutral-500 text-sm">
              {createdAt(i)} ago
            </span>
        </div>
        ))}
    </div>
   );
}
export default NotificationsFeed;