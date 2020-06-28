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
    border: 0 !important;
    background: white;
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
    
        <div className="m-w p-i pb-0 bg-w link justify mt-32 mb-32 init">
          <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "500px" }}>
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
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                onChange={onChangeInput}
                className="form-control"
                name="password"
                placeholder="Veuillez saisir votre mot de passe"
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
              <a href="/addu">Devenir membre</a>
              
            </div>
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
              className="mt-10 btngoogle"
              style={{ width: "100%" }}
              type="button"
              onClick={loginByGmail}
            >
              Connectez-vous avec Google
            </button>
          </form>
        </div>
      </div>
    </Layout>
    </Background>
  )
}

export default LoginPage
