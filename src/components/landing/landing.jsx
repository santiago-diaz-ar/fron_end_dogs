import style from "./Landing.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs, getTemper } from "../../reducer/actions";

const Landing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemper());
  }, [dispatch]);
  return (
    <div className={style.container}>
      <div className={style.caja}>
        <h2 className={style.titulo}>
          Busca las razas de perros que necesites
        </h2>

        <h3 className={style.texto}>
          En esta pagina web encontraras una enciclopedia de las razas de perros
          existentes tambien podras crear nuevas razas.
        </h3>

        <Link to="/home">
          <button className={style.button}>Ingresar Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;

//todo: Componente de clase En Desarrollo
// import { connect } from "react-redux";

// import React from "react";

// class Landing extends React.Component {
//   constructor(props) {
//     super(props);

//     this.componentDidMount(this.props.dogs(), this.props.tempers());
//   }

//   render() {
//     return (
//       <div className={style.container}>
//         <div className={style.caja}>
//           <h2 className={style.titulo}>
//             Busca las razas de perros que mas te gusten
//           </h2>

//           <h3 className={style.texto}>
//             En esta pagina web encontraras una enciclopedia de las razas de
//             perros existentes tambien podras crear nuevas razas.
//           </h3>

//           <Link to="/home">
//             <button className={style.button}>Ingresar Home</button>
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dogs: () => dispatch(getAllDogs()),
//     tempers: () => dispatch(getTemper()),
//   };
// };

// export default connect(mapDispatchToProps)(Landing);
