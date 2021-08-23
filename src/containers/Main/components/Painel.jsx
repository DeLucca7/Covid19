import React, { memo } from 'react';
import PropTypes from 'prop-types'
import RefreshIcon from '../../../assets/images/refresh.svg';
import { Card, Typography, Button, Select, MenuItem } from '../../../components';
import COUNTRIES from '../../../commons/constants/countries'
import { CardPanelContentStyled, ItemStyled } from './style';

const navigatorHasShare = navigator.share

function Painel({ updateAt, onChange, data, country, getCovidData }) {
    const { cases, recovered, deaths, todayCases, todayDeaths } = data

    const renderCountries = (country, index) => (
        <MenuItem key={`country-${index}`} value={country.value}>
            <ItemStyled>
                <div>{country.label}</div>
                <img src={country.flag} width="30px" alt={`País-${country.label}`} />
            </ItemStyled>
        </MenuItem>
    )

    const textCovid19 = `País: ${country} - Dados atualizados em ${updateAt} - Hoje - Casos: ${todayCases}. 
    Óbitos: ${todayDeaths}. Total - Casos: ${cases}. Óbitos: ${deaths}. Recuperados: ${recovered}`

    const copyInfo = () => {
        navigator.clipboard.writeText(textCovid19)
    }

    const shareInfo = () => {
        navigator.share({
            title: `Dados da Covid-19 - ${country}`,
            text: textCovid19,
            url: 'https://covid19dio.netlify.app/'
        })
    }

    const renderShareButton = (
        <div>
            <button variant="contained" color="primary" onClick={shareInfo}>
                Compartilhar
            </button>
        </div>
    )

    const renderCopyButton = (
        <div>
            <Button variant="container" color="primary" onClick={copyInfo}>
                Copiar
            </Button>
        </div>
    )

    return (
        <Card>
            <CardPanelContentStyled>
                <div>
                    <Typography variant="h5" components="span" color="primary">COVID-19</Typography>
                    <Typography variant="h6" components="span" color="primary">Painel Coronavírus</Typography>
                    <Typography variant="body2" components="span" color="primary">Atualizado em: {updateAt}</Typography>
                    <img src={RefreshIcon} alt="Atualizar" onClick={() => getCovidData(country)} className="cursor" />
                    <div className="pt-2">
                        <Select onChange={onChange} value={country}>
                            {COUNTRIES.map(renderCountries)}
                        </Select>
                    </div>
                </div>
                {navigatorHasShare ? renderShareButton : renderCopyButton}
            </CardPanelContentStyled>
        </Card>
    )
}

Painel.propTypes = {
    data: PropTypes.object.isRequired,
    updatedAt: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default memo(Painel)