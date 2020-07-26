import React from 'react';
import * as S from './styles'
import defaultIcon from '../../assets/default.png'

function FilterCard({title, actived}) {
    return (
        <S.Container actived={actived}>
            <img src={defaultIcon} alt="Filtro" />
            <span>{title}</span>
        </S.Container>
    )
}

export default FilterCard