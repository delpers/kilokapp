import React, { useState, useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { login, loginWithGoogle } from "../utils/firebase"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import UserContext from "../components/UserContext"
import SEO from "../components/seo"
import styled from "@emotion/styled"

const Background = styled.div`
  background: #ffffff;
  header {
    position: relative !important;
    background: white;
    border-bottom: 1px solid #ededed !important;
  }
`

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Veuillez saisir un e-mail pour vous connecter!")
    .min(6, "L'email est trop court - devrait être de 6 caractères minimum."),
  password: yup
    .string()
    .required("Veuillez saisir votre mot de passe pour vous connecter!")
    .min(8, "L'email est trop court - devrait être de 6 caractères minimum."),
})

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const { user } = useContext(UserContext)
  const [textLoginSubmit, setTextLoginSubmit] = useState({
    type: null,
    message: null,
  })
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    validationSchema: schema,
    submitFocusError: true,
  })
  const onSubmit = async data => {
    setLoading(true)
    await login(data.email, data.password)
      .then(() => {
        setLoading(false)
        navigate("/user")
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
    if (loading) {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (user) {
      navigate("/user")
    }
  }, [user])

  return (
    <Background>
      <Layout>
        <SEO title="Connexion" />
        <div>
          <div className="m-w p-i pb-0 bg-w link justify mt-42 mb-32 init">
            <div className="gr-log">
              <div>
                <h2 className="">Content de vous revoir !</h2>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ maxWidth: "500px" }}
                >
                  <div className="form-group">
                    <input
                      type="email"
                      onChange={onChangeInput}
                      className="form-control"
                      name="email"
                      placeholder="Veuillez saisir votre adresse e-mail"
                      style={{ width: "100%" }}
                      ref={register({ required: true, minLength: 8 })}
                    />
                    {errors.email && (
                      <span style={{ color: "red" }}>
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      onChange={onChangeInput}
                      className="form-control"
                      name="password"
                      placeholder="Saisir votre mot de passe"
                      ref={register({ required: true, minLength: 8 })}
                      style={{ width: "100%" }}
                    />
                    {errors.password && (
                      <span style={{ color: "red" }}>
                        {errors.password.message}
                      </span>
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

                  <div>
                    <button
                      type="submit"
                      className="btnlogin"
                      onClick={onSubmit}
                      style={{ padding: "0 15px" }}
                    >
                      {loading ? "Chargement..." : "Connexion"}
                    </button>
                  </div>
                  <button
                    className="google-button"
                    style={{ width: "100%" }}
                    type="button"
                    onClick={loginByGmail}
                  >
                    <span class="google-button__icon">
                      <svg
                        viewBox="0 0 366 372"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
                          id="Shape"
                          fill="#EA4335"
                        />
                        <path
                          d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
                          id="Shape"
                          fill="#FBBC05"
                        />
                        <path
                          d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
                          id="Shape"
                          fill="#4285F4"
                        />
                        <path
                          d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
                          fill="#34A853"
                        />
                      </svg>
                    </span>
                  </button>

                  <div className=" align-left fs-16">
                    Vous n'avez pas de compte ?{" "}
                    <a href="/addu">Je n'ai pas Kiloka</a>.
                  </div>
                </form>
              </div>

              <div>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  )
}

export default LoginPage
