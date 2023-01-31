import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getAllSubrandditsThunk } from "../../store/subranddit";
import { ReadPostsThunk } from "../../store/post";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);


    const createPostPage = () => {
        if (!sessionUser) {
          setIsLoginFormModalIsOpen(true);
        } else {
          let path = `/create-post`;
          history.push(path);
        }
      };
};

export default HomeComponent;
