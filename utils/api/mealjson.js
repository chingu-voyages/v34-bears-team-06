// All Breakfasts have 500 kcal (24%), all lunches have 750 kcal (36%),
// all suppers have 800 kcal (38%)

// Breakfast: 24g protein, 72g carbs, 12g fat
// Lunch: 36g protein, 108g carbs, 18g fat
// Supper: 40g protein, 120g carbs, 20g fat

// A day has 100 g of protein, 300 g of carbs, and 50 g of fat

const mockMenu = {
  easy_id: "FW2122",
  menu_title: "Fall-Winter 2021-2022",
  init_date: new Date(Date.UTC(2021, 9, 1, 12, 0, 0)),
  days: [
    {
      day_number: 1,
      meals: [
        {
          meal_role: "Breakfast",
          meal_time: new Date(Date.UTC(2000, 1, 1, 9, 30, 0)),
          meal_title:
            "Blueberries. Cinnamon oatmeal with hard boiled egg and whole wheat toast",
          protein_offered: 24,
          carbs_offered: 72,
          fat_offered: 12,
        },
        {
          meal_role: "Lunch",
          meal_time: new Date(Date.UTC(2000, 1, 1, 12, 30, 0)),
          meal_title:
            "Tomato soup; Pork fried rice, with mexican corn and mini spring roll. Frosted mocha cake",
          protein_offered: 36,
          carbs_offered: 108,
          fat_offered: 18,
        },
        {
          meal_role: "supper",
          meal_time: new Date(Date.UTC(2000, 1, 1, 17, 30, 0)),
          meal_title:
            "Turkey sausage with mashed potatoes, sauteed vegetables and biscuit. Sliced strawberries.",
          protein_offered: 40,
          carbs_offered: 120,
          fat_offered: 20,
        },
      ],
    },
    {
      day_number: 2,
      meals: [
        {
          meal_role: "Breakfast",
          meal_title:
            "Half banana. Oatbran cereal with scrambled eggs and whole wheat toast",
          protein_offered: 24,
          carbs_offered: 72,
          fat_offered: 12,
        },
        {
          meal_role: "Lunch",
          meal_title:
            "Turkey rice soup. Grilled ham and cheese sandwich with carrot raisin salad. Butterscotch pudding",
          protein_offered: 36,
          carbs_offered: 108,
          fat_offered: 18,
        },
        {
          meal_role: "Supper",
          meal_title:
            "Chicken supreme w/ rosemary and garlic potatoes, Asian vegetables and whole wheat bread. Apple crisp.",
          protein_offered: 40,
          carbs_offered: 120,
          fat_offered: 20,
        },
      ],
    },
    {
      day_number: 3,
      meals: [
        {
          meal_role: "Breakfast",
          meal_title:
            "Fruit cocktail. Oatmeal, poached egg, and whole wheat toast",
          protein_offered: 24,
          carbs_offered: 72,
          fat_offered: 12,
        },
        {
          meal_role: "Lunch",
          meal_title:
            "Chicken florentine soup. Pizza served with creamy cucumber and onions. Strawberry mousse",
          protein_offered: 36,
          carbs_offered: 108,
          fat_offered: 18,
        },
        {
          meal_role: "Supper",
          meal_title:
            "Salisbury steak w/ gravy, mashed potatoes, diced turnips, and whole wheat bread. Toffee pudding cake.",
          protein_offered: 40,
          carbs_offered: 120,
          fat_offered: 20,
        },
      ],
    },
    {
      day_number: 4,
      meals: [
        {
          meal_role: "Breakfast",
          meal_title:
            "Mandarin oranges. Cream of wheat, hard boiled egg, with whole wheat toast.",
          protein_offered: 24,
          carbs_offered: 72,
          fat_offered: 12,
        },
        {
          meal_role: "Lunch",
          meal_title:
            "Garden vegetable soup. Turkey sausage Jambalaya with buttered corn. Chocolate ice cream",
          protein_offered: 36,
          carbs_offered: 108,
          fat_offered: 18,
        },
        {
          meal_role: "Supper",
          meal_title:
            "Herb baked chicken with chive whipped potatoes and New England vegetables",
          protein_offered: 40,
          carbs_offered: 120,
          fat_offered: 20,
        },
      ],
    },
    {
      day_number: 5,
      meals: [
        {
          meal_role: "Breakfast",
          meal_title:
            "Diced pears. Cinnamon oatmeal, scrambled eggs, and whole wheat toast",
          protein_offered: 24,
          carbs_offered: 72,
          fat_offered: 12,
        },
        {
          meal_role: "Lunch",
          meal_title:
            "Vegetable barley soup. Hot roast beef on bun, savory seasoned carrots. Cranberry bars",
          protein_offered: 36,
          carbs_offered: 108,
          fat_offered: 18,
        },
        {
          meal_role: "Supper",
          meal_title:
            "Braised pork chop, scalled potatoes, mashed squash w/ whole wheat bread",
          protein_offered: 40,
          carbs_offered: 120,
          fat_offered: 20,
        },
      ],
    },
    {
      day_number: 6,
      meals: [
        {
          meal_role: "Breakfast",
          meal_title:
            "Half banana. Oatbran cereal, hard boiled egg with whole wheat bread",
          protein_offered: 24,
          carbs_offered: 72,
          fat_offered: 12,
        },
        {
          meal_role: "Lunch",
          meal_title:
            "Italian wedding soup. Hot dog on wheat bun, red beet citrus salad. Lemon pound cake",
          protein_offered: 36,
          carbs_offered: 108,
          fat_offered: 18,
        },
        {
          meal_role: "Supper",
          meal_title:
            "Beef Shepherd's pie, cocktail vegetables with whole wheat bread. Cheesecake.",
          protein_offered: 40,
          carbs_offered: 120,
          fat_offered: 20,
        },
      ],
    },
    {
      day_number: 7,
      meals: [
        {
          meal_role: "Breakfast",
          meal_title:
            "Diced peaches. Cream of wheat, fried egg, bacon strips with whole wheat toast",
          protein_offered: 24,
          carbs_offered: 72,
          fat_offered: 12,
        },
        {
          meal_role: "Lunch",
          meal_title:
            "Ten vegetable cocktail. Parmesan crusted salmon, rice pilaf, sunrise vegetables. Pumpkin pie",
          protein_offered: 36,
          carbs_offered: 108,
          fat_offered: 18,
        },
        {
          meal_role: "Supper",
          meal_title:
            "Roast turkey gravy and mashed potatoes, fall medley vegetables with whole wheat bread. Vanilla tres leches.",
          protein_offered: 40,
          carbs_offered: 120,
          fat_offered: 20,
        },
      ],
    },
  ],
};

module.exports = mockMenu;
