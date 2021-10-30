import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./LandingPage.css";
import FeedCard from "../../../components/feedCard/FeedCard";
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthAction } from "../../../redux/actions/Index";
import { ROUTES } from "../../../services/constants/Index";
function LandingPage() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div>
      <Navbar bg="blue" className="navBarMain" expand="lg">
        <Container>
          <Navbar.Brand
            to={{
              pathname: "/home",
            }}
          >
            TwitterClone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ml-3">
              <NavLink
                to={{
                  pathname: "/home",
                }}
                className="mr-3"
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
              {/* <NavLink href="#link">Feed</NavLink> */}
            </Nav>
          </Navbar.Collapse>
          <Button
            background="secondary"
            color="secondary"
            name="Sign out"
            handleClick={() => {
              dispatch(AuthAction.logOut());
              history.push(ROUTES.LOGIN);
            }}
          />
        </Container>
      </Navbar>
      <div>
        <div className="text-right mr-5 mt-3">
          <Button
            background="primary"
            color="tertiary"
            name="New Status"
            handleClick={() => {
              setOpen(!open);
            }}
          />
        </div>
        <Modal
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        />
        <FeedCard />
      </div>
    </div>
  );
}

export default LandingPage;
