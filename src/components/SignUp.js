import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components';
import axios from 'axios';

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [botaoClickado, setBotaoClickado] = useState(false)
  let navigate = useNavigate()

  function signUp(event) {
    event.preventDefault()

    const cadastro = axios.post("http://localhost:5000/sign-up",
      {
        name,
        email,
        password,
      })

    setBotaoClickado(true)

    cadastro.then((r) => {
      navigate("/")
      setBotaoClickado(false)
    })

    cadastro.catch(error => {
      alert(error.response.data.message)
      setBotaoClickado(false)
    })
  }

  return (
    <Main>

      <h1>MyWallet</h1>

      <form onSubmit={SignUp}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} disabled={botaoClickado} />
        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} disabled={botaoClickado} />
        <input type="password" placeholder="Senha" value={password} onChange={e => setpassword(e.target.value)} disabled={botaoClickado} />
        <input type="password" placeholder="Confirme a senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} disabled={botaoClickado} />

        <Button type='submit' disabled={botaoClickado}>Cadastrar</Button>

      </form>

      <StyledLink to={"/"}>Já tem uma conta? Entre agora!</StyledLink>

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
    padding-left: 11px;
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