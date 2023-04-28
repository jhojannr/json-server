function ResourceItem({ name, length }) {
  return `
    <li>
      <a href="${name}">/${name}</a>
      <sup>${length ? `${length}x` : "object"}</sup>
    </li>
  `;
}

function ResourceList({ db }) {
  return `
    <ul>
      ${Object.keys(db)
        .map((name) =>
          ResourceItem({
            name,
            length: Array.isArray(db[name]) && db[name].length,
          })
        )
        .join("")}
    </ul>
  `;
}

function NoResources() {
  return `<p>Actualmente no hay Rutas Personalizadas</p>`;
}

function ResourcesBlock({ db }) {
  return `
    <div>
      <h1>Rutas</h1>
      ${Object.keys(db).length ? ResourceList({ db }) : NoResources()}
    </div>
  `;
}

window
  .fetch("db")
  .then((response) => response.json())
  .then(
    (db) =>
      (document.getElementById("resources").innerHTML = ResourcesBlock({ db }))
  );

function CustomRoutesBlock({ customRoutes }) {
  const rules = Object.keys(customRoutes);
  if (rules.length) {
    return `
      <div>
        <h1>Rutas Personalizadas</h1>
        <table>
          ${rules
            .map(
              (rule) =>
                `<tr>
              <td>${rule}</td>
              <td><code>⇢</code> ${customRoutes[rule]}</td>
            </tr>`
            )
            .join("")}
        </table>
      </div>
    `;
  }
}

window
  .fetch("__rules")
  .then((response) => response.json())
  .then(
    (customRoutes) =>
      (document.getElementById("custom-routes").innerHTML = CustomRoutesBlock({
        customRoutes,
      }))
  );

// Obtener referencia al botón
const decodeButton = document.getElementById("eventDecode");

// Agregar evento de clic al botón
decodeButton.addEventListener("click", decodeURLParams);

function decodeURLParams() {
  const resultTextarea = document.getElementById("decode");

  const url = resultTextarea.value;

  // Obtener los parámetros de la URL
  const params = url.split("&");

  // Crear un objeto para almacenar los valores decodificados
  const decodedParams = {};

  // Decodificar y asignar los valores al objeto decodedParams
  params.forEach((param) => {
    const [key, value] = param.split("=");
    decodedParams[key] = decodeURIComponent(value);
  });

  console.log(decodedParams);
}
