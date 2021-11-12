import { useState, useEffect } from "react";
import {
  Button,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import moment from "moment";
import { updateMealInEatingHistory } from "utils/api"
moment().format();

export default function UpdateIndividualMeal({ residentId, historyId, amountEaten, mealId }) {

  const [amount_eaten, setAmountEaten] = useState(amountEaten)
  // const [updateData, setUpdateData] = useState({
  //   amount_eaten: amountEaten,
  //   array_id: historyId
  // })

  async function handleSubmit() {
    // setUpdateData({
    //   amount_eaten: parseFloat(numberEaten),
    //   array_id: historyId
    // })
    console.log("[UpdateIndividualMeal] amount_eaten: ", amount_eaten)
    await updateMealInEatingHistory(residentId, historyId, {amount_eaten})

    // console.log(updateData)
  }

  // useEffect(() => {
  //   setUpdateData({
  //     amount_eaten: parseFloat(numberEaten),
  //     array_id: historyId
  //   })
  // }, [numberEaten])

  return (
    <>
      <Center mb={2}>
        <NumberInput
        // {...register("amountEaten")}
        name="amountEaten"
          step={0.05}
          value={amount_eaten}
          size="sm"
          maxW={20}
          min={0}
          max={1}
          onChange={(e) => {
            setAmountEaten(e)
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Center>
      <Button size="sm" colorScheme="green" onClick={handleSubmit}>
        Update
      </Button>
    </>
  );
}
