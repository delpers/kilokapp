import React, { useState, useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import { login, loginWithGoogle } from "../utils/firebase"
import { navigate, Link } from "gatsby"
import Layout from "../components/layout"
import UserContext from "../components/UserContext"
import SEO from "../components/seo"
import * as yup from "yup"
import styled from '@emotion/styled'

const Box = styled.div`

display: grid;
grid-template-columns: repeat(2, 1fr);
grid-gap: 0px;
`

const Image = styled.div`
  
    background: #e7f1fc;
    height: 100vh;
    width: 550px;
    margin-left: 300px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
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
        navigate("/Account")
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
      navigate("/Account")
    }
  }, [user])

  return (
    <Box>
        <SEO title="Connexion" />




        <div>

        <Image />

        </div>
        <div><div className="layout-form shadow-plus padding r2">
              <h2 className="bold">Vous connecter à Freshdoor</h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="email"
                    onChange={onChangeInput}
                    className="k-input r6"
                    name="email"
                    placeholder="Veuillez saisir votre adresse e-mail"
                    style={{ width: "100%" }}
                    ref={register({ required: true, minLength: 8 })}
                  />
                  {errors.email && (
                    <div className="alert">{errors.email.message}</div>
                  )}
                  <input
                    type="password"
                    onChange={onChangeInput}
                    className="k-input r6"
                    name="password"
                    placeholder="Saisir votre mot de passe"
                    ref={register({ required: true, minLength: 8 })}
                    style={{ width: "100%" }}
                  />
                  {errors.password && (
                    <div className="alert">{errors.password.message}</div>
                  )}
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
                    className="button-submit r4"
                    onClick={onSubmit}
                    style={{ padding: "0 15px" }}
                  >
                    {loading ? "Merci..." : "Connexion"}
                  </button>
                </div>

                <button
                  className="button-google width-full"
                  type="button"
                  onClick={loginByGmail}
                >
              
                  <span>Continuer avec Google</span>
                </button>

                <div className="align-center size-initial">
                  Vous n'avez pas de compte ?{" "}
                  <Link className="bold" to="/SignUp">
                    S'inscrire
                  </Link>
                </div>
              </form>
            </div></div>
     </Box>
  )
}

export default LoginPage
