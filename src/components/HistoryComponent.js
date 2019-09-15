import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  diplay: flex;
  flex-direction: column;
  padding-top: 40px;
`

export const HistoryComponent = ({history}) => {
  return (
    <Container>
      <h4>History</h4>
      <ol>
        {history.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </Container>
  )
}
