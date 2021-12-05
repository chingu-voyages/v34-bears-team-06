import { useState, forwardRef } from 'react'
import DatePicker from "react-datepicker";
import {
  Box,
  VStack,
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
import { getTodaysMeals } from "utils/menu" 
import MealsListPopover from 'components/Meal/MealsListPopover'

/**
 * Form to add a new meal to the resident's eating history.
 * 
 * The form will be prepopulated with optimistic data:
 * - The next meal in the menu
 * - Todays date
 * @todo - prepopulate meals list only with todays meals
 * 
 */
export default function EatingHistoryForm({ residentId, upcomingMeal, menu }) {
  const [loading, setLoading] = useState(false)
  const [meal, setMeal] = useState(upcomingMeal)
  const [formData, _setFormData] = useState({
    day: new Date(),
    amount_eaten: 1,
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

  const meals = getTodaysMeals(menu)
  const MealListPopoverTrigger = forwardRef((buttonProps, ref) => (
    <Button
      w="250px"
      justifyContent="left"
      fontWeight="normal"
      ref={ref}
      {...buttonProps}
    >
      {
        !meal
          ? "Select a meal"
          : (<MealLabel meal={meal}/>)
      }
    </Button>
  ))

  const onSubmit = async () => {
    const fixedFormData = {
      ...formData,
      mealId: meal._id
    }
    console.log("[EatingHistoryForm][onSubmit] fixedFormData: ", fixedFormData);
    setLoading(true)
    await updateResident(residentId, { eating_history: fixedFormData })
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
        <MealsListPopover
          meals={meals}
          selected={meal}
          onMealClick={setMeal}
          Trigger={MealListPopoverTrigger}
          popoverContentProps={{maxHeight: "350px"}}
        />
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

const MealLabel = ({ meal }) => (
  <>
    <Text fontWeight="bold">
      { meal.meal_role }
    </Text>
    <Text ml="2px" isTruncated>
      { meal.meal_title }
    </Text>
  </>
)