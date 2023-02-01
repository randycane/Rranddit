import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
  getSubFromIdThunk,
  deleteSubThunk,
  subscribeToSubrandditThunk,
} from "../../store/subranddit";
import { ReadPostBySubrandditIdThunk } from "../../store/post";
import PostCardComponent from "../PostCards/PostCard.js";
import UpdateSubrandditModal from "../UpdateSubrand/UpdateSubModal";
import LoginModalComponent from "../LoginModal";
import "./SubrandPage.css";

const SubrandPageComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let { subrandditId } = useParams();
  const subrandditInfo = useSelector((state) =>
    Object.values(state?.subranddits)
  );
  const posts = useSelector((state) => {
    let posts = Object.values(state.posts);

    return posts;
  });
  const sessionUser = useSelector((state) => state.session.user);

  const [loginFormModalIsOpen, setIsLoginFormModalIsOpen] = useState(false);
  const [updateSubModalIsOpen, setIsUpdateSubModalIsOpen] = useState(false);
  const [subrandditLoaded, setSubrandditLoaded] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [userMadeSubranddit, setUserMadeSubranddit] = useState(false);
  const [userJoinedSubranddit, setUserJoinedSubranddit] = useState(false);

  useEffect(() => {
    if (isNaN(subrandditId)) {
      setSubrandditLoaded(true);
      setPostsLoaded(true);
    } else {
      dispatch(getSubFromIdThunk(subrandditId)).then(() => {
        setSubrandditLoaded(true);
      });
      dispatch(ReadPostBySubrandditIdThunk(subrandditId)).then(() => {
        setPostsLoaded(true);
      });
    }
  }, [dispatch, subrandditId]);

  useEffect(() => {
    if (sessionUser && subrandditLoaded && subrandditInfo[0]) {
      subrandditInfo[0].subscriptions.forEach((subscription) => {
        if (subscription.user_id === sessionUser.id) {
          setUserJoinedSubranddit(true);
        }
      });
      setUserMadeSubranddit(sessionUser.id === subrandditInfo[0].owner_id);
    }
  }, [subrandditLoaded, sessionUser]);

  const createPostPage = () => {
    if (!sessionUser) {
      setIsLoginFormModalIsOpen(true);
    } else {
      let path = `/submit?subranddit_id=${subrandditId}`;
      history.push(path);
    }
  };

  const deleteSubranddit = async (subrandditId) => {
    await dispatch(deleteSubThunk(subrandditId)).then(() => {
      history.push(`/`);
    });
  };

  const joinSubranddit = () => {
    if (!sessionUser) {
      setIsLoginFormModalIsOpen(true);
    } else {
      dispatch(subscribeToSubrandditThunk(subrandditId));
      setUserJoinedSubranddit((userJoinedSubranddit) => !userJoinedSubranddit);
    }
  };

  return (
    <div className="pageContainer">
      <LoginModalComponent
        isOpen={loginFormModalIsOpen}
        modalToggle={setIsLoginFormModalIsOpen}
      />
      {subrandditLoaded ? (
        <>
          {subrandditInfo[0] ? (
            <>
              {subrandditInfo.map((subranddit) => {
                return (
                  <div className="subrandditBanner">
                    <img
                      src={subranddit?.banner_img}
                      alt="bannerimage"
                      onError={(e) => {
                        e.currentTarget.src = "https://i.imgur.com/aQxmKOg.png";
                      }}
                    ></img>
                    <div className="sub-title">
                      <div className="innerSubTitleDiv">
                        <div className="titleDivContent">
                          <div className="iconBackground"></div>
                          <img
                            className="subr-icon"
                            src={subranddit?.icon_url}
                            alt="iconImage"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://i.imgur.com/hkMSod3.png";
                            }}
                          ></img>
                          <div className="titlediv">
                            <div className="big-div">
                              <span> {subranddit.name} </span>

                              {userMadeSubranddit ? (
                                <div className="sub-button-div">
                                  <button
                                    className="edit-button"
                                    onClick={() =>
                                      setIsUpdateSubModalIsOpen(true)
                                    }
                                  >
                                    Edit
                                  </button>
                                  <UpdateSubrandditModal
                                    isOpen={updateSubModalIsOpen}
                                    modalToggle={setIsUpdateSubModalIsOpen}
                                  />
                                  <button
                                    className="deleteSubredditButton"
                                    onClick={() =>
                                      deleteSubranddit(subranddit.id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              ) : userJoinedSubranddit ? (
                                <button
                                  className="joinToggleSubrandditButton"
                                  onClick={() => joinSubranddit()}
                                >
                                  Joined
                                </button>
                              ) : (
                                <button
                                  className="joinToggleSubrandditButton"
                                  onClick={() => joinSubranddit()}
                                >
                                  Join
                                </button>
                              )}

                            </div>
                            <div className="underneath">
                              <span>r/{subranddit.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="homePageDiv">
                <div className="rowOneSubreddit">
                  <div className="createPostDiv">
                    <div className="create">
                    </div>
                    <div className="createInputContainer">
                      <input
                        type="text"
                        placeholder="Create Post"
                        className="inputBox"
                        onClick={createPostPage}
                      />
                    </div>
                  </div>
                  {postsLoaded &&
                    (posts.length ? (
                      posts.map((post) => {
                        return (
                          <PostCardComponent
                            post={post}
                            modalToggle={setIsLoginFormModalIsOpen}
                          />
                        );
                      })
                    ) : (
                      <div>No posts yet</div>
                    ))}
                </div>
                <div className="row-two">
                  {subrandditInfo.map((subranddit) => {
                    return (
                      <>
                        <div className="sub-information">
                          <div className="about-us">
                            <span>About Community</span>
                          </div>
                          <div className="subDescriptionDiv">
                            <div className="subDescription">
                              {subranddit.description}
                            </div>
                          </div>
                          <div className="subr-CreatePostDiv">
                            <div
                              className="create-tPost"
                              onClick={createPostPage}
                            >
                              {" "}
                              Create post
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div>
              <h1>Community does not exist</h1>
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

export default SubrandPageComponent;