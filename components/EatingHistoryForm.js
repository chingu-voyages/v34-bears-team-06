import { useState } from 'react'
import DatePicker from "react-datepicker";
import {
  Box,
  VStack,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Text
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { updateResident } from 'utils/api'

/**
 * Form to add a new meal to the resident's eating history.
 * 
 * The meal to add should be the next in the menu, however, this component won't be 
 * limited to that. You can add any meal you want, but the form will be pre-populated 
 * with the next meal in the menu to make it easier to add it.
 * 
 * Currently only works with meal ids
 */
export default function EatingHistoryForm({ residentId, upcomingMealId }) {
  const [formData, _setFormData] = useState({
    day: new Date(),
    amount_eaten: 1,
    mealId: upcomingMealId
  });

  /**
   * Returns a function that sets the form data.
   */
  const setFormData = (name) => {
    return function (dataOrEvent) {
      if (dataOrEvent.target) dataOrEvent = dataOrEvent.target.value
      _setFormData(prev => {
        return {...prev, [name]: dataOrEvent}
      })
    }
  }

  const [loading, setLoading] = useState(false)
  const onSubmit = async () => {
    console.log("[EatingHistoryForm][onSubmit] formData: ", formData);
    setLoading(true)
    await updateResident(residentId, { eating_history: formData })
    setLoading(false)
  }
  
  return (
    <VStack w="75%" align="normal" spacing={5}>
      <Box>
        <Text fontWeight="600">Day:</Text>
        <DatePicker selected={formData.day} onChange={setFormData("day")} dateFormat="MM/dd/yyyy h:mm aa" showTimeSelect/>
      </Box>
      <Box>
        <Text fontWeight="600">Meal:</Text>
        <Input value={formData.mealId} onChange={setFormData("mealId")}/>
      </Box>
      <Box>
        <Text fontWeight="600">Amount eaten:</Text>
        <NumberInput maxW="75px" defaultValue={formData.amount_eaten} onChange={setFormData("amount_eaten")} step={0.1} min={0} >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Button onClick={onSubmit} isLoading={loading} alignSelf="center" w="100px" colorScheme="green">Submit</Button>
    </VStack>
  );
}
