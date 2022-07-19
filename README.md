# Consultorio Backend

Se trata de una API Rest que va a ir cambiando bastante ya que es utilizado para realizar pruebas en general. 
En un principio será consumido por [Consultorio React](github.com/ozkavosh/consultorio-react), pero esta construido de forma genérica para ser incluso compartido
con otros proyectos y no necesariamente seguir un esquema o estructura de consultorio.

## Caracteristicas

- Registro / Login : Implementa un sistema de registro y login utilizando JWT para la autenticación.
- Almacenamiento en archivos : Guarda la información de los usuarios registrados en archivos (Próximamente quizá cambiar por MongoDB/Firestore). Pero además
brinda la posibilidad de guardar, obtener, editar y eliminar objetos personalizados. No es necesario ingresar un id de objeto ya que se asigna automaticamente.
- **Nota importante: No podra accederse al almacenamiento de archivos sin estar logueado.**

## "Estar logueado"
Estar logueado hace referencia a tener un token válido obtenido luego de hacer la petición al endpoint **api/login**.
Este token deberá ser guardado para ser utilizado en los endpoints de almacenamiento, por ejemplo:

Utilizando axios para las peticiones, logueamos y almacenamos el token en el sessionStorage:

```js
  const response = await axios.post('.../api/login', { email, password });
  const token = response.data.token;
  
  sessionStorage.setItem('token', token);
```

Para realizar una petición a un endpoint de almacenamiento se debera incluir el token en el header Authorization:

```js
  const token = sessionStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  await axios.get('.../api/data', config);
```

## Endpoints

- Login:
  - ![](https://img.shields.io/badge/post-%2Fapi%2Flogin-orange)
    - Descripcion: Permite loguear al sistema dado un email y contraseña, devuelve el token de acceso en caso de ser validos.
    El usuario debe haber sido registrado previamente para poder loguear.
    - Body: email: string, password: string
    - Respuesta: JSON { token }
  - ![](https://img.shields.io/badge/post-%2Fapi%2Fregister-orange)
    - Descripcion: Permite registrar un nuevo usuario dados email, nombre de usuario y contraseña, no pueden haber emails repetidos, devuelve un mensaje de éxito.
    - Body: username: string, email: string, password: string
    - Respuesta: JSON { success }
- Almacenamiento (Todos estan protegidos, se necesita estar logueado para utilizarlos, cada usuario tiene su propio archivo de almacenamiento):
  - ![](https://img.shields.io/badge/post-%2Fapi%2Fdata-orange)
    - Descripcion: Permite cargar un nuevo objeto, no posee esquema por lo que guarda cualquier objeto dado, se le asigna un id automaticamente,
    devuelve un mensaje de éxito (Nota: Quizá debería devolver id del objeto).
    - Body: object: object
    - Respuesta: JSON { success }
  - ![](https://img.shields.io/badge/get-%2Fapi%2Fdata-green)
    - Descripcion: Permite obtener todos los objetos cargados por el usuario.
    - Respuesta: JSON [ objects ]
  - ![](https://img.shields.io/badge/get-%2Fapi%2Fdata%2Fprofile-green)
    - Descripcion: Permite obtener los datos del usuario actual.
    - Respuesta: JSON [ objects ]
  - ![](https://img.shields.io/badge/get-%2Fapi%2Fdata%2F:id-green)
    - Descripcion: Permite obtener un objeto especificado por su id en el parametro de la url.
    - Respuesta: JSON { object }
  - ![](https://img.shields.io/badge/put-%2Fapi%2Fdata%2F:id-blue)
    - Descripcion: Permite modificar un objeto especificado por su id en el parametro de la url, dado el objeto modificado.
    - Body: object: object
    - Respuesta: JSON { success }
  - ![](https://img.shields.io/badge/delete-%2Fapi%2Fdata%2F:id-red)
    - Descripcion: Permite eliminar un objeto especificado por su id en el parametro de la url.
    - Respuesta: JSON { success }
    
  ## Herramientas utilizadas
  
  - NodeJS
    - FS Module
  - Express
  - JSONWebToken
  
  ## Autor
  
  - [Augusto Silva](github.com/ozkavosh)
