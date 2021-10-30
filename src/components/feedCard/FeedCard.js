import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./FeedCard.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { PostAction } from "../../redux/actions/Index";
const MePostCardView = (props) => {
  const dispatch = useDispatch();
  const [deletePopup, setDeletePopup] = useState(false);
  const [postId, setPostId] = useState();
  const [like, setLike] = useState(true);
  // const profileImage =
  const { userData } = useSelector((state) => state.AuthReducer);
  const { post } = useSelector((state) => state.PostReducer);

  useEffect(() => {
    (async () => {
      if (userData?._id) {
        const userId = userData?._id;
        const response = await dispatch(PostAction.getStatus(userId));
      }
    })();
  }, [userData]);

  return (
    <section>
      <ul className="update_list">
        {
          // props &&
          // props.data &&
          post?.map((data) => {
            return (
              <li>
                <div className="share-update-card">
                  <div className="share-update-card__header">
                    <img
                      style={{ backgroundColor: "black" }}
                      className="feedcard "
                      src="https://source.unsplash.com/user/erondu/40x40"
                    ></img>
                    <div className="share-update-card__actor-info">
                      <h3 className="share-update-card__actor-text">
                        {data.userId.firstName}
                      </h3>
                    </div>
                  </div>
                  <div className="trashCan">
                    {/* <DeleteOutlineOutlinedIcon /> */}
                  </div>
                  <div className="caption">
                    <p>{data.status}</p>
                  </div>
                  <div className="imgSocial">
                    <div className="social-action-bar">
                      <button className="social-action-bar__button">
                        <FavoriteIcon color="red" />
                        Likes
                      </button>

                      {/* <div class="line"></div> */}
                      <button className="social-action-bar__button">
                        <ModeCommentOutlinedIcon />
                        <span>Comment</span>{" "}
                      </button>
                      {/* <div class="line"></div> */}
                      <button className="social-action-bar__button">
                        <ShareOutlinedIcon />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        }
        {post.length == 0 && <h1 className="text-center">No post to show</h1>}
      </ul>
    </section>
  );
};
export default MePostCardView;
