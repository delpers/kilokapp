import React, { useEffect, useState, useContext } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import Layout from "../components/layout"
import Legal from "../components/legalRegister"
import UserContext from "../components/UserContext"
import { navigate } from "gatsby"
import SEO from "../components/seo"
import { signup, loginWithGoogle } from "../utils/firebase"

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Veuillez saisir votre e-mail pour vous inscrire!")
    .min(
      6,
      "L'email est trop court, sinon vérifiez qu'elle n'est pas déjà utilisée."
    ),
  password: yup
    .string()
    .required("Veuillez saisir votre mot de passe pour vous inscrire!")
    .min(8, "L'email est trop court - devrait être de 6 caractères minimum."),
  confirm_password: yup
    .string()
    .required("Veuillez confirmer le mot de passe!")
    .min(8, "L'email est trop court - devrait être de 6 caractères minimum.")
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe doivent correspondre"
    ),
})

const RegisterPage = () => {
  const { user } = useContext(UserContext)
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
      <Layout>
        <SEO title="S'inscrire" />
        <div className="uk-layout-form padding-initial">
        <div className="uk-margin">
            <div>
              <h2 className="title_ic">Inscription</h2>

              <form onSubmit={handleSubmit(onSubmitRegister)}>
                <div className="form-group">
                  <input
                    type="email"
                    className="uk-input uk-margin-bottom radius"
                    onChange={onChangeInput}
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
                    className="uk-input uk-margin-bottom radius"
                    onChange={onChangeInput}
                    name="password"
                    placeholder="Saisir un mot de passe"
                    ref={register({ required: true, minLength: 8 })}
                    style={{ width: "100%" }}
                  />
                  {errors.password && (
                    <div className="alert">{errors.password.message}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="uk-input uk-margin-bottom radius"
                    onChange={onChangeInput}
                    name="confirm_password"
                    placeholder="Confirmez le mot de passe"
                    ref={register({ required: true, minLength: 8 })}
                    style={{ width: "100%" }}
                  />
                  {errors.confirm_password && (
                    <div className="alert">
                      {errors.confirm_password.message}
                    </div>
                  )}
                </div>
                {errorRegister && (
                  <span className="msg_alert" style={{ color: "red" }}>
                    {errorRegister}
                  </span>
                )}

                <div>
                  <button
                    type="submit"
                    style={{ padding: "0 15px" }}
                    className="uk-button uk-button-primary uk-margin-bottom radius"
                    onClick={onSubmitRegister}
                  >
                    {loading ? "Chargement..." : "S'inscrire"}
                  </button>
                </div>
                <button
                  className="googleSignIn uk-margin-bottom radius"
                  type="button"
                  onClick={loginByGmail}
                >
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/G-on-white.svg"
                    alt="Google logo"
                  ></img>
                  <span class="googleSignIn__text">Continuer avec Google</span>
                </button>

                <Legal />

                <div className=" align-left font-size-16">
                  Vous avez déjà un compte ?{" "}
                  <a class="font-bold" href="/login">
                    Se connecter
                  </a>
                  .
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
  )
}

export default RegisterPage
