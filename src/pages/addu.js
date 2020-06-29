import React, { useEffect, useState, useContext } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import Layout from "../components/layout"
import UserContext from "../components/UserContext"
import { navigate } from "gatsby"
import SEO from "../components/seo"
import { signup, loginWithGoogle } from "../utils/firebase"
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
    <Background>
      <Layout>
        <SEO title="S'inscrire" />
        <div>
          <div className="m-w p-i pb-0 bg-w link justify mt-32 mb-32 init">
            <div className="gr-log">
              <div>
                <h2 className="mb-0">S’inscrire sur Kiloka</h2>
                <h4 className="db align-left fs-16 fw300">
                  Inscrivez-vous avec votre adresse e-mail
                </h4>
                <form
                  onSubmit={handleSubmit(onSubmitRegister)}
                  style={{ maxWidth: "500px" }}
                >
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      onChange={onChangeInput}
                      name="email"
                      placeholder="Veuillez saisir votre adresse e-mail"
                      style={{ width: "100%" }}
                      ref={register({ required: true, minLength: 8 })}
                    />
                    {errors.email && (
                      <span className="msg_alert" style={{ color: "#d05b5b" }}>
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      onChange={onChangeInput}
                      name="password"
                      placeholder="Saisir un mot de passe"
                      ref={register({ required: true, minLength: 8 })}
                      style={{ width: "100%" }}
                    />
                    {errors.password && (
                      <span className="msg_alert" style={{ color: "#d05b5b" }}>
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      onChange={onChangeInput}
                      name="confirm_password"
                      placeholder="Confirmez le mot de passe"
                      ref={register({ required: true, minLength: 8 })}
                      style={{ width: "100%" }}
                    />
                    {errors.confirm_password && (
                      <span className="msg_alert" style={{ color: "red" }}>
                        {errors.confirm_password.message}
                      </span>
                    )}
                  </div>
                  {errorRegister && (
                    <span className="msg_alert" style={{ color: "red" }}>{errorRegister}</span>
                  )}

                  <div>
                    <button
                      type="submit"
                      style={{ padding: "0 15px" }}
                      className="btnlogin"
                      onClick={onSubmitRegister}
                    >
                      {loading ? "Chargement..." : "S'inscrire"}
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
                    <span class="google-button__text">
                      Connectez-vous avec Google
                    </span>
                  </button>

                  <div className="mt-20">
                    <p class="fs-16">
                      <span class="LinkContainer-sc-1t58wcv-0 knFNJQ">
                        En cliquant sur le bouton d'inscription, vous acceptez
                        les{" "}
                        <a href="/legal/end-user-agreement" target="_blank">
                          Conditions générales d'utilisation
                        </a>{" "}
                        de Kiloka.
                      </span>
                    </p>
                    <p class="fs-16">
                      <span class="LinkContainer-sc-1t58wcv-0 knFNJQ">
                        Pour en savoir plus sur la façon dont Kiloka utilise vos
                        données personnelles, veuillez consulter la{" "}
                        <a href="/legal/privacy-policy" target="_blank">
                          Politique de confidentialité
                        </a>{" "}
                        de Kiloka.
                      </span>
                    </p>
                  </div>

                  <div className=" align-left fs-16">
                    Vous avez déjà un compte ?{" "}
                    <a href="/login">Connectez-vous</a>.
                  </div>
                </form>
              </div>

              <div className="prenium">
                <span className="bdgeww">Abonnement Premium</span>
                <h1 className="price align-center">9.99 € </h1>
                <span className="month db align-center mb-32">
                  /mois <i>*Essayez gratuitement pendant 1 mois</i>
                </span>

                <div>
                  <span className="db align-center">Blog</span>
                  <span className="db align-center ">
                    Plans d'entraînement course à pied
                  </span>
                  <span className="db align-center ">
                    Exercices de fitness et de musculation
                  </span>
                  <span className="db align-center">Méditation+ (Audio)</span>
                  <span className="db align-center">
                    Programmes alimentaires
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  )
}

export default RegisterPage
