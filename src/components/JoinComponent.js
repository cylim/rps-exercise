import React, {useRef} from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  diplay: flex;
  flex-direction: column;
  padding-top: 40px;
`

const Row = styled.div`
  diplay: flex;
  flex-direction: row;
  padding: 8px;
`

const Input = styled.input`
  outline: 0;
  padding: 0.6rem 1rem;
  margin: 0.2rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 3px;
  min-width: 300px;
  &:focus,
  &:active {
    border-color: #85b7d9;
  }
`

const Select = styled.select`
  outline: 0;
  padding: 0.6rem 1rem;
  margin: 0.2rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  height: 34px;
  min-width: 300px;
  &:focus,
  &:active {
    border-color: #85b7d9;
  }
`

export const JoinComponent = ({handleAction}) => {
  const move = useRef(null)
  const address = useRef(null)

  const handleSubmit = e => {
    e.preventDefault()
    handleAction({
      move: move.current.value,
      address: address.current.value,
    })
  }

  return (
    <Container onSubmit={handleSubmit}>
      <h4>Join Game</h4>
      <form>
        <Row>
          <label>Move: </label>
          <Select ref={move} required>
            <option value="1">Rock</option>
            <option value="2">Paper</option>
            <option value="3">Scissors</option>
            <option value="4">Spock</option>
            <option value="5">Lizard</option>
          </Select>
        </Row>
        <Row>
          <label>Contract Address: </label>
          <Input
            type="text"
            name="address"
            ref={address}
            placeholder="The game address you wished to join in"
            required
          />
        </Row>
        <Input type="submit" value="Submit" />
      </form>
    </Container>
  )
}
