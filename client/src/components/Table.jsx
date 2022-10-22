import React, { useEffect, useState } from 'react'
import { getItems } from '../api/itemsApi'
import Filtration from './Filtration'
import Pagination from './Pagination'
import c from './Table.module.css'

const Table = () => {
    const [items, setItems] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [terms, setTerms] = useState({})
    const limit = 10

    useEffect(() => {
      getItems(1, limit).then(data => {
        setItems(data.items)
        setTotalCount(data.count)
      })
    }, [])

    useEffect(() => {
      if(terms) {
        getItems(currentPage, limit, terms.key, terms.condition, terms.value).then(data => {
            setItems(data.items)
            setTotalCount(data.count)
        })
      }
      else {
        getItems(currentPage, limit).then(data => {
            setItems(data.items)
            setTotalCount(data.count)
        })
      }
    }, [currentPage, terms])
    
    
    if(!items){
        return(<div className={`${c.tableWrapper} ${c.loader}`}>Загрузка...</div>)
    }

  return (
    <div className={c.tableWrapper}>
        <Filtration submit={(terms) => setTerms(terms)} />
        <table className={c.table}>
            <thead>
                <tr>
                    <th></th>
                    <th>Дата</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Расстояние</th>
                </tr>
            </thead>
            <tbody>
                {items.length 
                    ?
                        <>
                        {items.map((i, index) => {
                            const date = i.date.split('T')
                        return <tr key={i.id}>
                            <td>{index + 1}</td>
                            <td>{date[0]}</td>
                            <td>{i.title}</td>
                            <td>{i.amount}</td>
                            <td>{i.distance}</td>
                        </tr>
                        }
                        )}
                        </>
                    :
                        <>
                        <tr>
                            <td colSpan={5}>По вашему запросу не найдено ни одной записи...</td>
                        </tr>
                        </>
                }
            </tbody>
        </table>
        <Pagination currentPage={currentPage} totalCount={totalCount} limit={limit} changePage={(p) => setCurrentPage(p)}/>
    </div>
  )
}

export default Table