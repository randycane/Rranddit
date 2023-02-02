import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";


import PostCardComponent from "../PostCards/PostCard";
import { deletePostThunk, getMyPostsThunk } from "../../store/post";
import { getMyOwnSubsThunk } from "../../store/subranddit";
import ErrorPageComponent from "../ErrorPage/ErrorPage";

import "./MyProfile.css";

const MyProfileComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let { userId } = useParams();
  userId = Number(userId);
  const sessionUser = useSelector((state) => state.session.user);
  const sessionPosts = useSelector((state) => Object.values(state?.posts));
  const sessionSubranddits = useSelector((state) =>
    Object.values(state?.subranddits)
  );

  const [postsLoaded, setPostsLoaded] = useState(false);
  const [userOwnsProfile, setUserOwnsProfile] = useState(false);
  const [loginFormModalIsOpen, setIsLoginFormModalIsOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [userSubrandditsLoaded, setUserSubrandditsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getMyPostsThunk(userId)).then(() => {
      setPostsLoaded(true);
    });
    dispatch(getMyOwnSubsThunk()).then(() => {
      setUserSubrandditsLoaded(true);
    });
  }, [dispatch, userId]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${userId}`);
      const responseData = await response.json();

      setUser(responseData);
    }
    fetchData();
  }, [userId]);

  useEffect(() => {
    setUserOwnsProfile(sessionUser.id === userId);
  }, [sessionUser, userId]);

  const editPost = (postId) => {
    let path = `/posts/${postId}/edit`;
    history.push(path);
  };

  const deletePost = (postId) => {
    dispatch(deletePostThunk(postId));
  };

  const createPostPage = () => {
    if (!sessionUser) {
      setIsLoginFormModalIsOpen(true);
    } else {
      let path = `/submit`;
      history.push(path);
    }
  };

  const subrandditsPage = (subrandditId) => {
    let path = `/r/${subrandditId}`;
    history.push(path);
  };

  return (
    <div className="pageContainer">
      {postsLoaded ? (
        <>
          {sessionPosts.length || user ? (
            <div className="homePageDiv">
              <div className="rowOne">
                {postsLoaded ? (
                  sessionPosts.length ? (
                    sessionPosts.map((post) => {
                      return (
                        <div key={post.id}>
                          {userOwnsProfile && (
                            <div className="editDeletePostButtonDiv">
                              <button
                                className="editPostButton"
                                onClick={() => {
                                  editPost(post.id);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="deletePostButton"
                                onClick={() => {
                                  deletePost(post.id);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                          <PostCardComponent
                            post={post}
                            modalToggle={setIsLoginFormModalIsOpen}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="noPostsYetDiv">
                      <span>No posts yet</span>
                    </div>
                  )
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <div className="rowTwo">
                {user ? (
                  <div className="userProfileInfo">
                    <div className="userProfileBanner"></div>
                    <div className="innerProfileInfoDiv">
                      {userOwnsProfile && (
                        <div className="profileCreatePostDiv">
                          <div
                            className="createSubredditPost"
                            onClick={createPostPage}
                          >
                            {" "}
                            Create post
                          </div>
                        </div>
                      )}
                      <div className="profileInfodDiv">
                        {user.profile_image ? (
                          <img
                            src={user.profile_image}
                            alt="users pic"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://i.imgur.com/n1eSrjP.jpg";
                            }}
                          ></img>
                        ) : (
                          <img
                            src="https://i.imgur.com/n1eSrjP.jpg"
                            alt="Error Pic"
                          ></img>
                        )}
                        <span>
                          {" "}
                          {user.username ? (
                            <span>r/{user.username}</span>
                          ) : (
                            <span>User not found!</span>
                          )}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <ErrorPageComponent />
                    <h1>User Profile Does not exist</h1>
                  </div>
                )}
                {userOwnsProfile && (
                  <div className="followedSubredditInfo">
                    <div className="aboutFollowedSubreddit">
                      <span>Followed Subranddits</span>
                    </div>
                    <div className="followedSubredditContent">
                      {userSubrandditsLoaded &&
                        sessionSubranddits.map((subranddit) => {
                          return (
                            <div key={subranddit.id}>
                              <div
                                className="followedSubredditDescriptionDiv"
                                onClick={(e) => subrandditsPage(subranddit.id)}
                              >
                                <div className="followedSubredditDescription">
                                  <div className="homeSubredditIcon">
                                    <img
                                      src={subranddit.icon_url}
                                      alt="subredditIcon"
                                      onError={(e) => {
                                        e.currentTarget.src =
                                          "https://i.imgur.com/hkMSod3.png";
                                      }}
                                    ></img>
                                  </div>
                                  <div className="followed">
                                    {subranddit.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <ErrorPageComponent />
              <h1>User Profile Does not exist</h1>
            </div>
          )}
        </>
      ) : (
        <div className="loading">
          <div>
            <span>Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfileComponent;
