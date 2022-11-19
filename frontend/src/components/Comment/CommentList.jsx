import {memo} from "react";
import Comment from "./Comment";
function CommentList({ comments, isShowChildComment, post_id, ...props }) {
  return comments.map((comment) => (
    <div key={comment.post_comment_id}>
      <Comment
        {...comment}
        post_id={post_id}
        isShowChildComment={isShowChildComment}
      />
    </div>
  ));
}

export default memo(CommentList);
