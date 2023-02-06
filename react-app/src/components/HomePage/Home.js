import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getAllSubrandditsThunk } from "../../store/subranddit";
import { ReadPostsThunk } from "../../store/post";
import LoginModalComponent from "../LoginModal/Login";
import PostCardComponent from "../PostCards/PostCard";
import "./Home.css";
import github from "./github.png";
import linkedin from "./linkedin.png";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const subrandditInfo = useSelector((state) =>
    Object.values(state?.subranddits)
  );
  const posts = useSelector((state) => {
    let posts = Object.values(state?.posts);
    return posts;
  });

  const [loginFormModalIsOpen, setIsLoginFormModalIsOpen] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [subrandditLoaded, setSubrandditLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllSubrandditsThunk()).then(() => {
      setSubrandditLoaded(true);
    });
    dispatch(ReadPostsThunk()).then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch]);

  const createPostPage = () => {
    if (!sessionUser) {
      setIsLoginFormModalIsOpen(true);
    } else {
      let path = `/create-post`;
      history.push(path);
    }
  };

  const createSubrandditPage = () => {
    if (!sessionUser) {
      setIsLoginFormModalIsOpen(true);
    } else {
      let path = `/create-subranddit`;
      history.push(path);
    }
  };

  const subrandditsPage = (subrandditId) => {
    let path = `/r/${subrandditId}`;
    history.push(path);
  };

  return (
    <div className="pageContainer">
      <LoginModalComponent
        isOpen={loginFormModalIsOpen}
        modalToggle={setIsLoginFormModalIsOpen}
      />
      <div className="homePageDiv">
        <div className="rowOne">
          <div className="createPostDiv">
            <div className="createInputContainer">
              <input
                type="text"
                placeholder="Create Post"
                className="inputBox"
                onClick={createPostPage}
              />
            </div>
          </div>
          {postsLoaded ? (
            posts.length ? (
              posts.map((post) => {
                return (
                  <PostCardComponent
                    key={post.id}
                    post={post}
                    modalToggle={setIsLoginFormModalIsOpen}
                  />
                );
              })
            ) : (
              <div>No posts yet</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="row-two">
          <div className="homePageSubrandditInfo">
            <div className="sandwich-row-two">
            <div className="recs">
              <span>Recommended Communities</span>
            </div>
            <div className="homepageSubrandditContent">
              {subrandditLoaded &&
                subrandditInfo.map((subranddit) => {
                  return (
                    <div key={subranddit.id}>
                      <div
                        className="homepageSubrandditDescriptionDiv"
                        onClick={(e) => subrandditsPage(subranddit.id)}
                      >
                        <div className="homepageSubrandditDescription">
                          <div className="homeSubrandditIcon">
                            <img className="subr-img-cover"
                              src={subranddit.icon_url}
                              alt="subrandditIcon"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://res.cloudinary.com/teepublic/image/private/s--n4uagiOn--/c_crop,x_10,y_10/c_fit,h_799/c_crop,g_north_west,h_1051,w_1051,x_-171,y_-121/l_upload:v1507037314:production:blanks:gbajnunp66ec7xftnpq1/fl_layer_apply,g_north_west,x_-276,y_-220/b_rgb:ffffff/c_limit,f_jpg,h_630,q_90,w_630/v1539384919/production/designs/3309274_0.jpg";
                              }}
                            ></img>
                          </div>
                          <div className="home-sub-name">{subranddit.title}</div>
                        </div>
                      </div>
                    </div>

                  );
                })}
            </div>
            <div className="subrandditCreateDiv">
              <div
                className="createSubrandditButton"
                onClick={createSubrandditPage}
              >
                Create a Subranddit
              </div>
            </div>
            </div>

          </div>
          <div className="developerInfoDiv">
            <div className="developerInfoContent">
              <span>Developer Links:</span>
            </div>
            <div className="devLinkIcons">
              <a
                className="iconContainer"
                href="https://github.com/randycane/Rranddit"
                target="_blank"
              >
                <div className="github-div">
                  <img src={github} alt="github-logo"></img>
                  <div className="dev-text">Github</div>
                </div>
              </a>
              <a
                className="iconContainer"
                href="https://www.linkedin.com/in/randy-y-chang/"
                target="_blank"
              >
                <div className="linkedin-div">
                <img src={linkedin} alt="linkedin-logo"></img>
                <div className="dev-text">Linkedin</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
