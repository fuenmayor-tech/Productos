# Exploradores tecnológicos · Sesión 2

Aplicación web de realidad aumentada para Tecnología e Informática. Continúa el taller “Exploradores tecnológicos” (sesión 1).

Secciones:

1. **Productos naturales** (7): banano, papa, mazorca de maíz, coco, huevo de gallina, madera (tronco) y piedra.
2. **Productos tecnológicos** (7): celular, computador portátil, ladrillo, bicicleta, lápiz, panel solar y motocicleta.
3. **Objetos tecnológicos de mi entorno**: materiales (madera, metal, plástico, vidrio, cerámica, tela de algodón), artefactos de la casa (licuadora, nevera, plancha, ventilador, olla, bombillo LED) y un reto “¿Qué material elegirías?”.
4. **Quiz final** de 12 preguntas con autoevaluación (“¿Cómo me fue?”) y botón para imprimir o guardar los resultados en PDF.

En cada elemento, el estudiante ve el modelo 3D (o su dibujo), responde en el cuaderno y toca cada pregunta para ver la respuesta: qué es, características, forma, estructura, función, origen o materiales y fuente de energía.

## Archivos

```
index.html             la aplicación completa (HTML, CSS y JavaScript)
sw.js                  guarda la app en el dispositivo para usarla sin internet
manifest.webmanifest   permite instalarla como app en el celular
lib/                   model-viewer (visor 3D y realidad aumentada) y decodificador Draco, sin depender de internet
fonts/                 tipografías Nunito y Baloo 2
icons/                 íconos de la app
modelos/               aquí van los 14 modelos 3D (.glb)
```

## Publicar en GitHub Pages

1. Crea un repositorio público en GitHub (por ejemplo `exploradores-tecnologicos`).
2. Sube **el contenido** de esta carpeta (no la carpeta en sí): `index.html`, `sw.js`, `manifest.webmanifest` y las carpetas `lib`, `fonts`, `icons` y `modelos`.
3. En el repositorio entra a **Settings → Pages**. En “Build and deployment” elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
4. Espera uno o dos minutos. La dirección será `https://TU-USUARIO.github.io/exploradores-tecnologicos/`.

## Modelos 3D

Cada elemento busca su archivo en `modelos/` con este nombre exacto:

| Elemento | Archivo |
|---|---|
| Banano | `modelos/banano.glb` |
| Papa | `modelos/papa.glb` |
| Mazorca de maíz | `modelos/mazorca.glb` |
| Coco | `modelos/coco.glb` |
| Huevo de gallina | `modelos/huevo.glb` |
| Madera (tronco) | `modelos/madera.glb` |
| Piedra (roca) | `modelos/piedra.glb` |
| Celular | `modelos/celular.glb` |
| Computador portátil | `modelos/computador.glb` |
| Ladrillo | `modelos/ladrillo.glb` |
| Bicicleta | `modelos/bicicleta.glb` |
| Lápiz | `modelos/lapiz.glb` |
| Panel solar | `modelos/panel-solar.glb` |
| Motocicleta | `modelos/motocicleta.glb` |

- Mientras un modelo no esté, la app muestra el dibujo del elemento y lo dice en pantalla.
- En Sketchfab, descarga el modelo en formato **GLB**. Procura que cada archivo pese menos de 5 MB para que cargue con internet lento.
- La app ajusta el tamaño de cada modelo para que en la realidad aumentada aparezca de su tamaño real (un banano de unos 20 cm, una bicicleta de 1,7 m).
- Muchos modelos de Sketchfab tienen licencia **CC BY**: hay que dar crédito al autor. Escribe el crédito en el campo `credito` del elemento dentro de `index.html` (por ejemplo `credito: 'Banana, de NombreAutor (Sketchfab), CC BY 4.0'`). Aparece debajo del visor y en la Ayuda.
- En la Ayuda de la app, el botón **Revisar modelos** muestra cuáles ya están publicados.

## Usar sin internet

1. Con internet, abre la app desde la dirección de GitHub Pages.
2. En Inicio, toca **Guardar para usar sin internet** y espera el mensaje de “Listo”.
3. Desde ese momento la app y los modelos guardados funcionan sin señal en ese celular y en ese navegador. También se puede “Agregar a la pantalla de inicio” para abrirla como app.

Si más adelante subes modelos nuevos, repite el paso 2 con internet.

## Realidad aumentada: qué se necesita

- **Android:** Chrome y la app “Servicios de Google Play para RA” (ARCore). No todos los celulares Android la admiten; en esos, los modelos se ven en 3D pero sin RA.
- **iPhone o iPad:** Safari.
- La página debe abrirse con **https://** (GitHub Pages lo hace). En un computador se ve en 3D, sin RA.

**Si la compartes por una red local** (una app que sirve los archivos desde un celular o computador, con una dirección tipo `http://192.168…`): el contenido, los dibujos, el quiz y el visor 3D funcionan, pero el navegador no permite la RA con WebXR ni el modo sin internet en direcciones `http://`. En Android, el botón de RA puede abrir el visor de Google (Scene Viewer), aunque eso no se ha comprobado en una red local.

## Actualizar la app

Si cambias `index.html` u otro archivo de la app, abre `sw.js` y sube el número de `VERSION` (por ejemplo de `'v1'` a `'v2'`). Así los celulares que ya la guardaron descargan la versión nueva la próxima vez que abran la app con internet (se ve al abrirla por segunda vez).

## Créditos y licencias

- Visor 3D y realidad aumentada: [model-viewer](https://modelviewer.dev) de Google, licencia Apache 2.0 (`lib/LICENSE-model-viewer.txt`).
- Decodificador Draco (Google), licencia Apache 2.0.
- Tipografías Nunito y Baloo 2, licencia SIL Open Font License 1.1.
- Dibujos e íconos: hechos para esta app.
- Definiciones de producto natural, producto tecnológico y objeto tecnológico: guía de la sesión 1 del docente.
