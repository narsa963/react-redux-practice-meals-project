
export const ADD_RECIPIE ='ADD_RECIPE';
export const REMOVE_FROm_CALENDAR ='REMOVE_FROM_CALENDAR';


export function addRecipie({day, recipie, meal}){
   return {
    type:ADD_RECIPIE,
    recipie,
    day,
    meal,
   }
}


export function removeFromCalendar({day, meal}){
    return {
        type:REMOVE_FROm_CALENDAR,
        meal,
        day,
    }
}