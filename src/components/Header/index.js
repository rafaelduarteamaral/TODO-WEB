import React, { useEffect, useState } from 'react';
import * as S from './styles'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';
import api from '../../services/api';
import isConnected from '../../utils/isConnected';

function Header({ clickNotification }) {
    const [lateCount, setLateCount] = useState();

    async function lateVerify() {
        await api.get(`/task/filter/late/${isConnected}`)
        .then(response => {
            setLateCount(response.data.length);
        })
    }


    useEffect(() => {
        lateVerify();
    })

    async function Logout() {
        localStorage.removeItem('@todo/macaddress');
        window.location.reload();
    }

    return (
        <S.Container>
            <S.LeftSide>
                <img src={logo} alt="logo" />
            </S.LeftSide>
            <S.RightSide>
                <Link to="/" href="!#" >INÍCIO</Link>
                <span className="dividir" />
                <Link to="/task" >NOVA TAREFA</Link>
                <span className="dividir" />
                {   !isConnected ?
                    <Link to="/qrcode" >SICRONIZAR CELULAR</Link>
                    :
                    <>
                        <button type="button" onClick={ Logout } >SAIR</button>
                    </>
                }
                <span className="dividir" />
                <button onClick={clickNotification} className="notification" id="notification">
                    <img src={bell} alt="Notifica" />
                    <span>{lateCount}</span>
                </button>
            </S.RightSide>
        </S.Container>
    )
}

export default Header