# Banco de Preguntas · MIR / ENARM

Proyecto listo para desplegar como página web. Contiene el banco de preguntas
(Cardiología, Endocrinología, Obstetricia, Psiquiatría) con Modo Estudio y
Modo Examen.

## 1. Probarlo en tu computadora

Necesitas tener [Node.js](https://nodejs.org) instalado (versión 18 o más reciente).

```bash
npm install
npm run dev
```

Abre el enlace que aparece en la terminal (normalmente `http://localhost:5173`).

## 2. Publicarlo en internet (gratis) con Vercel

Vercel es la forma más simple y gratuita de publicar este tipo de proyecto.

1. Crea una cuenta gratis en [github.com](https://github.com) si no tienes una.
2. Crea un repositorio nuevo (puede ser privado) y sube esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "Banco de preguntas MIR/ENARM"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/banco-mir-enarm.git
   git push -u origin main
   ```
3. Ve a [vercel.com](https://vercel.com) y crea una cuenta gratis (puedes entrar
   directamente con tu cuenta de GitHub).
4. Click en "Add New... → Project", elige el repositorio que acabas de subir.
5. Vercel detecta automáticamente que es un proyecto Vite — no cambies nada,
   solo dale click a "Deploy".
6. En un par de minutos tendrás una URL pública tipo
   `https://banco-mir-enarm.vercel.app` que puedes compartir con quien quieras.

### Alternativa: Netlify
El proceso es prácticamente idéntico en [netlify.com](https://netlify.com):
conectas tu repositorio de GitHub y despliega. También gratis.

## 3. Poner un dominio propio (opcional)

Si más adelante compras un dominio (ej. en Namecheap, GoDaddy, o Google Domains),
tanto Vercel como Netlify tienen una sección "Domains" donde solo pegas el
dominio y sigues 2-3 pasos para apuntar los DNS. Ellos te dan las instrucciones
exactas una vez conectado.

## 4. Editar las preguntas

Todo el banco de preguntas vive en `src/App.jsx`, dentro de los arrays:
- `CARDIO_QUESTIONS`
- `ENDOCRINO_QUESTIONS`
- `OBSTETRICIA_QUESTIONS`
- `PSIQUIATRIA_QUESTIONS`

Cada pregunta sigue esta estructura:

```js
{
  tema: "Nombre del tema",
  dificultad: "Baja" | "Media" | "Alta",
  enunciado: "Texto del caso clínico...",
  opciones: [
    { letra: "A", texto: "...", correcta: true/false, explicacion: "..." },
    // ...
  ],
  perla: "Dato clave para recordar",
}
```

Para agregar una nueva especialidad: crea un array nuevo con el mismo formato,
agrégalo a `ALL_QUESTIONS` (con su nombre de especialidad) y a la lista
`ESPECIALIDADES`, cerca del final del archivo.

## 5. Próximos pasos sugeridos

- **Cuentas de usuario y progreso guardado**: se puede agregar con
  [Supabase](https://supabase.com) (gratis para empezar), que da login y base
  de datos sin necesitar un backend propio.
- **Analítica básica**: Vercel incluye analítica de visitas gratis en el panel
  del proyecto.
