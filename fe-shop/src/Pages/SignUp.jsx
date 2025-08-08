import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const PASSWORD_REGEX = /^[a-zA-Z0-9]{3,30}$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PHONE_REGEX = /^[0-9]{5,15}$/;

function SignUp() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [errMsg, setErrorMsg] = useState("");

  const { signup, error, isLoading, success } = useSignup();

  // Validation for email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  // Validation for password
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  // Validation for phone
  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    setValidPhone(result);
  }, [phone]);

  // Clear error message when inputs change
  useEffect(() => {
    setErrorMsg("");
  }, [user, email, password, phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PASSWORD_REGEX.test(password);
    const v3 = PHONE_REGEX.test(phone);

    if (!user || !v1 || !v2 || !v3) {
      setErrorMsg("Invalid Entry");
      return;
    }

    const userDetails = {
      name: user,
      email,
      password,
      phone,
      role: 0, // Auto set role to 0
    };

    try {
      await signup(userDetails);
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No server Response");
      } else if (err.response?.status === 409) {
        setErrorMsg("Email Taken");
      } else {
        setErrorMsg("Registration failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      {success ? (
        <section className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full text-center">
            <h1 className="my-8 text-3xl text-center text-green-600">Success!</h1>
            <p className="text-grey-dark mb-6">
              Your account has been created. You will be redirected to sign in shortly...
            </p>
            <Link to="/sign-in">
              <button className="text-blue-400 no-underline border-b hover:border-blue-500 text-blue">
                Go to Sign In
              </button>
            </Link>
          </div>
        </section>
      ) : isLoading ? (
        <section className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-grey-dark">Creating account...</p>
          </div>
        </section>
      ) : (
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <img src="/images/fruits_market.png" alt="" />
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="my-8 text-3xl text-center">Sign up</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullname"
                placeholder="Full Name"
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
              {user === "" && (
                <p className="border border-red-700">Username is required</p>
              )}

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
              />
              <p
                className={
                  email && !validEmail ? "border border-red-700" : "hidden"
                }
              >
                Your email is not valid
              </p>

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
              />
              <p
                className={
                  password && !validPassword ? "border border-red-700" : "hidden"
                }
              >
                Your password is not valid
              </p>

              <input
                type="tel"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="phone"
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                aria-invalid={validPhone ? "false" : "true"}
              />
              <p
                className={
                  phone && !validPhone ? "border border-red-700" : "hidden"
                }
              >
                Your phone number is not valid
              </p>

              {errMsg && (
                <p
                  ref={errRef}
                  className="text-red-700 text-sm mb-4"
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
              )}
              {error && (
                <p className="text-red-700 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>
              and
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <Link to="/sign-in">
              <button className="text-blue-400 mx-2 no-underline border-b hover:border-blue-500 text-blue">
                Log in
              </button>
            </Link>
            .
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;