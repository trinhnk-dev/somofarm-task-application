import { Grid, Typography } from 'antd'
import React from 'react'
import { Container } from 'react-bootstrap'
// import './style/_style.scss'
const PageNotFound = () => {
  return (
    <Container>
      <div className="page-not-fount-container">
        <div className="error-number-404">
          <p>404</p>
        </div>
        <div className="error-content">
          <p>PAGE NOT FOUND</p>
        </div>
      </div>
    </Container>
  )
}

export default PageNotFound
