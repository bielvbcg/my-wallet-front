import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components';
import axios from 'axios';
import AppContext from '../contexts/AppContext';

export default function Wallet() {
  const [entrys, setEntrys] = useState(null)
  const [total, setTotal] = useState(null)
  const { name, token } = useContext(AppContext)
  let navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        "Authorization": `Bearer ${token}
      ` }
    }

    const entrysPromisse = axios.get("http://localhost:5000/entries", config)

    entrysPromisse.then(response => {
      let sum = 0;

      response.data.map(item => {
        if (item.type === "in") sum += parseFloat(item.value)
        else if (item.type === "out") sum -= parseFloat(item.value)
        console.log(item.value)
      })

      { response.data !== [] ? setEntrys(response.data) : setEntrys(null) }
      setTotal(sum)
    })

    entrysPromisse.catch(error => console.log(error.message))
  }, [])

  return (
    <Main>

      <Title>
        <span>Olá, {name ? name : "Fulano"}</span>
        <ion-icon name="log-out-outline" onClick={() => navigate("/")}></ion-icon>
      </Title>

      {entrys === null ?
        <NoEntrys>
          <span>Não há registros de <br />entrada ou saída</span>
        </NoEntrys>
        :
        <Register>

          <div className="entrys">
            {entrys.map(entry => (
              <div className="entry">
                <div className="date">{entry.date}</div>
                <div className="description">{entry.description}</div>
                <div className={`value ${entry.type}`}>{parseFloat(entry.value).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="wallet">
            <span>SALDO</span>
            <div className={`total ${total >= 0 ? "in" : "out"}`}>{Math.abs(total).toFixed(2)}</div>
          </div>

        </Register>
      }

      <ContainerButtons>

        <Button onClick={() => navigate("/wallet/new-in")}>
          <ion-icon name="add-circle-outline"></ion-icon>
          <span>Nova <br />entrada</span>
        </Button>

        <Button onClick={() => navigate("/wallet/new-out")}>
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
  font-weight: bold;
  color: #FFFFFF;
`

const NoEntrys = styled.div`
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

const Register = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 446px;
  padding-top: 15px;
  border-radius: 5px;

  background-color: #FFFFFF;

  .entrys {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 423px;
    height: 100%;
  }
  
  .entrys .entry {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 16px;
    line-height: 19px;
  }

  .entrys  .entry .date {
    width: 48px;

    color: #C6C6C6;
  }

  .entrys  .entry .description {
    width: 193px;
    padding-left: 3px;

    color: #000000;
  }

  .entrys  .entry .value {
    width: 62px;
    text-align: right;
  }
  
  .wallet {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    padding-right: 11px;
    padding-bottom: 10px;
    padding-left: 15px;

    font-size: 17px;
    line-height: 20px;
  }

  .wallet span {
    font-weight: bold;
    
    color: #000000;
  }
  
  .wallet .total {
    text-align: right;
  }
  
    .in {
      color: #03AC00;
    }
  
    .out {
      color: #C70000;
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
  font-weight: bold;
  color: #FFFFFF;
  text-align: left;

  ion-icon {
    font-size: 25px;
  }
`