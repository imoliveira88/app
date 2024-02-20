import React, { useEffect, useState } from 'react'
import { Alert, processColor } from 'react-native'
import moment from 'moment'
import Header from '../../components/Header'
import { FilterArea, FilterButton, FilterText, TitleText, Left, Right } from './styles'
import { RedButton } from './styles'
import api from '../../services/api'
import DatePicker from 'react-native-datepicker';
import { FlatList } from 'react-native-gesture-handler'
import Invoice from '../../components/Invoice'
import { BarChart } from 'react-native-charts-wrapper';
import Loader from '../../components/Loader'

import {
  Row,
  Col,
  Container
} from './../../components/GlobalStyles'

const ConsumptionHistory: React.FC = () => {
  const fill = 'rgb(0, 51, 130)'
  const contentInset = { top: 10, bottom: 10 }

  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedMonthPeriodChart, setSelectedMonthPeriodChart] = useState(false)
  const [selectedAnnualChart, setSelectedAnnualChart] = useState(true)
  const [annualChartData, setAnnualChartData] = useState<Array<Object>>([]);
  const [labels, setLabels] = useState<Array<String>>([]);
  const [monthlyData, setMonthlyData] = useState<any>([]);
  const [initDate, setInitDate] = useState<String>();
  const [endDate, setEndDate] = useState<String>();
  const [isGrouped, setIsGrouped] = useState<boolean>();

  useEffect(() => {
    async function loadChartData() {
      const response = await api.get('api/consumption/history/by-user')
      let labels: any = [];
      let annualChartData: any = [];
      const dados = response.data.data;

      dados.map((item: any) => {
        const parts = item[0].split('/');
        const label =  parts[0] + '/' +  parts[1].substring(2,4);
        labels.push(label);
        annualChartData.push({ y: item[1] });
      });

      setAnnualChartData(annualChartData);
      setLabels(labels);
      setIsLoading(false)
      // console.log(labels);
    }

    setInitDate(moment().startOf('month').format('DD/MM/YYYY'));
    setEndDate(moment().endOf('month').format('DD/MM/YYYY'));
    loadChartData()
  }, [])

  async function getMonthlyData() {
    setButtonLoading(true)

    let dateInit = initDate;
    let dateEnd = endDate;

    try{
      const response = await api.get(`/api/consumption/list/by-user?dateInit=${dateInit}&dateEnd=${dateEnd}`);

      setMonthlyData(response.data.result)
      setIsGrouped(response.data.grouped)
      setButtonLoading(false)
    }catch(e){
      setButtonLoading(false)
      let message = e.response != null ? e.response.data.error : e.message;

      Alert.alert('Obs!',
        message
      );
    }



  }

  function handleSelectAnnualChart(): void {
    setSelectedAnnualChart(true)
    setSelectedMonthPeriodChart(false)
  }

  function handleSelectMonthlyChart(): void {
    setSelectedAnnualChart(false)
    setSelectedMonthPeriodChart(true)
  }

  return (
    <>
      <Header />
      {
        !isLoading ? (
          body()
        ) : (
            <Loader />
          )
      }
    </>
  )

  function body() {
    return (
      <>
        <FilterArea>
          <Left>
            <FilterButton style={{ elevation: 5 }}
              image={null}
              icon={null}
              selected={selectedAnnualChart}
              onPress={handleSelectAnnualChart}>
              <FilterText>
                GRÁFICO ANUAL
            </FilterText>
            </FilterButton>
          </Left>

          <Right>
            <FilterButton style={{ elevation: 5 }}
              image={null}
              icon={null}
              onPress={handleSelectMonthlyChart}
              selected={selectedMonthPeriodChart}
            >
              <FilterText>
                MENSAL
            </FilterText>
            </FilterButton>
          </Right>
        </FilterArea>

        {selectedAnnualChart &&
          <>
            <TitleText>
              Gráfico de consumo dos ultimos 12 meses
            </TitleText>
            <BarChart
              description={{ textSize: 15 }}
              style={{ flex: 1 }}
              legend={{ enabled: true, textSize: 15 }}
              data={{ dataSets: [{ config: { color: processColor('#003382') }, label: 'Consumo', values: annualChartData }] }}
              animation={{ durationX: 2000 }}
              visibleRange={{ x: { min: 6, max: 6 } }}
              xAxis={{
                textSize: 13,
                valueFormatter: labels,
                granularityEnabled: true,
                granularity: 1,
              }}
              drawBarShadow={false}
              drawValueAboveBar={true}
              drawHighlightArrow={true}
            />

          </>
        }

        {selectedMonthPeriodChart &&
          <>
            <TitleText>
              Histórico de consumo mensal
          </TitleText>
            <Container>
              <Row>
                <Col>
                  <DatePicker locale="pt-BR" showIcon={false} date={initDate} cancelBtnText="Cancelar" confirmBtnText="Concluído" style={{ width: '100%' }} customStyles={dateStyle} format="DD/MM/YYYY" onDateChange={(date) => setInitDate(date)} />
                </Col>
                <Col>
                  <DatePicker locale="pt-BR" showIcon={false} date={endDate} cancelBtnText="Cancelar" confirmBtnText="Concluído" style={{ width: '100%' }} customStyles={dateStyle} format="DD/MM/YYYY" onDateChange={(date) => setEndDate(date)} />
                </Col>
              </Row>
              <RedButton isLoading={buttonLoading} onPress={() => getMonthlyData()} icon={null} image={null} >
                Buscar
            </RedButton>
              <FlatList
                data={monthlyData}
                style={{ height: '60%' }}
                renderItem={({item}: any) =>
                  <Invoice
                    expiryDate={item.vencimento}
                    measurementDate={item.date_start + ' até ' + item.date_end}
                    dateInit={item.date_start}
                    dateEnd={item.date_end}
                    value={'R$' + item.valor.toString()}
                    openInvoice={false}
                    id={item.titulo}
                    grouped={isGrouped != undefined ? isGrouped : null}
                  />
                }
                initialNumToRender={monthlyData.length}
                keyExtractor={(item: any) => item.vencimento.toString()}
              />
            </Container>
          </>
        }
      </>
    )
  }
}

const dateStyle = {
  dateIcon: { display: 'none' },
  btnTextConfirm: { color: 'red' },
  dateInput: { borderRadius: 4 },
  datePicker: {
    justifyContent: 'center'
  }
};

export default ConsumptionHistory
