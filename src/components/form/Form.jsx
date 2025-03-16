import style from "./Form.module.css";
import axios from "axios";
import validate from "./validate";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemper } from "../../reducer/actions";

const Form = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemper());
  }, [dispatch]);

  let temperaments = useSelector((state) => state.temperaments);

  const [form, setForm] = useState({
    name: "",
    max_height: "",
    min_height: "",
    max_weight: "",
    min_weight: "",
    life_span: "",
    temperaments: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    max_height: "",
    min_height: "",
    max_weight: "",
    min_weight: "",
    life_span: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value, // se busca en que input esta escribiendo con la prop name del input, y se modifica el estado
    });
    setErrors(
      validate({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSelect = (event) => {
    setForm({
      ...form,
      temperaments: [...form.temperaments, event.target.value], //copia de lo que ya hay y lo que el usuario agrega en el select de temperamentos
    });
  };

  const handleDelete = (event) => {
    setForm({
      ...form,
      temperaments: form.temperaments.filter((temper) => temper !== event), // me deja solo los que no contengan a lo que el usuario da click
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/dogs", form);
      //console.log(await result);
      setForm({
        name: "",
        max_height: "",
        min_height: "",
        max_weight: "",
        min_weight: "",
        life_span: "",
        image: "",
        temperaments: [],
      });
      if (result) alert(result.data);
    } catch (error) {
      alert("error al crear en base de datos" + error.message);
    }
  };

  const [button, setButton] = useState(true);

  useEffect(() => {
    if (
      form.name.length > 0 &&
      form.max_height.length > 0 &&
      form.min_height.length > 0 &&
      form.max_weight.length > 0 &&
      form.min_weight.length > 0 &&
      form.life_span.length > 0
    )
      setButton(false);
    else {
      setButton(true);
    }
  }, [form, setButton]);

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <Link to="/home">
        <button className={style.buttonVolver}>Volver Home</button>
      </Link>

      <h3 className={style.agregarRaza}>
        Agrega un raza de perro en nuestra base de datos, recuerda el boton
        agregar se activara una vez llenes los campos
      </h3>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Raza de perro"
        className={style.name}
        maxLength="25"
        pattern="^[a-zA-Z\s]+$"
        title="máximo de 25 letras y de tipo texto"
      />
      {errors.name && <div>{errors.name}</div>}

      <input
        type="number"
        name="max_height"
        value={form.max_height}
        onChange={handleChange}
        placeholder="Altura max del perro(cmt)"
        className={style.alturaMax}
        title="dato no correcto"
      />
      {errors.max_height && <div>{errors.max_height}</div>}

      <input
        type="number"
        name="min_height"
        onChange={handleChange}
        value={form.min_height}
        placeholder="Altura min del perro(cmt)"
        className={style.alturaMin}
      />
      {errors.min_height && <div>{errors.min_height}</div>}

      <input
        type="number"
        name="max_weight"
        onChange={handleChange}
        value={form.max_weight}
        placeholder="Peso max de perro(kg)"
        className={style.pesoMax}
      />
      {errors.max_weight && <div>{errors.max_weight}</div>}

      <input
        type="number"
        name="min_weight"
        onChange={handleChange}
        value={form.min_weight}
        placeholder="Peso min del perro(kg)"
        className={style.pesoMin}
      />
      {errors.min_weight && <div>{errors.min_weight}</div>}

      <input
        type="number"
        name="life_span"
        onChange={handleChange}
        value={form.life_span}
        placeholder="esperanza de vida(años)"
        className={style.life_span}
      />
      {errors.life_span && <div>{errors.life_span}</div>}

      <input
        type="text"
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Url de imagen(opcional)"
        className={style.image}
      />

      <hr />

      <select onChange={handleSelect} className={style.prueba}>
        <option disabled defaultValue>
          temperamentos
        </option>
        {temperaments.map((temper, index) => (
          <option key={index} value={temper.name}>
            {temper.name}
          </option>
        ))}
      </select>

      <div className={style.prueba}>
        <h3 className={style.lista}>Lista de temperamentos agregados</h3>
        {form.temperaments.map((temper, index) => (
          <div key={uuidv4()}>
            <h5 className={style.addtemper}>
              {temper + " "}
              <button
                key={index}
                onClick={() => handleDelete(temper)}
                className={style.x}
              >
                borrar
              </button>
            </h5>
          </div>
        ))}
      </div>
      {/* disable para habilitar o deshabilitar el botton */}
      <button type="submit" className={style.buttonAgregar} disabled={button}>
        Agregar
      </button>
    </form>
  );
};

export default Form;
