import {
  CLEAR_DETAIL,
  CLEAR_DOGS,
  GET_ALL_DOGS,
  GET_DETAIL,
  GET_DOG,
  GET_FILTER_TEMPER,
  GET_TEMPER,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
} from "./types/types";

const initialState = {
  dogs: [],
  detail: [],
  temperaments: [],
  allDogs: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  //  switch => declaracion permite ejecutar diferentes bloques de codigo
  switch (type) {
    //todo: trae todos los perros
    case GET_ALL_DOGS:
      payload.forEach((dog) => {
        if (!dog.temperaments[0]) {
          dog.temperaments[0] = "no hay temperamentos"; // si no hay temper les agrego el message adecuado
        }
      });
      return {
        ...state,
        dogs: payload,
        allDogs: payload,
      };

    //todo: trae los temperamentos
    case GET_TEMPER:
      const limpiarTemper = payload.filter((temper) => temper.name !== ""); //elimino tempers que tiene el name vacio
      return {
        ...state,
        temperaments: limpiarTemper,
      };

    //todo: filtrar por temperamento
    case GET_FILTER_TEMPER:
      const allDogs = state.allDogs;
      let filterDogs = [];
      if (payload === "Todos" || payload === "Temperamentos") {
        filterDogs = allDogs;
      } else {
        for (let i = 0; i < allDogs.length; i++) {
          let encontro = allDogs[i].temperaments.find(
            (t) => t === payload || t.name === payload
          );

          if (encontro) {
            filterDogs.push(allDogs[i]);
          }
        }
      }
      return {
        ...state,
        dogs: filterDogs,
      };

    //todo: traer perro por nombre
    case GET_DOG:
      const dogsAll = state.allDogs;
      const buscadorFunct = (payload, dogsAll) => {
        //me permite buscar el name en minuscula o mayuscula, o si la busqueda no es exacta
        const regex = new RegExp(payload, "i"); // busco no exacta
        return dogsAll.filter((dog) => regex.test(dog.name));
      };
      const buscador = buscadorFunct(payload, dogsAll);
      //console.log(buscador);
      const unico = Math.random();
      const daños = [
        {
          id: unico,
          name: "No existe perro",
          height: ["Null"],
          weight: ["Null"],
          temperaments: ["Null"],
          life_span: "Null",
          image: "Null",
        },
      ];

      if (buscador.length) {
        return {
          ...state,
          dogs: buscador,
        };
      } else {
        return {
          ...state,
          dogs: daños,
        };
      }

    //todo: ordenar por nombre
    case ORDER_BY_NAME:
      const ordenarName =
        payload === "A-Z" || payload === "orden Alfabetico"
          ? state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1; // retorna un valor positivo indicando que B sea antes que A
              }
              if (b.name > a.name) {
                return -1; //retorna un valor negativo indicando para que A sea antes que B
              }
              return 0; // no hay cambios
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1; // A antes que B
              }
              if (b.name > a.name) {
                return 1; // B antes que A
              }
              return 0; // no hay cambios
            });
      return {
        ...state,
        dogs: ordenarName,
      };

    //todo: ordenar por peso
    case ORDER_BY_WEIGHT:
      const ordenarWeight =
        payload === "min_weight"
          ? state.dogs.sort((a, b) => {
              //parseInt para convertir a un numero entero
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return 1; // B antes que A
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return -1; // A antes que B
              }
              return 0; // NO HAY CAMBIOS
            })
          : state.dogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return -1; //A antes que B
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return 1; // B antes que A
              }
              return 0; // NO hay cambios
            });
      return {
        ...state,
        dogs: ordenarWeight,
      };

    //todo: trae el detalle
    case GET_DETAIL:
      let Details = payload;
      if (!Details[0].temperaments[0]) {
        //agrego string a arr sin elemts dentro
        Details[0].temperaments = "no hay temperamentos";
      }
      return {
        ...state,
        detail: Details,
      };

    //todo: borra el estado detalle
    case CLEAR_DETAIL:
      return {
        ...state,
        detail: [],
      };

    //todo: borra el estado dogs y allDogs
    case CLEAR_DOGS:
      return {
        ...state,
        dogs: [],
        allDogs: [],
        temperaments: [],
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
