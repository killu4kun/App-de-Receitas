// useEffect(() => {
//   const shuffleArray = (array) => {
//     const arr = array;
//     for (let index = arr.length - 1; index > 0; index -= 1) {
//       const nextIndex = Math.floor(Math.random() * (index + 1));
//       const temp = arr[index];
//       arr[index] = arr[nextIndex];
//       arr[nextIndex] = temp;
//     }
//     return arr;
//   };

//   const randomFood = async () => {
//     if (foodsCategories.length !== 0) {
//       const foodsToShuffle = foodsCategories.map((food) => Object.values(food)[0]);
//       const foodsToSearch = shuffleArray(foodsToShuffle);
//       const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodsToSearch[0]}`);
//       const results = await response.json();
//       if (results !== undefined && results.meals.length === 1) {
//         const newFoodsToSearch = shuffleArray(foodsToShuffle);
//         const newMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${newFoodsToSearch[0]}`);
//         const newResults = await newMeals.json();
//         setMealsRecipes(newResults.meals);
//       } else {
//         setMealsRecipes(results.meals);
//       }
//     }
//   };
//   randomFood();
// }, [foodsCategories]);
