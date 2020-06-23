import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import Layout from "../components/layout"
import { navigate } from "gatsby"
import SEO from "../components/seo"
import { signup, loginWithGoogle, auth } from "../utils/firebase"

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Please enter email to register!")
    .min(6, "Email is too short - should be 6 chars minimum."),
  password: yup
    .string()
    .required("Please enter password to register!")
    .min(8, "Email is too short - should be 6 chars minimum."),
  confirm_password: yup
    .string()
    .required("Please confirm password!")
    .min(8, "Email is too short - should be 6 chars minimum.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
})

const RegisterPage = () => {
  const [errorRegister, setErrorRegister] = useState("")
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  })
  const onSubmitRegister = async data => {
    setLoading(true)
    await signup(data.email, data.password)
      .then(() => {
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        setErrorRegister(error.message)
      })
  }
  const loginByGmail = async () => {
    await loginWithGoogle()
      .then(() => {
        navigate("/")
      })
      .catch(error => {
        alert(error.message)
        return error
      })
  }

  const onChangeInput = () => {
    if (errorRegister) {
      setErrorRegister("")
    }
  }

  const checkUser = async () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        navigate("/")
      }
    })
  }

  useEffect(() => {
    checkUser()
  }, [])
  return (
    <Layout>
      <SEO title="Connexion" />
      <div>
        <div className="m-w p-i m-w ">
          <h1 className="fs-48   mw728">Inscription</h1>
        </div>

        <div className="m-w p-i pb-0 bg-w link justify mt-32 mb-32 init">
          <form
            onSubmit={handleSubmit(onSubmitRegister)}
            style={{ maxWidth: "500px" }}
          >
            <div className="form-group">
              <label style={{ margin: "10px 0 0 " }}>Email</label>
              <input
                type="email"
                className="form-control"
                onChange={onChangeInput}
                name="email"
                placeholder="Enter email"
                style={{ width: "100%" }}
                ref={register({ required: true, minLength: 8 })}
              />
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label style={{ margin: "10px 0 0 " }}>Password</label>
              <input
                type="password"
                className="form-control"
                onChange={onChangeInput}
                name="password"
                placeholder="Password"
                ref={register({ required: true, minLength: 8 })}
                style={{ width: "100%" }}
              />
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
            </div>
            <div className="form-group">
              <label style={{ margin: "10px 0 0 " }}>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                onChange={onChangeInput}
                name="confirm_password"
                placeholder="Password"
                ref={register({ required: true, minLength: 8 })}
                style={{ width: "100%" }}
              />
              {errors.confirm_password && (
                <span style={{ color: "red" }}>
                  {errors.confirm_password.message}
                </span>
              )}
            </div>
            {errorRegister && (
              <span style={{ color: "red" }}>{errorRegister}</span>
            )}
            <div
              className="mt-10"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <a href="/login">Login</a>
              <button
                type="submit"
                style={{ padding: "0 15px" }}
                onClick={onSubmitRegister}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            <button
              className="mt-10"
              style={{ width: "100%" }}
              type="button"
              onClick={loginByGmail}
            >
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterPage
