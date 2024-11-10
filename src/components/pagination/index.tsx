import React from 'react'
import ReactPaginate from 'react-paginate'

export interface IPaginationComponent {
  handlePagination?: (selectedItem: { selected: number }) => void
  currentPage: number
  pages: number
}

const PaginationComponent: React.FC<IPaginationComponent> = ({
  currentPage,
  handlePagination,
  pages
}) => {
  return (
    <div
      style={{ height: '71.14px' }}
      className="f-column justify-content-center align-items-center"
    >
      <ReactPaginate
        breakLabel="..."
        previousLabel="<<"
        nextLabel=">>"
        pageCount={pages}
        onPageChange={handlePagination}
        containerClassName={'pagination'}
        activeClassName={'active'}
        forcePage={currentPage - 1}
      />
    </div>
  )
}

export default PaginationComponent
