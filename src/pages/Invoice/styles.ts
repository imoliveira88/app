import styled from 'styled-components/native'
import Button from '../../components/Button'
import { lighten } from 'polished'

interface FilterButtonProps {
  selected: boolean
}
export const Container = styled.View`
  margin-left:15px;
  margin-right:15px;
`

export const FilterArea = styled.View`
  flex-direction:row;
  justify-content:space-between;
  margin-left:10px;
  margin-right:10px; 
`

export const Left = styled.View`
  padding-left:5px;
  padding-right:5px;
  flex: 1;
`

export const Right = styled.View`
  padding-left:5px;
  padding-right:5px;
  flex: 1;
`

export const FilterButton = styled(Button) <FilterButtonProps>`
  background: ${props => props.selected ? lighten(0.7, '#003882') : '#fdfdfd'};
  border-radius: 4px;
`

export const FilterText = styled.Text`
  color: #003882;
`
