import style from "./Paginate.module.css";

const Paginate = ({ perrosPorPagina, allDogs, paginado }) => {
  const pageNumbers = [];

  //ceil redondea para arriba => 3.8 = 4
  for (let i = 1; i <= Math.ceil(allDogs / perrosPorPagina); i++) {
    //cantidad de elementos totales, dividido limite de elementos por pagina
    pageNumbers.push(i);
  }

  return (
    <ul className={style.Ul}>
      {pageNumbers &&
        pageNumbers.map((number, index) => (
          <div
            onClick={() => paginado(number)}
            key={index}
            className={style.div}
          >
            <button className={style.button}>{number}</button>
          </div>
        ))}
    </ul>
  );
};

export default Paginate;
