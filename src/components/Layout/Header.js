import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/securityActions";

class Header extends Component {
  logout = () => {
    this.props.logout();
    window.location.href = "/";
  };
  render() {
    const { validToken, user } = this.props.securityReducer;
    const userIsAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link text-light fw-bold" to="/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav" style={{ position: "absolute", right: 90 }}>
          <li className="nav-item">
            <Link className="nav-link text-light fw-bold" to="/dashboard">
              <i className="fas fa-user-circle mr-2">
                {"   "}
                {user.fullname}
              </i>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-light fw-bold"
              to="/logout"
              onClick={this.logout}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsNotAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item ">
            <Link className="nav-link text-light fw-bold" to="/register">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light fw-bold" to="/login">
              Log In
            </Link>
          </li>
        </ul>
      </div>
    );

    let headerLinks;
    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }
    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark mb-4"
        style={{ background: "linear-gradient(57deg,purple, #e74292)" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Personal Project Management Tool
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {headerLinks}
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  securityReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  securityReducer: state.securityReducer,
});

export default connect(mapStateToProps, { logout })(Header);
