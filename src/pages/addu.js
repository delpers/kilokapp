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
    border: 0 !important;
    background: white;
  }
`
const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Veuillez saisir votre e-mail pour vous inscrire!")
    .min(6, "L'email est trop court, sinon vérifiez qu'elle n'est pas déjà utilisée."),
  password: yup
    .string()
    .required("Veuillez saisir votre mot de passe pour vous inscrire!")
    .min(8, "L'email est trop court - devrait être de 6 caractères minimum."),
  confirm_password: yup
    .string()
    .required("Veuillez confirmer le mot de passe!")
    .min(8, "L'email est trop court - devrait être de 6 caractères minimum.")
    .oneOf([yup.ref("password"), null], "Les mots de passe doivent correspondre"),
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
      <SEO title="Inscription" />
      <div>
    

        <div className="m-w p-i pb-0 bg-w link justify mt-32 mb-32 init">

          <div className="gr-log">

            <div>
            <h1>S’inscrire sur Kiloka</h1>
            <h4 className="db align-left">Découvrez dès maintenant Kiloka Premium.</h4>

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
                <span style={{ color: "red" }}>{errors.email.message}</span>
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
                <span style={{ color: "red" }}>{errors.password.message}</span>
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
                <span style={{ color: "red" }}>
                  {errors.confirm_password.message}
                </span>
              )}
            </div>
            {errorRegister && (
              <span style={{ color: "red" }}>{errorRegister}</span>
            )}
          
            <div>
            <button
                type="submit"
                style={{ padding: "0 15px" }}
                className="btnlogin"

                onClick={onSubmitRegister}
              >
                {loading ? "Chargement..." : "Inscription"}
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

            <div
              className="mt-10 align-center fs16"
             
            >
            <a href="/login">Connexion</a>
              
            </div>

          </form>
            </div>
         
         <div className="prenium">
         <span className="bdgeww">Abonnement Premium</span>
                <h1 className="price align-center">9.99 € </h1>
                <span className="month db align-center mb-32">/mois                 <i>*Essayez gratuitement pendant 1 mois</i>
</span>

                <div>

                <span className="db align-center">Blog</span>
                <span className="db align-center ">Plans d'entraînement course à pied</span>
                <span className="db align-center ">Exercices de fitness et de musculation</span>
                <span className="db align-center">Méditation+ (Audio)</span>
                <span className="db align-center">Programmes alimentaires</span>


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
