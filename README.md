# Around the U.S. — Proyecto Interactivo Web

Proyecto web interactivo desarrollado con **TypeScript**, **HTML5** y **CSS3**, estructurado bajo una arquitectura modular Orientada a Objetos (OOP) y buenas prácticas de desarrollo *front-end*. 

La aplicación se conecta a una **API REST externa** para permitir la persistencia de datos en tiempo real, gestionando perfiles de usuario, fotos de avatar y tarjetas con publicaciones interactivas.

---

## 🚀 Funcionalidades

- **Gestión de Perfil de Usuario:**
  - Carga dinámica de la información del usuario y del avatar desde el servidor.
  - Edición del nombre y la descripción del perfil con persistencia en la API.
  - Actualización de la foto de avatar mediante modal interactivo.
- **Gestión de Tarjetas (Posts):**
  - Carga y renderizado dinámico de tarjetas desde el servidor mediante la clase `Section`.
  - Creación de nuevas tarjetas con imagen y título.
  - Eliminación de tarjetas con modal de confirmación antes de procesar el borrado en el servidor.
  - Alternador de "Me gusta" (*Like* / *Unlike*) sincronizado en tiempo real con la API.
- **Experiencia de Usuario (UX) e Interfaz:**
  - **Indicadores de carga (UX):** Notificación en tiempo real en los botones de los formularios ("Guardando...", "Creando...") mientras se procesan las peticiones asíncronas.
  - **Popups/Modales reutilizables:** Vista previa de imágenes a pantalla completa, formularios interactivos y modales de confirmación con cierre por tecla `Escape` o clic en el *overlay*.
  - **Validación de Formularios:** Validación en tiempo real basada en clases (`FormValidator`), desactivando el botón de envío si los campos son inválidos.

---

## 🛠️ Tecnologías y Herramientas

- **Lenguajes & Modulos:** HTML5, CSS3 (Metodología BEM), TypeScript / JavaScript (ES6+ Modules).
- **Arquitectura de Software:** Programación Orientada a Objetos (POO / OOP).
- **Integración API:** Peticiones HTTP asíncronas (`fetch`, `async/await`, `PATCH`, `POST`, `PUT`, `DELETE`).
- **Control de Versiones & Despliegue:** Git, GitHub, GitHub Pages.

---

## 📁 Estructura del Proyecto y Clases Principales

- `API`: Encapsula todas las peticiones a la API REST de Around the U.S. (Manejo de tokens, rutas y respuestas).
- `UserInfo`: Controla la gestión de los datos del perfil y la imagen del avatar en la interfaz gráfica.
- `Section`: Encargada de renderizar elementos en el DOM a partir de arreglos de datos.
- `Card`: Maneja la creación, eventos de clic, estado de los *likes* y eliminación visual de cada tarjeta.
- `Popup`: Clase base para el control de modales (apertura, cierre y escucha de eventos).
  - `PopupWithForm`: Subclase para formularios con gestión de estados de carga (`renderLoading`).
  - `PopupWithImage`: Subclase para la vista previa ampliada de imágenes.
  - `PopupWithConfirmation`: Subclase para acciones críticas que requieren confirmación previa del usuario.
- `FormValidator`: Gestiona la validación de los campos de entrada de forma dinámica.

---

## 🔗 Enlace al Proyecto

- **Sitio web en vivo:** [https://juanfelipe153.github.io/web_project_around_es/](https://juanfelipe153.github.io/web_project_around_es/)

---

## 👤 Autor

Autor:
Juan Felipe Ramírez

GitHunb link:

https://juanfelipe153.github.io/web_project_around_es/
