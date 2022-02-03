import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components';
import axios from 'axios';
import AppContext from '../contexts/AppContext';

export default function Wallet() {
  const { name, token } = useContext(AppContext)
  let navigate = useNavigate();

  return (
    <Main>

      <Title>
        <span>Olá, {name ? name : "Fulano"}</span>
        <ion-icon name="log-out-outline" onClick={() => navigate("/")}></ion-icon>
      </Title>

      <Register>
        <span>Não há registros de <br />entrada ou saída</span>
      </Register>

      <ContainerButtons>

        <Button>
          <ion-icon name="add-circle-outline"></ion-icon>
          <span>Nova <br />entrada</span>
        </Button>

        <Button>
          <ion-icon name="remove-circle-outline"></ion-icon>
          <span>Nova <br />saída</span>
        </Button>

      </ContainerButtons>

    </Main>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 25px;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: 22px;

  font-size: 26px;
  line-height: 31px;
  color: #FFFFFF;
`

const Register = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 446px;
  border-radius: 5px;

  background-color: #FFFFFF;

  span {
    font-size: 20px;
    line-height: 23px;
    text-align: center;

    color: #868686;
  }
`

const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 13px;
  gap: 15px;
`

const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  width: 155px;
  height: 114px;
  padding: 10px 0 9px 10px;

  background: #A328D6;
  border: none;
  border-radius: 5px;

  font-size: 17px;
  line-height: 20px;
  color: #FFFFFF;
  text-align: left;

  ion-icon {
    font-size: 25px;
  }
`