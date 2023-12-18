import Search from 'antd/es/input/Search'
import React from 'react'

function SearchComp({handleSearchChange}) {
  return (
    <Search
              placeholder="Tìm kiếm theo tên"
              allowClear
              onChange={(e) => handleSearchChange(e.target.value)}
              style={{
                marginLeft: "15px",
                width: 300,
              }}
            />
  )
}

export default SearchComp