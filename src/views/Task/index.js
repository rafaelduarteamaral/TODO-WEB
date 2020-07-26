import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import * as S from './styles';
import {format} from 'date-fns';
import api from '../../services/api';
import isConnected from '../../utils/isConnected';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import TypeIcons from './../../utils/typeIcons';
import iconCalendar from './../../assets/calendar.png';
import iconCLock from './../../assets/clock.png';

function Task({match}) {

  const [redirect, setRedirect] = useState(false);
  const [type, setType] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacaddress] = useState(isConnected);

  async function loadTaskDetails() {
    await api.get(`/task/${match.params.id}`)
    .then(response => {
      console.log(response)
      setType(response.data.type)
      setDone(response.data.done)
      setTitle(response.data.title)
      setDescription(response.data.description)
      setDate(format(new Date(response.data.when), 'yyyy-MM-dd'))
      setHour(format(new Date(response.data.when), 'HH:mm'))

    })
  }


  async function save() {

    if(!title) {
      return alert("você precisa informar título da tarefa");
    } else if(!description) {
      return alert("você precisa informar descrição da tarefa");
    } else if(!type) {
      return alert("você precisa informar tipo da tarefa");
    } else if(!date) {
      return alert("você precisa informar a data da tarefa");
    } else if(!hour) {
      return alert("você precisa informar a hora da tarefa");
    }
    

    if(match.params.id) {
      await api.put(`/task/${match.params.id}`, {
        macaddress: isConnected,
        type,
        done,
        title,
        description,
        when: `${date}T${hour}:00.000`
      }).then(response => {
        setRedirect(true)
      }).catch(error => {
        alert('ERRO AO CADASTRAR TAREFA')
      })
    } else {
      await api.post(`/task`, {
        macaddress: isConnected,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000`
      }).then(response => {
        setRedirect(true)
      }).catch(error => {
        alert('ERRO AO CADASTRAR TAREFA')
      })
    }
  }

  async function Remove(){
    const res = window.confirm('Deseja realmente remover a tarefa?')
    if(res === true) {
      api.delete(`/task/${match.params.id}`)
      .then(response => {
        setRedirect(true)
      }).catch(error => {
        alert('ERRO AO CADASTRAR TAREFA')
      })
    } else {
      alert('tudo bem, vamos manter')
    }
  }

  useEffect(() => {
    if(!isConnected) {
      setRedirect(true);
    }

    loadTaskDetails();
  }, [])
  
  return (
    <S.Container>
      {redirect && <Redirect to="/" />}
      <Header />
      <S.Form>
        <S.TypeIcons>
          {
            TypeIcons.map((icon, index) => (
              index != 0 && 
              <button type="button" onClick={() => setType(index)}>
                <img src={icon} alt="tipo da tarefa" className={type && type != index && 'inative'}/>
              </button>
            ))
          }
        </S.TypeIcons>

        <S.Input>
          <span>Titulo</span>
          <input type="text" placeholder="Título da tarefa..." onChange={e => setTitle(e.target.value)} value={title} />
        </S.Input>

        <S.TextArea>
          <span>Descrição</span>
          <textarea row={5} placeholder="Detahles da tarefa" onChange={e => setDescription(e.target.value)} value={description} />
        </S.TextArea>

        <S.Input>
          <span>Data</span>
          <input type="date" placeholder="Título da tarefa..." onChange={e => setDate(e.target.value)} value={date} />
          <img src={iconCalendar} alt="calendario" />
        </S.Input>

        <S.Input>
          <span>Hora</span>
          <input type="time" placeholder="Título da tarefa..." onChange={e => setHour(e.target.value)} value={hour} />
          <img src={iconCLock} alt="Relogio" />
        </S.Input>

        <S.Options>
          <div>
            <input type="checkbox" checked={done} onChange={() => setDone(!done)}/>
            <span>CONCLUÍDO</span>
          </div>
        { match.params.id && <button type="button" onClick={Remove} >EXCLUIR</button> }
        </S.Options>

        <S.Save>
          <button type="button" onClick={save}>SALVAR</button>
        </S.Save>

      </S.Form>
      <Footer />
    </S.Container>
  );
}

export default Task;
