
import React,  { Component } from 'react';
import { addRecipie, removeFromCalendar } from "./actions";
import {connect} from "react-redux"
import {capitalize} from "./utils/helpers";
import {BiCalendarX } from 'react-icons/bi';
import {Loading} from "react-loading";
import{BiRightArrowAlt} from "react-icons/bi";
import ReactModal from 'react-modal';
import {fetchRecipes} from "./utils/api";
import FoodList from './FoodList';
import ShoppingList from './ShoppingList';

ReactModal.setAppElement('#root');
 
class App extends Component{

  
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  
  state = {
    foodModalOpen: false,
    meal: null,
    day: null,
    food: null,
    ingredientsModalOpen: false,
    loadingFood: false,
  }
  openFoodModal = ({ meal, day }) => {
    this.setState(() => ({
      foodModalOpen: true,
      meal,
      day,
    }))
  }
  closeFoodModal = () => {
    this.setState(() => ({
      foodModalOpen: false,
      meal: null,
      day: null,
      food: null,
    }))
  }
  searchFood = (e) => {

    console.log("searchFood");
    console.log(this.textInput.current.value);
    let inputValue = this.textInput.current.value;
    if (!inputValue) {
      return;
    }

    e.preventDefault()

    console.log('---Search Food---');
    fetchRecipes(inputValue)
      .then((food) =>{
        console.log('----');
        console.log(food);
          this.setState(() => 
            ({
            food
            })
          );
        }
      );
  }
  
  openIngredientsModal = () => this.setState(() => ({ ingredientsModalOpen: true }))
  closeIngredientsModal = () => this.setState(() => ({ ingredientsModalOpen: false }))
  generateShoppingList = () => {
    return this.props.calendar.reduce((result, { meals }) => {
      const { breakfast, lunch, dinner } = meals

      breakfast && result.push(breakfast)
      lunch && result.push(lunch)
      dinner && result.push(dinner)

      return result
    }, [])
    .reduce((ings, { ingredientLines }) => ings.concat(ingredientLines), [])
  }
  render(){
    const { foodModalOpen, loadingFood, food, ingredientsModalOpen } = this.state;
    const {calendar, selectRecipe, remove} =this.props;
    const mealOrder=["breakfast", "lunch", "dinner"]
    return(
      <div className='container'>
        <div className='nav'>
          <h1 className='header'>UdaciMeals</h1>
          <button
            className='shopping-list'
            onClick={this.openIngredientsModal}>
              Shopping List
          </button>
        </div>
        <ul className='meal-types'>
          {mealOrder.map((mealType)=>(
            <li key={mealType} className='subheader'>  
             {capitalize(mealType)}
            </li>

          ))}
        </ul>
        <div className='calendar'>
          <div className='days'>
            {calendar.map(({ day }) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
          </div>
          <div className='icon-grid'>
            {calendar.map(({ day, meals }) => (
              <ul key={day}>
                {mealOrder.map((meal) => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                          <img src={meals[meal].image} alt={meals[meal].label}/>
                          <button onClick={() => remove({meal, day})}>Clear</button>
                        </div>
                      : <button onClick={()=>this.openFoodModal({meal, day})} className='icon-btn'>
                          <BiCalendarX size={30}/>
                        </button>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <ReactModal
          className='modal'
          overlayClassName='overlay'
          isOpen={foodModalOpen}
          onRequestClose={this.closeFoodModal}
          contentLabel='Modal'
        >
          <div>
            {loadingFood === true
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <div className='search-container'>
                  <h3 className='subheader'>
                    Find a meal for {capitalize(this.state.day)} {this.state.meal}.
                  </h3>
                  <div className='search'>
                    <input
                      className='food-input'
                      type='text'
                      placeholder='Search Foods'
                      ref={this.textInput}
                    />
                    <button
                      className='icon-btn'
                      onClick={this.searchFood}>
                      <BiRightArrowAlt size={30}/>
                    </button>
                  </div>
                  {food !== null && (
                    <FoodList
                      food={food}
                      onSelect={(recipe) => {
                        selectRecipe({ recipe, day: this.state.day, meal: this.state.meal })
                        this.closeFoodModal()
                      }}
                    />)}
                </div>}
          </div>
        </ReactModal>

        <ReactModal
          className='modal'
          overlayClassName='overlay'
          isOpen={ingredientsModalOpen}
          onRequestClose={this.closeIngredientsModal}
          contentLabel='Modal'
        >
          {ingredientsModalOpen && <ShoppingList list={this.generateShoppingList()}/>}
        </ReactModal>

      </div>
    )
  }
}


function mapStateToProps({food,calendar}){
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return {
    calendar:dayOrder.map((day)=>({
      day,
      meals:Object.keys(calendar[day]).reduce((meals, meal)=>{
        meals[meal]=calendar[day][meals]
        ?food[calendar[day][meal]]
        : null
        return meals
      }, {})
    }))
  }
    
   
   }

  function mapDispatchToProps(dispatch){
     return{
       selectRecipie:(data) =>dispatch(addRecipie(data)),
       romove:(data) =>dispatch(removeFromCalendar(data)),
     }
   }
export default connect(mapStateToProps, mapDispatchToProps)(App);
