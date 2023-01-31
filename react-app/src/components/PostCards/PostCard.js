import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const PostCardComponent = ({post}) => {


    return (
        <div className="post-top">
          <div className="post-title">{post?.post_title}</div>
          <div className="post-img">
            <img
              src={post?.image_url}
              alt="n/a"
              onError={(e) => {
                e.currentTarget.src =
                  "https://res.cloudinary.com/teepublic/image/private/s--n4uagiOn--/c_crop,x_10,y_10/c_fit,h_799/c_crop,g_north_west,h_1051,w_1051,x_-171,y_-121/l_upload:v1507037314:production:blanks:gbajnunp66ec7xftnpq1/fl_layer_apply,g_north_west,x_-276,y_-220/b_rgb:ffffff/c_limit,f_jpg,h_630,q_90,w_630/v1539384919/production/designs/3309274_0.jpg";
              }}
            />
          </div>
          <div className="post-words">{post?.post_text}</div>
          <div className="undercard">
          </div>
        </div>
      );
}

export default PostCardComponent;
