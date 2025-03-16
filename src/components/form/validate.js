const validate = (form) => {
  let errors = {};
  if (!form.name || typeof form.name !== "string") {
    errors.name = "raza de perro es requerida, debe ser de tipo texto";
  } else if (!form.max_height || typeof form.max_height !== "string") {
    errors.max_height = "altura max es requerida, debe ser de tipo numero";
  } else if (!form.min_height || typeof form.min_height !== "string") {
    errors.min_height = "altura min es requerida, debe ser de tipo numero";
  } else if (!form.max_weight || typeof form.max_weight !== "string") {
    errors.max_weight = "Peso max es requerido, debe ser de tipo numero";
  } else if (!form.min_weight || typeof form.min_height !== "string") {
    errors.min_weight = "peso min es requerido, debe ser de tipo numero";
  } else if (!form.life_span || typeof form.life_span !== "string") {
    errors.life_span = "esperanza de vida requerida, debe ser de tipo numero";
  }
  return errors;
};

export default validate;
