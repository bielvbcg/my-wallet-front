import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components';
import axios from 'axios';
import joi from "joi"
import AppContext from '../contexts/AppContext';

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [botaoClickado, setBotaoClickado] = useState(false)
  const { setToken, setName } = useContext(AppContext)
  let navigate = useNavigate()

  function login(event) {
    event.preventDefault()

    setBotaoClickado(true)

    const signUpSchema = joi.object({
      email: joi.string().email({ tlds: { allow: false } }).required(),
      password: joi.string().required()
    })

    const user = { email, password }

    const validation = signUpSchema.validate(user, { abortEarly: true })
    if (validation.error) {
      const message = validation.error.details.message
      alert(message)
      setBotaoClickado(false)
      return
    }

    const cadastro = axios.post("http://localhost:5000/login",
      {
        email,
        password,
      })

    cadastro.then((r) => {
      setToken(r.data.token)
      setName(r.data.name)
      setBotaoClickado(false)
      navigate("/wallet")
    })

    cadastro.catch(error => {
      alert(error.response.data)
      setBotaoClickado(false)
    })
  }

  return (
    <Main>

      <h1>MyWallet</h1>

      <form onSubmit={login}>
        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} disabled={botaoClickado} />
        <input type="password" placeholder="Senha" value={password} onChange={e => setpassword(e.target.value)} disabled={botaoClickado} />

        <Button type='submit' disabled={botaoClickado}>Entrar</Button>

      </form>

      <StyledLink to={"/sign-up"}>Primeira vez? Cadastre-se!</StyledLink>

    </Main>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding-top: 68px;

  h1 {
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    line-height: 50px;

    color: #FFFFFF;

    margin: 40px 0;
  }

  form {
    display: flex;
    flex-direction: column;

    gap: 6px;
    margin-bottom: 25px;
  }

  form input {
    width: 303px;
    height: 45px;

    border: 1px solid #D5D5D5;
    border-radius: 5px;

    font-size: 17px;
    line-height: 23px;

    ${props => props.disabled && "background-color: #F2F2F2"}
  }

  form input::placeholder {
    color: #000000;
    padding-left: 11px;
  }
`

const Button = styled.button`
  width: 303px;
  height: 45px;

  background: ${props => props.disabled ? "#8849a3" : "#A328D6"};
  border-radius: 4.63636px;
  border: none;

  color: #FFFFFF;
  font-size: 20.976px;
  line-height: 26px;
`

const StyledLink = styled(Link)`
    color: #FFFFFF;
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
`