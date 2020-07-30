import React, { useEffect, useState, useContext } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { Link } from "gatsby"

import Legal from "../components/legalRegister"
import UserContext from "../components/UserContext"
import { navigate } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { signup, loginWithGoogle } from "../utils/firebase"
import styled from "@emotion/styled"

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 0px;
`

const Image = styled.div`
  
background: #FaFAFA;
height: 100vh;


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
      navigate("/Account")
    }
  }, [user])
  return (
    <>
    <Box>
      <SEO title="S'inscrire" />

      <div>
        <Image />
      </div>

      <div className="absolute">
        <div className="layout-form-signup shadow-plus padding">
          <h2 className="bold log-title width-mobile align-left">S’inscrire sur Fresh<span className="color-pink">door</span></h2>

          <form onSubmit={handleSubmit(onSubmitRegister)}>
            <input
              type="email"
              className="k-input uk-margin-bottom"
              onChange={onChangeInput}
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
              className="k-input uk-margin-bottom"
              onChange={onChangeInput}
              name="password"
              placeholder="Saisir un mot de passe"
              ref={register({ required: true, minLength: 8 })}
              style={{ width: "100%" }}
            />
            {errors.password && (
              <div className="alert">{errors.password.message}</div>
            )}
            <input
              type="password"
              className="k-input r4"
              onChange={onChangeInput}
              name="confirm_password"
              placeholder="Confirmez le mot de passe"
              ref={register({ required: true, minLength: 8 })}
              style={{ width: "100%" }}
            />
            {errors.confirm_password && (
              <div className="alert">{errors.confirm_password.message}</div>
            )}
            {errorRegister && (
              <span className="msg_alert" style={{ color: "red" }}>
                {errorRegister}
              </span>
            )}

            <div>
              <button
                type="submit"
                style={{ padding: "0 15px" }}
                className="button-submit r4"
                onClick={onSubmitRegister}
              >
                {loading ? "Chargement..." : "S'inscrire"}
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
              Vous avez déjà un compte ?{" "}
              <Link class="bold" to="/SignIn">
                Se connecter
              </Link>
              <Legal />
            </div>
          </form>
        </div>
      </div>
    </Box>
    </>
  )
}

export default RegisterPage
