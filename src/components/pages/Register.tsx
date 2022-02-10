import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [inputsError, setInputsError] = useState<boolean>(false);
  const { signUp, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (inputs.email === "" || inputs.password === "") {
      setInputsError(true);
    } else {
      await signUp(inputs);
    }
    setTimeout(() => {
      if (error !== false) {
        navigate("/");
      }
    }, 1500);
  };
  return (
    <div className="my-auth-place pt-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 offset-md-4">
            {inputsError && (
              <div className="alert alert-danger">
                Please fill all the fields
              </div>
            )}
            {error && (
              <div className="alert alert-danger">
                Couldn't complete , please try again.
              </div>
            )}
            <div className="card">
              <div className="card-header">Register to Shortly</div>
              <div className="card-body">
                <form action="#" onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="email"
                      className="form-control"
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="password"
                      className="form-control"
                      name="password"
                    />
                  </div>
                  <input
                    type="submit"
                    value={`${loading ? "loading ..." : "Register Account"}`}
                    className="btn btn-primary"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
