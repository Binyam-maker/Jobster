import React, { useEffect, useState } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { registerUser, loginUser } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((store) => store.user);
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error("please fill out all the fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {/* name field */}
        {!values.isMember && (
          <FormRow
            name="name"
            type={"text"}
            value={values.name}
            handleChange={handleChange}
            labelText={"Name"}
          />
        )}

        {/* email field */}
        <FormRow
          name={"email"}
          type="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* password field */}
        <FormRow
          name={"password"}
          type="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button className="btn btn-block" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
        <button
          className="btn btn-block btn-hipster"
          type="button"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: "testUser@test.com", password: "secret" })
            );
          }}
        >
          {isLoading ? "Loading..." : "demo"}
        </button>
        <p>
          {" "}
          {values.isMember ? "Not a member yet?" : "Already a member"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
