# Instituto Politécnico Formosa.
## Tec. en Desarrollo de Software Multiplataforma.

### Unidad Temática 3 - Desarrollo back-end con __Node.js__ y **Express**.


![Node.js](https://res.cloudinary.com/practicaldev/image/fetch/s--KkScstnJ--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zojuy79lo3fn3qdt7g6p.png)

### Para ejecutar el proyecto, se debe tener instalado __Node.js__ y __npm__.

>>> Utilizar versión LTS (Recomendado)

### Verificar versión de Node con:
```bash
node -v
```

### Verificar versión de npm con:
```bash	
npm -v
```

### Para instalar las dependencias que necesita este proyecto, ejecutar el siguiente comando:

```bash
npm install
```

### Para ejecutar el proyecto, ejecutar el siguiente comando:

```bash
npm run dev
```

### Para ejecutar el proyecto en modo producción, ejecutar el siguiente comando:

```bash
npm start
```

### Para crear un usuario utilizar la petición POST en:

```bash
localhost:4000/user/
```

### Utilizar en siguiente cuerpo:

```bash
    user:,
    password:,
    email:
```
### Para iniciar sesion utilizar la peticion POST en:

```bash
localhost:4000/login/
```

### Utilizar el siguiente cuerpo:

```bash
user:
password:
```

### (REQUIERE INICIAR SESION) Para crear una nueva tarea utilizar una peticion POST en:

```bash
localhost:4000/tareas/
```
### Utilizar el siguiente cuerpo:

```bash
titulo:
descripcion:
```

Al crear la tarea, se guardara el userId del usuario que esta ingresado en ese momento.

### Para obtener un listado de todas las tareas del usuario utilizar una peticion GET en:

```bash
localhost:4000/tareas/
```
### Para editar una tarea utilizar una peticion PUT en:

```bash
localhost:4000/tareas/:id
```

### Para eliminar una tarea utilizar una peticion DELETE en:

```bash
localhost:4000/tareas/:id
```

A continuación se detallara como utilizar los controladores exigidos por el profesor

### Para obtener las tareas creadas por cada usuario realizar una peticion GET en:

```bash
localhost:4000/tareas/tareasFiltradas
```

Esto mostrara las tareas del usuario que se encuentre actualmente logeado (poner el token en orden para logear distintos)

### Para actualizar el estado de las tareas a completada (isDone:true) utilizar la peticion PUT en:


```bash
localhost:4000/tareas/:id
```

### Alumno : Benitez Walter






