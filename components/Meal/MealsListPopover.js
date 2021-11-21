import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  HStack,
  VStack,
  Text,
  StackDivider
} from "@chakra-ui/react";

export default function MealsListPopover({ meals, trigger, onMealClick, mealsListProps, mealItemProps, popoverContentProps, ...props}) {
  const defaultTrigger = <Button>Open meals list</Button>

  return (
    <Popover gutter={0} {...props}>
      {({onClose}) => (
        <>
          <PopoverTrigger>
            { trigger || defaultTrigger }
          </PopoverTrigger>
          <PopoverContent
            maxH="452px"
            w="272px"
            overflow="auto"
            {...popoverContentProps}
          >
            <MealsList
              meals={meals}
              onMealClick={(meal) => {onMealClick(meal); onClose()}}
              mealItemProps={mealItemProps}
              {...mealsListProps}
            />
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export function MealsList({ meals, onMealClick, mealItemProps, ...props}) {
  return (
    <VStack
      spacing={0}
      divider={<StackDivider borderColor="black" />}
      {...props}
    >
      {meals.map((meal, i) => <MealItem
        key={meal._id}
        meal={meal}
        onClick={() => onMealClick(meal)}
        {...mealItemProps}
      />)}
    </VStack>
  )
}

export function MealItem({ meal, ...props }) {
  const { meal_role, meal_title, protein_offered, carbs_offered, fat_offered } = meal
  const isSnack =  (["AM Snack", "PM Snack", "HS Snack"]).some(role => role === meal_role)
  return (
    <VStack
      as="button"
      bg={isSnack ? "red.50" : "orange.100"}
      px={2}
      py={1}
      h={90}
      w='100%'
      textAlign="left"
      alignItems="start"
      spacing={0}
      sx={{"> *": {fontSize: 13}}}
      {...props}
    >
      <Text fontWeight="bold">
        {meal_role}
      </Text>
      <Text h="50%" isTruncated noOfLines={2} whiteSpace='normal'>
        {meal_title}
      </Text>
      <HStack alignSelf="center">
        <MealItemNutrient name="P" value={protein_offered} />
        <MealItemNutrient name="C" value={carbs_offered} />
        <MealItemNutrient name="F" value={fat_offered} />
      </HStack>
    </VStack>
  )
}

function MealItemNutrient({ name='P', value=20, ...props }) {
  return (
    <HStack {...props}>
      <Text fontWeight='bold'>
        { name }:
      </Text>
      <Text>
        { value }
      </Text>
    </HStack>
  )
}