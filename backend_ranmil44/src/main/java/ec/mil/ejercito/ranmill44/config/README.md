# Configuración del Proyecto Spring Boot

Este directorio contiene las clases de configuración para el proyecto Spring Boot. A continuación se presenta una descripción resumida de cada clase:

## AsignadorConfiguracion

Clase de configuración para el asignador de modelos. Define un bean de `ModelMapper` con una estrategia de coincidencia estricta para mapear objetos de un tipo a otro.

## JwtAutenticacionConfiguracion

Clase de configuración para la autenticación JWT. Implementa la interfaz `Converter` para convertir un objeto `Jwt` en un `AbstractAuthenticationToken`, extrayendo y asignando roles y autoridades desde el token JWT.

## MvcConfiguracion

Clase de configuración para MVC. Implementa la interfaz `WebMvcConfigurer` para personalizar la configuración de Spring MVC, configurando el analizador de patrones de ruta para que no sea sensible a mayúsculas y minúsculas.

## Oracle11gConfiguracion

Clase de configuración para la base de datos Oracle 11g. Configura el `DataSource`, `EntityManagerFactory` y `TransactionManager` para conectarse y gestionar transacciones con una base de datos Oracle 11g.

## Oracle19cConfiguracion

Clase de configuración para la base de datos Oracle 19c. Configura el `DataSource`, `EntityManagerFactory` y `TransactionManager` para conectarse y gestionar transacciones con una base de datos Oracle 19c. Incluye propiedades adicionales para el desarrollo de la base de datos.

## SeguridadConfiguracion

Clase de configuración de seguridad. Configura la seguridad de la aplicación utilizando Spring Security, definiendo reglas de autorización, configuración de CORS y gestión de sesiones.

## SwaggerConfiguracion

Clase de configuración para Swagger/OpenAPI. Configura la documentación de la API utilizando Swagger/OpenAPI, definiendo información básica de la API, contacto, licencia, seguridad y servidores.
