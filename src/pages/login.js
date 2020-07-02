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
    background: white;
    border-bottom: 1px solid #ededed !important;
  }
  @media only screen and (max-width: 480px) {
    header {
      display: none !important;
    }
  }
`

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Veuillez saisir un e-mail pour vous connecter!")
    .min(6, "Veuillez vérifier vos identifiants."),
  password: yup
    .string()
    .required("Veuillez saisir votre mot de passe pour vous connecter!")
    .min(8, "Veuillez vérifier vos identifiants."),
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
        <div className="mtandmb-24">
          <div className="gr-log">
            <div>
              <h2 className="title_ic">Connexion</h2>

              <form onSubmit={handleSubmit(onSubmit)}>
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
                    <div className="alert">{errors.email.message}</div>
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
                    <div className="alert">{errors.password.message}</div>
                  )}
                </div>
                {textLoginSubmit.type && (
                  <div
                    className="alert"
                    style={{
                      color: `${
                        textLoginSubmit.type === "error" ? "red" : "green"
                      }`,
                    }}
                  >
                    {textLoginSubmit.message}
                  </div>
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
                  className="googleSignIn"
                  type="button"
                  onClick={loginByGmail}
                >
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/G-on-white.svg"
                    alt="Google logo"
                  ></img>
                  <span class="googleSignIn__text">Continuer avec Google</span>
                </button>

                <div className=" align-left fs-16">
                  Vous n'avez pas de compte ?{" "}
                  <a className="font-bold" href="/addu">
                    Inscription
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  )
}

export default LoginPage
