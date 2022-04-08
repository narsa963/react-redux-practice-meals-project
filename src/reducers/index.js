import { ADD_RECIPIE, REMOVE_FROm_CALENDAR } from "../actions";
import { combineReducers } from "redux";

function food (state={}, action){
  switch(action.type){
    case ADD_RECIPIE :
    const { recipie } = action
    return{
      ...state,
      [recipie.lable] : recipie ,
    }
    default:
      return state
  }
}
const initialCalendarState = {
    sunday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    monday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    tuesday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    wednesday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    thursday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    friday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    saturday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
  }


  function calendar(state =initialCalendarState, action){
      const {day, meal, recipie} = action;
      switch(action.type){
          case ADD_RECIPIE:
              return {
                  ...state,
                  [day]: {
                      ...state[day],
                      [meal]: recipie.lable,
                  }
              }
              case REMOVE_FROm_CALENDAR:
                  return{
                      ...state,
                      [day]:{
                          ...state[day],
                        [meal]:null,
                      }
                  }
               default:
                 return state ;
      }

  }

  export default combineReducers({
    food,
    calendar,
  });