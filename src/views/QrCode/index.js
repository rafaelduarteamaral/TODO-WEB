import React, { useState } from 'react';
import {Redirect, Router} from 'react-router-dom';
import * as S from './styles';
import Qr from 'qrcode.react';

import { Link } from 'react-router-dom';
import api from '../../services/api';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import FilterCard from './../../components/FilterCard';
import TaskCard from './../../components/TaskCard';

function QrCode() { 
  const [mac, setMac] = useState();
  const [redirect, setRedirect] = useState();

  async function SaveMac() {
    if(!mac) {
      alert('Você precisa informar o número que apareceu no celular');
    } else {
      await localStorage.setItem('@todo/macaddress', mac);
      setRedirect(true);
      window.location.reload();
    }
  }

  return(
    <S.Container>
      { redirect && <Redirect to="/" /> }
      <Header/>
      <S.Content>
        <h1>CAPTURE O QRCODE PELO APP</h1>
        <p>Suas atividades serão sincronizadas com a do seu celular</p>
        <S.QrCodeArea>
          <Qr value='macaddress' size={350} />
        </S.QrCodeArea>
        <S.ValidationCode>
          <span>Digite a numeração que apareceu no celular</span>
          <input type="text" onChange={ e => setMac(e.target.value) } value={ mac }/>
          <button onClick={SaveMac} >SINCRONIZAR</button>
        </S.ValidationCode>
      </S.Content>
      <Footer />
    </S.Container>
  );
}

export default QrCode;