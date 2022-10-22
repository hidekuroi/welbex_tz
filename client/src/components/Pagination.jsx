import React from 'react'
import c from './Pagination.module.css'

/*
    Тот еще гемор писать пагинацию без разрешения использовать
     сторонние библиотеки))))
*/

const Pagination = ({currentPage, totalCount, limit, changePage}) => {
    const pageCount = Math.ceil(totalCount / limit)
    const pages = []

    if(pageCount <= 7) {
        for (let p = 0; p < pageCount; p++) {
            pages.push(p + 1)
        }
    }
    if(currentPage <= 4 && pageCount > 7) {
        for (let p = 0; p < 6; p++) {
            pages.push(p + 1)
        }
        pages.push('...')
        pages.push(pageCount)
    }
    if(currentPage > 4 && currentPage < pageCount - 3) {
        pages.push(1)
        pages.push('...')
        for (let p = currentPage - 3; p < currentPage + 2; p++) {
            pages.push(p + 1)
        }
        pages.push('...')
        pages.push(pageCount)
    }
    if(currentPage >= pageCount - 3 && pageCount > 7) {
        pages.push(1)
        pages.push('...')
        for (let p = pageCount - 6; p < pageCount; p++) {
            pages.push(p + 1)            
        }
    }


    const prevPage = () => {
        if(currentPage > 1) changePage(currentPage - 1)
    }

    const nextPage = () => {
        if(currentPage < pageCount) changePage(currentPage + 1)
    }

  return (
    <div className={c.pagination}>
        <div className={`${c.paginationItem} ${currentPage === 1 && `${c.disabled}`}`}
            onClick={prevPage}
        >
            <span>{'<'}</span>
        </div>
        {pages.map(p => 
        <div key={p}
            className={`${c.paginationItem} ${p === currentPage && `${c.active}` }`}
            onClick={() => changePage(p)}
        >
            <span>{p}</span>
        </div>
        )}
        <div className={`${c.paginationItem} ${currentPage === pageCount && `${c.disabled}`}`}
            onClick={nextPage}
        >
            <span>{'>'}</span>
        </div>
    </div>
  )
}

export default Pagination