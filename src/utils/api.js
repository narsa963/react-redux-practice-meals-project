const API_ID = '9a7a6180'
const APP_KEY = '6f45cb7915592d70229cff6f9fa77cf8'

export function fetchRecipes(food = ''){
  food = food.trim();
  console.log('---Inside fetch function---');
  return fetch(`https://api.edamam.com/search?q=${food}&app_id=${API_ID}&app_key=${APP_KEY}`)
    .then((res) => res.json())
    .then(({ hits }) => hits.map(({ recipe }) => recipe))
}