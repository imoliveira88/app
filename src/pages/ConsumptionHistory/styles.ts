import styled from 'styled-components/native'
import { BarChart } from 'react-native-svg-charts'
import { lighten } from 'polished'
import Button from '../../components/Button'

interface FilterButtonProps {
  selected: boolean
}

export const ChartArea = styled.View`
  flex-direction: row;
  flex:1;
  padding: 20px 10px 50px 10px;
`

export const ConsumptionChart = styled(BarChart)`
  height: 100%;
`

export const FilterArea = styled.View`
  flex-direction: row;
  padding-left: 5px;
  padding-right: 5px;
`

export const Left = styled.View`
  padding-left: 5px;
  padding-right: 5px;
  flex:1;
`
export const Right = styled.View`
  padding-left: 5px;
  padding-right: 5px;
  flex:1;
`
export const FilterButton = styled(Button) <FilterButtonProps>`
  background: ${props => props.selected ? lighten(0.7, '#003882') : '#fdfdfd'};
  border-radius: 4px;
`

export const RedButton = styled(Button)`
  width: 100%;
  margin: 8px auto;
  background-color:#d42e12;
`

export const FilterText = styled.Text`
  color: #003882;
`
export const TitleText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-left: 16px;
  color: #003882;
  padding-bottom:3%
`
