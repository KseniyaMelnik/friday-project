import {Box, Slider } from '@mui/material';
import React, {ChangeEvent, useEffect, useState} from 'react';


type PacksRangePropsType = {
    minCardsCount: number
    maxCardsCount: number
    handleRangeChange: (values: number[]) => void
    cardsValuesFromRange: number[]
}

export const PacksRange = ({ minCardsCount, maxCardsCount, handleRangeChange, cardsValuesFromRange}: PacksRangePropsType) => {

    const [rangeValues, setRangeValues] = useState([minCardsCount, maxCardsCount])


    const handleChange = (event: Event, value: number | number[]) => {
        if (Array.isArray(value)) {
        if (value[0] === rangeValues[0] && value[1] === rangeValues[1]) return
        setRangeValues(value);
        handleRangeChange(value)
    }
}
    useEffect(() => {
        setRangeValues([cardsValuesFromRange[0], cardsValuesFromRange[1]])
    }, [cardsValuesFromRange])

    return (
       <Box sx={{width: 200}}>
           <Slider
               value={rangeValues}
               onChange={handleChange}
               valueLabelDisplay="auto"
           />
       </Box>
    )
}