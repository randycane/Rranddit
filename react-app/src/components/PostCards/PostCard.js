import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, NavLink } from "react-router-dom";
//import PostDetailComponent from "../PostDetails/PostDetails";
import "./PostCard.css";

const PostCardComponent = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const postDetailPage = (postId) => {
    let path = `/posts/${postId}`;
    history.push(path);
  };

  const subrandditPage = (subrandditId) => {
    let path = `/r/${subrandditId}`;
    history.push(path);
  };

  const usersProfilePage = (userId) => {
    let path = `/user/${userId}`;
    history.push(path);
  };
  //console.log("post number", post.id);
  // console.log("post targeted", postId);
  return (
    <div className="post-top" key={post.id}>
      <div className="post-each">
        <div
          className="postSubrandditName"
          onClick={(e) => subrandditPage(post.subranddit_id)}
        >
          r/{post.subranddit_name}
        </div>
        <div
          className="postUsername"
          onClick={(e) => usersProfilePage(post.user_id)}
        >
          Posted by u/{post.username}
        </div>
        <div className="undercard" onClick={(e) => postDetailPage(post.id)}>
          <div className="postTitle">{post.post_title}</div>

          <div className="post-words">{post?.post_text}</div>
          <div className="post-img">
            <img
              className="img-pic"
              src={post?.img_url}
              alt="n/a"
              onError={(e) => {
                e.currentTarget.src =
                  "https://res.cloudinary.com/teepublic/image/private/s--n4uagiOn--/c_crop,x_10,y_10/c_fit,h_799/c_crop,g_north_west,h_1051,w_1051,x_-171,y_-121/l_upload:v1507037314:production:blanks:gbajnunp66ec7xftnpq1/fl_layer_apply,g_north_west,x_-276,y_-220/b_rgb:ffffff/c_limit,f_jpg,h_630,q_90,w_630/v1539384919/production/designs/3309274_0.jpg";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardComponent;
