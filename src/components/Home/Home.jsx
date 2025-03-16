import style from "./Home.module.css";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByTemperament,
  OrderbyName,
  OrderByWeight,
  getAllDogs,
  getTemper,
} from "../../reducer/actions";
import Card from "../card/card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/Searchbar";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //estado global dogs
  const allTempers = useSelector((state) => state.temperaments); // estado global temperaments

  //paginado
  const [paginaActual, setPaginaActual] = useState(1);
  const perrosPorPagina = 8;
  const ultimoIndice = paginaActual * perrosPorPagina; // 2 * 8 = 16 retorna de 8 al 16
  const primerIndice = ultimoIndice - perrosPorPagina; // 16 - 8 = 8 retorna los primeros 8
  const perrosActual = allDogs.slice(primerIndice, ultimoIndice); //elementos a mostrar en la tarjeta segun el indice del paginado
  // slice => proporciona un arr con inicio y fin
  //console.log(perrosActual); //debe mostrar 8 dogs en arr de obj

  const paginado = (pageNumber) => {
    setPaginaActual(pageNumber);
  };

  const [order, setOrder] = useState("");
  console.log(order);

  const handlerFilterByTemper = (event) => {
    dispatch(filterByTemperament(event.target.value));
  };

  const handlerOrderByName = (event) => {
    dispatch(OrderbyName(event.target.value));
    setOrder(event.target.value);
  };

  const handlerOrderByWeight = (event) => {
    dispatch(OrderByWeight(event.target.value));
    setOrder(event.target.value);
  };

  const reinicioPaginate = () => {
    setPaginaActual(1);
  };

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemper());
  }, [dispatch]);

  return (
    <div>
      <div className={style.header}>
        <div>
          <button className={style.volver}>
            <NavLink to="/">Volver a Pagina Inicial</NavLink>
          </button>

          <SearchBar />

          <div className={style.selects}>
            <select onChange={handlerOrderByName} className={style.order}>
              <option >
                orden Alfabetico
              </option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>

            <select onChange={handlerOrderByWeight} className={style.peso}>
              <option >
                Filtrar por peso
              </option>
              <option value="max_weight">Max</option>
              <option value="min_weight">Min</option>
            </select>

            <select
              onChange={handlerFilterByTemper}
              className={style.filter}
              onClick={reinicioPaginate}
            >
              <option >
                Temperamentos
              </option>
              <option value="Todos">Todos</option>
              {allTempers?.map((temp, index) => (
                <option value={temp.name} key={index}>
                  {temp.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={style.form}>
          <button className={style.buttonForm}>
            <NavLink to="/dog" className={style.LinkForm}>
              CREAR PERRO EN BASE DE DATOS
            </NavLink>
          </button>
        </div>
      </div>

      <div className={style.paginate}>
        <Paginate
          perrosPorPagina={perrosPorPagina}
          allDogs={allDogs.length}
          paginado={
            paginado
          } /* el valor del paginado aumenta segun el bucle for del compo paginate */
        />
      </div>

      <div className={style.container}>
        <div className={style.tarjeta}>
          {perrosActual?.map((dog, index) => {
            return (
              <div key={index}>
                {
                  <Card
                    key={dog?.index}
                    id={dog?.id}
                    image={dog?.image}
                    name={dog?.name}
                    temperaments={
                      dog?.temperaments[0].name
                        ? dog.temperaments.map((temper) => temper.name)
                        : dog?.temperaments
                      //POR SI EL TEMPER VIENE EN FORMATO DISTINTO DE LA DB
                    }
                  />
                }
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
