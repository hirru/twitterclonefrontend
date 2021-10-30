import { Card } from "react-bootstrap";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../button/Button";
import "./PeopleCard.css";
import { AuthAction, PostAction } from "../../redux/actions/Index";
const PeopleCard = (props) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.AuthReducer);

  const handleSubmit = async () => {
    const type = userData?.following.includes(props.data._id);
    const params = {
      userId: userData?._id,
      followingId: props.data._id,
      type: type ? "unfollow" : "follow",
    };
    const response = await dispatch(PostAction.followUnFollow(params));
    if (response) {
      dispatch(AuthAction.matchToken());
    }
  };
  return (
    <div className="cardPeople d-flex flex-column justify-content-center px-5 py-5">
      <div className="center">
        <img src="https://source.unsplash.com/user/erondu/250x300" />
      </div>

      <div className="rigth ml-5 mt-3">
        <h4>
          {props.data.firstName} {props.data.lastName}
        </h4>
        {/* <h3>Email:{props.data.email}</h3> */}
      </div>
      <div className="d-flex mt-2 buttonDiv">
        <Button
          background="primary"
          color="tertiary"
          name={
            userData?.following.includes(props.data._id) ? "Unfollow" : "Follow"
          }
          handleClick={handleSubmit}
          // loading={loading}
        />{" "}
      </div>
    </div>
  );
};

export default PeopleCard;
