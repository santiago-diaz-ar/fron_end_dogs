import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { getAllDogs } from "../../reducer/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

const Card = ({ id, image, name, temperaments }) => {
  const dispatch = useDispatch();
  const temper = temperaments.map((t) => t + ",");
  const borrar = async () => {
    const result = axios.delete(`http://localhost:3001/dogs/${id}`);
    const prueba = (await result).status;
    if (prueba === 200) {
      dispatch(getAllDogs());
    } else {
      alert("operacion fallida intente nuevamente");
    }
  };

  return (
    <div className={style.container} key={id}>
      {!isNaN(id) ? (
        false
      ) : (
        <button onClick={borrar} className={style.borrar} title="eliminar">
          x
        </button>
      )}
      <div className={style.cajas}>
        <Link to={`/detail/${id}`}>
          <h3 className={style.name}>{name}</h3>
        </Link>
        <img src={image} alt={name} className={style.image} />

        <div className={style.tituloTemper}>Temperaments:</div>
        <h4 className={style.temper}>{temper}</h4>
      </div>
    </div>
  );
};

export default Card;
