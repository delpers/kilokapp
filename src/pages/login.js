import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { auth, login, loginWithGoogle } from "../utils/firebase"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Please enter email to login!")
    .min(6, "Email is too short - should be 6 chars minimum."),
  password: yup
    .string()
    .required("Please enter password to login!")
    .min(8, "Email is too short - should be 6 chars minimum."),
})

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [textLoginSubmit, setTextLoginSubmit] = useState({
    type: null,
    message: null,
  })
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  })
  const onSubmit = async data => {
    setLoading(true)
    await login(data.email, data.password)
      .then(() => {
        setLoading(false)
        localStorage.setItem("emailUser", data.email)
        navigate("/")
      })
      .catch(error => {
        setLoading(false)
        setTextLoginSubmit({ type: "error", message: error.message })
      })
  }
  const loginByGmail = async () => {
    await loginWithGoogle()
      .then(() => {})
      .catch(error => {
        alert(error.message)
      })
  }
  const onChangeInput = () => {
    if (textLoginSubmit.type) {
      setTextLoginSubmit({
        type: null,
        message: null,
      })
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
          <h1 className="fs-48   mw728">Connexion</h1>
        </div>

        <div className="m-w p-i pb-0 bg-w link justify mt-32 mb-32 init">
          <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "500px" }}>
            <div className="form-group">
              <label style={{ margin: "10px 0 0 " }}>Email</label>
              <input
                type="email"
                onChange={onChangeInput}
                className="form-control"
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
                onChange={onChangeInput}
                className="form-control"
                name="password"
                placeholder="Password"
                ref={register({ required: true, minLength: 8 })}
                style={{ width: "100%" }}
              />
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
            </div>
            {textLoginSubmit.type && (
              <span
                style={{
                  color: `${
                    textLoginSubmit.type === "error" ? "red" : "green"
                  }`,
                }}
              >
                {textLoginSubmit.message}
              </span>
            )}
            <div
              className="mt-10"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <a href="/addu">Register</a>
              <button
                type="submit"
                onClick={onSubmit}
                style={{ padding: "0 15px" }}
              >
                {loading ? "Loading..." : "Login"}
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

export default LoginPage
