import { FC } from 'react'
import CommentItem from './CommentItem';

interface CommentFeedProps {
  comments?:Record<string,any>[];
}

const CommentFeed: FC<CommentFeedProps> = ({comments = []}) => {
  return (
      <div className="">
        {comments.map((comment: Record<string,any>,)=>(
          <CommentItem key={comment.id} data={comment}/>
        ))}
      </div>
    )
}

export default CommentFeed