import React, { useState } from 'react'
import c from './Filtration.module.css'

const Filtration = ({submit}) => {
    const [inputValue, setInputValue] = useState('')
    const [keyValue, setKeyValue] = useState('')
    const [conditionValue, setConditionValue] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()

        submit({
            key: keyValue,
            condition: conditionValue,
            value: inputValue
        })
    }

  return (
    <div className={c.filterWrapper}>
            <form onSubmit={submitHandler}>
                <div className={c.formWrapper}>

                    <div className={c.title}><p>Фильтрация:</p></div>
                    <div>
                        <select value={keyValue}
                        onChange={(e) => {
                            setKeyValue(e.target.value)
                            setInputValue('')
                        }}
                        name="key" id="key">
                            <option style={{backgroundColor: '#ddd'}} value=''>Нет</option>
                            <optgroup style={{fontWeight: 'bold'}} label='Поля фильтрации'>
                                <option disabled={(conditionValue !== '') && (conditionValue !== 'contains')} value="title">Название</option>
                                <option value="amount">Количество</option>
                                <option value="distance">Расстояние</option>
                            </optgroup>
                        </select>
                    </div>
                    
                    <div>
                        <select value={conditionValue}
                        onChange={(e) => {
                            setConditionValue(e.target.value)
                            setInputValue('')
                        }}
                        name="condition" id="condition">
                            <option style={{backgroundColor: '#ddd'}} value="">Нет</option>
                            <optgroup style={{fontWeight: 'bold'}} label='Условия'>
                                <option value="contains">Содержит</option>
                                <option disabled={keyValue === 'title'} value="equal">Равно</option>
                                <option disabled={keyValue === 'title'} value="greater">Больше</option>
                                <option disabled={keyValue === 'title'} value="less">Меньше</option>
                            </optgroup>
                        </select>
                    </div>

                    <div>
                        <input
                        type={conditionValue !== 'contains' || keyValue !== 'title' ? 'number' : 'text'}
                        step='0.01'
                        disabled={keyValue === '' || conditionValue === ''}
                        placeholder='Значение' value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                    
                    <div className={c.btn}>
                        <button type='submit'>Поиск</button>
                    </div>
                
                </div>
            </form>

    </div>
  )
}

export default Filtration