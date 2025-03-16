import axios from "axios";
import {
  GET_ALL_DOGS,
  GET_TEMPER,
  GET_FILTER_TEMPER,
  GET_DOG,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  GET_DETAIL,
  CLEAR_DETAIL,
  CLEAR_DOGS,
} from "./types/types";

const API_URL = process.env.REACT_APP_API_URL 

//! ACTIONS
//todos: traer todos los perros (api y base de datos)
export const getAllDogs = () => {
  return async function (dispatch) {
    const data = (await axios.get(`${API_URL}/dogs`)).data;
    return dispatch({ type: GET_ALL_DOGS, payload: data });
  };
};

//todo: traer temperamentos
export const getTemper = () => {
  return async function (dispatch) {
    const dataTemper = (await axios.get(`${API_URL}/temperaments`))
      .data;
    return dispatch({ type: GET_TEMPER, payload: dataTemper });
  };
};

//todo: filtrar por temperamentos
export const filterByTemperament = (filter) => {
  return function (dispatch) {
    return dispatch({ type: GET_FILTER_TEMPER, payload: filter });
  };
};

//todo:  traer perro por su nombre
export const getName = (name) => {
  return { type: GET_DOG, payload: name };
};

//COPIA DE BUSQUEDA CON NAME EN API PERO CON ERRORES NO NECESARIOS (DOBLE TRABAJO PARA LO MISMO)
// export const getName = (name) => {
//   return async function (dispatch) {
//     const dataName = (
//       await axios.get(`http://localhost:3001/dogs?name=${name}`)
//     ).data;
//     return dispatch({ type: GET_DOG, payload: dataName });
//   };
// };

//todo: accion  para ordenamiento por nombre
export const OrderbyName = (order) => {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_NAME, payload: order });
  };
};

//todo: accion para ordenamiento de peso
export const OrderByWeight = (order) => {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_WEIGHT, payload: order });
  };
};

//todo: traer perro por id
export const getDetail = (id) => {
  return async function (dispatch) {
    //todo: ${} interpolacion de una variable
    const detail = (await axios.get(`${API_URL}/dogs/${id}`)).data;
    return dispatch({ type: GET_DETAIL, payload: detail });
  };
};

//todo: borrar el estado detail despues de salir de el
export const clearDetail = () => {
  return { type: CLEAR_DETAIL };
};

//todo: borrar los estados de dosg y allDogs al ingresar al detail para mejorar la velocidad de app
export const clearDogs = () => {
  return { type: CLEAR_DOGS };
};
