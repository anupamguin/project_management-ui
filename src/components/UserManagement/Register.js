import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      username: "",
      password: "",
      confirmpassword: "",
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      fullname: this.state.fullname,
      username: this.state.username,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword,
    };
    this.props.createNewUser(newUser, this.props.history);
  };

  componentDidMount() {
    if (this.props.securityReducer.validToken) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    console.log(errors);
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control form-control-lg 
                      ${errors.fullname && "is-invalid"}`}
                    placeholder="Full Name"
                    name="fullname"
                    onChange={this.onChange}
                  />
                  {errors.fullname && (
                    <div className="invalid-feedback">{errors.fullname}</div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      errors.username && "is-invalid"
                    }`}
                    placeholder="Email Address (Username)"
                    name="username"
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${
                      errors.password && "is-invalid"
                    }`}
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${
                      errors.confirmpassword && "is-invalid"
                    }`}
                    placeholder="Confirm Password"
                    name="confirmpassword"
                    onChange={this.onChange}
                  />
                  {errors.confirmpassword && (
                    <div className="invalid-feedback">
                      {errors.confirmpassword}
                    </div>
                  )}
                </div>
                <br />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  securityReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  securityReducer: state.securityReducer,
});
export default connect(mapStateToProps, { createNewUser })(Register);
