import Mail from "../../images/mail-outline.svg";
import Lock from "../../images/lock-closed-outline.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../../hooks/AuthContext";
const Register: React.FC<any> = ({ title, showAuth, setShowAuth }) => {
  const [inputs, setInputs] = useState<any>({ email: "", password: "" });
  const [inputError, setInputError] = useState<string>("");
  const { loading, signUp, isActive, login, error} = useContext(AuthContext);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputs.email === "" || inputs.password === "") {
      setInputError("please fill all the fields");
    } else {
      if (inputs.password.length < 8) {
        setInputError("Password at least 8 chars");
        return;
      }
      if (title === "Sign Up") {
        signUp(inputs);
      } else {
        login(inputs);
      }
    }
  };

  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  return (
    <div className={`reg-box ${isActive ? "d-none" : ""}`}>
      <div className="reg-box-inner">
        {inputError !== "" ? (
          <small className="text-danger mysmall">{inputError}*</small>
        ) : (
          ""
        )}
        {error ? (
          <small className="text-danger mysmall">
            Please check the fields*
          </small>
        ) : (
          ""
        )}
        <div className="reg-box-heading">
          <h4 className="m-0">{title}</h4>
          <span onClick={() => setShowAuth("")}>X</span>
        </div>
        <form action="#" onSubmit={(e) => handleSubmit(e)}>
          <div className="myform-group">
            <input
              type="email"
              className="w-100"
              placeholder="E-mail"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <div className="img-container">
              <img src={Mail} alt="mail" width={20} />
            </div>
          </div>
          <div className="myform-group">
            <input
              type="password"
              className="w-100"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <div className="img-container">
              <img src={Lock} alt="mail" width={20} />
            </div>
          </div>
          <button type="submit" className="sign-up-btn">
            {loading ? "Loading ..." : title}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
