const translationMap = {
    "name": "nombre",
    "height": "altura",
    "mass": "masa",
    "hair_color": "color_de_cabello",
    "skin_color": "color_de_piel",
    "eye_color": "color_de_ojos",
    "birth_year": "año_de_nacimiento",
    "gender": "género",
    "homeworld": "mundo_de_origen",
    "films": "películas",
    "species": "especies",
    "vehicles": "vehículos",
    "starships": "naves_estelares",
    "created": "creado",
    "edited": "editado",
    "url": "url"
  };

module.exports = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      const translatedKey = translationMap[key] || key; 
      acc[translatedKey] = obj[key];
      return acc;
    }, {});
  };