import {memo} from "react";
import Comment from "./Comment";
function CommentList({ comments, isShowChildComment, post_id,seeAllComment,totalElement, ...props }) {
  return comments.map((comment) => (
    <div key={comment.post_comment_id}>
      <Comment
        {...comment}
        post_id={post_id}
        seeAllComment= {seeAllComment}
        isShowChildComment={isShowChildComment}
        totalElement= {totalElement}
      />
    </div>
  ));
}
export default memo(CommentList);
