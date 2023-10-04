import React from 'react';
import { Pagination } from 'antd';

export const PaginationComponent = ({ totalPages, currentPage, handleClick }) => {
  return (
    <Pagination
      current={currentPage}
      total={totalPages}
      onChange={handleClick}
    />
  );
};

export default PaginationComponent;

