import { useState, useEffect } from "react";
import {
  Box,
} from "@chakra-ui/react";
import moment from "moment";
import UpdateIndividualMeal from "components/UpdateIndividualMeal";

moment().format();

export default function IndivMealDisplay({ residentId, historyId, mealId, day, amount, mealToUpdate, setMealToUpdate }) {
  const [active, setActive] = useState(false);
  const [clickedOnce, setClickedOnce] = useState(false)
  return (
    <>
      <Box
        key={mealId}
        data-id={historyId}
        data-meal-id={mealId}
        bg="white"
        p={2}
        mx={2}
        borderRadius="md"
        
      >
        <div className="dateOfMeal" onClick={(e) => {
          if (active === false) setActive(true);
          console.log(mealId, active)
        }}>
          <b>Date: </b>
          <p>{moment(day).format("MMM Do, YYYY")}</p>
        </div>
        <div className="amountEaten">
          <b>Amount Eaten: </b>
        {
        active === false && 
          <p>{amount}</p>}
        </div>
        <div>
          {
          active === true && 
          <UpdateIndividualMeal residentId={residentId} historyId={historyId} amountEaten={amount} mealId={mealId}/>
          } 
        </div>
      </Box>
    </>
  );
}
