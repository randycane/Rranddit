import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSubFromIdThunk } from "../../store/subranddit";
import PostCardComponent from "../PostCards/PostCard";

import { SeePostByItsPostIdThunk, deletePostThunk } from "../../store/post";
import {
  ReadCommentsByPostThunk,
  deleteCommentThunk,
} from "../../store/comment";
import WriteACommentComponent from "../CreateComment/CreateComment";

import "./PostDetails.css";
import UpdateCommentComponent from "../UpdateComment/UpdateComment";

const PostDetailComponent = () => {
  let { postId } = useParams();
  postId = Number(postId);

  let subrandditId;
  const dispatch = useDispatch();
  const history = useHistory();

  const subrandditInfo = useSelector((state) =>
    Object.values(state?.subranddits)
  );
  const sessionPost = useSelector((state) => Object.values(state?.posts));
  const sessionUser = useSelector((state) => state.session.user);
  const sessionComments = useSelector((state) =>
    Object.values(state?.comments)
  );

  //console.log("show me comments", sessionComments);

  if (sessionPost && sessionPost.length) {
    subrandditId = sessionPost.subranddit_id;
  }
  const [openCommentEditFormId, setOpenCommentEditFormId] = useState(false);

  const [subrandditLoaded, setSubrandditLoaded] = useState(false);
  const [postLoaded, setPostLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    if (isNaN(postId)) {
      setPostLoaded(true);
    } else {
      dispatch(SeePostByItsPostIdThunk(postId)).then(() => {
        setPostLoaded(true);
        subrandditId &&
          dispatch(getSubFromIdThunk(subrandditId)).then(() => {
            setSubrandditLoaded(true);
          });
        dispatch(ReadCommentsByPostThunk(postId)).then(() => {
          setCommentsLoaded(true);
        });
      });
    }
  }, [dispatch, subrandditId, postId]);

  const subrandditPage = (subrandditId) => {
    let path = `/r/${subrandditId}`;
    history.push(path);
  };


  const createPostPage = () => {
    let path = `/submit?subranddit_id=${subrandditId}`;
    history.push(path);
  };

  const editPost = (postId) => {
    let path = `/posts/${postId}/edit`;
    history.push(path);
  };

  const deletePost = (postId) => {
    dispatch(deletePostThunk(postId));
  };

  const deleteComment = (comment) => {
    dispatch(deleteCommentThunk(comment.id));
  };

  // const homePage = () => {
  //   let path = `/`;
  //   history.push(path);
  // };

  return (
    // <h1> hello</h1>
    <div className="pageContainer">
      <div className="homePageDiv">
        <div className="rowOne">
          {postLoaded ? (
            sessionPost.length ? (
              sessionPost.map((post) => {
                return (
                  <>
                    {sessionUser && sessionUser.id === post.user_id && (
                      <div className="editDeletePostButtonDiv">
                        <button
                          className="editPostButton"
                          onClick={() => {
                            editPost(post.id);
                          }}
                        >
                          Edit Post
                        </button>
                        <button
                          className="deletePostButton"
                          onClick={() => {
                            deletePost(post.id);
                          }}
                        >
                          Delete Post
                        </button>
                      </div>
                    )}
                    <PostCardComponent
                      post={post}
                    />
                    {commentsLoaded && (
                      <>
                        <div>{sessionComments.length} comments</div>
                        {sessionUser && <WriteACommentComponent post={post} />}
                        {sessionComments.map((comment) => {
                          return (
                            <>
                              <div className="comment-div">
                                <div className="commenter-div">

                                </div>
                                <div className="comment-content">
                                  <div className="commentHeader">
                                    <div className="commented-by"> commented by u/{comment.username}</div>
                                    <div className="comment-buttons">
                                      {sessionUser &&
                                        sessionUser.id === comment.user_id && (
                                        <div>
                                          <button
                                              className="editCommentButton"
                                              onClick={() => {
                                                setOpenCommentEditFormId(
                                                  comment.id
                                                );
                                              }}
                                            >
                                              Edit
                                            </button>
                                            <button
                                              className="deleteCommentButton"
                                              onClick={() => {
                                                deleteComment(comment);
                                              }}
                                            >
                                              Delete
                                            </button>

                                            {openCommentEditFormId ===
                                              comment.id && (
                                              <UpdateCommentComponent
                                                comment={comment}
                                                onSuccess={() => {
                                                  setOpenCommentEditFormId(
                                                    false
                                                  );
                                                }}
                                              />
                                            )}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                  <div className="comm-text">
                                    {comment.comment_text}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              })
            ) : (
              <div className="post-not-found">
                <h1>Post has been deleted or removed.</h1>
              </div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="rowTwo">
          {subrandditLoaded &&
            subrandditInfo.map((subranddit) => {
              return (
                <>
                  <div className="subr-info">
                    <div className="postPage">
                      <img className="banner-fit"
                        src={subranddit.banner_img}
                        alt="bannerImage"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://i.imgur.com/aQxmKOg.png";
                        }}
                      ></img>
                    </div>
                    <div
                      className="post-desc"
                      onClick={(e) => subrandditPage(subranddit.id)}
                    >
                      <img
                        className="logo-fit"
                        src={subranddit.icon_url}
                        alt="subrandditIcon"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://i.imgur.com/hkMSod3.png";
                        }}
                      ></img>
                      <span>r/{subranddit.title}</span>
                    </div>
                    <div className="subrandditDescriptionDiv">
                      <div className="subrandditDescription">
                        {subranddit.description}
                      </div>
                    </div>
                    <div className="subrandditCreatePostDiv">
                      <div
                        className="createSubrandditPost"
                        onClick={createPostPage}
                      >
                        Create post
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PostDetailComponent;
