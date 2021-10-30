import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { ROUTES } from "../../../services/constants/Index";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostAction } from "../../../redux/actions/Index";
import "./People.css";
import PeopleCard from "../../../components/peopleCard/PeopleCard";
import Button from "../../../components/button/Button";
import { AuthAction } from "../../../redux/actions/Index";

const People = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userData } = useSelector((state) => state.AuthReducer);
  const { people } = useSelector((state) => state.PostReducer);
  useEffect(() => {
    (async () => {
      if (userData?._id) {
        const userId = userData?._id;
        const response = await dispatch(PostAction.peopleList(userId));
      }
    })();
  }, [userData]);
  const handleClick = () => {
    dispatch(AuthAction.logOut());
    history.push(ROUTES.LOGIN);
  };
  return (
    <div>
      <Navbar bg="blue" className="navBarMain" expand="lg">
        <Container>
          <Navbar.Brand
            to={{
              pathname: "/home",
            }}
            className="mr-3"
          >
            TwitterClone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mr-3">
              <NavLink
                to={{
                  pathname: "/home",
                }}
                className="mr-2"
              >
                Feed
              </NavLink>
              <NavLink
                to={{
                  pathname: "/people",
                }}
              >
                People
              </NavLink>
            </Nav>
          </Navbar.Collapse>
          <Button
            background="secondary"
            color="secondary"
            name="Sign out"
            handleClick={handleClick}
          />
        </Container>
      </Navbar>
      <div className="listOFcard">
        {people?.map((item) => {
          return <PeopleCard data={item} />;
        })}
      </div>
    </div>
  );
};

export default People;
