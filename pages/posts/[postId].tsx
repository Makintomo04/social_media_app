import Form from '@/components/Form'
import Header from '@/components/Header'
import CommentFeed from '@/components/posts/CommentFeed'
import PostItem from '@/components/posts/PostItem'
import useCurrentUser from '@/hooks/useCurrentUser'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { ClipLoader } from 'react-spinners'

interface PostIdProps {
  
}

const PostView: FC<PostIdProps> = ({}) => {
  const router = useRouter()
  console.log(router.query);
  const {postId} = router.query
  const {data: post, mutate:mutatePostData,isLoading} = usePost(postId as string)
  const {data:currentUser} = useCurrentUser()
  if(isLoading || !post){
    return(
      <div className="flex justify-center items-center h-full">
        <ClipLoader color='lightblue' size={80}/>
      </div>
    )
  }
  return (
    <>
    <Header label="Tweet" showBackArrow/>
    <PostItem data={post} />
    <Form isComment postId={post.id} placeholder='Tweet your reply'/>
    <CommentFeed comments={post?.comments}/>
    </>
  )
}

export default PostView