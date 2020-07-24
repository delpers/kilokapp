import React, { useState, useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import { login, loginWithGoogle } from "../utils/firebase"
import { navigate, Link } from "gatsby"
import Layout from "../components/layout"
import UserContext from "../components/UserContext"
import SEO from "../components/seo"
import * as yup from "yup"


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
      <Layout>
        <SEO title="Connexion" />
        <div className="layout-form ">
          <div>
            <div>
              <h2 className="medium">Connexion</h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <input
                    type="email"
                    onChange={onChangeInput}
                    className="k-input r4"
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
                    className="k-input r4"
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
                    className="button-submit r4"
                    onClick={onSubmit}
                    style={{ padding: "0 15px" }}
                  >
                    {loading ? "Chargement..." : "Connexion"}
                  </button>
                </div>

                <button
                  className="button-google r4 color-gray width-full"
                  type="button"
                  onClick={loginByGmail}
                >
              
                  <span>Continuer avec Google</span>
                </button>

                <div className="align-center size-initial">
                  Vous n'avez pas de compte ?{" "}
                  <Link className="color-blue" to="/addu">
                    Inscription
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
  )
}

export default LoginPage
