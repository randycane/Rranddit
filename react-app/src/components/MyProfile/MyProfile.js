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
      let path = `/create-post`;
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
                    <div className="innerProfileInfo-div">
                      {userOwnsProfile && (
                        <div className="profileCreatePostDiv">
                          <div
                            className="createSubrandditPost"
                            onClick={createPostPage}
                          >
                            {" "}
                            Create post
                          </div>
                        </div>
                      )}
                      <div className="profile-default-icon">
                        {user.profile_image ? (
                          <img className="default-pic"
                            src={user.profile_image}
                            alt="user-pic"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://gundamnews.org/wp-content/uploads/2022/11/Mobile-Fighter-G-Gundam-04-BDRip-1440x1080p-x265-HEVC-FLACx2-2.0x2Dual-Audiosxales.mkv_20220505_224208.540-1024x768.jpg";
                            }}
                          ></img>
                        ) : (
                          <img className="default-pic"
                            src="https://gundamnews.org/wp-content/uploads/2022/11/Mobile-Fighter-G-Gundam-04-BDRip-1440x1080p-x265-HEVC-FLACx2-2.0x2Dual-Audiosxales.mkv_20220505_224208.540-1024x768.jpg"
                            alt="defaultPic"
                          ></img>
                        )}
                        <span>
                          {" "}
                          {user.username ? (
                            <span>u/{user.username}</span>
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
                  <div className="followed-subr">
                    <div className="about-followed">
                      <span>Followed Subranddits</span>
                    </div>
                    <div className="followedSubrandditContent">
                      {userSubrandditsLoaded &&
                        sessionSubranddits.map((subranddit) => {
                          return (
                            <div key={subranddit.id}>
                              <div
                                className="followedSubrandditDescriptionDiv"
                                onClick={(e) => subrandditsPage(subranddit.id)}
                              >
                                <div className="followedSubrandditDescription">
                                  <div className="homeSubrandditIcon">
                                    <img className="following-icons"
                                      src={subranddit.icon_url}
                                      alt="subrandditIcon"
                                      onError={(e) => {
                                        e.currentTarget.src =
                                          "https://i.imgur.com/hkMSod3.png";
                                      }}
                                    ></img>
                                  </div>
                                  <div className="followed">
                                    {subranddit.title}
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
