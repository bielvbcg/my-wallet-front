import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components';
import axios from 'axios';
import joi from "joi"
import AppContext from '../contexts/AppContext';

export default function NewOut() {
  const [value, setValue] = useState(null)
  const [description, setDescription] = useState(null)
  const [botaoClickado, setBotaoClickado] = useState(false)
  const { token } = useContext(AppContext)
  let navigate = useNavigate()

  function newEntry(event) {
    event.preventDefault()
    setBotaoClickado(true)

    const entrySchema = joi.object({
      value: joi.number().required(),
      description: joi.string().required(),
    })

    const validation = entrySchema.validate({ value, description })
    if (validation.error) {
      alert(validation.error.details.message)
      setBotaoClickado(false)
      return
    }

    const entry = { value, description, token }
    console.log(entry)

    setBotaoClickado(false)
    navigate("/wallet")
  }

  return (
    <Main>

      <h1>Nova saída</h1>

      <form onSubmit={newEntry}>

        <input type="number" placeholder="Valor" value={value} onChange={e => setValue(e.target.value)} disabled={botaoClickado} />
        <input type="text" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} disabled={botaoClickado} />

        <Button type='submit' disabled={botaoClickado}>Salvar saída</Button>

      </form>

    </Main>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;

  padding: 25px;

  h1 {
    font-size: 26px;
    line-height: 31px;
    font-weight: bold;
    text-align: left;

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