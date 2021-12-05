import { useState, forwardRef, useRef, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  HStack,
  VStack,
  Text,
  StackDivider,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { getIsSnack } from "utils/meal"

/**
 * **Relveant features:**
 * - Will focus to selected item
 * - Will scroll to selected item
 */
export default function MealsListPopover({
  meals,
  Trigger,
  onMealClick,
  mealsListProps,
  mealItemProps,
  popoverContentProps,
  selected,
  ...props
}) {

  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)
  
  const DefaultTrigger = forwardRef((props, ref) => <Button {...props} ref={ref}>Open meals list</Button>)
  
  const initRef = useRef(null)
  useEffect(() => {
    if(isOpen) initRef.current.scrollIntoView()
  }, [isOpen])

  const selectedMealItemProps = {
    ref: (ref) => {
      initRef.current = ref
    }
  } 

  return (
    <Popover
      isOpen={isOpen}
      onClose={close}
      initialFocusRef={initRef}
      gutter={0}
      {...props}
    >
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            {
              Trigger
                ? <Trigger onClick={open} />
                : <DefaultTrigger onClick={open} />
            }
          </PopoverTrigger>
          <PopoverContent
            maxH="452px"
            w="272px"
            overflow="auto"
            {...popoverContentProps}
          >
            <MealsList
              meals={meals}
              onMealClick={(meal) => {
                onMealClick(meal);
                onClose();
              }}
              mealItemProps={mealItemProps}
              selectedMealItemProps={selectedMealItemProps}
              selected={selected}
              {...mealsListProps}
            />
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

/**
 * **Relevant features:**
 * - Pass `isLoading` prop. to show a loading indicator
 * - You could use `mealItemProps` or `selectedMealItemProps` as callbacks, each meal
 * will evaluate it. Or pass a simple object.
 * ```javascript
 * // i.e. Each meal calls:
 * mealItemProps(meal)
 * // and sets its return value in its props
 * ```
 */
export function MealsList({
  meals,
  onMealClick,
  mealItemProps,
  selectedMealItemProps,
  isLoading,
  selected,
  ...props
}) {
  if (isLoading) { 
    return (
      <Center p="10px" {...props}>
        <Spinner size="md" />
      </Center>
    );
  }
  return (
    <VStack
      spacing={0}
      divider={<StackDivider borderColor="black" />}
      {...props}
    >
      {meals.map((meal) => {
        const isSnack = getIsSnack(meal);
        const isMealSelected = selected?._id == meal._id

        let defaultBg = isSnack ? "red.50" : "orange.100";
        let defaultHoverBg = isSnack ? "red.100" : "orange.200";
        if (isMealSelected) {
          defaultBg = "green.100"
          defaultHoverBg = "green.100"
        }
        
        const _mealItemProps = mealItemProps instanceof Function
        ? mealItemProps(meal)
        : mealItemProps

        let _selectedMealItemProps = {};
        if (isMealSelected && selectedMealItemProps instanceof Function) {
          _selectedMealItemProps = selectedMealItemProps(meal)
        } else if (isMealSelected) {
          _selectedMealItemProps = selectedMealItemProps
        }

        return (
          <MealItem
            key={meal._id}
            meal={meal}
            onClick={() => onMealClick(meal)}
            bg={defaultBg}
            _hover={{ bg: defaultHoverBg }}
            _focus={{ bg: defaultHoverBg }}
            {..._mealItemProps}
            {...(isMealSelected && _selectedMealItemProps)}
          />
        );
      })}
    </VStack>
  );
}

export const MealItem = forwardRef(({ meal, ...props }, ref) => {
  const { meal_role, meal_title, protein_offered, carbs_offered, fat_offered } = meal
  const isSnack = getIsSnack(meal)
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
      ref={ref}
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
})

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