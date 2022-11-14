import React from "react";
import Comment from "./Comment";
function CommentList({ comments, isShowChildComment, ...props }) {

  return comments.map((comment) => (
    <div key={comment.message}>
      <Comment {...comment} isShowChildComment={isShowChildComment} />
    </div>
  ));
}

export default CommentList;
