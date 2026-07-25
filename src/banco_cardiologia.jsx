import { useState, useEffect, useRef } from "react";

const PALETTE = {
  paper: "#FBF6F0",
  gridMinor: "#F3D6D6",
  gridMajor: "#E7ABAB",
  ink: "#1B2B2E",
  crimson: "#A32638",
  teal: "#1F6F6B",
  slate: "#5B6B6E",
  cardBorder: "#E4DCCF",
};

const CARDIO_QUESTIONS = [
  {
    tema: "Síndrome coronario agudo",
    dificultad: "Media",
    enunciado:
      "Varón de 58 años, fumador de 30 paquetes-año, acude por dolor torácico opresivo irradiado a mandíbula de 40 minutos de evolución, con diaforesis. El ECG muestra elevación del segmento ST de 3 mm en DII, DIII y aVF. El centro cuenta con sala de hemodinamia disponible en 60 minutos. ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Angioplastia primaria (ICP) urgente",
        correcta: true,
        explicacion:
          "Correcta. Ante un IAMCEST con posibilidad de ICP primaria en menos de 120 minutos desde el diagnóstico, la angioplastia primaria es la estrategia de reperfusión de elección sobre la fibrinolisis.",
      },
      {
        letra: "B",
        texto: "Fibrinolisis inmediata con estreptoquinasa",
        correcta: false,
        explicacion:
          "Incorrecta. La fibrinolisis se reserva para cuando la ICP primaria no puede realizarse dentro de la ventana de 120 minutos desde el diagnóstico electrocardiográfico.",
      },
      {
        letra: "C",
        texto: "Solo manejo médico con doble antiagregación, sin reperfusión",
        correcta: false,
        explicacion:
          "Incorrecta. Un IAMCEST siempre requiere una estrategia de reperfusión (ICP o fibrinolisis); el manejo médico aislado no sustituye la reperfusión coronaria.",
      },
      {
        letra: "D",
        texto: "Esperar el resultado de troponinas seriadas antes de decidir",
        correcta: false,
        explicacion:
          "Incorrecta. El diagnóstico de IAMCEST es clínico y electrocardiográfico; esperar troponinas retrasa innecesariamente la reperfusión y aumenta el daño miocárdico.",
      },
    ],
    perla:
      "Regla práctica: puerta-balón ideal <90 min; si la ICP no está disponible en <120 min desde el diagnóstico, se prefiere fibrinolisis en <30 min.",
  },
  {
    tema: "Arritmias",
    dificultad: "Media",
    enunciado:
      "Mujer de 72 años con hipertensión arterial y diabetes mellitus tipo 2, diagnosticada con fibrilación auricular no valvular hace una semana. No tiene antecedente de ACV ni insuficiencia cardíaca. ¿Cuál de las siguientes afirmaciones sobre su manejo es correcta?",
    opciones: [
      {
        letra: "A",
        texto: "Su puntaje CHA2DS2-VASc justifica anticoagulación oral",
        correcta: true,
        explicacion:
          "Correcta. Por edad ≥65 años (1 punto), sexo femenino (1 punto), HTA (1 punto) y DM2 (1 punto), su puntaje es ≥3, lo que indica beneficio claro de anticoagulación oral para prevención de ACV cardioembólico.",
      },
      {
        letra: "B",
        texto: "Al no tener ACV previo, no requiere anticoagulación",
        correcta: false,
        explicacion:
          "Incorrecta. El antecedente de ACV es solo uno de los criterios del CHA2DS2-VASc; su ausencia no descarta la indicación si otros factores de riesgo están presentes.",
      },
      {
        letra: "C",
        texto: "La aspirina sola es equivalente a la anticoagulación oral en este caso",
        correcta: false,
        explicacion:
          "Incorrecta. La evidencia actual no respalda la aspirina como alternativa equivalente a los anticoagulantes orales para prevención de ACV en fibrilación auricular con riesgo significativo.",
      },
      {
        letra: "D",
        texto: "Debe priorizarse el control del ritmo con cardioversión antes de anticoagular",
        correcta: false,
        explicacion:
          "Incorrecta. La anticoagulación se decide según el riesgo tromboembólico, independientemente de si se opta por control de ritmo o de frecuencia; además, la cardioversión sin anticoagulación adecuada puede precipitar un evento embólico.",
      },
    ],
    perla:
      "CHA2DS2-VASc: Insuficiencia cardíaca, HTA, Edad≥75 (2p), DM, ACV/AIT previo (2p), enfermedad Vascular, Edad 65-74, Sexo femenino. Puntaje ≥2 en varones o ≥3 en mujeres indica anticoagulación.",
  },
  {
    tema: "Insuficiencia cardíaca",
    dificultad: "Alta",
    enunciado:
      "Varón de 65 años con insuficiencia cardíaca con fracción de eyección reducida (FEVI 30%), NYHA II, ya en tratamiento con un IECA y un betabloqueador a dosis óptimas, sin datos de congestión activa. ¿Cuál es el siguiente paso más adecuado para reducir mortalidad?",
    opciones: [
      {
        letra: "A",
        texto: "Añadir un antagonista del receptor de mineralocorticoides (espironolactona)",
        correcta: true,
        explicacion:
          "Correcta. En pacientes con FEVI reducida que persisten sintomáticos pese a IECA y betabloqueador, agregar un antagonista de mineralocorticoides reduce mortalidad y hospitalizaciones, siempre vigilando función renal y potasio.",
      },
      {
        letra: "B",
        texto: "Aumentar la dosis de diurético de asa como terapia modificadora de la enfermedad",
        correcta: false,
        explicacion:
          "Incorrecta. Los diuréticos de asa mejoran los síntomas congestivos pero no han demostrado reducir mortalidad; no son terapia modificadora de la enfermedad.",
      },
      {
        letra: "C",
        texto: "Suspender el betabloqueador por riesgo de bradicardia",
        correcta: false,
        explicacion:
          "Incorrecta. El betabloqueador es un pilar del tratamiento con beneficio en mortalidad demostrado; no debe suspenderse sin una razón clínica clara como inestabilidad hemodinámica.",
      },
      {
        letra: "D",
        texto: "Indicar digoxina como primera opción para reducir mortalidad",
        correcta: false,
        explicacion:
          "Incorrecta. La digoxina puede mejorar síntomas y reducir hospitalizaciones, pero no ha demostrado reducir mortalidad, por lo que no es la prioridad frente a otras terapias con beneficio pronóstico probado.",
      },
    ],
    perla:
      "Los cuatro pilares con beneficio en mortalidad en IC-FEr: IECA/ARA-II (o ARNI), betabloqueador, antagonista de mineralocorticoides e iSGLT2.",
  },
  {
    tema: "Valvulopatías",
    dificultad: "Media",
    enunciado:
      "Varón de 70 años con disnea de esfuerzo progresiva, episodios de síncope y un soplo sistólico rudo en foco aórtico irradiado a carótidas. El ecocardiograma confirma estenosis aórtica severa con FEVI conservada. ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Referir para reemplazo valvular (quirúrgico o percutáneo)",
        correcta: true,
        explicacion:
          "Correcta. La estenosis aórtica severa sintomática (angina, síncope o disnea) es indicación de reemplazo valvular independientemente de la FEVI, ya que el tratamiento médico no modifica el pronóstico una vez sintomática.",
      },
      {
        letra: "B",
        texto: "Iniciar vasodilatadores como manejo definitivo",
        correcta: false,
        explicacion:
          "Incorrecta. Los vasodilatadores deben usarse con extrema precaución en estenosis aórtica severa, ya que pueden precipitar hipotensión grave al limitarse el gasto cardíaco por la obstrucción fija.",
      },
      {
        letra: "C",
        texto: "Manejo expectante con controles ecocardiográficos anuales",
        correcta: false,
        explicacion:
          "Incorrecta. El manejo expectante es apropiado en estenosis aórtica severa asintomática, pero una vez aparecen síntomas el pronóstico empeora marcadamente y está indicada la intervención.",
      },
      {
        letra: "D",
        texto: "Valvuloplastia con balón como tratamiento definitivo",
        correcta: false,
        explicacion:
          "Incorrecta. La valvuloplastia con balón tiene un rol limitado y paliativo (por ejemplo, como puente a cirugía), pero no es tratamiento definitivo por su alta tasa de reestenosis.",
      },
    ],
    perla:
      "Tríada clásica de la estenosis aórtica sintomática: angina, síncope y disnea. La aparición de síntomas marca un punto de inflexión pronóstico crítico.",
  },
  {
    tema: "Urgencias cardiovasculares",
    dificultad: "Alta",
    enunciado:
      "Mujer de 45 años con antecedente de neoplasia pulmonar, presenta hipotensión, ingurgitación yugular y ruidos cardíacos apagados. Se observa pulso paradójico de 18 mmHg. ¿Cuál es el diagnóstico más probable y su manejo inicial?",
    opciones: [
      {
        letra: "A",
        texto: "Taponamiento cardíaco; pericardiocentesis urgente",
        correcta: true,
        explicacion:
          "Correcta. La tríada de Beck (hipotensión, ingurgitación yugular, ruidos cardíacos apagados) junto con pulso paradójico es característica de taponamiento cardíaco, una emergencia que requiere pericardiocentesis o drenaje urgente.",
      },
      {
        letra: "B",
        texto: "Embolia pulmonar masiva; trombolisis inmediata",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque la embolia pulmonar puede causar shock obstructivo, la tríada de Beck y los ruidos cardíacos apagados apuntan específicamente a taponamiento, no a embolia pulmonar.",
      },
      {
        letra: "C",
        texto: "Insuficiencia cardíaca descompensada; diuréticos endovenosos",
        correcta: false,
        explicacion:
          "Incorrecta. Los diuréticos reducen la precarga y pueden empeorar el compromiso hemodinámico en un taponamiento, donde el paciente depende de una precarga elevada para mantener el gasto cardíaco.",
      },
      {
        letra: "D",
        texto: "Shock séptico; reanimación agresiva con cristaloides",
        correcta: false,
        explicacion:
          "Incorrecta. No hay foco infeccioso ni fiebre descritos; el cuadro es característico de compromiso mecánico del llenado cardíaco, no de un proceso séptico.",
      },
    ],
    perla:
      "En pacientes oncológicos, el derrame pericárdico maligno es una causa frecuente de taponamiento; sospéchalo ante hipotensión inexplicada con ingurgitación yugular.",
  },
  {
    tema: "Endocarditis infecciosa",
    dificultad: "Media",
    enunciado:
      "Varón de 35 años, usuario de drogas intravenosas, presenta fiebre de dos semanas de evolución, soplo sistólico nuevo en foco tricuspídeo y nódulos dolorosos en pulpejos de los dedos. Los hemocultivos son positivos para Staphylococcus aureus. ¿Cuál es el hallazgo descrito en los dedos?",
    opciones: [
      {
        letra: "A",
        texto: "Nódulos de Osler",
        correcta: true,
        explicacion:
          "Correcta. Los nódulos de Osler son nódulos subcutáneos dolorosos en los pulpejos de los dedos, un hallazgo inmunológico clásico (aunque poco frecuente) de endocarditis infecciosa.",
      },
      {
        letra: "B",
        texto: "Lesiones de Janeway",
        correcta: false,
        explicacion:
          "Incorrecta. Las lesiones de Janeway son máculas eritematosas indoloras en palmas y plantas, a diferencia de los nódulos de Osler, que son dolorosos.",
      },
      {
        letra: "C",
        texto: "Manchas de Roth",
        correcta: false,
        explicacion:
          "Incorrecta. Las manchas de Roth son hemorragias retinianas con centro pálido observadas en el fondo de ojo, no una lesión en los dedos.",
      },
      {
        letra: "D",
        texto: "Hemorragias en astilla",
        correcta: false,
        explicacion:
          "Incorrecta. Las hemorragias en astilla son líneas hemorrágicas lineales bajo el lecho ungueal, distintas de los nódulos dolorosos descritos en el caso.",
      },
    ],
    perla:
      "Nemotecnia: nódulos de Osler = 'Ouch' (duelen); lesiones de Janeway = indoloras. En usuarios de drogas IV, sospecha compromiso de válvula tricúspide y Staphylococcus aureus como agente más frecuente.",
  },
  {
    tema: "Shock cardiogénico",
    dificultad: "Alta",
    enunciado:
      "Varón de 68 años cursando las primeras horas de un infarto agudo de miocardio anterior extenso, presenta presión arterial de 78/50 mmHg, extremidades frías y crepitantes bibasales. ¿Cuál es la prioridad inmediata en su manejo?",
    opciones: [
      {
        letra: "A",
        texto: "Soporte hemodinámico y evaluación urgente para revascularización",
        correcta: true,
        explicacion:
          "Correcta. En shock cardiogénico post-IAM, la revascularización urgente (ICP) es la intervención con mayor impacto en la sobrevida, junto con soporte hemodinámico (inotrópicos o soporte mecánico según el caso).",
      },
      {
        letra: "B",
        texto: "Administrar un bolo agresivo de cristaloides",
        correcta: false,
        explicacion:
          "Incorrecta. La sobrecarga de volumen puede empeorar la congestión pulmonar en un paciente con signos de fallo de bomba y crepitantes; el manejo de fluidos debe ser cauteloso.",
      },
      {
        letra: "C",
        texto: "Iniciar betabloqueador para reducir la demanda de oxígeno miocárdico",
        correcta: false,
        explicacion:
          "Incorrecta. Los betabloqueadores están contraindicados en la fase aguda del shock cardiogénico por su efecto inotrópico y cronotrópico negativo, que puede empeorar la inestabilidad hemodinámica.",
      },
      {
        letra: "D",
        texto: "Diferir la angiografía hasta estabilización completa con medicación",
        correcta: false,
        explicacion:
          "Incorrecta. Retrasar la revascularización empeora el pronóstico; la angiografía urgente con intención de revascularizar es prioritaria y forma parte de la estabilización misma.",
      },
    ],
    perla:
      "El shock cardiogénico post-IAM tiene alta mortalidad; la revascularización temprana es la intervención que más ha demostrado modificar el desenlace.",
  },
  {
    tema: "Arritmias",
    dificultad: "Baja",
    enunciado:
      "Mujer de 28 años, previamente sana, acude por palpitaciones de inicio súbito. El ECG muestra una taquicardia regular de complejo QRS estrecho a 180 lpm, sin ondas P visibles. Se encuentra hemodinámicamente estable. ¿Cuál es el primer paso en su manejo?",
    opciones: [
      {
        letra: "A",
        texto: "Maniobras vagales (Valsalva o masaje del seno carotídeo)",
        correcta: true,
        explicacion:
          "Correcta. En una taquicardia supraventricular estable de QRS estrecho, las maniobras vagales son el primer paso por su bajo riesgo y capacidad de interrumpir el circuito de reentrada en el nodo AV.",
      },
      {
        letra: "B",
        texto: "Cardioversión eléctrica sincronizada inmediata",
        correcta: false,
        explicacion:
          "Incorrecta. La cardioversión eléctrica se reserva para pacientes hemodinámicamente inestables; esta paciente está estable, por lo que corresponden medidas menos invasivas primero.",
      },
      {
        letra: "C",
        texto: "Amiodarona endovenosa en bolo",
        correcta: false,
        explicacion:
          "Incorrecta. La amiodarona no es la primera línea en una TSV estable; se reserva para casos refractarios a maniobras vagales y adenosina, o según el contexto clínico específico.",
      },
      {
        letra: "D",
        texto: "Observación sin ninguna intervención",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque está estable, una frecuencia de 180 lpm sostenida requiere intervención activa para restaurar el ritmo sinusal, comenzando por las maniobras menos invasivas.",
      },
    ],
    perla:
      "Secuencia clásica en TSV estable: maniobras vagales → adenosina en bolo rápido con lavado salino → considerar antiarrítmicos si persiste.",
  },
  {
    tema: "Endocarditis infecciosa",
    dificultad: "Media",
    enunciado:
      "En términos generales, considerando todas las formas de endocarditis infecciosa sobre válvula nativa en la actualidad, ¿cuál es el microorganismo causal más frecuente?",
    opciones: [
      {
        letra: "A",
        texto: "Staphylococcus aureus",
        correcta: true,
        explicacion:
          "Correcta. Desde la década de 1980 la etiología estafilocócica ha ido en aumento en detrimento de la estreptocócica, y en la actualidad Staphylococcus aureus constituye la causa más frecuente de endocarditis infecciosa en general.",
      },
      {
        letra: "B",
        texto: "Streptococcus del grupo viridans",
        correcta: false,
        explicacion:
          "Incorrecta. Los estreptococos viridans siguen siendo una causa importante, especialmente de endocarditis subaguda, pero han sido superados por S. aureus como causa más frecuente en conjunto.",
      },
      {
        letra: "C",
        texto: "Enterococcus faecalis",
        correcta: false,
        explicacion:
          "Incorrecta. Los enterococos representan solo el 5-10% de todas las endocarditis, muy por debajo de la proporción atribuida a S. aureus.",
      },
      {
        letra: "D",
        texto: "Microorganismos del grupo HACEK",
        correcta: false,
        explicacion:
          "Incorrecta. El grupo HACEK es una causa poco frecuente de endocarditis, característicamente asociada a hemocultivos negativos, no la etiología más común.",
      },
    ],
    perla:
      "S. aureus es hoy la causa más frecuente de endocarditis en general, y también el microorganismo típico en usuarios de drogas intravenosas y en la mayoría de las endocarditis agudas.",
  },
  {
    tema: "Endocarditis infecciosa",
    dificultad: "Alta",
    enunciado:
      "Varón de 68 años presenta endocarditis por Streptococcus gallolyticus (antes S. bovis) confirmada por hemocultivos. Además del tratamiento antibiótico correspondiente, ¿qué estudio adicional está especialmente indicado en este paciente?",
    opciones: [
      {
        letra: "A",
        texto: "Colonoscopia",
        correcta: true,
        explicacion:
          "Correcta. La endocarditis por Streptococcus gallolyticus se asocia en más del 30% de los casos a un carcinoma colorrectal o adenoma velloso ocultos, por lo que se recomienda realizar de forma sistemática una colonoscopia en estos pacientes.",
      },
      {
        letra: "B",
        texto: "Broncoscopia",
        correcta: false,
        explicacion:
          "Incorrecta. La asociación neoplásica descrita para este microorganismo es específicamente con el colon, no con la vía respiratoria.",
      },
      {
        letra: "C",
        texto: "Biopsia renal",
        correcta: false,
        explicacion:
          "Incorrecta. No existe una asociación característica entre este microorganismo y patología renal que justifique una biopsia sistemática.",
      },
      {
        letra: "D",
        texto: "Punción lumbar",
        correcta: false,
        explicacion:
          "Incorrecta. No hay indicación sistemática de estudio del líquido cefalorraquídeo en la endocarditis por este microorganismo salvo que existan datos clínicos de afectación neurológica.",
      },
    ],
    perla:
      "Ante una endocarditis por Streptococcus gallolyticus (S. bovis), siempre hay que descartar patología colónica oculta (carcinoma colorrectal o adenoma velloso) mediante colonoscopia.",
  },
  {
    tema: "Endocarditis infecciosa",
    dificultad: "Alta",
    enunciado:
      "Paciente con endocarditis infecciosa de curso subaguda presenta hemocultivos persistentemente negativos a pesar de múltiples extracciones, sin antibioterapia previa. ¿Qué grupo de microorganismos debe sospecharse especialmente en este contexto?",
    opciones: [
      {
        letra: "A",
        texto: "Grupo HACEK y otros microorganismos de cultivo dificultoso (Coxiella, Bartonella, Brucella)",
        correcta: true,
        explicacion:
          "Correcta. El grupo HACEK y otros microorganismos como Coxiella burnetii, Bartonella o Brucella son causas típicas de endocarditis con hemocultivos negativos, ya que requieren medios de cultivo enriquecidos, incubación prolongada, o incluso diagnóstico serológico específico.",
      },
      {
        letra: "B",
        texto: "Staphylococcus aureus",
        correcta: false,
        explicacion:
          "Incorrecta. S. aureus se identifica habitualmente sin dificultad en hemocultivos convencionales; no es característico de las formas con hemocultivo negativo.",
      },
      {
        letra: "C",
        texto: "Streptococcus del grupo viridans",
        correcta: false,
        explicacion:
          "Incorrecta. Los estreptococos viridans se cultivan bien en medios convencionales y no representan una causa típica de endocarditis con hemocultivo negativo.",
      },
      {
        letra: "D",
        texto: "Enterococcus faecalis",
        correcta: false,
        explicacion:
          "Incorrecta. Los enterococos se identifican habitualmente en hemocultivos estándar sin mayor dificultad.",
      },
    ],
    perla:
      "El grupo HACEK (Haemophilus parainfluenzae/aphrophilus, Aggregatibacter, Cardiobacterium, Eikenella, Kingella) produce endocarditis subaguda con grandes vegetaciones; recordar que Haemophilus influenzae NO forma parte de este grupo.",
  },
  {
    tema: "Endocarditis infecciosa",
    dificultad: "Media",
    enunciado:
      "Varón de 30 años, usuario de drogas por vía parenteral, presenta fiebre sin foco claro de 48 horas de evolución. La ecocardiografía transtorácica confirma una vegetación en la válvula tricúspide. ¿Cuál es la complicación más característica de este tipo de endocarditis?",
    opciones: [
      {
        letra: "A",
        texto: "Embolias sépticas pulmonares",
        correcta: true,
        explicacion:
          "Correcta. En la endocarditis tricuspídea del usuario de drogas intravenosas, las embolias van hacia el circuito pulmonar (no al sistémico), pudiendo producir infiltrados nodulares cavitados e incluso pioneumotórax.",
      },
      {
        letra: "B",
        texto: "Embolias sépticas cerebrales",
        correcta: false,
        explicacion:
          "Incorrecta. Los fenómenos embólicos sistémicos (incluido el cerebral) son típicos de las endocarditis de cavidades izquierdas, no de la tricuspídea, cuyos émbolos van hacia el pulmón.",
      },
      {
        letra: "C",
        texto: "Isquemia mesentérica",
        correcta: false,
        explicacion:
          "Incorrecta. No es la complicación característica de la endocarditis tricuspídea; los émbolos desde cavidades derechas se dirigen al territorio pulmonar.",
      },
      {
        letra: "D",
        texto: "Infarto renal",
        correcta: false,
        explicacion:
          "Incorrecta. El infarto renal es propio de embolismos sistémicos desde cavidades izquierdas, no de la endocarditis tricuspídea derecha.",
      },
    ],
    perla:
      "En la endocarditis tricuspídea del usuario de drogas intravenosas, el pronóstico suele ser mejor que en las endocarditis izquierdas (no por menor destrucción valvular, sino porque afecta cavidades derechas); el tratamiento de elección para S. aureus no complicado es cloxacilina, pudiendo limitarse a 2 semanas.",
  },
  {
    tema: "Endocarditis infecciosa",
    dificultad: "Media",
    enunciado:
      "Paciente con alta sospecha clínica de endocarditis infecciosa, portador de una válvula protésica, presenta un ecocardiograma transtorácico de calidad limitada y no concluyente. ¿Cuál es el siguiente paso más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Ecocardiograma transesofágico",
        correcta: true,
        explicacion:
          "Correcta. El ecocardiograma transesofágico tiene mayor sensibilidad que el transtorácico para detectar vegetaciones en cavidades izquierdas (90% frente a 70%), y está especialmente indicado en pacientes con válvulas protésicas, estudio transtorácico de baja calidad, o alta sospecha clínica con transtorácico negativo.",
      },
      {
        letra: "B",
        texto: "Repetir el ecocardiograma transtorácico en 6 meses",
        correcta: false,
        explicacion:
          "Incorrecta. Ante alta sospecha clínica con un estudio transtorácico no concluyente, no se debe demorar la evaluación; el paso inmediato es el ecocardiograma transesofágico.",
      },
      {
        letra: "C",
        texto: "Descartar el diagnóstico de endocarditis, ya que el ecocardiograma no lo confirma",
        correcta: false,
        explicacion:
          "Incorrecta. Un ecocardiograma transtorácico no concluyente no descarta endocarditis, especialmente en portadores de válvula protésica, donde este estudio tiene menor rendimiento.",
      },
      {
        letra: "D",
        texto: "Iniciar tratamiento antifúngico empírico sin más estudios",
        correcta: false,
        explicacion:
          "Incorrecta. No hay datos en el caso que orienten específicamente a una etiología fúngica; el paso lógico es mejorar la caracterización ecocardiográfica antes de decidir el tratamiento específico.",
      },
    ],
    perla:
      "El ecocardiograma transesofágico es superior al transtorácico para valorar cavidades izquierdas y válvulas protésicas; en cambio, el transtorácico visualiza mejor la endocarditis tricuspídea y los abscesos miocárdicos de cara anterior.",
  },
  {
    tema: "Endocarditis infecciosa",
    dificultad: "Alta",
    enunciado:
      "Paciente con endocarditis sobre válvula nativa desarrolla insuficiencia cardíaca congestiva aguda como consecuencia de rotura valvular. ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Evaluación para recambio valvular quirúrgico",
        correcta: true,
        explicacion:
          "Correcta. La insuficiencia cardíaca congestiva por rotura o disfunción valvular aguda es la indicación quirúrgica más frecuente en las endocarditis izquierdas y generalmente requiere cirugía de forma no diferida.",
      },
      {
        letra: "B",
        texto: "Manejo exclusivamente médico con diuréticos y antibióticos, sin considerar cirugía",
        correcta: false,
        explicacion:
          "Incorrecta. La insuficiencia cardíaca por disfunción valvular aguda en el contexto de endocarditis es una indicación quirúrgica reconocida; el manejo exclusivamente médico no resuelve el problema mecánico de fondo.",
      },
      {
        letra: "C",
        texto: "Suspender el tratamiento antibiótico hasta que se resuelva la insuficiencia cardíaca",
        correcta: false,
        explicacion:
          "Incorrecta. El tratamiento antibiótico debe continuarse; suspenderlo permitiría la progresión de la infección activa.",
      },
      {
        letra: "D",
        texto: "Alta con seguimiento ambulatorio y reevaluación en un mes",
        correcta: false,
        explicacion:
          "Incorrecta. La insuficiencia cardíaca congestiva aguda por disfunción valvular en endocarditis es una situación grave que requiere manejo hospitalario y evaluación quirúrgica, no manejo ambulatorio diferido.",
      },
    ],
    perla:
      "La causa más frecuente de indicación quirúrgica en las endocarditis izquierdas es la insuficiencia cardíaca refractaria secundaria a rotura o disfunción valvular aguda. Otras indicaciones incluyen infección no controlada, endocarditis protésica precoz, endocarditis protésica por S. aureus, absceso con bloqueo de conducción, y embolismos sépticos recurrentes con vegetaciones grandes.",
  },
  {
    tema: "Endocarditis infecciosa",
    dificultad: "Media",
    enunciado:
      "Paciente portador de una prótesis valvular cardíaca va a someterse a una extracción dentaria. ¿Cuál es la profilaxis antibiótica más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Amoxicilina 2 g por vía oral, en dosis única, 30-60 minutos antes del procedimiento",
        correcta: true,
        explicacion:
          "Correcta. Los portadores de prótesis valvulares se consideran de muy alto riesgo, por lo que ante un procedimiento dental que implique sangrado o perforación de la mucosa oral se recomienda profilaxis con amoxicilina 2 g vía oral en dosis única, 30-60 minutos antes.",
      },
      {
        letra: "B",
        texto: "No requiere profilaxis, ya que las guías actuales la han eliminado por completo",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque las indicaciones de profilaxis se han restringido en los últimos años, los pacientes de muy alto riesgo (como los portadores de prótesis valvulares) sí mantienen indicación clara de profilaxis ante procedimientos dentales con sangrado.",
      },
      {
        letra: "C",
        texto: "Vancomicina intravenosa de forma sistemática antes de cualquier procedimiento dental",
        correcta: false,
        explicacion:
          "Incorrecta. La vancomicina no es la pauta estándar de profilaxis oral; la amoxicilina en dosis única es la primera elección, reservando alternativas (clindamicina, macrólidos) para alérgicos a betalactámicos.",
      },
      {
        letra: "D",
        texto: "Profilaxis solo si el paciente presenta fiebre en el momento del procedimiento",
        correcta: false,
        explicacion:
          "Incorrecta. La profilaxis se administra de forma preventiva antes del procedimiento en pacientes de alto riesgo, independientemente de si tienen fiebre en ese momento.",
      },
    ],
    perla:
      "Grupos de muy alto riesgo que sí requieren profilaxis ante procedimientos dentales con sangrado: prótesis valvulares, endocarditis previa, cardiopatía congénita cianosante no reparada, cardiopatía congénita reparada con material protésico (primeros 6 meses, o de por vida si hay defectos residuales), y portadores de dispositivos de asistencia ventricular.",
  },
  {
    tema: "Arritmias",
    dificultad: "Alta",
    enunciado:
      "Paciente hospitalizado con potasio sérico de 2.5 mEq/L presenta síncope. El monitor muestra una taquicardia ventricular polimórfica con el eje 'girando' alrededor de la línea basal, en el contexto de un QT prolongado. ¿Cuál es el factor precipitante más relevante en este caso y el manejo inmediato?",
    opciones: [
      {
        letra: "A",
        texto: "Hipokalemia, que potencia el bloqueo de los canales IKr; manejo con sulfato de magnesio IV y corrección del potasio",
        correcta: true,
        explicacion:
          "Correcta. La hipokalemia es un precipitante clave de torsade de pointes porque potencia el bloqueo de los canales de potasio IKr, prolongando aún más el QT; el manejo inmediato es sulfato de magnesio intravenoso junto con la corrección del potasio.",
      },
      {
        letra: "B",
        texto: "Hiperkalemia; manejo con gluconato de calcio IV",
        correcta: false,
        explicacion:
          "Incorrecta. El caso describe hipokalemia (K+ 2.5), no hiperkalemia; el gluconato de calcio se usa para estabilizar la membrana en hiperkalemia, no en este contexto.",
      },
      {
        letra: "C",
        texto: "Hipercalcemia; manejo con hidratación agresiva y furosemida",
        correcta: false,
        explicacion:
          "Incorrecta. No hay datos de hipercalcemia en el caso; el trastorno electrolítico relevante y precipitante de la torsade es la hipokalemia.",
      },
      {
        letra: "D",
        texto: "Hipomagnesemia aislada, sin relación con el potasio",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque el magnesio es clave en el tratamiento, el precipitante identificado explícitamente en el caso es la hipokalemia (K+ 2.5); el manejo con magnesio es terapéutico independientemente del nivel sérico de este.",
      },
    ],
    perla:
      "Los dos factores mayores que predisponen a torsade de pointes son los fármacos que prolongan el QT y las alteraciones electrolíticas (especialmente hipokalemia e hipomagnesemia); el sulfato de magnesio IV se administra como tratamiento agudo incluso si el magnesio sérico es normal.",
  },
  {
    tema: "Síndrome coronario agudo",
    dificultad: "Media",
    enunciado:
      "En el seguimiento bioquímico de un infarto agudo de miocardio, ¿qué biomarcador es característicamente el primero en elevarse y cuál es el más útil específicamente para detectar un reinfarto temprano?",
    opciones: [
      {
        letra: "A",
        texto: "Mioglobina es la primera en elevarse; CPK-MB es la más útil para detectar reinfarto",
        correcta: true,
        explicacion:
          "Correcta. La mioglobina es el biomarcador que se eleva más precozmente tras el infarto, aunque es poco específica; la CPK-MB, al normalizarse más rápido que la troponina, es particularmente útil para detectar un reinfarto temprano (una nueva elevación tras la normalización sugiere reinfarto).",
      },
      {
        letra: "B",
        texto: "Troponina es la primera en elevarse; LDH es la más útil para detectar reinfarto",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque la troponina es el biomarcador más sensible y específico en general, no es el primero en elevarse (ese lugar corresponde a la mioglobina); la LDH es la última en elevarse y normalizarse, por lo que es útil para el diagnóstico tardío, no para detectar reinfarto.",
      },
      {
        letra: "C",
        texto: "LDH es la primera en elevarse; troponina es la más útil para reinfarto",
        correcta: false,
        explicacion:
          "Incorrecta. La LDH es, de hecho, el biomarcador que se eleva más tardíamente y permanece elevado por más tiempo, no el primero.",
      },
      {
        letra: "D",
        texto: "CPK-MB es la primera en elevarse; mioglobina es la más útil para reinfarto",
        correcta: false,
        explicacion:
          "Incorrecta. La mioglobina, no la CPK-MB, es la que se eleva más precozmente tras el daño miocárdico.",
      },
    ],
    perla:
      "Cinética de biomarcadores en IAM: mioglobina (primera en elevarse, poco específica) → troponinas T e I (más sensibles y específicas, permanecen elevadas días) → CPK-MB (útil para reinfarto por su normalización más rápida) → LDH (última en elevarse y normalizarse). El tipo de necrosis miocárdica es coagulativa.",
  },
  {
    tema: "Shock cardiogénico",
    dificultad: "Alta",
    enunciado:
      "Paciente con shock cardiogénico e índice cardíaco menor a 2.2 L/min/m² persiste hipotenso e hipoperfundido a pesar de dosis adecuadas de inotrópicos y vasopresores. ¿Cuál es el siguiente paso más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Considerar balón de contrapulsación intraaórtico u otro soporte circulatorio mecánico",
        correcta: true,
        explicacion:
          "Correcta. Un índice cardíaco <2.2 L/min/m² indica hipoperfusión significativa; cuando el paciente no responde a inotrópicos y vasopresores a dosis adecuadas, se debe considerar soporte circulatorio mecánico como el balón de contrapulsación intraaórtico.",
      },
      {
        letra: "B",
        texto: "Aumentar indefinidamente la dosis de vasopresores sin considerar soporte mecánico",
        correcta: false,
        explicacion:
          "Incorrecta. Escalar indefinidamente la dosis de vasopresores sin respuesta clínica adecuada solo aumenta el riesgo de isquemia periférica y arritmias, sin resolver la causa hemodinámica de fondo.",
      },
      {
        letra: "C",
        texto: "Suspender todo soporte farmacológico e iniciar solo manejo paliativo",
        correcta: false,
        explicacion:
          "Incorrecta. La falta de respuesta a inotrópicos y vasopresores no implica automáticamente que el paciente no sea candidato a más intervenciones; el soporte mecánico circulatorio es una opción activa antes de considerar medidas paliativas.",
      },
      {
        letra: "D",
        texto: "Iniciar betabloqueadores para reducir la frecuencia cardíaca",
        correcta: false,
        explicacion:
          "Incorrecta. Los betabloqueadores están contraindicados en la fase aguda del shock cardiogénico por su efecto inotrópico y cronotrópico negativo, que empeoraría la inestabilidad hemodinámica.",
      },
    ],
    perla:
      "Un índice cardíaco <2.2 L/min/m² define hipoperfusión en el contexto de shock cardiogénico; la falta de respuesta a inotrópicos/vasopresores a dosis adecuadas es la señal para escalar a soporte circulatorio mecánico (balón de contrapulsación, dispositivos de asistencia ventricular).",
  },
];

const ENDOCRINO_QUESTIONS = [
  {
    tema: "Diabetes mellitus",
    dificultad: "Baja",
    enunciado:
      "Mujer de 50 años, obesa, asintomática, acude a control de rutina. Glucosa en ayunas de 130 mg/dL en dos determinaciones separadas. ¿Cuál es el diagnóstico más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Diabetes mellitus tipo 2",
        correcta: true,
        explicacion:
          "Correcta. Una glucosa en ayunas ≥126 mg/dL confirmada en dos ocasiones establece el diagnóstico de diabetes mellitus, independientemente de la presencia de síntomas.",
      },
      {
        letra: "B",
        texto: "Prediabetes (glucosa alterada en ayunas)",
        correcta: false,
        explicacion:
          "Incorrecta. La glucosa alterada en ayunas corresponde a valores entre 100-125 mg/dL; un valor de 130 mg/dL confirmado ya cumple criterio diagnóstico de diabetes.",
      },
      {
        letra: "C",
        texto: "Diabetes mellitus tipo 1 de inicio tardío",
        correcta: false,
        explicacion:
          "Incorrecta. Nada en el caso sugiere un proceso autoinmune de inicio (ausencia de cetosis, edad y peso compatibles con resistencia a la insulina), por lo que la DM2 es mucho más probable.",
      },
      {
        letra: "D",
        texto: "Se requiere una prueba de tolerancia oral a la glucosa para confirmar",
        correcta: false,
        explicacion:
          "Incorrecta. La PTOG es una alternativa diagnóstica, pero no es necesaria cuando ya hay dos glucosas en ayunas ≥126 mg/dL, que por sí solas confirman el diagnóstico.",
      },
    ],
    perla:
      "Criterios diagnósticos de DM2 (cualquiera confirmado en 2 ocasiones, salvo síntomas + glucosa al azar ≥200): glucosa en ayunas ≥126 mg/dL, PTOG a las 2h ≥200 mg/dL, o HbA1c ≥6.5%.",
  },
  {
    tema: "Tiroides",
    dificultad: "Media",
    enunciado:
      "Mujer de 34 años con fatiga, intolerancia al frío, aumento de peso y estreñimiento. TSH elevada con T4 libre baja. ¿Cuál es el manejo más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Levotiroxina oral, ajustando dosis según TSH cada 6-8 semanas",
        correcta: true,
        explicacion:
          "Correcta. El hipotiroidismo primario (TSH alta, T4 libre baja) se trata con levotiroxina, titulando la dosis según control seriado de TSH cada 6-8 semanas hasta alcanzar el objetivo.",
      },
      {
        letra: "B",
        texto: "Metimazol para reducir la producción hormonal",
        correcta: false,
        explicacion:
          "Incorrecta. El metimazol es un antitiroideo usado en hipertiroidismo, lo opuesto al cuadro descrito, en el que la glándula produce insuficiente hormona tiroidea.",
      },
      {
        letra: "C",
        texto: "Yodo radiactivo como tratamiento inicial",
        correcta: false,
        explicacion:
          "Incorrecta. El yodo radiactivo se usa para ablacionar tejido tiroideo hiperfuncionante (ej. enfermedad de Graves), no tiene rol en el hipotiroidismo.",
      },
      {
        letra: "D",
        texto: "Observación sin tratamiento, ya que los síntomas son inespecíficos",
        correcta: false,
        explicacion:
          "Incorrecta. Con TSH elevada y T4 libre baja confirmadas, el diagnóstico de hipotiroidismo franco está establecido y requiere tratamiento de reemplazo hormonal.",
      },
    ],
    perla:
      "TSH es el marcador más sensible para tamizaje tiroideo: TSH alta + T4 libre baja = hipotiroidismo primario; TSH baja + T4 libre alta = hipertiroidismo primario.",
  },
  {
    tema: "Tiroides",
    dificultad: "Media",
    enunciado:
      "Mujer de 28 años con pérdida de peso, palpitaciones, temblor distal, intolerancia al calor y exoftalmos bilateral. TSH suprimida con T4 libre elevada. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Enfermedad de Graves",
        correcta: true,
        explicacion:
          "Correcta. La combinación de hipertiroidismo con exoftalmos (oftalmopatía) es característica de la enfermedad de Graves, causada por anticuerpos estimulantes del receptor de TSH.",
      },
      {
        letra: "B",
        texto: "Tiroiditis subaguda de De Quervain",
        correcta: false,
        explicacion:
          "Incorrecta. La tiroiditis subaguda cursa con dolor cervical y fiebre tras un cuadro viral, y no se asocia a exoftalmos; suele ser transitoria.",
      },
      {
        letra: "C",
        texto: "Bocio multinodular tóxico",
        correcta: false,
        explicacion:
          "Incorrecta. El bocio multinodular tóxico es más frecuente en pacientes mayores y no se asocia a oftalmopatía, que es específica de la enfermedad de Graves.",
      },
      {
        letra: "D",
        texto: "Adenoma hipofisario secretor de TSH",
        correcta: false,
        explicacion:
          "Incorrecta. En este caso la TSH estaría elevada o inapropiadamente normal (no suprimida), ya que el tumor hipofisario sería la fuente del exceso hormonal.",
      },
    ],
    perla:
      "La oftalmopatía (exoftalmos) y el mixedema pretibial son hallazgos específicos de enfermedad de Graves, y no se ven en otras causas de hipertiroidismo.",
  },
  {
    tema: "Urgencias endocrinológicas",
    dificultad: "Alta",
    enunciado:
      "Varón de 22 años con diabetes mellitus tipo 1, acude por dolor abdominal, vómitos y respiración profunda tras suspender su insulina por una gastroenteritis. Glucosa 420 mg/dL, cetonas positivas en sangre, pH arterial 7.18. ¿Cuál es la prioridad inicial en su manejo?",
    opciones: [
      {
        letra: "A",
        texto: "Reposición de volumen con cristaloides antes de iniciar insulina",
        correcta: true,
        explicacion:
          "Correcta. En cetoacidosis diabética, el primer paso es la reposición agresiva de volumen con solución salina, ya que corrige parte de la hiperglucemia, mejora la perfusión y reduce el riesgo de hipotensión al iniciar insulina.",
      },
      {
        letra: "B",
        texto: "Bolo de insulina endovenosa como primera medida",
        correcta: false,
        explicacion:
          "Incorrecta. Iniciar insulina antes de la reposición de volumen puede empeorar la hipotensión y precipitar hipokalemia grave; la insulina se inicia tras comenzar la hidratación.",
      },
      {
        letra: "C",
        texto: "Bicarbonato endovenoso para corregir la acidosis de inmediato",
        correcta: false,
        explicacion:
          "Incorrecta. El bicarbonato se reserva para acidosis extrema (pH <6.9) por el riesgo de empeorar la hipokalemia y causar edema cerebral; no es la prioridad inicial en este caso.",
      },
      {
        letra: "D",
        texto: "Iniciar antibióticos empíricos de amplio espectro",
        correcta: false,
        explicacion:
          "Incorrecta. No hay evidencia de infección bacteriana descrita más allá de la gastroenteritis; el manejo prioritario es metabólico (volumen, insulina, potasio), no antibiótico.",
      },
    ],
    perla:
      "Secuencia de manejo en CAD: 1) cristaloides, 2) reposición de potasio si es necesario antes de insulina, 3) insulina endovenosa en infusión, monitorizando glucosa y electrolitos cada hora.",
  },
  {
    tema: "Neoplasia endocrina múltiple",
    dificultad: "Alta",
    enunciado:
      "Paciente presenta carcinoma medular de tiroides, feocromocitoma y neuromas mucosos, con hábito marfanoide. ¿A qué síndrome de neoplasia endocrina múltiple corresponde este cuadro?",
    opciones: [
      {
        letra: "A",
        texto: "MEN 2B",
        correcta: true,
        explicacion:
          "Correcta. El MEN 2B se caracteriza por carcinoma medular de tiroides, feocromocitoma, neuromas mucosos y hábito marfanoide; a diferencia del MEN 2A, no suele cursar con hiperparatiroidismo.",
      },
      {
        letra: "B",
        texto: "MEN 1",
        correcta: false,
        explicacion:
          "Incorrecta. El MEN 1 se caracteriza por afectación de paratiroides, hipófisis (prolactinoma) y páncreas, no por carcinoma medular de tiroides ni neuromas mucosos.",
      },
      {
        letra: "C",
        texto: "MEN 2A",
        correcta: false,
        explicacion:
          "Incorrecta. El MEN 2A comparte el carcinoma medular de tiroides y el feocromocitoma, pero se asocia a hiperparatiroidismo (no a neuromas mucosos ni hábito marfanoide).",
      },
      {
        letra: "D",
        texto: "Neurofibromatosis tipo 1",
        correcta: false,
        explicacion:
          "Incorrecta. La neurofibromatosis tipo 1 no forma parte de la clasificación de neoplasia endocrina múltiple ni se caracteriza por esta combinación específica de carcinoma medular de tiroides y feocromocitoma.",
      },
    ],
    perla:
      "MEN 1: paratiroides + pituitaria + páncreas. MEN 2A: carcinoma medular de tiroides + feocromocitoma + hiperparatiroidismo. MEN 2B: carcinoma medular de tiroides + feocromocitoma + neuromas mucosos + hábito marfanoide (sin hiperparatiroidismo).",
  },
  {
    tema: "Trastornos del calcio",
    dificultad: "Media",
    enunciado:
      "Mujer de 60 años presenta fatiga y dolor óseo, con hipercalcemia leve, calcio y PTH elevados en los exámenes de laboratorio. ¿Cuál es la causa más probable y el tratamiento definitivo?",
    opciones: [
      {
        letra: "A",
        texto: "Hiperparatiroidismo primario por adenoma paratiroideo; tratamiento quirúrgico",
        correcta: true,
        explicacion:
          "Correcta. La combinación de hipercalcemia con PTH elevada (inapropiadamente no suprimida) es característica del hiperparatiroidismo primario; la causa más frecuente es el adenoma paratiroideo único, y el tratamiento definitivo es la paratiroidectomía.",
      },
      {
        letra: "B",
        texto: "Hipercalcemia humoral maligna; tratamiento con bifosfonatos exclusivamente",
        correcta: false,
        explicacion:
          "Incorrecta. En la hipercalcemia humoral maligna la PTH suele estar suprimida (no elevada), ya que la hipercalcemia se debe a PTHrP producida por el tumor, un perfil distinto al descrito en este caso.",
      },
      {
        letra: "C",
        texto: "Intoxicación por vitamina D; suspender suplementación únicamente",
        correcta: false,
        explicacion:
          "Incorrecta. En la intoxicación por vitamina D, la PTH suele estar suprimida por la hipercalcemia resultante, no elevada como en este caso.",
      },
      {
        letra: "D",
        texto: "Hipoparatiroidismo secundario a enfermedad renal crónica",
        correcta: false,
        explicacion:
          "Incorrecta. El hipoparatiroidismo cursa con PTH baja y generalmente hipocalcemia, un cuadro opuesto al descrito.",
      },
    ],
    perla:
      "La clave diagnóstica del hiperparatiroidismo primario es la PTH elevada (o inapropiadamente normal) en presencia de hipercalcemia; en la mayoría de las otras causas de hipercalcemia, la PTH está fisiológicamente suprimida.",
  },
];

const OBSTETRICIA_QUESTIONS = [
  {
    tema: "Trastornos hipertensivos del embarazo",
    dificultad: "Media",
    enunciado:
      "Gestante de 32 semanas presenta presión arterial de 160/110 mmHg en dos tomas, proteinuria significativa y cefalea intensa. ¿Cuál es el manejo más adecuado además de la evaluación para el parto?",
    opciones: [
      {
        letra: "A",
        texto: "Sulfato de magnesio para prevención de convulsiones y antihipertensivo",
        correcta: true,
        explicacion:
          "Correcta. Ante preeclampsia con criterios de severidad (PA ≥160/110 con síntomas), el sulfato de magnesio previene la progresión a eclampsia, junto con antihipertensivos para controlar la presión.",
      },
      {
        letra: "B",
        texto: "Reposo en cama ambulatorio y control en una semana",
        correcta: false,
        explicacion:
          "Incorrecta. Una preeclampsia con criterios de severidad requiere manejo hospitalario inmediato, no manejo ambulatorio, por el riesgo de eclampsia y complicaciones maternofetales.",
      },
      {
        letra: "C",
        texto: "Diuréticos de asa para reducir la presión arterial",
        correcta: false,
        explicacion:
          "Incorrecta. Los diuréticos no son el tratamiento de la preeclampsia y pueden reducir aún más el volumen intravascular, ya de por sí disminuido en esta condición.",
      },
      {
        letra: "D",
        texto: "Iniciar anticoagulación profiláctica de inmediato",
        correcta: false,
        explicacion:
          "Incorrecta. La anticoagulación no forma parte del manejo agudo de la preeclampsia; la prioridad es la prevención de convulsiones y el control tensional.",
      },
    ],
    perla:
      "Criterios de severidad en preeclampsia: PA ≥160/110, cefalea persistente, alteraciones visuales, dolor en hipocondrio derecho, plaquetopenia o compromiso de función hepática/renal.",
  },
  {
    tema: "Hemorragia obstétrica",
    dificultad: "Alta",
    enunciado:
      "Puérpera inmediata presenta sangrado vaginal abundante tras el parto vaginal. Al examen, el útero se palpa blando y no contraído. ¿Cuál es la causa más probable y el primer paso de manejo?",
    opciones: [
      {
        letra: "A",
        texto: "Atonía uterina; masaje uterino bimanual y uterotónicos",
        correcta: true,
        explicacion:
          "Correcta. La atonía uterina es la causa más frecuente de hemorragia postparto, y se sospecha ante un útero blando y no contraído; el manejo inicial es masaje uterino y uterotónicos como oxitocina.",
      },
      {
        letra: "B",
        texto: "Retención de restos placentarios; legrado uterino inmediato sin evaluación previa",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque la retención de restos es una causa posible de hemorragia postparto, el hallazgo de un útero blando y no contraído orienta primero a atonía; el legrado se considera si se confirma retención de tejido.",
      },
      {
        letra: "C",
        texto: "Rotura uterina; laparotomía exploratoria de urgencia sin más evaluación",
        correcta: false,
        explicacion:
          "Incorrecta. La rotura uterina suele presentarse con dolor abdominal intenso y compromiso hemodinámico brusco, no con un útero simplemente blando; no es el escenario más probable aquí.",
      },
      {
        letra: "D",
        texto: "Coagulopatía de consumo; transfusión de plaquetas como primera medida",
        correcta: false,
        explicacion:
          "Incorrecta. Una coagulopatía es una causa menos frecuente y se considera cuando las causas mecánicas (tono, tejido, trauma) han sido descartadas o el sangrado no responde al manejo inicial.",
      },
    ],
    perla:
      "Nemotecnia de las 4 T de la hemorragia postparto: Tono (atonía, la más frecuente), Tejido (restos placentarios), Trauma (laceraciones, rotura) y Trombina (coagulopatía).",
  },
  {
    tema: "Diabetes gestacional",
    dificultad: "Baja",
    enunciado:
      "Gestante de 26 semanas, sin antecedentes de diabetes, acude a su control prenatal de rutina. ¿Cuál es la conducta más adecuada respecto al tamizaje de diabetes gestacional?",
    opciones: [
      {
        letra: "A",
        texto: "Realizar tamizaje con prueba de tolerancia oral a la glucosa entre las 24-28 semanas",
        correcta: true,
        explicacion:
          "Correcta. El tamizaje universal de diabetes gestacional se realiza entre las 24-28 semanas de gestación mediante una prueba de tolerancia oral a la glucosa, en ausencia de factores de alto riesgo que justifiquen tamizaje más temprano.",
      },
      {
        letra: "B",
        texto: "No se requiere tamizaje si la gestante no tiene antecedentes familiares de diabetes",
        correcta: false,
        explicacion:
          "Incorrecta. El tamizaje de diabetes gestacional es universal en la mayoría de guías, independientemente de los antecedentes familiares, dado que muchas gestantes sin factores de riesgo evidentes pueden desarrollarla.",
      },
      {
        letra: "C",
        texto: "Solicitar HbA1c como único método de tamizaje en el segundo trimestre",
        correcta: false,
        explicacion:
          "Incorrecta. La HbA1c no es el método estándar de tamizaje para diabetes gestacional durante el embarazo, ya que su interpretación se ve afectada por los cambios fisiológicos del embarazo; se prefiere la PTOG.",
      },
      {
        letra: "D",
        texto: "Esperar hasta el tercer trimestre para realizar cualquier tamizaje",
        correcta: false,
        explicacion:
          "Incorrecta. Esperar al tercer trimestre retrasa el diagnóstico y manejo oportuno, perdiendo tiempo valioso para el control glucémico antes del parto.",
      },
    ],
    perla:
      "En gestantes con factores de alto riesgo (obesidad, antecedente de diabetes gestacional, macrosomía previa), se recomienda tamizaje temprano en el primer trimestre, además del tamizaje universal a las 24-28 semanas.",
  },
  {
    tema: "Complicaciones del embarazo",
    dificultad: "Alta",
    enunciado:
      "Gestante de 34 semanas con antecedente de hipertensión, presenta dolor abdominal súbito e intenso, sangrado vaginal oscuro escaso y útero hipertónico. El monitoreo fetal muestra alteraciones de la frecuencia cardíaca. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Desprendimiento prematuro de placenta normoinserta",
        correcta: true,
        explicacion:
          "Correcta. El dolor abdominal súbito, el útero hipertónico y el sangrado oscuro en una gestante hipertensa son característicos de desprendimiento prematuro de placenta, una emergencia obstétrica con riesgo de compromiso fetal.",
      },
      {
        letra: "B",
        texto: "Placenta previa",
        correcta: false,
        explicacion:
          "Incorrecta. La placenta previa típicamente se presenta con sangrado vaginal rojo brillante, indoloro y sin hipertonía uterina, un cuadro distinto al descrito.",
      },
      {
        letra: "C",
        texto: "Trabajo de parto pretérmino no complicado",
        correcta: false,
        explicacion:
          "Incorrecta. El trabajo de parto pretérmino no cursa con sangrado vaginal ni con un útero persistentemente hipertónico entre contracciones, como se describe en este caso.",
      },
      {
        letra: "D",
        texto: "Rotura de vasa previa",
        correcta: false,
        explicacion:
          "Incorrecta. La rotura de vasa previa se asocia clásicamente a sangrado tras la rotura de membranas y compromiso fetal agudo, sin el dolor abdominal intenso ni la hipertonía uterina descritos.",
      },
    ],
    perla:
      "El desprendimiento prematuro de placenta es más frecuente en gestantes con hipertensión, trauma abdominal o consumo de cocaína; es una emergencia que puede requerir cesárea urgente según el estado materno-fetal.",
  },
  {
    tema: "Vigilancia fetal anteparto",
    dificultad: "Media",
    enunciado:
      "Multípara de 30 años, 41 semanas por ecografía, con antecedente de 2 partos vaginales (máximo 3500 g). Refiere disminución de movimientos fetales y contracciones esporádicas. Afebril, PA 100/70. AU 32 cm, LF 140x'. Tacto: altura -1, incorporación 85%, membranas íntegras. ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Cesárea de emergencia",
        correcta: false,
        explicacion:
          "Incorrecta. No hay signos de sufrimiento fetal agudo que la justifiquen; indicarla de entrada sería sobretratamiento.",
      },
      {
        letra: "B",
        texto: "Prueba de tolerancia a la oxitocina y decidir la vía del parto según el resultado",
        correcta: true,
        explicacion:
          "Correcta. El dato de alarma (disminución de movimientos) coexiste con un examen materno-fetal tranquilizador; se evalúa objetivamente la reserva fetal antes de decidir cualquier conducta definitiva.",
      },
      {
        letra: "C",
        texto: "Prostaglandinas por vía vaginal",
        correcta: false,
        explicacion:
          "Incorrecta. Madurarían el cérvix con miras a una inducción, pero aún no se ha decidido si el parto debe inducirse; primero se evalúa el bienestar fetal.",
      },
      {
        letra: "D",
        texto: "Observación ambulatoria",
        correcta: false,
        explicacion:
          "Incorrecta. Enviar a la paciente a casa con un dato de alarma real, sin una evaluación objetiva del bienestar fetal, no es seguro.",
      },
    ],
    perla:
      "Ante un dato de alarma aislado (por ejemplo, disminución de movimientos) con el resto del cuadro tranquilizador, el paso lógico es evaluar objetivamente el bienestar fetal (NST o prueba de tolerancia) antes de decidir la vía del parto.",
  },
  {
    tema: "Trabajo de parto",
    dificultad: "Media",
    enunciado:
      "Multigesta en trabajo de parto, con dinámica uterina adecuada, AU 36 cm, LF 160x', longitudinal cefálica izquierda, dilatación 8 cm, líquido amniótico meconial claro, variedad occípito derecha posterior. ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Parto vacuum",
        correcta: false,
        explicacion:
          "Incorrecta. El vacuum requiere dilatación completa (10 cm); con 8 cm de dilatación es técnicamente inaplicable.",
      },
      {
        letra: "B",
        texto: "Rotación manual de la variedad de posición",
        correcta: false,
        explicacion:
          "Incorrecta. La rotación manual se reserva para variedades persistentes en el segundo periodo del parto; esta paciente aún está en fase activa del primer periodo.",
      },
      {
        letra: "C",
        texto: "Cesárea",
        correcta: false,
        explicacion:
          "Incorrecta. No hay sufrimiento fetal (el meconio es claro, no espeso) ni detención del progreso que la justifique.",
      },
      {
        letra: "D",
        texto: "Observación, continuando el trabajo de parto",
        correcta: true,
        explicacion:
          "Correcta. Líquido meconial claro (no espeso), con buena dinámica uterina, dilatación avanzada y frecuencia cardíaca fetal normal, no exige intervención inmediata.",
      },
    ],
    perla:
      "El meconio claro con buen progreso del trabajo de parto se maneja con observación; el meconio espeso sí es una señal de alarma que amerita vigilancia más estrecha.",
  },
  {
    tema: "Vía del parto",
    dificultad: "Media",
    enunciado:
      "Multigesta de 39 semanas con presentación podálica en nalgas puras, antecedente de 2 partos vaginales previos (máximo 3200 g), AU 29 cm, feto vivo, con dilatación completa. ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Parto instrumentado con fórceps o vacuum",
        correcta: false,
        explicacion:
          "Incorrecta. El fórceps y el vacuum se emplean en presentación cefálica, no en presentación podálica.",
      },
      {
        letra: "B",
        texto: "Cesárea",
        correcta: false,
        explicacion:
          "Incorrecta. No está indicada de entrada dado el contexto favorable: multípara, variedad de nalgas puras (la más favorable) y dilatación ya completa.",
      },
      {
        letra: "C",
        texto: "Atención de parto vaginal",
        correcta: true,
        explicacion:
          "Correcta. Los tres factores (multípara, nalgas puras, dilatación completa) hacen que el parto vaginal en podálica sea una opción razonable, no automáticamente una cesárea.",
      },
      {
        letra: "D",
        texto: "Inducción del trabajo de parto con oxitocina",
        correcta: false,
        explicacion:
          "Incorrecta. La paciente ya se encuentra en dilatación completa; no hay nada que 'inducir' en este momento.",
      },
    ],
    perla:
      "La vía vaginal en presentación podálica puede considerarse en casos seleccionados (multípara, nalgas puras, buen progreso), aunque la decisión depende de protocolos institucionales y experiencia del equipo.",
  },
  {
    tema: "Amenaza de parto pretérmino",
    dificultad: "Media",
    enunciado:
      "Gestante de 30 semanas con contracciones cada 3 minutos de buena intensidad, LCF 143x', dilatación 0, incorporación 30%, altura -4, membranas íntegras. ¿Cuál es el examen de elección para estratificar el riesgo de parto pretérmino?",
    opciones: [
      {
        letra: "A",
        texto: "Fibronectina fetal",
        correcta: false,
        explicacion:
          "Incorrecta. Es un estudio complementario, útil sobre todo cuando la longitud cervical está en un rango intermedio ('zona gris'); no es el primer estudio a solicitar.",
      },
      {
        letra: "B",
        texto: "Test de Nitrazina",
        correcta: false,
        explicacion:
          "Incorrecta. Evalúa rotura de membranas; en este caso las membranas están íntegras.",
      },
      {
        letra: "C",
        texto: "Ecografía transvaginal para medir la longitud cervical",
        correcta: true,
        explicacion:
          "Correcta. Es el examen de elección para estratificar objetivamente el riesgo real de parto pretérmino ante contracciones con cambios cervicales aún leves.",
      },
      {
        letra: "D",
        texto: "Doppler de arteria umbilical",
        correcta: false,
        explicacion:
          "Incorrecta. Evalúa el bienestar fetal crónico (por ejemplo, en restricción de crecimiento), no la amenaza de parto pretérmino.",
      },
      {
        letra: "E",
        texto: "Test de Fern (cristalización en helecho)",
        correcta: false,
        explicacion:
          "Incorrecta. Al igual que la nitrazina, diagnostica rotura de membranas; no aplica con membranas íntegras.",
      },
    ],
    perla:
      "La longitud cervical por ecografía transvaginal es la prueba objetiva de elección ante sospecha de amenaza de parto pretérmino; la fibronectina se reserva para casos con longitud cervical intermedia.",
  },
  {
    tema: "Diabetes gestacional",
    dificultad: "Media",
    enunciado:
      "Primigesta de 38 semanas con diabetes gestacional en tratamiento con insulina. AU 42 cm (sospecha de macrosomía fetal), presentación no encajada al tacto. ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Programar cesárea a las 39 semanas",
        correcta: true,
        explicacion:
          "Correcta. Ante sospecha de macrosomía fetal con presentación no encajada en una gestante diabética, se prefiere una cesárea electiva para evitar el riesgo de distocia de hombros.",
      },
      {
        letra: "B",
        texto: "Inducir el trabajo de parto",
        correcta: false,
        explicacion:
          "Incorrecta. Aumenta el riesgo de distocia de hombros en un feto macrosómico que aún no está encajado.",
      },
      {
        letra: "C",
        texto: "Maduración cervical con misoprostol",
        correcta: false,
        explicacion:
          "Incorrecta. Solo tendría sentido si el plan fuera inducir el parto; en este caso se prefiere la cesárea programada.",
      },
      {
        letra: "D",
        texto: "Esperar evolución espontánea del trabajo de parto",
        correcta: false,
        explicacion:
          "Incorrecta. Retrasa la resolución en una paciente diabética con sospecha de macrosomía, aumentando los riesgos materno-fetales.",
      },
    ],
    perla:
      "La sospecha de macrosomía fetal (especialmente en madre diabética) con presentación no encajada es una indicación relativa de cesárea electiva para evitar distocia de hombros.",
  },
  {
    tema: "Hijo de madre diabética",
    dificultad: "Media",
    enunciado:
      "En el contexto de diabetes gestacional mal controlada, el hiperinsulinismo fetal retrasa la maduración del surfactante pulmonar. ¿Cuál es la complicación respiratoria más grave en el hijo de madre diabética?",
    opciones: [
      {
        letra: "A",
        texto: "Anemia neonatal",
        correcta: false,
        explicacion:
          "Incorrecta. Es más típica la policitemia (secundaria a hipoxia fetal crónica) que la anemia en el hijo de madre diabética.",
      },
      {
        letra: "B",
        texto: "Síndrome de aspiración meconial",
        correcta: false,
        explicacion:
          "Incorrecta. Está más ligado a la postmadurez y a la macrosomía en general; no es el hallazgo distintivo ni el más grave asociado al mecanismo fisiopatológico de la diabetes materna.",
      },
      {
        letra: "C",
        texto: "Enfermedad de membrana hialina",
        correcta: true,
        explicacion:
          "Correcta. El hiperinsulinismo fetal retrasa la maduración del surfactante pulmonar, generando la complicación respiratoria más grave en el hijo de madre diabética.",
      },
      {
        letra: "D",
        texto: "Sepsis neonatal",
        correcta: false,
        explicacion:
          "Incorrecta. No está directamente vinculada al mecanismo fisiopatológico específico de la diabetes materna sobre el pulmón fetal.",
      },
      {
        letra: "E",
        texto: "Taquipnea transitoria del recién nacido",
        correcta: false,
        explicacion:
          "Incorrecta. Es más frecuente en hijos de madre diabética, pero es una condición leve y autolimitada: frecuencia no es sinónimo de gravedad, y aquí se pregunta por la complicación más grave.",
      },
    ],
    perla:
      "Distingue frecuencia de gravedad: la macrosomía es la complicación más frecuente en hijos de madre diabética, pero la enfermedad de membrana hialina (por inmadurez del surfactante inducida por hiperinsulinismo) es la más grave.",
  },
  {
    tema: "Trastornos hipertensivos del embarazo",
    dificultad: "Media",
    enunciado:
      "Puérpera inmediata con diagnóstico de preeclampsia con criterios de severidad, actualmente recibiendo sulfato de magnesio en infusión. ¿Hasta cuándo debe mantenerse la neuroprofilaxis con sulfato de magnesio?",
    opciones: [
      {
        letra: "A",
        texto: "Inmediatamente después del parto",
        correcta: false,
        explicacion:
          "Incorrecta. Suspenderlo de inmediato deja desprotegida a la paciente durante el periodo de mayor riesgo de eclampsia puerperal (primeras 24-48 horas).",
      },
      {
        letra: "B",
        texto: "72 horas después del parto",
        correcta: false,
        explicacion:
          "Incorrecta. Prolonga innecesariamente la exposición al fármaco, aumentando el riesgo de toxicidad por magnesio sin beneficio adicional demostrado.",
      },
      {
        letra: "C",
        texto: "24 horas después del parto",
        correcta: true,
        explicacion:
          "Correcta. Es el estándar de neuroprofilaxis con sulfato de magnesio, cubriendo el periodo de mayor riesgo de eclampsia en el puerperio inmediato.",
      },
      {
        letra: "D",
        texto: "24 horas desde el diagnóstico de preeclampsia",
        correcta: false,
        explicacion:
          "Incorrecta. Confunde el punto de referencia: el estándar se cuenta desde el momento del parto, no desde el diagnóstico, que pudo haber ocurrido días antes.",
      },
    ],
    perla:
      "La neuroprofilaxis con sulfato de magnesio en preeclampsia severa se mantiene típicamente 24 horas posparto, periodo de mayor riesgo de eclampsia puerperal.",
  },
  {
    tema: "Monitoreo fetal intraparto",
    dificultad: "Media",
    enunciado:
      "Gestante a término en trabajo de parto con oligohidramnios (índice de líquido amniótico de 4 cm). ¿Cuál es la alteración más probable en la frecuencia cardíaca fetal durante el monitoreo intraparto?",
    opciones: [
      {
        letra: "A",
        texto: "Desaceleraciones tardías",
        correcta: false,
        explicacion:
          "Incorrecta. Reflejan insuficiencia uteroplacentaria crónica, un mecanismo distinto a la compresión mecánica del cordón por poco líquido amniótico.",
      },
      {
        letra: "B",
        texto: "Patrón sinusoidal",
        correcta: false,
        explicacion:
          "Incorrecta. Se asocia clásicamente a anemia fetal severa, no al oligohidramnios.",
      },
      {
        letra: "C",
        texto: "Desaceleraciones variables",
        correcta: true,
        explicacion:
          "Correcta. El poco líquido amniótico reduce el amortiguamiento del cordón umbilical, favoreciendo su compresión durante las contracciones y produciendo desaceleraciones variables.",
      },
      {
        letra: "D",
        texto: "Bradicardia fetal sostenida",
        correcta: false,
        explicacion:
          "Incorrecta. Sugiere un evento agudo catastrófico (por ejemplo, desprendimiento de placenta o prolapso de cordón), no el patrón típico esperado en oligohidramnios simple.",
      },
    ],
    perla:
      "El oligohidramnios reduce el 'colchón' de líquido que protege al cordón umbilical de la compresión, lo que explica su asociación característica con desaceleraciones variables en el monitoreo fetal.",
  },
  {
    tema: "Examen obstétrico",
    dificultad: "Baja",
    enunciado:
      "¿Cuál de las cuatro maniobras de Leopold permite determinar el grado de descenso de la cabeza fetal, incluyendo si ya alcanzó el nivel de las espinas ciáticas?",
    opciones: [
      {
        letra: "A",
        texto: "Primera maniobra",
        correcta: false,
        explicacion:
          "Incorrecta. Evalúa qué polo fetal ocupa el fondo uterino, no el grado de descenso de la presentación.",
      },
      {
        letra: "B",
        texto: "Segunda maniobra",
        correcta: false,
        explicacion:
          "Incorrecta. Ubica el dorso fetal (situación fetal), no evalúa el encajamiento.",
      },
      {
        letra: "C",
        texto: "Tercera maniobra",
        correcta: false,
        explicacion:
          "Incorrecta. Determina si el polo de presentación está libre o parcialmente encajado, pero no precisa el grado exacto respecto a las espinas ciáticas.",
      },
      {
        letra: "D",
        texto: "Cuarta maniobra",
        correcta: true,
        explicacion:
          "Correcta. Se realiza mirando hacia los pies de la paciente y evalúa el grado de encajamiento y descenso de la presentación, incluyendo si ya llegó a las espinas ciáticas.",
      },
      {
        letra: "E",
        texto: "Quinta maniobra",
        correcta: false,
        explicacion:
          "Incorrecta. No existe una quinta maniobra; el esquema clásico de Leopold contempla únicamente cuatro maniobras.",
      },
    ],
    perla:
      "Las cuatro maniobras de Leopold, en orden, evalúan: 1) polo en el fondo uterino, 2) situación y dorso fetal, 3) presentación y su movilidad, y 4) grado de encajamiento/descenso.",
  },
  {
    tema: "Diagnóstico de embarazo",
    dificultad: "Baja",
    enunciado:
      "En el examen bimanual de una gestante temprana, se percibe una flexión fácil del cuerpo uterino sobre el cérvix, debido al reblandecimiento del istmo. ¿Cómo se denomina este signo probable de embarazo?",
    opciones: [
      {
        letra: "A",
        texto: "Signo de Goodell",
        correcta: false,
        explicacion:
          "Incorrecta. Es el reblandecimiento del cérvix mismo, no la flexión entre cuerpo uterino y cérvix.",
      },
      {
        letra: "B",
        texto: "Signo de Chadwick",
        correcta: false,
        explicacion:
          "Incorrecta. Es la coloración violácea de la vagina y el cérvix por congestión vascular; no está relacionado con la flexibilidad uterina.",
      },
      {
        letra: "C",
        texto: "Signo de Hegar",
        correcta: true,
        explicacion:
          "Correcta. El reblandecimiento del istmo uterino permite justamente esa flexión fácil del cuerpo uterino sobre el cérvix, característica del signo de Hegar.",
      },
      {
        letra: "D",
        texto: "Signo de Noble-Budin",
        correcta: false,
        explicacion:
          "Incorrecta. Es el ensanchamiento palpable de los cuernos uterinos al tacto bimanual, no un signo de flexión cuerpo-cérvix.",
      },
      {
        letra: "E",
        texto: "Regla de Mac Donald",
        correcta: false,
        explicacion:
          "Incorrecta. Es una fórmula para estimar la edad gestacional a partir de la altura uterina, no un signo físico de flexión.",
      },
    ],
    perla:
      "Los signos probables de embarazo (Hegar, Goodell, Chadwick) reflejan cambios de consistencia y color en el útero y cérvix por el aumento del flujo vascular pélvico, pero ninguno confirma el embarazo por sí solo.",
  },
  {
    tema: "Complicaciones tempranas del embarazo",
    dificultad: "Media",
    enunciado:
      "Mujer de 26 años con retraso menstrual de 1 semana, menometrorragia de 24 horas y dolor pélvico leve. Beta-hCG de 3500 UI. La ecografía muestra engrosamiento endometrial de 14 mm, cuerpo lúteo normal, sin saco gestacional visible ni sangrado intraabdominal. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Aborto inminente",
        correcta: false,
        explicacion:
          "Incorrecta. Requiere un embarazo intrauterino ya confirmado por ecografía; aquí ni siquiera se visualiza un saco gestacional.",
      },
      {
        letra: "B",
        texto: "Embarazo ectópico",
        correcta: true,
        explicacion:
          "Correcta. Con una beta-hCG en el rango en que ya debería visualizarse un saco intrauterino y este no se observa, la sospecha principal es un embarazo ectópico (zona discriminatoria de hCG).",
      },
      {
        letra: "C",
        texto: "Aborto inevitable",
        correcta: false,
        explicacion:
          "Incorrecta. Requiere cérvix dilatado en el contexto de un embarazo intrauterino confirmado; no aplica aquí.",
      },
      {
        letra: "D",
        texto: "Amenaza de aborto",
        correcta: false,
        explicacion:
          "Incorrecta. Al igual que las otras opciones de aborto, necesita un saco gestacional intrauterino documentado, que en este caso no existe.",
      },
      {
        letra: "E",
        texto: "Enfermedad inflamatoria pélvica",
        correcta: false,
        explicacion:
          "Incorrecta. No explica la beta-hCG elevada, que es un marcador específico de embarazo.",
      },
    ],
    perla:
      "La 'zona discriminatoria' de beta-hCG (aproximadamente 1500-2000 UI en ecografía transvaginal) es el nivel a partir del cual debería visualizarse un saco gestacional intrauterino si el embarazo es normotópico; su ausencia obliga a descartar ectópico.",
  },
  {
    tema: "Urgencias obstétricas",
    dificultad: "Alta",
    enunciado:
      "Gestante de 36 semanas presenta contracciones uterinas intensas asociadas a signo de Frommel positivo (tensión dolorosa de los ligamentos redondos). ¿Cuál es el diagnóstico que debe sospecharse?",
    opciones: [
      {
        letra: "A",
        texto: "Vasa previa",
        correcta: false,
        explicacion:
          "Incorrecta. Se presenta con sangrado indoloro al romperse las membranas, sin relación con contracciones intensas ni tensión de ligamentos.",
      },
      {
        letra: "B",
        texto: "Rotura uterina inminente",
        correcta: true,
        explicacion:
          "Correcta. El signo de Frommel, junto con el anillo de Bandl, conforma el complejo clásico de alarma que precede a una rotura uterina.",
      },
      {
        letra: "C",
        texto: "Placenta previa",
        correcta: false,
        explicacion:
          "Incorrecta. Cursa con sangrado indoloro, sin hipertonía uterina ni tensión de los ligamentos redondos.",
      },
      {
        letra: "D",
        texto: "Desprendimiento prematuro de placenta",
        correcta: false,
        explicacion:
          "Incorrecta. Cursa con hipertonía y dolor uterino, pero el signo de Frommel no es un hallazgo característico de esta entidad.",
      },
      {
        letra: "E",
        texto: "Rotura uterina consumada",
        correcta: false,
        explicacion:
          "Incorrecta. Sería un evento ya completado, con cese de las contracciones, pérdida de la frecuencia cardíaca fetal y shock materno; los signos descritos son previos a la rotura, no posteriores a ella.",
      },
    ],
    perla:
      "El anillo de Bandl (retracción patológica del segmento) y el signo de Frommel (tensión de los ligamentos redondos) son señales de alarma de rotura uterina inminente, típicamente en trabajos de parto obstruidos.",
  },
  {
    tema: "Alumbramiento",
    dificultad: "Baja",
    enunciado:
      "¿Cuál de las siguientes características corresponde al alumbramiento tipo Duncan?",
    opciones: [
      {
        letra: "A",
        texto: "Se presenta característicamente en placentas de inserción central",
        correcta: false,
        explicacion:
          "Incorrecta. Es al revés: la inserción central y el desprendimiento por el centro son típicos del alumbramiento tipo Schultze.",
      },
      {
        letra: "B",
        texto: "No forma hematoma retroplacentario",
        correcta: true,
        explicacion:
          "Correcta. En el alumbramiento tipo Duncan la placenta se desprende por el borde, por lo que no se acumula sangre de forma central como hematoma retroplacentario.",
      },
      {
        letra: "C",
        texto: "La placenta sale mostrando su cara fetal",
        correcta: false,
        explicacion:
          "Incorrecta. Corresponde al alumbramiento tipo Schultze; en el Duncan la placenta sale mostrando su cara materna.",
      },
      {
        letra: "D",
        texto: "El sangrado aparece de forma tardía",
        correcta: false,
        explicacion:
          "Incorrecta. También es característico de Schultze (donde la sangre queda retenida detrás de la placenta); en Duncan el sangrado es más temprano y visible desde el inicio del desprendimiento.",
      },
      {
        letra: "E",
        texto: "Forma un hematoma retroplacentario",
        correcta: false,
        explicacion:
          "Incorrecta. Es justamente la característica opuesta, propia del mecanismo de Schultze.",
      },
    ],
    perla:
      "Mecanismo de Schultze: desprendimiento central, cara fetal visible, con hematoma retroplacentario y sangrado tardío. Mecanismo de Duncan: desprendimiento marginal, cara materna visible, sin hematoma, sangrado temprano.",
  },
  {
    tema: "Embarazo en vías de prolongación",
    dificultad: "Media",
    enunciado:
      "Gestante de 41 semanas con pruebas de bienestar fetal adecuadas. Al tacto vaginal: cérvix blando, anterior, dilatación 0, borramiento 50%, estación 0 (cérvix favorable según puntaje de Bishop). ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Inducir el parto directamente",
        correcta: true,
        explicacion:
          "Correcta. El cérvix ya es favorable (blando, anterior, con borramiento significativo), por lo que puede inducirse directamente sin necesidad de maduración cervical previa.",
      },
      {
        letra: "B",
        texto: "Repetir las pruebas de bienestar fetal en una semana",
        correcta: false,
        explicacion:
          "Incorrecta. Prolongar la vigilancia sin un plan de resolución aumenta el riesgo perinatal en un embarazo que ya alcanzó las 41 semanas.",
      },
      {
        letra: "C",
        texto: "Madurar el cérvix con misoprostol antes de inducir",
        correcta: false,
        explicacion:
          "Incorrecta. El cérvix ya es favorable, por lo que no requiere agentes madurantes; este es el error típico de confundir un cérvix favorable con uno desfavorable.",
      },
      {
        letra: "D",
        texto: "Programar una cesárea electiva",
        correcta: false,
        explicacion:
          "Incorrecta. No existe ninguna indicación obstétrica de cesárea en el caso descrito.",
      },
      {
        letra: "E",
        texto: "Continuar en observación sin definir una conducta",
        correcta: false,
        explicacion:
          "Incorrecta. Sin un plan claro de resolución, la observación indefinida no es apropiada en un embarazo en vías de prolongación que ya debe finalizar.",
      },
    ],
    perla:
      "El puntaje de Bishop resume la 'favorabilidad' del cérvix (dilatación, borramiento, consistencia, posición y estación); un cérvix favorable (Bishop alto) permite inducir directamente, sin pasar por maduración cervical previa.",
  },
  {
    tema: "Distocia de hombros",
    dificultad: "Alta",
    enunciado:
      "Durante un parto vaginal, tras la salida de la cabeza fetal esta se retrae contra el periné ('signo de la cabeza de tortuga'), sin lograr el desprendimiento de los hombros con la tracción habitual. ¿Cuál es la primera maniobra a realizar?",
    opciones: [
      {
        letra: "A",
        texto: "Maniobra de McRoberts o presión suprapúbica",
        correcta: true,
        explicacion:
          "Correcta. Ante distocia de hombros, el manejo escalonado inicia con maniobras de primer nivel: McRoberts (hiperflexión de caderas maternas) combinada con presión suprapúbica, antes de pasar a maniobras más invasivas.",
      },
      {
        letra: "B",
        texto: "Maniobra de Zavanelli de inmediato",
        correcta: false,
        explicacion:
          "Incorrecta. La maniobra de Zavanelli (recolocar la cabeza dentro del canal de parto y proceder a cesárea) es una medida de último recurso (tercer nivel), no la primera opción ante distocia de hombros.",
      },
      {
        letra: "C",
        texto: "Fractura deliberada de clavícula como primera medida",
        correcta: false,
        explicacion:
          "Incorrecta. La fractura deliberada de clavícula es una medida de tercer nivel, reservada para cuando fallan las maniobras iniciales y las de segundo nivel.",
      },
      {
        letra: "D",
        texto: "Cesárea inmediata sin intentar maniobras vaginales",
        correcta: false,
        explicacion:
          "Incorrecta. Una vez que la cabeza fetal ya salió por vía vaginal, no se puede proceder directamente a cesárea; el manejo escalonado de maniobras es el protocolo estándar.",
      },
    ],
    perla:
      "Manejo escalonado de la distocia de hombros: 1er nivel — McRoberts o presión suprapúbica; 2do nivel — maniobra de Woods (sacacorchos), Rubin o Gaskin (posición de manos y rodillas); 3er nivel — maniobra de Zavanelli o fractura deliberada de clavícula.",
  },
  {
    tema: "Trastornos hipertensivos del embarazo",
    dificultad: "Media",
    enunciado:
      "Gestante con preeclampsia severa (PA 160/110 mmHg) requiere manejo antihipertensivo agudo. Según el MINSA, ¿cuál es el fármaco de primera línea?",
    opciones: [
      {
        letra: "A",
        texto: "Nifedipino vía oral",
        correcta: true,
        explicacion:
          "Correcta. Según las guías del MINSA, el manejo antihipertensivo de primera línea en preeclampsia severa es el nifedipino por vía oral, con eficacia comparable al labetalol endovenoso.",
      },
      {
        letra: "B",
        texto: "Metildopa",
        correcta: false,
        explicacion:
          "Incorrecta. La metildopa se reserva para el manejo de la hipertensión crónica en el embarazo (control a más largo plazo), no como manejo agudo de primera línea en preeclampsia severa.",
      },
      {
        letra: "C",
        texto: "Enalapril",
        correcta: false,
        explicacion:
          "Incorrecta. Los IECA como el enalapril están contraindicados durante el embarazo por su teratogenicidad (afectan el desarrollo renal fetal), independientemente del contexto de preeclampsia.",
      },
      {
        letra: "D",
        texto: "Losartán",
        correcta: false,
        explicacion:
          "Incorrecta. Los ARA-II como el losartán también están contraindicados en el embarazo por su teratogenicidad, similar a los IECA.",
      },
    ],
    perla:
      "En preeclampsia severa, el nifedipino oral (con eficacia comparable al labetalol EV según el MINSA) es de primera línea para el manejo antihipertensivo agudo; recuerda que esto se suma, no reemplaza, al sulfato de magnesio como neuroprofilaxis contra eclampsia.",
  },
  {
    tema: "Mecanismo del parto",
    dificultad: "Media",
    enunciado:
      "En un parto en variedad de posición occipital anterior, ¿cuál es el primer movimiento cardinal del mecanismo del parto y qué diámetro fetal permite reducir?",
    opciones: [
      {
        letra: "A",
        texto: "Flexión; reduce el diámetro occipitofrontal al suboccipitobregmático",
        correcta: true,
        explicacion:
          "Correcta. El primer movimiento cardinal es la flexión de la cabeza fetal, que permite que el diámetro occipitofrontal (12 cm) se reduzca al diámetro suboccipitobregmático (9.5 cm), más favorable para el descenso a través del canal del parto.",
      },
      {
        letra: "B",
        texto: "Rotación interna; convierte la variedad occipitoilíaca en occipitopúbica",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque la rotación interna sí ocurre en la secuencia del mecanismo del parto, es el segundo movimiento cardinal, no el primero.",
      },
      {
        letra: "C",
        texto: "Extensión; ocurre para permitir la salida de la cabeza fetal por el introito",
        correcta: false,
        explicacion:
          "Incorrecta. La extensión es el tercer movimiento cardinal (ocurre tras la flexión y la rotación interna), no el primero.",
      },
      {
        letra: "D",
        texto: "Rotación externa; permite la salida de los hombros",
        correcta: false,
        explicacion:
          "Incorrecta. La rotación externa es el cuarto movimiento cardinal, previo a la salida de los hombros, no el primero de la secuencia.",
      },
    ],
    perla:
      "Secuencia de los movimientos cardinales del parto en variedad occipital anterior: 1) flexión, 2) rotación interna (de occipitoilíaca a occipitopúbica), 3) extensión, 4) rotación externa, 5) salida de los hombros.",
  },
];

const PSIQUIATRIA_QUESTIONS = [
  {
    tema: "Esquizofrenia y antipsicóticos",
    dificultad: "Alta",
    enunciado:
      "Varón de 30 años con esquizofrenia, en tratamiento con haloperidol, es traído a emergencia por rigidez muscular generalizada, temperatura de 40°C, alteración del estado de conciencia y diaforesis profusa. Los exámenes muestran CPK muy elevada. ¿Cuál es el manejo más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Suspender el antipsicótico e iniciar hidratación agresiva junto con bromocriptina o dantroleno",
        correcta: true,
        explicacion:
          "Correcta. El cuadro es compatible con síndrome neuroléptico maligno, una emergencia que se maneja suspendiendo el antipsicótico, con hidratación intensiva y agentes como bromocriptina (agonista dopaminérgico) o dantroleno (relajante muscular).",
      },
      {
        letra: "B",
        texto: "Aumentar la dosis de haloperidol para controlar la agitación",
        correcta: false,
        explicacion:
          "Incorrecta. Aumentar el antipsicótico empeoraría el cuadro, ya que el síndrome neuroléptico maligno es precipitado precisamente por el bloqueo dopaminérgico de estos fármacos.",
      },
      {
        letra: "C",
        texto: "Cambiar a otro antipsicótico de alta potencia de inmediato",
        correcta: false,
        explicacion:
          "Incorrecta. Cualquier antipsicótico con bloqueo dopaminérgico puede perpetuar el cuadro; la prioridad es suspender el fármaco causante, no sustituirlo por otro similar.",
      },
      {
        letra: "D",
        texto: "Iniciar benzodiazepinas como único tratamiento",
        correcta: false,
        explicacion:
          "Incorrecta. Las benzodiazepinas pueden usarse como manejo sintomático de la agitación, pero no son el tratamiento específico del síndrome neuroléptico maligno; no reemplazan la suspensión del antipsicótico ni los agentes dirigidos.",
      },
    ],
    perla:
      "El síndrome neuroléptico maligno (rigidez, hipertermia, alteración de conciencia, CPK elevada) es la complicación más grave de los antipsicóticos, con mayor riesgo asociado a agentes de alta potencia como el haloperidol; el manejo específico incluye bromocriptina o dantroleno.",
  },
  {
    tema: "Trastornos bipolares",
    dificultad: "Media",
    enunciado:
      "Mujer de 24 años presenta desde hace 5 días ánimo elevado, disminución de la necesidad de sueño, fuga de ideas, aumento de la actividad y gasto excesivo de dinero, sin síntomas psicóticos y sin requerir hospitalización. ¿Cómo se clasifica este episodio?",
    opciones: [
      {
        letra: "A",
        texto: "Episodio maniaco",
        correcta: false,
        explicacion:
          "Incorrecta. La manía requiere una duración mínima de una semana (o cualquier duración si hay hospitalización o síntomas psicóticos) y causa deterioro funcional severo; este episodio de 5 días sin hospitalización ni psicosis no cumple esos criterios.",
      },
      {
        letra: "B",
        texto: "Episodio hipomaniaco",
        correcta: true,
        explicacion:
          "Correcta. La hipomanía requiere una duración mínima de 4 días consecutivos (a diferencia de los 7 días de la manía), sin causar deterioro funcional severo, psicosis, ni requerir hospitalización; estos 5 días cumplen el mínimo de hipomanía pero no alcanzan la semana completa exigida para manía.",
      },
      {
        letra: "C",
        texto: "Episodio mixto",
        correcta: false,
        explicacion:
          "Incorrecta. Un episodio mixto implica síntomas de manía y depresión simultáneos o en rápida sucesión; en este caso solo se describen síntomas de polaridad elevada.",
      },
      {
        letra: "D",
        texto: "Ciclotimia",
        correcta: false,
        explicacion:
          "Incorrecta. La ciclotimia requiere síntomas hipomaniacos y depresivos subumbral durante al menos 2 años, sin cumplir criterios completos de un episodio; aquí se describe un único episodio bien definido.",
      },
    ],
    perla:
      "La distinción entre manía e hipomanía se basa en duración y severidad: la manía dura ≥1 semana (o cualquier duración si hay hospitalización o psicosis) y causa deterioro funcional marcado; la hipomanía es más breve y no compromete significativamente el funcionamiento.",
  },
  {
    tema: "Trastornos depresivos",
    dificultad: "Baja",
    enunciado:
      "Varón de 45 años presenta ánimo deprimido, anhedonia, insomnio, fatiga y dificultad para concentrarse durante las últimas 3 semanas, sin antecedentes de episodios de manía o hipomanía. ¿Cuál es el tratamiento de primera línea más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Inhibidor selectivo de la recaptación de serotonina (ISRS)",
        correcta: true,
        explicacion:
          "Correcta. Los ISRS son el tratamiento farmacológico de primera línea para el trastorno depresivo mayor por su buen perfil de eficacia y tolerabilidad frente a otras clases de antidepresivos.",
      },
      {
        letra: "B",
        texto: "Litio en monoterapia",
        correcta: false,
        explicacion:
          "Incorrecta. El litio se utiliza principalmente como estabilizador del ánimo en trastorno bipolar; no es tratamiento de primera línea en depresión unipolar sin antecedente de manía o hipomanía.",
      },
      {
        letra: "C",
        texto: "Antipsicótico de alta potencia en monoterapia",
        correcta: false,
        explicacion:
          "Incorrecta. Los antipsicóticos se reservan para depresión con síntomas psicóticos o como potenciadores en casos resistentes, no como primera línea en depresión mayor no complicada.",
      },
      {
        letra: "D",
        texto: "Benzodiazepinas en monoterapia prolongada",
        correcta: false,
        explicacion:
          "Incorrecta. Las benzodiazepinas no tratan el trastorno depresivo de fondo y su uso prolongado conlleva riesgo de dependencia; no son tratamiento de primera línea para depresión.",
      },
    ],
    perla:
      "Antes de iniciar un antidepresivo en un episodio depresivo, siempre se debe descartar un antecedente de manía o hipomanía, ya que los antidepresivos en monoterapia pueden precipitar un episodio maniaco en un paciente con trastorno bipolar no diagnosticado.",
  },
  {
    tema: "Trastornos de ansiedad",
    dificultad: "Media",
    enunciado:
      "Mujer de 29 años presenta episodios súbitos de palpitaciones, disnea, sudoración y sensación de muerte inminente, de inicio brusco y resolución en menos de 30 minutos, seguidos de miedo persistente a que se repitan. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Trastorno de pánico",
        correcta: true,
        explicacion:
          "Correcta. Los episodios súbitos y autolimitados de síntomas autonómicos intensos con miedo a morir, seguidos de ansiedad anticipatoria a nuevos episodios, son característicos del trastorno de pánico.",
      },
      {
        letra: "B",
        texto: "Trastorno de ansiedad generalizada",
        correcta: false,
        explicacion:
          "Incorrecta. El trastorno de ansiedad generalizada se caracteriza por preocupación excesiva y persistente sobre múltiples áreas, no por episodios súbitos y discretos como los descritos.",
      },
      {
        letra: "C",
        texto: "Fobia social",
        correcta: false,
        explicacion:
          "Incorrecta. La fobia social implica ansiedad marcada en situaciones de exposición social o evaluación por otros, no episodios espontáneos como los descritos en el caso.",
      },
      {
        letra: "D",
        texto: "Trastorno de estrés postraumático",
        correcta: false,
        explicacion:
          "Incorrecta. Requiere exposición a un evento traumático específico con reexperimentación, evitación e hiperactivación relacionadas a dicho evento, lo cual no se describe en este caso.",
      },
    ],
    perla:
      "El tratamiento de primera línea del trastorno de pánico combina ISRS o ISRN a largo plazo con terapia cognitivo-conductual; las benzodiazepinas pueden usarse a corto plazo para el control agudo de crisis, pero no como monoterapia prolongada.",
  },
  {
    tema: "Trastorno obsesivo compulsivo",
    dificultad: "Media",
    enunciado:
      "Varón de 26 años refiere pensamientos recurrentes e intrusivos sobre contaminación que le generan gran ansiedad, por lo que se lava las manos repetidamente durante horas al día, reconociendo que esto es excesivo pero sintiéndose incapaz de detenerse. ¿Cuál es el tratamiento de primera línea?",
    opciones: [
      {
        letra: "A",
        texto: "ISRS a dosis altas junto con terapia de exposición y prevención de respuesta",
        correcta: true,
        explicacion:
          "Correcta. El trastorno obsesivo compulsivo se trata de primera línea con ISRS, generalmente a dosis más altas que en depresión, combinados con terapia cognitivo-conductual específica de exposición y prevención de respuesta.",
      },
      {
        letra: "B",
        texto: "Antipsicóticos en monoterapia",
        correcta: false,
        explicacion:
          "Incorrecta. Los antipsicóticos se reservan como potenciadores en casos de TOC resistente a ISRS, no como monoterapia de primera línea.",
      },
      {
        letra: "C",
        texto: "Benzodiazepinas de forma continua",
        correcta: false,
        explicacion:
          "Incorrecta. Las benzodiazepinas no son eficaces como tratamiento específico del TOC y no abordan el mecanismo subyacente del trastorno.",
      },
      {
        letra: "D",
        texto: "Psicoterapia psicodinámica exclusivamente",
        correcta: false,
        explicacion:
          "Incorrecta. La evidencia respalda específicamente la terapia cognitivo-conductual de exposición y prevención de respuesta, no la psicoterapia psicodinámica, como abordaje psicoterapéutico de elección en TOC.",
      },
    ],
    perla:
      "A diferencia de la depresión, el TOC suele requerir dosis más altas de ISRS y un periodo de respuesta más prolongado (hasta 10-12 semanas) antes de considerar el tratamiento inefectivo.",
  },
  {
    tema: "TDAH",
    dificultad: "Baja",
    enunciado:
      "Niño de 8 años presenta dificultad para mantener la atención, se distrae fácilmente, pierde objetos con frecuencia e interrumpe a otros constantemente, tanto en el colegio como en casa, desde antes de los 6 años. ¿Cuál es el tratamiento farmacológico de primera línea si se confirma el diagnóstico?",
    opciones: [
      {
        letra: "A",
        texto: "Estimulantes como metilfenidato",
        correcta: true,
        explicacion:
          "Correcta. Los estimulantes (metilfenidato o anfetaminas) son el tratamiento farmacológico de primera línea para el TDAH, con la mayor evidencia de eficacia en el control de los síntomas centrales.",
      },
      {
        letra: "B",
        texto: "Antipsicóticos atípicos",
        correcta: false,
        explicacion:
          "Incorrecta. Los antipsicóticos no son tratamiento de primera línea para el TDAH; se reservan para otras indicaciones o para el manejo de comorbilidades específicas.",
      },
      {
        letra: "C",
        texto: "Benzodiazepinas",
        correcta: false,
        explicacion:
          "Incorrecta. Las benzodiazepinas no tienen un rol en el tratamiento del TDAH y pueden incluso empeorar la atención y el rendimiento cognitivo.",
      },
      {
        letra: "D",
        texto: "Litio",
        correcta: false,
        explicacion:
          "Incorrecta. El litio no es un tratamiento estándar para el TDAH; su uso principal es en el trastorno bipolar.",
      },
    ],
    perla:
      "El diagnóstico de TDAH requiere que los síntomas estén presentes antes de los 12 años y se manifiesten en al menos dos entornos distintos (por ejemplo, escuela y hogar), lo que ayuda a diferenciarlo de un problema situacional aislado.",
  },
  {
    tema: "Conducta suicida",
    dificultad: "Alta",
    enunciado:
      "Mujer de 35 años con antecedente de depresión mayor acude a consulta y refiere pensamientos frecuentes de que 'no vale la pena seguir viviendo', sin un plan concreto. ¿Cuál es la conducta más adecuada del médico?",
    opciones: [
      {
        letra: "A",
        texto: "Evaluar activamente el riesgo suicida: ideación, plan, medios disponibles y factores de riesgo/protección",
        correcta: true,
        explicacion:
          "Correcta. Ante cualquier mención de ideación suicida, la conducta correcta es realizar una evaluación activa y directa del riesgo (intensidad de la ideación, existencia de plan, acceso a medios letales, intentos previos, y factores protectores), sin minimizar el comentario.",
      },
      {
        letra: "B",
        texto: "Evitar preguntar directamente por el suicidio para no 'darle la idea' a la paciente",
        correcta: false,
        explicacion:
          "Incorrecta. Preguntar directamente sobre ideación suicida no aumenta el riesgo; por el contrario, no explorarlo activamente puede llevar a subestimar un riesgo real.",
      },
      {
        letra: "C",
        texto: "Indicar que regrese a control en un mes para reevaluar",
        correcta: false,
        explicacion:
          "Incorrecta. Ante ideación suicida activa, postergar la evaluación y el seguimiento cercano no es seguro; se requiere una valoración de riesgo inmediata y un plan de seguimiento más estrecho.",
      },
      {
        letra: "D",
        texto: "Recetar un ansiolítico y finalizar la consulta sin más evaluación",
        correcta: false,
        explicacion:
          "Incorrecta. La medicación por sí sola no reemplaza la evaluación estructurada del riesgo suicida ni la definición de un plan de seguridad.",
      },
    ],
    perla:
      "La evaluación del riesgo suicida siempre debe ser activa y directa: preguntar explícitamente sobre ideación, plan y acceso a medios no incrementa el riesgo, y permite identificar a quienes necesitan intervención inmediata (hospitalización, retiro de medios letales, seguimiento cercano).",
  },
  {
    tema: "Delirium",
    dificultad: "Media",
    enunciado:
      "Varón de 78 años, hospitalizado por una infección urinaria, presenta desde ayer fluctuaciones en el nivel de conciencia, desorientación en tiempo y lugar, y alucinaciones visuales, con empeoramiento notorio durante la noche. Antes de la hospitalización no tenía estos síntomas. ¿Cuál es el diagnóstico más probable y el paso más importante en su manejo?",
    opciones: [
      {
        letra: "A",
        texto: "Delirium; identificar y tratar la causa subyacente (en este caso, la infección)",
        correcta: true,
        explicacion:
          "Correcta. El inicio agudo, el curso fluctuante y la alteración de la conciencia son característicos de delirium; el manejo prioritario es identificar y tratar la causa desencadenante, en este caso probablemente la infección urinaria.",
      },
      {
        letra: "B",
        texto: "Demencia de inicio reciente; iniciar un inhibidor de la acetilcolinesterasa",
        correcta: false,
        explicacion:
          "Incorrecta. La demencia tiene un curso crónico y progresivo, sin fluctuación marcada ni alteración primaria de la conciencia; el inicio agudo en el contexto de una infección aguda es más compatible con delirium.",
      },
      {
        letra: "C",
        texto: "Esquizofrenia de inicio tardío; iniciar antipsicóticos como tratamiento principal",
        correcta: false,
        explicacion:
          "Incorrecta. La esquizofrenia de inicio en la vejez es poco frecuente y no explicaría el curso fluctuante ni el contexto de una infección aguda concurrente; los antipsicóticos podrían usarse solo como manejo sintomático transitorio, no como tratamiento principal.",
      },
      {
        letra: "D",
        texto: "Depresión con síntomas psicóticos; iniciar antidepresivos de inmediato",
        correcta: false,
        explicacion:
          "Incorrecta. El cuadro no describe síntomas depresivos predominantes, y la fluctuación del nivel de conciencia no es típica de la depresión; el contexto clínico apunta a una causa orgánica aguda.",
      },
    ],
    perla:
      "El delirium se distingue de la demencia por su inicio agudo, curso fluctuante (típicamente peor por las noches) y alteración primaria del nivel de conciencia; siempre debe buscarse activamente una causa subyacente tratable (infecciones, fármacos, alteraciones metabólicas).",
  },
  {
    tema: "Trastornos del pensamiento",
    dificultad: "Media",
    enunciado:
      "Varón de 26 años en un episodio maniaco presenta un discurso acelerado, con saltos bruscos de un tema a otro apenas conectados entre sí, hablando sin parar y distrayéndose con cualquier estímulo externo del entorno. ¿Cómo se denomina esta alteración del curso del pensamiento?",
    opciones: [
      {
        letra: "A",
        texto: "Fuga de ideas",
        correcta: true,
        explicacion:
          "Correcta. La fuga de ideas se caracteriza por un pensamiento que salta bruscamente de un tema a otro, con flujo casi continuo, alta distractibilidad ante estímulos externos y facilidad asociativa; es típica de los episodios maniacos.",
      },
      {
        letra: "B",
        texto: "Bradipsiquia",
        correcta: false,
        explicacion:
          "Incorrecta. La bradipsiquia es lo opuesto: un pensamiento inhibido y enlentecido, con discurso escaso, característico de episodios depresivos, no maniacos.",
      },
      {
        letra: "C",
        texto: "Bloqueo del pensamiento",
        correcta: false,
        explicacion:
          "Incorrecta. El bloqueo del pensamiento es una interrupción súbita del discurso antes de completar una idea, típicamente asociado a alucinaciones auditivas en esquizofrenia, no a la aceleración descrita aquí.",
      },
      {
        letra: "D",
        texto: "Pensamiento circunstancial",
        correcta: false,
        explicacion:
          "Incorrecta. El pensamiento circunstancial se caracteriza por exceso de detalles innecesarios y dificultad para discernir lo esencial de lo accesorio, pero manteniendo la conexión lógica entre ideas, sin la aceleración ni los saltos bruscos descritos.",
      },
    ],
    perla:
      "La fuga de ideas (pensamiento acelerado, saltos temáticos, distractibilidad) es característica de la manía; el bloqueo del pensamiento sugiere esquizofrenia; la bradipsiquia sugiere depresión. El contexto clínico ayuda a diferenciarlos.",
  },
  {
    tema: "Demencias",
    dificultad: "Media",
    enunciado:
      "Mujer de 78 años presenta deterioro cognitivo progresivo de 3 años de evolución, con pérdida de memoria reciente como síntoma predominante. ¿Cuál es la causa más frecuente de demencia en la población general?",
    opciones: [
      {
        letra: "A",
        texto: "Enfermedad de Alzheimer",
        correcta: true,
        explicacion:
          "Correcta. La enfermedad de Alzheimer es la causa más frecuente de demencia, representando entre el 50-70% de los casos; histopatológicamente se caracteriza por placas seniles (depósito de sustancia amiloide, tóxica para las neuronas) y ovillos neurofibrilares (proteína tau hiperfosforilada).",
      },
      {
        letra: "B",
        texto: "Demencia vascular",
        correcta: false,
        explicacion:
          "Incorrecta. La demencia vascular es la segunda causa más frecuente, y con frecuencia coexiste con el Alzheimer, pero no es la causa aislada más común.",
      },
      {
        letra: "C",
        texto: "Demencia por cuerpos de Lewy",
        correcta: false,
        explicacion:
          "Incorrecta. Es la siguiente en frecuencia después de la demencia vascular, pero considerablemente menos común que el Alzheimer.",
      },
      {
        letra: "D",
        texto: "Demencia frontotemporal",
        correcta: false,
        explicacion:
          "Incorrecta. Es una causa relativamente infrecuente de demencia en la población general, aunque relevante en pacientes de inicio más temprano (antes de los 65 años).",
      },
    ],
    perla:
      "Orden de frecuencia de las demencias: Alzheimer (más frecuente) > vascular > cuerpos de Lewy > frontotemporal > enfermedad de Creutzfeldt-Jakob (mucho menos frecuente).",
  },
  {
    tema: "Demencias",
    dificultad: "Alta",
    enunciado:
      "Varón de 74 años presenta deterioro cognitivo fluctuante, alucinaciones visuales recurrentes y bien formadas, y parkinsonismo (rigidez y bradicinesia) que aparece aproximadamente al mismo tiempo que los síntomas cognitivos. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Demencia con cuerpos de Lewy",
        correcta: true,
        explicacion:
          "Correcta. Las alucinaciones visuales recurrentes y bien formadas son un síntoma nuclear (core) de la demencia con cuerpos de Lewy, junto con la fluctuación cognitiva y el parkinsonismo que aparece cerca del inicio del deterioro cognitivo (a diferencia de la demencia por Parkinson, donde el parkinsonismo precede al deterioro cognitivo por años).",
      },
      {
        letra: "B",
        texto: "Enfermedad de Alzheimer",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque el Alzheimer puede asociarse a delirios y alucinaciones en etapas avanzadas, no es el síntoma nuclear temprano ni se acompaña típicamente de parkinsonismo ni de fluctuación cognitiva marcada.",
      },
      {
        letra: "C",
        texto: "Demencia frontotemporal",
        correcta: false,
        explicacion:
          "Incorrecta. La demencia frontotemporal se caracteriza principalmente por cambios de comportamiento (apatía, impulsividad, conducta social inapropiada) o alteraciones del lenguaje, no por alucinaciones visuales como síntoma nuclear.",
      },
      {
        letra: "D",
        texto: "Demencia vascular",
        correcta: false,
        explicacion:
          "Incorrecta. La demencia vascular se relaciona con eventos isquémicos y suele tener un curso escalonado asociado a factores de riesgo cerebrovascular, sin las alucinaciones visuales tempranas como característica nuclear.",
      },
    ],
    perla:
      "Síntomas nucleares (core) de la demencia con cuerpos de Lewy: fluctuación cognitiva, alucinaciones visuales recurrentes bien formadas, y parkinsonismo espontáneo. Si el parkinsonismo precede al deterioro cognitivo por más de un año, se prefiere el diagnóstico de demencia asociada a enfermedad de Parkinson.",
  },
  {
    tema: "Demencias",
    dificultad: "Media",
    enunciado:
      "Varón de 62 años presenta cambios de personalidad progresivos: apatía, desinhibición social, impulsividad y conductas socialmente inapropiadas, con relativa preservación de la memoria en las etapas iniciales. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Demencia frontotemporal",
        correcta: true,
        explicacion:
          "Correcta. La demencia frontotemporal se caracteriza inicialmente por cambios de comportamiento y personalidad (apatía, desinhibición, impulsividad, conducta social inapropiada), con relativa preservación de la memoria episódica en etapas tempranas, a diferencia del Alzheimer.",
      },
      {
        letra: "B",
        texto: "Enfermedad de Alzheimer",
        correcta: false,
        explicacion:
          "Incorrecta. El Alzheimer se presenta típicamente con pérdida de memoria reciente como síntoma inicial predominante, no con cambios de personalidad y comportamiento como manifestación principal temprana.",
      },
      {
        letra: "C",
        texto: "Demencia vascular",
        correcta: false,
        explicacion:
          "Incorrecta. La demencia vascular suele tener un curso escalonado relacionado con eventos cerebrovasculares, con déficits focales según el territorio afectado, no un patrón predominante de cambios conductuales frontales.",
      },
      {
        letra: "D",
        texto: "Delirium",
        correcta: false,
        explicacion:
          "Incorrecta. El delirium es de inicio agudo y curso fluctuante con alteración de la conciencia, un cuadro completamente distinto al deterioro progresivo y crónico descrito.",
      },
    ],
    perla:
      "La demencia frontotemporal suele debutar antes que el Alzheimer típico (a menudo entre los 45-65 años) y se manifiesta primero con cambios de conducta y personalidad, mientras que la memoria se preserva relativamente en las etapas iniciales.",
  },
  {
    tema: "Demencias",
    dificultad: "Media",
    enunciado:
      "Mujer de 80 años con antecedente de un accidente cerebrovascular hace 6 meses presenta, desde entonces, ánimo deprimido persistente. ¿Cuál de las siguientes afirmaciones sobre la relación entre demencia y depresión es correcta?",
    opciones: [
      {
        letra: "A",
        texto: "La demencia vascular y la enfermedad de Alzheimer se asocian con mayor frecuencia a depresión que otros tipos de demencia",
        correcta: true,
        explicacion:
          "Correcta. La demencia vascular y la enfermedad de Alzheimer muestran una asociación particularmente fuerte con la depresión en comparación con otros tipos de demencia; la depresión post-ACV es común, presentándose en aproximadamente el 21.6% de los casos.",
      },
      {
        letra: "B",
        texto: "La depresión nunca precede al diagnóstico de demencia",
        correcta: false,
        explicacion:
          "Incorrecta. Los síntomas neuropsiquiátricos, incluida la depresión, pueden preceder al diagnóstico formal de demencia y son frecuentes incluso en el deterioro cognitivo leve, además de aumentar el riesgo de progresión a demencia.",
      },
      {
        letra: "C",
        texto: "La tristeza en el adulto mayor debe considerarse siempre parte normal del envejecimiento",
        correcta: false,
        explicacion:
          "Incorrecta. La senectud no implica necesariamente tristeza; un estado de ánimo depresivo persistente en el adulto mayor debe evaluarse activamente y no normalizarse simplemente por la edad.",
      },
      {
        letra: "D",
        texto: "La depresión y la demencia son mutuamente excluyentes: si hay una, no puede haber la otra",
        correcta: false,
        explicacion:
          "Incorrecta. Ambas condiciones pueden coexistir y la depresión puede incluso contribuir al desarrollo o empeoramiento de los problemas cognitivos en la demencia.",
      },
    ],
    perla:
      "Los tres problemas neuropsiquiátricos más frecuentes en pacientes con demencia son depresión, delirium y psicosis; el riesgo de delirium está aumentado de 2 a 5 veces en pacientes con un trastorno neurocognitivo mayor.",
  },
  {
    tema: "Trastornos de personalidad",
    dificultad: "Media",
    enunciado:
      "Varón de 24 años tiene un patrón persistente, desde antes de los 15 años, de mentir repetidamente, manipular a otros para beneficio propio, violar normas sociales y mostrar desprecio por los derechos ajenos, sin remordimiento aparente. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Trastorno antisocial de la personalidad",
        correcta: true,
        explicacion:
          "Correcta. El trastorno antisocial de la personalidad se caracteriza por un patrón persistente de desprecio y violación de los derechos de los demás, con antecedente de conducta disruptiva desde antes de los 15 años; suele acompañarse de manipulación, engaño y ausencia de remordimiento.",
      },
      {
        letra: "B",
        texto: "Trastorno límite de la personalidad",
        correcta: false,
        explicacion:
          "Incorrecta. El trastorno límite se caracteriza principalmente por inestabilidad en las relaciones interpersonales, la autoimagen y el afecto, no por un patrón central de violación deliberada de los derechos de otros.",
      },
      {
        letra: "C",
        texto: "Trastorno narcisista de la personalidad",
        correcta: false,
        explicacion:
          "Incorrecta. El trastorno narcisista se centra en un patrón de grandiosidad, necesidad de admiración y falta de empatía, sin el componente central de violación de normas sociales y derechos ajenos desde la adolescencia.",
      },
      {
        letra: "D",
        texto: "Trastorno histriónico de la personalidad",
        correcta: false,
        explicacion:
          "Incorrecta. El trastorno histriónico se caracteriza por emotividad excesiva y búsqueda de atención, no por el patrón de engaño y violación de derechos descrito en este caso.",
      },
    ],
    perla:
      "El trastorno antisocial de la personalidad requiere evidencia de trastorno de conducta antes de los 15 años como criterio diagnóstico; solo puede diagnosticarse formalmente a partir de los 18 años.",
  },
  {
    tema: "Trastornos de personalidad",
    dificultad: "Media",
    enunciado:
      "Mujer de 26 años presenta un patrón de relaciones interpersonales inestables e intensas, autoimagen marcadamente inestable, cambios emocionales abruptos, e impulsividad; durante episodios de ira intensa refiere no recordar parte de lo ocurrido. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Trastorno límite de la personalidad",
        correcta: true,
        explicacion:
          "Correcta. El trastorno límite (borderline) de la personalidad se caracteriza por inestabilidad en las relaciones interpersonales, la autoimagen y los afectos, junto con impulsividad marcada; es más frecuente en mujeres, y puede acompañarse de síntomas disociativos transitorios relacionados con el estrés, especialmente durante episodios de ira intensa.",
      },
      {
        letra: "B",
        texto: "Trastorno antisocial de la personalidad",
        correcta: false,
        explicacion:
          "Incorrecta. El trastorno antisocial se centra en la violación de derechos ajenos y el engaño deliberado, no en la inestabilidad afectiva y de la autoimagen descrita, y es más frecuente en varones.",
      },
      {
        letra: "C",
        texto: "Trastorno esquizotípico de la personalidad",
        correcta: false,
        explicacion:
          "Incorrecta. El trastorno esquizotípico se caracteriza por déficits sociales agudos, distorsiones cognitivas o perceptuales y excentricidades del comportamiento, un cuadro distinto al descrito.",
      },
      {
        letra: "D",
        texto: "Trastorno de la personalidad por evitación",
        correcta: false,
        explicacion:
          "Incorrecta. El trastorno por evitación se caracteriza por inhibición social, sentimientos de inadecuación e hipersensibilidad a la evaluación negativa, no por la inestabilidad afectiva e impulsividad descritas.",
      },
    ],
    perla:
      "El trastorno límite de la personalidad es más frecuente en mujeres y puede cursar con síntomas disociativos transitorios relacionados con el estrés (por ejemplo, amnesia parcial durante episodios de ira intensa), que se resuelven cuando cede el estrés agudo.",
  },
  {
    tema: "Trastorno obsesivo compulsivo",
    dificultad: "Alta",
    enunciado:
      "Dos pacientes presentan rigidez, necesidad de orden y perfeccionismo excesivo. El primero reconoce que sus pensamientos intrusivos y rituales le generan malestar y desearía no tenerlos. El segundo considera que su meticulosidad y control son simplemente su forma de ser, sin percibirlos como un problema. ¿Cómo se diferencian estas dos presentaciones?",
    opciones: [
      {
        letra: "A",
        texto: "El primero es egodistónico (TOC); el segundo es egosintónico (trastorno obsesivo-compulsivo de la personalidad)",
        correcta: true,
        explicacion:
          "Correcta. El trastorno obsesivo-compulsivo (TOC) es egodistónico: el paciente reconoce sus obsesiones y compulsiones como intrusivas, no deseadas y generadoras de malestar. El trastorno obsesivo-compulsivo de la personalidad (TOCP) es egosintónico: el paciente percibe su rigidez, orden y perfeccionismo como parte natural de su personalidad, sin generar el mismo malestar subjetivo.",
      },
      {
        letra: "B",
        texto: "Ambos son la misma entidad con distinta gravedad",
        correcta: false,
        explicacion:
          "Incorrecta. El TOC y el TOCP son entidades diagnósticas distintas (un trastorno de ansiedad/obsesivo-compulsivo vs. un trastorno de personalidad), no una misma condición con diferente intensidad.",
      },
      {
        letra: "C",
        texto: "El primero es egosintónico y el segundo egodistónico",
        correcta: false,
        explicacion:
          "Incorrecta. Es al revés: el TOC (primer paciente, con malestar por sus síntomas) es egodistónico, mientras que el TOCP (segundo paciente, sin percepción de problema) es egosintónico.",
      },
      {
        letra: "D",
        texto: "La diferencia se basa únicamente en la edad de inicio de los síntomas",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque ambas condiciones pueden tener patrones de edad de inicio distintos, la diferencia conceptual clave entre TOC y TOCP es la relación egodistónica vs. egosintónica del paciente con sus síntomas, no simplemente la edad de inicio.",
      },
    ],
    perla:
      "Egodistónico vs. egosintónico es una distinción clave en psiquiatría: egodistónico significa que el síntoma es percibido como ajeno al yo y genera malestar (típico del TOC); egosintónico significa que el rasgo se experimenta como parte coherente de la propia personalidad, sin generar el mismo malestar subjetivo (típico de los trastornos de personalidad, incluido el TOCP).",
  },
];

const REUMATOLOGIA_QUESTIONS = [
  {
    tema: "Lupus eritematoso sistémico",
    dificultad: "Alta",
    enunciado:
      "Mujer de 29 años con lupus eritematoso sistémico presenta hemorragia alveolar difusa confirmada por broncoscopía, con caída súbita de la hemoglobina y disnea progresiva. ¿Cuál es el manejo más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Pulsos de metilprednisolona a dosis altas",
        correcta: true,
        explicacion:
          "Correcta. Ante manifestaciones de lupus que comprometen la vida o un órgano de forma grave (hemorragia alveolar, vasculitis con compromiso ocular, glomerulonefritis rápidamente progresiva), el manejo es con pulsos de metilprednisolona a dosis altas.",
      },
      {
        letra: "B",
        texto: "Aumentar la dosis de hidroxicloroquina como único ajuste",
        correcta: false,
        explicacion:
          "Incorrecta. La hidroxicloroquina es parte del tratamiento de base del lupus, pero no es suficiente ni de acción suficientemente rápida para una manifestación grave que compromete la vida como la hemorragia alveolar.",
      },
      {
        letra: "C",
        texto: "Observación con control ambulatorio en una semana",
        correcta: false,
        explicacion:
          "Incorrecta. Una hemorragia alveolar difusa es una manifestación severa que compromete la vida; postergar el tratamiento intensivo puede ser fatal.",
      },
      {
        letra: "D",
        texto: "Suspender todo tratamiento inmunosupresor por el sangrado activo",
        correcta: false,
        explicacion:
          "Incorrecta. La hemorragia alveolar en lupus es de origen inflamatorio/autoinmune, no por exceso de inmunosupresión; suspender el tratamiento empeoraría el cuadro al no controlar la actividad de la enfermedad.",
      },
    ],
    perla:
      "En lupus, las manifestaciones severas (que comprometen riñón, SNC, SNP, o causan vasculitis grave, hemorragia alveolar o anemia hemolítica) requieren pulsos de metilprednisolona: si no se tratan intensivamente, el paciente puede morir o quedar con daño irreversible.",
  },
  {
    tema: "Artritis reumatoide",
    dificultad: "Media",
    enunciado:
      "Mujer de 45 años presenta dolor e inflamación simétrica en las articulaciones metacarpofalángicas, muñecas e interfalángicas proximales de ambas manos, con rigidez matutina de más de 30 minutos, de varios meses de evolución. El factor reumatoide y los anticuerpos anti-CCP son positivos. ¿Cuál es el fármaco de elección para modificar el curso de la enfermedad?",
    opciones: [
      {
        letra: "A",
        texto: "Metotrexate",
        correcta: true,
        explicacion:
          "Correcta. El metotrexate es el fármaco antirreumático modificador de la enfermedad (DMARD) de elección en artritis reumatoide, con el que muchos pacientes mejoran en monoterapia o combinado con glucocorticoides a bajas dosis.",
      },
      {
        letra: "B",
        texto: "Ibuprofeno en monoterapia prolongada",
        correcta: false,
        explicacion:
          "Incorrecta. Los AINEs alivian el dolor pero no modifican el curso de la enfermedad ni previenen el daño articular progresivo, a diferencia de los DMARDs.",
      },
      {
        letra: "C",
        texto: "Prednisona a dosis altas como único tratamiento a largo plazo",
        correcta: false,
        explicacion:
          "Incorrecta. Los corticoides a bajas dosis se usan como puente mientras el DMARD hace efecto, no como monoterapia definitiva a dosis altas por sus efectos adversos a largo plazo.",
      },
      {
        letra: "D",
        texto: "Alopurinol",
        correcta: false,
        explicacion:
          "Incorrecta. El alopurinol reduce los niveles de ácido úrico y se usa en gota, no tiene ningún rol en el tratamiento de la artritis reumatoide.",
      },
    ],
    perla:
      "La artritis reumatoide típicamente afecta de forma simétrica articulaciones pequeñas (metacarpofalángicas, interfalángicas proximales, muñecas) respetando las interfalángicas distales, con rigidez matutina prolongada (>30 min); el metotrexate es el DMARD más importante.",
  },
  {
    tema: "Artritis gotosa",
    dificultad: "Media",
    enunciado:
      "Varón de 52 años, con antecedente de consumo frecuente de alcohol, presenta dolor súbito, intenso, con eritema y calor en la primera articulación metatarsofalángica, de inicio nocturno. ¿Cuál es el manejo más adecuado en esta crisis aguda?",
    opciones: [
      {
        letra: "A",
        texto: "AINEs o colchicina, evitando iniciar o modificar tratamiento hipouricemiante durante el ataque agudo",
        correcta: true,
        explicacion:
          "Correcta. El manejo de la crisis aguda de gota es con AINEs, colchicina o corticoides; no se debe iniciar ni ajustar tratamiento hipouricemiante (como alopurinol) durante el ataque agudo, ya que puede prolongar o empeorar la crisis.",
      },
      {
        letra: "B",
        texto: "Iniciar alopurinol de inmediato a dosis altas para bajar el ácido úrico",
        correcta: false,
        explicacion:
          "Incorrecta. Iniciar o cambiar la dosis de un hipouricemiante durante la crisis aguda puede movilizar cristales y prolongar o intensificar el episodio inflamatorio.",
      },
      {
        letra: "C",
        texto: "Antibióticos empíricos de amplio espectro",
        correcta: false,
        explicacion:
          "Incorrecta. El cuadro es característico de un ataque de gota, no de una artritis séptica; los antibióticos no tienen indicación salvo que se confirme infección.",
      },
      {
        letra: "D",
        texto: "Reposo articular sin ningún tratamiento farmacológico",
        correcta: false,
        explicacion:
          "Incorrecta. La crisis aguda de gota es muy dolorosa y responde bien a tratamiento farmacológico específico; no tratarla prolonga innecesariamente el sufrimiento del paciente.",
      },
    ],
    perla:
      "La podagra (afectación de la primera articulación metatarsofalángica) es la presentación clásica de la gota; el tratamiento hipouricemiante de mantenimiento se inicia o ajusta después de que la crisis aguda haya resuelto, nunca durante ella.",
  },
  {
    tema: "Artritis séptica",
    dificultad: "Alta",
    enunciado:
      "Varón de 60 años, diabético, presenta monoartritis aguda de rodilla con dolor intenso, derrame articular, eritema local y fiebre de 38.5°C. ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Artrocentesis urgente para análisis y cultivo del líquido sinovial, iniciando antibióticos empíricos",
        correcta: true,
        explicacion:
          "Correcta. Ante sospecha de artritis séptica (monoartritis aguda febril), se requiere artrocentesis urgente para confirmar el diagnóstico y guiar el tratamiento, iniciando antibióticos empíricos sin esperar el resultado del cultivo, dado el riesgo de destrucción articular rápida.",
      },
      {
        letra: "B",
        texto: "Iniciar antiinflamatorios y reevaluar en una semana",
        correcta: false,
        explicacion:
          "Incorrecta. Retrasar el diagnóstico y tratamiento de una posible artritis séptica permite la destrucción progresiva del cartílago articular; es una emergencia que no debe manejarse solo con antiinflamatorios.",
      },
      {
        letra: "C",
        texto: "Solicitar solamente una radiografía simple antes de decidir cualquier manejo",
        correcta: false,
        explicacion:
          "Incorrecta. La radiografía simple suele ser normal en las etapas iniciales de la artritis séptica y no debe retrasar la artrocentesis, que es el estudio clave para el diagnóstico.",
      },
      {
        letra: "D",
        texto: "Iniciar colchicina asumiendo una crisis de gota",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque la gota puede presentarse de forma similar, la fiebre y el contexto de monoartritis aguda obligan a descartar primero una infección articular antes de asumir un diagnóstico no infeccioso.",
      },
    ],
    perla:
      "La artritis séptica es una emergencia médica y quirúrgica: el retraso en el diagnóstico y drenaje articular puede llevar a destrucción irreversible del cartílago en cuestión de días; Staphylococcus aureus es el germen más frecuentemente implicado.",
  },
  {
    tema: "Miopatías inflamatorias",
    dificultad: "Media",
    enunciado:
      "Mujer de 48 años presenta debilidad muscular proximal progresiva (dificultad para subir escaleras y peinarse) de 2 meses de evolución, junto con pápulas eritemato-violáceas sobre las articulaciones metacarpofalángicas e interfalángicas de las manos. La CPK está marcadamente elevada. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Dermatomiositis",
        correcta: true,
        explicacion:
          "Correcta. La combinación de debilidad muscular proximal, CPK elevada y las pápulas de Gottron (lesiones eritemato-violáceas sobre articulaciones de las manos) es característica de la dermatomiositis.",
      },
      {
        letra: "B",
        texto: "Polimiositis",
        correcta: false,
        explicacion:
          "Incorrecta. La polimiositis comparte la debilidad muscular proximal y la elevación de CPK, pero no cursa con manifestaciones cutáneas como las pápulas de Gottron, que son distintivas de la dermatomiositis.",
      },
      {
        letra: "C",
        texto: "Miastenia gravis",
        correcta: false,
        explicacion:
          "Incorrecta. La miastenia gravis se caracteriza por debilidad muscular fluctuante que empeora con el ejercicio y mejora con el reposo, sin elevación de CPK ni lesiones cutáneas como las descritas.",
      },
      {
        letra: "D",
        texto: "Fibromialgia",
        correcta: false,
        explicacion:
          "Incorrecta. La fibromialgia cursa con dolor musculoesquelético difuso y puntos dolorosos, sin debilidad muscular objetiva, sin elevación de CPK ni lesiones cutáneas específicas.",
      },
    ],
    perla:
      "Las pápulas de Gottron y el eritema en heliotropo (párpados) son hallazgos cutáneos específicos que distinguen la dermatomiositis de la polimiositis, la cual comparte la afectación muscular pero sin manifestaciones cutáneas.",
  },
  {
    tema: "Vasculitis",
    dificultad: "Alta",
    enunciado:
      "Paciente presenta síndrome pulmón-riñón (hemorragia alveolar y glomerulonefritis), sin eosinofilia periférica ni granulomas en la biopsia, con ANCA-MPO positivo. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Poliangeítis microscópica",
        correcta: true,
        explicacion:
          "Correcta. La poliangeítis microscópica es una vasculitis pauci-inmune de pequeño vaso asociada a ANCA-MPO, que puede presentarse como síndrome pulmón-riñón, sin la eosinofilia ni los granulomas característicos de otras vasculitis ANCA.",
      },
      {
        letra: "B",
        texto: "Granulomatosis eosinofílica con poliangeítis (Churg-Strauss)",
        correcta: false,
        explicacion:
          "Incorrecta. La granulomatosis eosinofílica con poliangeítis se distingue precisamente por cursar con eosinofilia marcada y granulomas, hallazgos ausentes en este caso.",
      },
      {
        letra: "C",
        texto: "Granulomatosis con poliangeítis (Wegener)",
        correcta: false,
        explicacion:
          "Incorrecta. La granulomatosis con poliangeítis se asocia típicamente a ANCA-PR3 y a la formación de granulomas (frecuentemente con afectación de vía aérea superior), a diferencia del cuadro sin granulomas descrito, más compatible con poliangeítis microscópica.",
      },
      {
        letra: "D",
        texto: "Síndrome de Goodpasture",
        correcta: false,
        explicacion:
          "Incorrecta. El síndrome de Goodpasture se asocia a anticuerpos anti-membrana basal glomerular, no a ANCA-MPO, aunque también puede producir un síndrome pulmón-riñón.",
      },
    ],
    perla:
      "Diferenciar las vasculitis ANCA-asociadas: poliangeítis microscópica (ANCA-MPO, sin granulomas, sin eosinofilia) vs. granulomatosis con poliangeítis (ANCA-PR3, con granulomas) vs. granulomatosis eosinofílica con poliangeítis/Churg-Strauss (con eosinofilia y granulomas, frecuentemente en pacientes con asma previo).",
  },
];

const EKG_QUESTIONS = [
  {
    tema: "Trastornos electrolíticos",
    dificultad: "Media",
    enunciado:
      "Varón de 68 años con enfermedad renal crónica en hemodiálisis, que faltó a su última sesión, presenta en el EKG ondas T picudas, simétricas y de base estrecha en las derivaciones precordiales. ¿Cuál es la alteración electrolítica más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Hiperkalemia",
        correcta: true,
        explicacion:
          "Correcta. Las ondas T picudas, simétricas y de base estrecha son el hallazgo clásico y más precoz de la hiperkalemia; son transitorias y desaparecen al corregir el potasio.",
      },
      {
        letra: "B",
        texto: "Hipokalemia",
        correcta: false,
        explicacion:
          "Incorrecta. La hipokalemia se asocia a QT prolongado y una onda U que iguala o supera la altura de la onda T, no a ondas T picudas.",
      },
      {
        letra: "C",
        texto: "Hipocalcemia",
        correcta: false,
        explicacion:
          "Incorrecta. La hipocalcemia se manifiesta principalmente con prolongación del segmento ST y del QT, no con ondas T picudas.",
      },
      {
        letra: "D",
        texto: "Hipercalcemia",
        correcta: false,
        explicacion:
          "Incorrecta. La hipercalcemia tiende a acortar el QT, un patrón opuesto al de la hiperkalemia descrita en este caso.",
      },
    ],
    perla:
      "En falla renal, siempre buscar en el EKG la tétrada: agrandamiento auricular izquierdo, hipertrofia ventricular izquierda, hipocalcemia (QT prolongado) e hiperkalemia (T picuda) — los pacientes en diálisis pueden alternar entre estos hallazgos según su estado metabólico.",
  },
  {
    tema: "Trastornos electrolíticos",
    dificultad: "Media",
    enunciado:
      "Mujer de 55 años en tratamiento con diuréticos de asa presenta debilidad muscular. El EKG muestra un intervalo QT prolongado y una onda U de altura igual o mayor a la onda T, mejor visible en V2-V3. ¿Cuál es la alteración electrolítica más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Hipokalemia",
        correcta: true,
        explicacion:
          "Correcta. Una onda U prominente (igual o más alta que la onda T, mejor vista en V2-V3) junto con QT prolongado es característica de hipokalemia; recordar que una onda U pequeña puede ser normal, pero no cuando iguala o supera a la T.",
      },
      {
        letra: "B",
        texto: "Hiperkalemia",
        correcta: false,
        explicacion:
          "Incorrecta. La hiperkalemia produce ondas T picudas y simétricas, no una onda U prominente.",
      },
      {
        letra: "C",
        texto: "Hipernatremia",
        correcta: false,
        explicacion:
          "Incorrecta. Las alteraciones del sodio no tienen un patrón electrocardiográfico característico como el descrito.",
      },
      {
        letra: "D",
        texto: "Hipermagnesemia",
        correcta: false,
        explicacion:
          "Incorrecta. La hipermagnesemia severa puede prolongar el PR y ensanchar el QRS, pero no produce el patrón clásico de onda U prominente.",
      },
    ],
    perla:
      "No todo paciente con hipokalemia mostrará el clásico QT prolongado con onda U prominente — a veces solo hay hallazgos inespecíficos del ST-T. El uso de diuréticos (especialmente de asa) es una causa frecuente de hipokalemia a vigilar.",
  },
  {
    tema: "Efecto de fármacos",
    dificultad: "Media",
    enunciado:
      "Paciente en tratamiento con digoxina para insuficiencia cardíaca presenta en el EKG un QT corto y una depresión del segmento ST con concavidad hacia arriba (patrón descrito como 'bigote de Salvador Dalí'), con onda T de baja amplitud. ¿Cómo se interpreta este hallazgo?",
    opciones: [
      {
        letra: "A",
        texto: "Es el efecto esperado de la digoxina en el EKG, no necesariamente signo de toxicidad",
        correcta: true,
        explicacion:
          "Correcta. El 'efecto digitálico' (QT corto, depresión del ST con concavidad hacia arriba, T aplanada) es un hallazgo esperado en pacientes que toman digoxina a dosis terapéuticas, y no implica por sí solo toxicidad.",
      },
      {
        letra: "B",
        texto: "Es diagnóstico definitivo de intoxicación digitálica y debe suspenderse de inmediato",
        correcta: false,
        explicacion:
          "Incorrecta. No todo paciente con este patrón en el EKG está intoxicado; el efecto digitálico es distinto de la toxicidad digitálica, que se sospecha por arritmias específicas (extrasístoles, bloqueos, taquicardia auricular con bloqueo) y el contexto clínico.",
      },
      {
        letra: "C",
        texto: "Indica un infarto agudo de miocardio en curso",
        correcta: false,
        explicacion:
          "Incorrecta. El patrón descrito es característico del efecto de la digoxina, no de isquemia aguda, que se manifestaría con elevación o depresión del ST en un patrón topográfico distinto.",
      },
      {
        letra: "D",
        texto: "Sugiere hiperkalemia asociada",
        correcta: false,
        explicacion:
          "Incorrecta. El patrón descrito es específico del efecto digitálico sobre la repolarización, no de un trastorno del potasio.",
      },
    ],
    perla:
      "Efecto digitálico (esperado, no patológico): QT corto + ST con concavidad hacia arriba ('bigote de Dalí') + T aplanada. Esto es distinto de la toxicidad digitálica, que se diagnostica por el contexto clínico y arritmias específicas, no solo por este patrón basal.",
  },
  {
    tema: "Enfermedad coronaria",
    dificultad: "Alta",
    enunciado:
      "Varón de 55 años acude por dolor torácico opresivo que ya cedió, actualmente asintomático. El EKG muestra ondas T profundamente invertidas o bifásicas en V2-V3, sin elevación del ST. La troponina es levemente positiva. ¿Cuál es el diagnóstico que debe sospecharse con prioridad?",
    opciones: [
      {
        letra: "A",
        texto: "Síndrome de Wellens, por estenosis crítica de la arteria descendente anterior proximal",
        correcta: true,
        explicacion:
          "Correcta. Las ondas T profundamente invertidas o bifásicas en V2-V3 en un paciente con dolor torácico reciente son el patrón clásico del síndrome de Wellens, que se correlaciona con estenosis crítica de la arteria descendente anterior proximal y alto riesgo de infarto anterior extenso inminente.",
      },
      {
        letra: "B",
        texto: "Pericarditis aguda",
        correcta: false,
        explicacion:
          "Incorrecta. La pericarditis aguda típicamente cursa con elevación difusa del ST cóncava hacia arriba y depresión del PR, no con el patrón de T invertidas/bifásicas localizado en V2-V3.",
      },
      {
        letra: "C",
        texto: "Repolarización precoz benigna",
        correcta: false,
        explicacion:
          "Incorrecta. La repolarización precoz es un patrón benigno con elevación del punto J, no con ondas T profundamente invertidas en el contexto de dolor torácico y troponina positiva.",
      },
      {
        letra: "D",
        texto: "Pericarditis crónica constrictiva",
        correcta: false,
        explicacion:
          "Incorrecta. No se asocia a este patrón agudo de ondas T ni al cuadro clínico de dolor torácico reciente con troponina positiva.",
      },
    ],
    perla:
      "El síndrome de Wellens es una señal de alarma crítica: aunque el paciente esté asintomático y sin elevación del ST en el momento del EKG, indica alto riesgo de infarto anterior extenso inminente y amerita evaluación coronaria urgente, no manejo ambulatorio.",
  },
  {
    tema: "Arritmias",
    dificultad: "Alta",
    enunciado:
      "Paciente con antecedente de QT prolongado e hipomagnesemia severa presenta síncope. El EKG en telemetría muestra una taquicardia ventricular polimórfica en la que el eje del QRS parece 'girar' alrededor de la línea basal. ¿Cuál es el diagnóstico y el manejo agudo más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Torsade de pointes; sulfato de magnesio intravenoso",
        correcta: true,
        explicacion:
          "Correcta. La taquicardia ventricular polimórfica con el QRS 'girando' alrededor de la línea basal es torsade de pointes, típicamente asociada a QT prolongado y alteraciones electrolíticas severas (hipomagnesemia, hipokalemia); el manejo agudo es sulfato de magnesio intravenoso independientemente del nivel sérico de magnesio.",
      },
      {
        letra: "B",
        texto: "Fibrilación auricular; control de frecuencia con betabloqueador",
        correcta: false,
        explicacion:
          "Incorrecta. La fibrilación auricular es una arritmia supraventricular irregular de QRS estrecho (salvo aberrancia), no una taquicardia ventricular polimórfica como la descrita.",
      },
      {
        letra: "C",
        texto: "Taquicardia ventricular monomórfica; amiodarona endovenosa",
        correcta: false,
        explicacion:
          "Incorrecta. La taquicardia monomórfica mantiene una morfología de QRS constante latido a latido, a diferencia del patrón cambiante y 'giratorio' descrito, característico de la forma polimórfica (torsade).",
      },
      {
        letra: "D",
        texto: "Bloqueo AV completo; marcapasos transcutáneo inmediato",
        correcta: false,
        explicacion:
          "Incorrecta. El cuadro descrito es una taquiarritmia ventricular, no una bradiarritmia por bloqueo; el marcapasos no es el manejo agudo de una torsade de pointes.",
      },
    ],
    perla:
      "Ante torsade de pointes, el sulfato de magnesio IV es la primera línea de tratamiento agudo, incluso si el magnesio sérico es normal; además, se deben corregir otros electrolitos y suspender cualquier fármaco que prolongue el QT.",
  },
  {
    tema: "Farmacología y EKG",
    dificultad: "Media",
    enunciado:
      "Un paciente inicia tratamiento con un nuevo antibiótico y a los pocos días presenta un EKG con QT marcadamente prolongado. ¿Cuál de los siguientes fármacos es una causa reconocida de prolongación del QT?",
    opciones: [
      {
        letra: "A",
        texto: "Azitromicina",
        correcta: true,
        explicacion:
          "Correcta. La azitromicina (junto con otros macrólidos), la hidroxicloroquina, la cocaína y los antidepresivos tricíclicos son causas reconocidas de prolongación del intervalo QT y deben usarse con precaución en pacientes con QT ya prolongado.",
      },
      {
        letra: "B",
        texto: "Paracetamol",
        correcta: false,
        explicacion:
          "Incorrecta. El paracetamol a dosis terapéuticas no es una causa reconocida de prolongación del QT.",
      },
      {
        letra: "C",
        texto: "Amoxicilina",
        correcta: false,
        explicacion:
          "Incorrecta. La amoxicilina no está entre los antibióticos asociados a prolongación significativa del QT, a diferencia de los macrólidos como la azitromicina.",
      },
      {
        letra: "D",
        texto: "Metformina",
        correcta: false,
        explicacion:
          "Incorrecta. La metformina no tiene un efecto reconocido sobre el intervalo QT.",
      },
    ],
    perla:
      "Fármacos que prolongan el QT a recordar: macrólidos (azitromicina), hidroxicloroquina, cocaína y antidepresivos tricíclicos, entre otros; su uso combinado con otros prolongadores del QT o en pacientes con hipokalemia/hipomagnesemia aumenta el riesgo de torsade de pointes.",
  },
  {
    tema: "Bloqueos AV",
    dificultad: "Media",
    enunciado:
      "En un EKG se observa alargamiento progresivo del intervalo PR en latidos sucesivos hasta que una onda P no es seguida de un complejo QRS (latido 'bloqueado'), tras lo cual el ciclo se reinicia. ¿Cómo se clasifica este bloqueo auriculoventricular?",
    opciones: [
      {
        letra: "A",
        texto: "Bloqueo AV de segundo grado Mobitz I (Wenckebach)",
        correcta: true,
        explicacion:
          "Correcta. El alargamiento progresivo del PR hasta un latido bloqueado, con reinicio posterior del ciclo, es el patrón característico del Mobitz I o Wenckebach; generalmente es benigno y de localización nodal.",
      },
      {
        letra: "B",
        texto: "Bloqueo AV de segundo grado Mobitz II",
        correcta: false,
        explicacion:
          "Incorrecta. El Mobitz II se caracteriza por un PR constante antes del latido bloqueado (sin el alargamiento progresivo descrito), y conlleva mayor riesgo de progresión a bloqueo completo.",
      },
      {
        letra: "C",
        texto: "Bloqueo AV de primer grado",
        correcta: false,
        explicacion:
          "Incorrecta. El bloqueo de primer grado consiste en un PR constantemente prolongado (>200ms) sin ningún latido bloqueado, a diferencia del patrón descrito.",
      },
      {
        letra: "D",
        texto: "Bloqueo AV completo (tercer grado)",
        correcta: false,
        explicacion:
          "Incorrecta. En el bloqueo completo no existe ninguna relación entre las ondas P y los complejos QRS (disociación AV completa), a diferencia del patrón progresivo y cíclico descrito.",
      },
    ],
    perla:
      "Mobitz I (Wenckebach): PR que se alarga progresivamente hasta un latido bloqueado, generalmente benigno. Mobitz II: PR fijo con bloqueo súbito, mayor riesgo de progresar a bloqueo completo y suele requerir marcapasos.",
  },
  {
    tema: "Nefropatía y EKG",
    dificultad: "Media",
    enunciado:
      "Paciente con enfermedad renal crónica avanzada presenta en el EKG signos de agrandamiento de la aurícula izquierda, hipertrofia ventricular izquierda y ondas T picudas simétricas. ¿Qué otra alteración electrolítica se debe sospechar activamente en este contexto?",
    opciones: [
      {
        letra: "A",
        texto: "Hipocalcemia",
        correcta: true,
        explicacion:
          "Correcta. En pacientes con enfermedad renal crónica, la tétrada característica en el EKG es agrandamiento auricular izquierdo, hipertrofia ventricular izquierda, hipocalcemia (que prolonga el QT) e hiperkalemia (ondas T picudas, ya presente en este caso).",
      },
      {
        letra: "B",
        texto: "Hipercalcemia",
        correcta: false,
        explicacion:
          "Incorrecta. En la enfermedad renal crónica es más frecuente la hipocalcemia (por menor activación de vitamina D), no la hipercalcemia.",
      },
      {
        letra: "C",
        texto: "Hiponatremia severa sintomática",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque puede ocurrir, no forma parte de la tétrada característica de hallazgos electrocardiográficos asociados a la enfermedad renal crónica.",
      },
      {
        letra: "D",
        texto: "Hipokalemia",
        correcta: false,
        explicacion:
          "Incorrecta. En la enfermedad renal crónica avanzada lo característico es la hiperkalemia (por menor excreción renal de potasio), no la hipokalemia.",
      },
    ],
    perla:
      "Tétrada a buscar activamente en el EKG de un paciente con enfermedad renal crónica: agrandamiento auricular izquierdo, hipertrofia ventricular izquierda, hipocalcemia e hiperkalemia — recordar que los niveles de calcio se relacionan inversamente con la duración del segmento ST/QT.",
  },
  {
    tema: "Bloqueos AV",
    dificultad: "Alta",
    enunciado:
      "Varón de 70 años presenta síncope. El EKG muestra ondas P y complejos QRS que aparecen a sus propios ritmos regulares, sin ninguna relación entre ellos, con QRS angosto a una frecuencia ventricular de 45 lpm. ¿Cuál es el diagnóstico y la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Bloqueo AV completo (tercer grado); hospitalización con monitoreo y marcapasos",
        correcta: true,
        explicacion:
          "Correcta. La disociación completa entre ondas P y QRS (cada uno a su propio ritmo) define el bloqueo AV de tercer grado; el ritmo de escape angosto a 40-60 lpm sugiere un origen de la unión AV. Estos pacientes tienen alto riesgo de paro ventricular y requieren hospitalización con monitoreo, marcapasos transitorio de respaldo y usualmente marcapasos permanente.",
      },
      {
        letra: "B",
        texto: "Bloqueo AV Mobitz I; observación ambulatoria",
        correcta: false,
        explicacion:
          "Incorrecta. El Mobitz I mantiene relación entre las ondas P y los QRS conducidos (con alargamiento progresivo del PR), a diferencia de la disociación AV completa descrita en este caso.",
      },
      {
        letra: "C",
        texto: "Fibrilación auricular con respuesta ventricular controlada",
        correcta: false,
        explicacion:
          "Incorrecta. La fibrilación auricular no tiene ondas P organizadas y regulares como las descritas; aquí hay ondas P regulares, solo que disociadas de los QRS.",
      },
      {
        letra: "D",
        texto: "Bloqueo AV de alto grado 2:1; solo requiere seguimiento ambulatorio",
        correcta: false,
        explicacion:
          "Incorrecta. En un bloqueo de alto grado (2:1 o mayor) todavía existe alguna relación entre ciertas ondas P y los QRS; aquí no hay ninguna relación, lo que indica bloqueo completo, una condición de alto riesgo que no debe manejarse ambulatoriamente.",
      },
    ],
    perla:
      "Jerarquía de marcapasos naturales: nodo sinusal (60-100 lpm) → unión AV (40-60 lpm) → ventrículo (<40 lpm). En el bloqueo AV completo, el ritmo de escape con QRS angosto alrededor de 40-60 lpm sugiere origen en la unión AV, mientras que un QRS ancho y más lento sugiere origen ventricular, de peor pronóstico.",
  },
  {
    tema: "Hemibloqueos",
    dificultad: "Alta",
    enunciado:
      "En un EKG se observa desviación extrema del eje eléctrico hacia la izquierda, con un patrón qR en la derivación aVL, sin evidencia de bloqueo completo de rama. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Hemibloqueo anterior izquierdo (LAHB)",
        correcta: true,
        explicacion:
          "Correcta. El hemibloqueo anterior izquierdo se caracteriza por desviación del eje hacia la izquierda con un patrón qR en aVL (y en DI), reflejando un bloqueo del fascículo anterior de la rama izquierda; es más frecuente que el hemibloqueo posterior izquierdo.",
      },
      {
        letra: "B",
        texto: "Hemibloqueo posterior izquierdo (LPHB)",
        correcta: false,
        explicacion:
          "Incorrecta. El hemibloqueo posterior izquierdo se asocia a desviación del eje hacia la derecha con patrón en aVF, no a la desviación izquierda con qR en aVL descrita en este caso; además, es mucho menos frecuente que el anterior.",
      },
      {
        letra: "C",
        texto: "Bloqueo completo de rama izquierda (BCRIHH)",
        correcta: false,
        explicacion:
          "Incorrecta. El bloqueo completo de rama izquierda produce un QRS ancho con una morfología característica en las derivaciones precordiales, distinto del patrón de hemibloqueo (fascicular) descrito, que no necesariamente ensancha el QRS de forma significativa.",
      },
      {
        letra: "D",
        texto: "Bloqueo AV de primer grado",
        correcta: false,
        explicacion:
          "Incorrecta. El bloqueo AV de primer grado se define por un PR prolongado (>200ms) y no tiene relación con el eje eléctrico ni con el patrón qR en aVL.",
      },
    ],
    perla:
      "El hemibloqueo anterior izquierdo (desviación izquierda del eje + qR en aVL) es mucho más frecuente que el hemibloqueo posterior izquierdo (desviación derecha + patrón en aVF), ya que el fascículo anterior tiene una irrigación más vulnerable.",
  },
  {
    tema: "Enfermedad coronaria",
    dificultad: "Media",
    enunciado:
      "Varón de 62 años cursando un infarto agudo de miocardio con elevación del ST en cara inferior (DII, DIII, aVF) presenta bradicardia sinusal y un bloqueo AV de segundo grado. ¿Cuál es la explicación anatómica más adecuada para esta asociación?",
    opciones: [
      {
        letra: "A",
        texto: "La arteria coronaria derecha irriga tanto la cara inferior como los nodos sinusal y AV en la mayoría de los pacientes",
        correcta: true,
        explicacion:
          "Correcta. La arteria coronaria derecha irriga el nodo sinusal en aproximadamente 60% de las personas y el nodo AV en 80-90%, además de dar origen a la cara inferior del corazón; por eso el infarto inferior se asocia con mayor frecuencia a bradicardia sinusal y bloqueos AV de segundo y tercer grado.",
      },
      {
        letra: "B",
        texto: "Es una coincidencia sin relación anatómica específica",
        correcta: false,
        explicacion:
          "Incorrecta. Existe una base anatómica clara: la misma arteria coronaria derecha que causa el infarto inferior frecuentemente irriga también el sistema de conducción sinusal y AV.",
      },
      {
        letra: "C",
        texto: "Se debe exclusivamente al efecto de los fármacos usados en el infarto (betabloqueadores)",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque los betabloqueadores pueden contribuir, la asociación entre infarto inferior y bloqueos AV es predominantemente anatómica (irrigación compartida), no solo farmacológica.",
      },
      {
        letra: "D",
        texto: "El infarto anterior es el que típicamente se asocia a estos bloqueos, no el inferior",
        correcta: false,
        explicacion:
          "Incorrecta. Es al revés: el infarto inferior se asocia con más frecuencia a bradicardia sinusal y bloqueos AV de segundo/tercer grado que el infarto anterior.",
      },
    ],
    perla:
      "Ante un infarto inferior con bradicardia o bloqueo AV, recordar que suele ser un fenómeno transitorio relacionado con isquemia del nodo (por compartir irrigación con la arteria coronaria derecha), a diferencia de los bloqueos asociados a infarto anterior extenso, que reflejan daño estructural del sistema de conducción y tienen peor pronóstico.",
  },
];

const INFECTOLOGIA_QUESTIONS = [
  {
    tema: "Enfermedades de transmisión sexual",
    dificultad: "Media",
    enunciado:
      "Varón de 27 años, sexualmente activo, presenta una úlcera genital única, dolorosa, con adenopatía inguinal dolorosa asociada. ¿Cuál es el agente causal más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Haemophilus ducreyi (chancroide)",
        correcta: true,
        explicacion:
          "Correcta. El chancroide, causado por Haemophilus ducreyi, se caracteriza por úlceras genitales dolorosas (a diferencia del chancro sifilítico, que es indoloro) con linfadenopatía inguinal dolorosa asociada.",
      },
      {
        letra: "B",
        texto: "Treponema pallidum (sífilis primaria)",
        correcta: false,
        explicacion:
          "Incorrecta. El chancro de la sífilis primaria es característicamente indoloro, a diferencia de la úlcera dolorosa descrita en este caso.",
      },
      {
        letra: "C",
        texto: "Klebsiella granulomatis (granuloma inguinal)",
        correcta: false,
        explicacion:
          "Incorrecta. El granuloma inguinal (donovanosis) produce úlceras progresivas e indoloras, de difícil cultivo, distintas de la presentación dolorosa descrita.",
      },
      {
        letra: "D",
        texto: "Neisseria gonorrhoeae",
        correcta: false,
        explicacion:
          "Incorrecta. La gonorrea típicamente causa uretritis con descarga purulenta, no úlceras genitales.",
      },
    ],
    perla:
      "Toda úlcera genital (especialmente el chancroide) favorece la transmisión del VIH; ante una úlcera genital dolorosa con adenopatía dolorosa, el chancroide es el diagnóstico más probable, mientras que un chancro indoloro sugiere sífilis primaria.",
  },
  {
    tema: "Enfermedades de transmisión sexual",
    dificultad: "Media",
    enunciado:
      "Mujer de 24 años con antecedente de sífilis primaria tratada hace 3 meses, acude para seguimiento. ¿Qué tipo de prueba serológica es la más adecuada para monitorizar la respuesta al tratamiento?",
    opciones: [
      {
        letra: "A",
        texto: "Prueba no treponémica (ej. VDRL o RPR)",
        correcta: true,
        explicacion:
          "Correcta. Las pruebas no treponémicas (VDRL, RPR) se utilizan tanto para tamizaje como para seguimiento de la respuesta al tratamiento, ya que sus títulos descienden con el tratamiento exitoso.",
      },
      {
        letra: "B",
        texto: "Prueba treponémica (ej. FTA-ABS)",
        correcta: false,
        explicacion:
          "Incorrecta. Las pruebas treponémicas confirman el diagnóstico, pero permanecen positivas de por vida en la mayoría de los pacientes, por lo que no sirven para monitorizar la respuesta al tratamiento.",
      },
      {
        letra: "C",
        texto: "Cultivo directo de Treponema pallidum",
        correcta: false,
        explicacion:
          "Incorrecta. Treponema pallidum no se cultiva en medios de laboratorio estándar; el diagnóstico se basa en serología y microscopía de campo oscuro en lesiones activas.",
      },
      {
        letra: "D",
        texto: "PCR en sangre periférica",
        correcta: false,
        explicacion:
          "Incorrecta. No es el método estándar para el seguimiento de la respuesta al tratamiento de la sífilis; las pruebas no treponémicas cuantitativas son las que se usan para ese fin.",
      },
    ],
    perla:
      "Las pruebas treponémicas confirman el diagnóstico pero permanecen positivas de por vida (no sirven para seguimiento); las pruebas no treponémicas (VDRL, RPR) se usan tanto para tamizaje como para monitorizar la respuesta al tratamiento, ya que sus títulos disminuyen con la curación.",
  },
  {
    tema: "Fiebre entérica",
    dificultad: "Media",
    enunciado:
      "Varón de 22 años, con antecedente de viaje reciente a una zona con acceso limitado a agua potable, presenta fiebre de 39°C de 10 días de evolución, dolor abdominal, y en el examen físico llama la atención una frecuencia cardíaca relativamente baja para el grado de fiebre. Además se observan lesiones maculopapulares color salmón en el tronco. ¿Cuál es el tratamiento de elección?",
    opciones: [
      {
        letra: "A",
        texto: "Ciprofloxacino o azitromicina",
        correcta: true,
        explicacion:
          "Correcta. El cuadro es compatible con fiebre tifoidea (fiebre prolongada, bradicardia relativa, roséola tifoídica); el tratamiento de elección es ciprofloxacino o azitromicina, reservando las cefalosporinas de tercera generación (ceftriaxona) para casos graves o resistentes.",
      },
      {
        letra: "B",
        texto: "Doxiciclina en monoterapia",
        correcta: false,
        explicacion:
          "Incorrecta. La doxiciclina no es el tratamiento de primera línea para la fiebre tifoidea; se usa en otras entidades como el granuloma inguinal o infecciones por rickettsias.",
      },
      {
        letra: "C",
        texto: "Solo manejo sintomático, ya que es una enfermedad autolimitada",
        correcta: false,
        explicacion:
          "Incorrecta. Sin tratamiento antibiótico, la fiebre tifoidea puede prolongarse hasta 4 semanas y presentar complicaciones graves como perforación intestinal; requiere tratamiento antibiótico específico.",
      },
      {
        letra: "D",
        texto: "Penicilina G",
        correcta: false,
        explicacion:
          "Incorrecta. La penicilina G no es el tratamiento de la fiebre tifoidea; se usa en otras infecciones como la sífilis.",
      },
    ],
    perla:
      "Signos clásicos de fiebre tifoidea: bradicardia relativa (frecuencia cardíaca desproporcionadamente baja para el grado de fiebre) y roséola tifoídica (máculo-pápulas color salmón en tronco que desaparecen a la presión). El cultivo de heces puede ser negativo hasta en 70% de los casos durante la primera semana.",
  },
  {
    tema: "Zoonosis",
    dificultad: "Media",
    enunciado:
      "Varón de 40 años, ganadero, presenta fiebre ondulante, sudoración profusa, artralgias y hepatoesplenomegalia de varias semanas de evolución. La prueba de Rosa de Bengala resulta positiva. ¿Cuál es el siguiente paso más adecuado para confirmar el diagnóstico?",
    opciones: [
      {
        letra: "A",
        texto: "Hemocultivo (u cultivo de médula ósea/ganglio)",
        correcta: true,
        explicacion:
          "Correcta. Aunque la prueba de Rosa de Bengala es útil como tamizaje serológico, el diagnóstico de certeza de brucelosis se confirma con el aislamiento del microorganismo en hemocultivo (o cultivo de médula ósea/ganglio linfático), que es el estándar de oro, aunque puede tener falsos negativos.",
      },
      {
        letra: "B",
        texto: "Considerar la prueba de Rosa de Bengala como diagnóstico definitivo",
        correcta: false,
        explicacion:
          "Incorrecta. La Rosa de Bengala es una prueba de tamizaje serológico, no el estándar de oro diagnóstico; debe confirmarse con cultivo.",
      },
      {
        letra: "C",
        texto: "Biopsia hepática como único método diagnóstico",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque puede mostrar granulomas no caseificantes de forma inespecífica, no es el método diagnóstico de elección frente al cultivo microbiológico.",
      },
      {
        letra: "D",
        texto: "Iniciar tratamiento empírico sin ningún estudio confirmatorio adicional",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque el contexto clínico y la serología positiva son sugerentes, se debe intentar la confirmación microbiológica siempre que sea posible.",
      },
    ],
    perla:
      "En brucelosis, la Rosa de Bengala y el ELISA son pruebas de tamizaje serológico útiles, pero el estándar de oro diagnóstico sigue siendo el cultivo (hemocultivo, médula ósea o ganglio linfático), a pesar del riesgo de falsos negativos.",
  },
  {
    tema: "Enfermedades de transmisión sexual",
    dificultad: "Baja",
    enunciado:
      "Varón de 26 años presenta descarga uretral purulenta, de color verdoso, con disuria de inicio agudo hace 2 días. ¿Cuál es el agente causal más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Neisseria gonorrhoeae",
        correcta: true,
        explicacion:
          "Correcta. La descarga uretral purulenta y de color verdoso, con disuria de inicio agudo, es característica de la uretritis gonocócica.",
      },
      {
        letra: "B",
        texto: "Chlamydia trachomatis",
        correcta: false,
        explicacion:
          "Incorrecta. La uretritis por clamidia suele tener un inicio más tardío e insidioso, con descarga más clara y escasa, a diferencia de la descarga purulenta y verdosa de inicio agudo descrita.",
      },
      {
        letra: "C",
        texto: "Treponema pallidum",
        correcta: false,
        explicacion:
          "Incorrecta. La sífilis se manifiesta con úlcera genital indolora (chancro), no con descarga uretral purulenta.",
      },
      {
        letra: "D",
        texto: "Herpes simple tipo 2",
        correcta: false,
        explicacion:
          "Incorrecta. El herpes genital se presenta con vesículas y úlceras dolorosas, no con descarga uretral purulenta.",
      },
    ],
    perla:
      "La descarga uretral purulenta, abundante y de inicio agudo sugiere gonorrea; una descarga más escasa, clara y de inicio más insidioso sugiere clamidia — aunque ambas infecciones pueden coexistir y a menudo se tratan de forma empírica conjunta.",
  },
  {
    tema: "Infecciones del SNC",
    dificultad: "Baja",
    enunciado:
      "Paciente presenta síntomas de meningitis con evolución de 10 días, mientras que otro paciente presenta síntomas similares con más de 5 semanas de evolución. ¿Cómo se clasifica cada cuadro según su duración?",
    opciones: [
      {
        letra: "A",
        texto: "El primero es meningitis aguda (hasta 7 días); el segundo es meningitis crónica (más de 4 semanas)",
        correcta: true,
        explicacion:
          "Correcta. La meningitis aguda se define por una evolución de hasta 7 días, mientras que la meningitis crónica se define por una evolución mayor a 4 semanas; esta distinción orienta hacia etiologías distintas (bacterianas/virales típicas en la aguda, vs. tuberculosis, hongos o procesos neoplásicos en la crónica).",
      },
      {
        letra: "B",
        texto: "Ambos casos se consideran meningitis aguda independientemente de la duración",
        correcta: false,
        explicacion:
          "Incorrecta. La duración de los síntomas es precisamente el criterio que distingue la meningitis aguda de la crónica.",
      },
      {
        letra: "C",
        texto: "El primero es meningitis crónica y el segundo es meningitis aguda",
        correcta: false,
        explicacion:
          "Incorrecta. Es al revés: 10 días corresponde a un cuadro agudo (aunque en el límite superior), y más de 5 semanas corresponde a un cuadro crónico.",
      },
      {
        letra: "D",
        texto: "La clasificación se basa únicamente en el agente causal, no en la duración de los síntomas",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque el agente causal suele correlacionarse con el tipo de evolución, la clasificación aguda/crónica se define primariamente por la duración temporal de los síntomas.",
      },
    ],
    perla:
      "Factores predisponentes a meningitis a tener en cuenta: colonización e invasión de la nasofaringe, bacteriemia de otro foco (endocarditis, ITU, neumonía), y estados de inmunosupresión (asplenia, corticoides, VIH).",
  },
  {
    tema: "Retrovirus",
    dificultad: "Alta",
    enunciado:
      "Paciente con antecedente de transfusiones sanguíneas presenta marcha espástica progresiva con signos de liberación piramidal, sin alteración cognitiva significativa. Se confirma infección por HTLV-1. ¿Cuál es la manifestación neurológica más característica de esta infección?",
    opciones: [
      {
        letra: "A",
        texto: "Mielopatía asociada a HTLV-1 (paraparesia espástica tropical)",
        correcta: true,
        explicacion:
          "Correcta. La infección por HTLV-1 se asocia característicamente a una mielopatía con marcha espástica y signos de liberación piramidal (paraparesia espástica tropical); la mayoría de los infectados (aproximadamente 95%) permanecen asintomáticos, y su transmisión sigue vías similares a las del VIH.",
      },
      {
        letra: "B",
        texto: "Demencia rápidamente progresiva como manifestación inicial típica",
        correcta: false,
        explicacion:
          "Incorrecta. La manifestación neurológica característica del HTLV-1 es la mielopatía con afectación motora espástica, no un cuadro demencial rápidamente progresivo.",
      },
      {
        letra: "C",
        texto: "Neuropatía periférica sensitiva pura, sin afectación motora",
        correcta: false,
        explicacion:
          "Incorrecta. El HTLV-1 se asocia principalmente a compromiso de la vía piramidal (motor, espástico), no a una neuropatía periférica puramente sensitiva.",
      },
      {
        letra: "D",
        texto: "Corea generalizada",
        correcta: false,
        explicacion:
          "Incorrecta. La corea no es la manifestación neurológica característica de la infección por HTLV-1; el hallazgo clásico es la paraparesia espástica.",
      },
    ],
    perla:
      "El HTLV-1 comparte vías de transmisión con el VIH (sexual, transfusional, vertical); aunque el 95% de los infectados permanecen asintomáticos, el pequeño porcentaje sintomático puede desarrollar mielopatía espástica o leucemia/linfoma de células T del adulto.",
  },
  {
    tema: "Tuberculosis",
    dificultad: "Media",
    enunciado:
      "Niño con PPD positivo y radiografía de tórax con calcificaciones residuales, completamente asintomático, sin hallazgos clínicos activos. ¿Cómo se clasifica este caso?",
    opciones: [
      {
        letra: "A",
        texto: "Tuberculosis latente (infección, no enfermedad)",
        correcta: true,
        explicacion:
          "Correcta. La tuberculosis latente corresponde a la fase asintomática de la infección, con PPD (o IGRA) positivo, pero sin signos, síntomas, ni hallazgos radiográficos activos (la radiografía puede ser normal o mostrar solo calcificaciones de una infección ya curada).",
      },
      {
        letra: "B",
        texto: "Enfermedad tuberculosa activa",
        correcta: false,
        explicacion:
          "Incorrecta. La enfermedad tuberculosa requiere signos o síntomas activos y/o una radiografía anormal compatible (más allá de calcificaciones residuales) u otra manifestación extrapulmonar activa, ausentes en este caso.",
      },
      {
        letra: "C",
        texto: "Tuberculosis miliar",
        correcta: false,
        explicacion:
          "Incorrecta. La TB miliar implica diseminación hematógena activa a múltiples órganos con manifestaciones sistémicas (fiebre, pérdida de peso, hepatoesplenomegalia), ausentes en un paciente asintomático.",
      },
      {
        letra: "D",
        texto: "Falso positivo del PPD sin significado clínico",
        correcta: false,
        explicacion:
          "Incorrecta. Un PPD positivo con hallazgos radiográficos de infección previa (calcificaciones) es compatible con infección tuberculosa latente real, no con un resultado sin significado clínico.",
      },
    ],
    perla:
      "En niños, el intervalo entre tuberculosis latente y enfermedad activa puede ser de solo semanas (a diferencia de los adultos, donde puede tardar años); por eso en niños pequeños la distinción entre infección y enfermedad es menos clara y requiere vigilancia más estrecha.",
  },
  {
    tema: "Tuberculosis",
    dificultad: "Alta",
    enunciado:
      "Niño de 3 años, inmunocompetente, presenta fiebre de bajo grado, cefalea y cambio de personalidad de inicio insidioso, que progresa en días hacia alteración del estado de conciencia. La punción lumbar muestra pleocitosis moderada, glucosa baja y proteínas elevadas. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Meningitis tuberculosa",
        correcta: true,
        explicacion:
          "Correcta. La meningitis tuberculosa es más frecuente en niños menores de 5 años, típicamente dentro de los primeros 6 meses tras la infección primaria, con inicio insidioso (fiebre baja, cefalea, cambio de personalidad) que progresa hacia meningitis basilar con compromiso de pares craneales, hipertensión intracraneal y alteración del estado de conciencia; el LCR muestra pleocitosis, glucosa baja y proteínas elevadas.",
      },
      {
        letra: "B",
        texto: "Meningitis viral aséptica",
        correcta: false,
        explicacion:
          "Incorrecta. La meningitis viral típicamente cursa con glucosa normal en el LCR y un curso más agudo y benigno, a diferencia del inicio insidioso y la glucosa baja descritos en este caso.",
      },
      {
        letra: "C",
        texto: "Absceso cerebral piógeno",
        correcta: false,
        explicacion:
          "Incorrecta. El absceso cerebral suele presentarse con signos focales y datos de efecto de masa más que con el patrón insidioso de meningitis basilar y las alteraciones típicas de LCR descritas.",
      },
      {
        letra: "D",
        texto: "Meningitis bacteriana aguda no tuberculosa",
        correcta: false,
        explicacion:
          "Incorrecta. La meningitis bacteriana aguda típica tiene un inicio mucho más rápido y fulminante (horas), no el curso insidioso de días a semanas descrito, más característico de la etiología tuberculosa.",
      },
    ],
    perla:
      "La meningitis tuberculosa en niños pequeños es una emergencia con alta morbimortalidad si se retrasa el diagnóstico; los niños menores de 12 meses con sospecha de TB deben someterse a punción lumbar para evaluar compromiso del SNC, incluso sin signos meníngeos floridos.",
  },
  {
    tema: "Dengue",
    dificultad: "Media",
    enunciado:
      "Gestante de 28 semanas presenta cuadro clínico compatible con dengue, sin signos de alarma en el momento actual. ¿Cómo se clasifica este caso según la clasificación por grupos de riesgo?",
    opciones: [
      {
        letra: "A",
        texto: "Grupo B1: sin signos de alarma, pero con factor de riesgo (embarazo)",
        correcta: true,
        explicacion:
          "Correcta. El grupo B1 corresponde a pacientes sin signos de alarma pero con algún factor de riesgo asociado (embarazo, hipertensión, diabetes, edades extremas, daño renal, riesgo social); el embarazo por sí solo clasifica a la paciente en este grupo, requiriendo un seguimiento más estrecho que el grupo A.",
      },
      {
        letra: "B",
        texto: "Grupo A: sin signos de alarma y sin factores de riesgo",
        correcta: false,
        explicacion:
          "Incorrecta. El embarazo es un factor de riesgo reconocido que excluye la clasificación en grupo A, aun en ausencia de signos de alarma.",
      },
      {
        letra: "C",
        texto: "Grupo B2: con signos de alarma",
        correcta: false,
        explicacion:
          "Incorrecta. El caso especifica que no hay signos de alarma; el grupo B2 se reserva para pacientes que sí los presentan.",
      },
      {
        letra: "D",
        texto: "Grupo C: dengue grave",
        correcta: false,
        explicacion:
          "Incorrecta. El dengue grave (grupo C) implica complicaciones mayores como choque, sangrado severo o daño de órgano, no descritas en este caso.",
      },
    ],
    perla:
      "Clasificación de dengue por grupos: A (sin alarma, sin factores de riesgo) → B1 (sin alarma, con factores de riesgo como embarazo, edades extremas 1-65 años, comorbilidades) → B2 (con signos de alarma) → C (dengue grave). Los factores de riesgo determinan un seguimiento más cercano aunque no haya signos de alarma.",
  },
  {
    tema: "Infecciones osteoarticulares",
    dificultad: "Alta",
    enunciado:
      "Paciente presenta artritis séptica de rodilla en el posoperatorio inmediato de una artroscopia. ¿Cuál es el microorganismo que debe sospecharse con mayor probabilidad?",
    opciones: [
      {
        letra: "A",
        texto: "Staphylococcus epidermidis (coagulasa negativo)",
        correcta: true,
        explicacion:
          "Correcta. En la artritis séptica posoperatoria, el Staphylococcus epidermidis (coagulasa negativo), un colonizador habitual de la piel, es un patógeno frecuente por contaminación durante el procedimiento quirúrgico.",
      },
      {
        letra: "B",
        texto: "Staphylococcus aureus meticilino-resistente, por ser coagulasa negativo",
        correcta: false,
        explicacion:
          "Incorrecta. El S. aureus (incluido el MRSA) es coagulasa POSITIVO, no negativo; aunque también puede causar artritis séptica, la asociación específica con el contexto posoperatorio y la colonización cutánea apunta más al S. epidermidis.",
      },
      {
        letra: "C",
        texto: "Neisseria gonorrhoeae",
        correcta: false,
        explicacion:
          "Incorrecta. La artritis gonocócica es típica de pacientes sexualmente activos jóvenes, no del contexto posoperatorio directo de una artroscopia.",
      },
      {
        letra: "D",
        texto: "Mycobacterium tuberculosis",
        correcta: false,
        explicacion:
          "Incorrecta. La artritis tuberculosa tiene un curso crónico e insidioso, no el cuadro agudo posoperatorio descrito en este caso.",
      },
    ],
    perla:
      "Recordar la diferencia bioquímica: S. aureus es coagulasa POSITIVO y coloniza la mucosa nasal; S. epidermidis es coagulasa NEGATIVO y no coloniza la nariz, pero sí la piel, lo que explica su protagonismo en infecciones posquirúrgicas por contaminación directa del sitio operatorio.",
  },
  {
    tema: "Parasitosis",
    dificultad: "Media",
    enunciado:
      "Paciente presenta tos, disnea e infiltrados pulmonares migratorios con eosinofilia periférica marcada, en el contexto de una infección por Ascaris lumbricoides. ¿Cómo se denomina este cuadro y qué ciclo biológico lo explica?",
    opciones: [
      {
        letra: "A",
        texto: "Síndrome de Löffler, explicado por el ciclo de Loos",
        correcta: true,
        explicacion:
          "Correcta. El síndrome de Löffler es una neumonitis eosinofílica migratoria asociada al ciclo de Loos, en el cual el parásito (compartido por Necator, Strongyloides, Ascaris y Ancylostoma) sale del intestino, migra por vía sanguínea al pulmón, es deglutido y regresa al intestino, generando una reacción inflamatoria pulmonar transitoria durante su paso.",
      },
      {
        letra: "B",
        texto: "Síndrome de Churg-Strauss, explicado por una vasculitis alérgica",
        correcta: false,
        explicacion:
          "Incorrecta. El síndrome de Churg-Strauss es una vasculitis autoinmune con eosinofilia, no un fenómeno explicado por el ciclo migratorio de un parásito intestinal.",
      },
      {
        letra: "C",
        texto: "Síndrome de Katayama, típico de esquistosomiasis",
        correcta: false,
        explicacion:
          "Incorrecta. El síndrome de Katayama es la reacción de hipersensibilidad aguda a la esquistosomiasis, un parásito distinto con un ciclo biológico diferente al de Ascaris.",
      },
      {
        letra: "D",
        texto: "Síndrome de distrés respiratorio agudo por reacción tóxica directa del parásito",
        correcta: false,
        explicacion:
          "Incorrecta. El cuadro descrito no corresponde a una lesión pulmonar tóxica directa, sino a una reacción inflamatoria eosinofílica transitoria durante el paso migratorio del parásito por el pulmón (ciclo de Loos).",
      },
    ],
    perla:
      "El ciclo de Loos es compartido por varios helmintos (Necator, Strongyloides, Ascaris, Ancylostoma): larvas que migran del intestino al pulmón por vía sanguínea, son deglutidas y regresan al intestino para completar su ciclo; el paso pulmonar puede generar el síndrome de Löffler.",
  },
];

const CIRUGIA_QUESTIONS = [
  {
    tema: "Apendicitis aguda",
    dificultad: "Baja",
    enunciado:
      "Varón de 22 años presenta dolor abdominal que inició hace 18 horas como un malestar difuso periumbilical, y que en las últimas horas se ha localizado en el cuadrante inferior derecho, acompañado de náuseas y anorexia. ¿Cuál es el hallazgo de la historia clínica con mayor valor predictivo para el diagnóstico de apendicitis aguda?",
    opciones: [
      {
        letra: "A",
        texto: "La migración del dolor desde la región periumbilical hacia el cuadrante inferior derecho",
        correcta: true,
        explicacion:
          "Correcta. La migración del dolor (inicialmente periumbilical, luego localizado en cuadrante inferior derecho) es uno de los predictores clínicos más fuertes de apendicitis aguda, tanto en adultos como en niños.",
      },
      {
        letra: "B",
        texto: "La presencia de anorexia",
        correcta: false,
        explicacion:
          "Incorrecta. La anorexia es un síntoma común en apendicitis, pero es inespecífico y tiene menor valor predictivo que la migración característica del dolor.",
      },
      {
        letra: "C",
        texto: "La presencia de náuseas",
        correcta: false,
        explicacion:
          "Incorrecta. Las náuseas aumentan la sospecha diagnóstica cuando están presentes, pero por sí solas son menos específicas que el patrón de migración del dolor.",
      },
      {
        letra: "D",
        texto: "La duración total del dolor mayor a 12 horas",
        correcta: false,
        explicacion:
          "Incorrecta. La duración del dolor por sí sola no es tan predictiva como su patrón característico de migración desde la región periumbilical.",
      },
    ],
    perla:
      "La presentación 'clásica' completa (dolor periumbilical migratorio a FID + anorexia + náuseas + fiebre baja) solo se observa en aproximadamente la mitad de los pacientes; la migración del dolor es el hallazgo aislado más predictivo.",
  },
  {
    tema: "Apendicitis aguda",
    dificultad: "Media",
    enunciado:
      "Mujer de 26 años, gestante de 14 semanas, presenta dolor en fosa ilíaca derecha con sospecha clínica de apendicitis aguda. ¿Cuál es el estudio de imagen de primera línea más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Ecografía abdominal (transabdominal)",
        correcta: true,
        explicacion:
          "Correcta. En gestantes, la ecografía abdominal es el estudio de primera línea (evita la radiación de la TC), con buena sensibilidad y especificidad; si no es concluyente, la resonancia magnética sin contraste es la segunda línea.",
      },
      {
        letra: "B",
        texto: "Tomografía computarizada abdominopélvica con contraste",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque es el estudio de elección en adultos no gestantes, se evita en el embarazo por la exposición a radiación ionizante, prefiriendo la ecografía o la RM.",
      },
      {
        letra: "C",
        texto: "Radiografía simple de abdomen",
        correcta: false,
        explicacion:
          "Incorrecta. La radiografía simple tiene bajo rendimiento diagnóstico para apendicitis (es normal hasta en el 50% de los casos) y no es el estudio de elección en ningún grupo de pacientes.",
      },
      {
        letra: "D",
        texto: "Resonancia magnética con contraste intravenoso",
        correcta: false,
        explicacion:
          "Incorrecta. Cuando se requiere RM en el embarazo, se prefiere sin contraste; además, la ecografía sigue siendo el estudio de primera línea antes de considerar la RM.",
      },
    ],
    perla:
      "Primera línea de imagen según población: adultos no gestantes → TC con contraste; gestantes → ecografía transabdominal (con RM sin contraste como segunda línea); niños → ecografía (sensibilidad hasta 98% en manos expertas).",
  },
  {
    tema: "Apendicitis aguda",
    dificultad: "Media",
    enunciado:
      "Varón de 30 años con apendicitis aguda no complicada confirmada por imagen, hemodinámicamente estable. ¿Cuál es el manejo definitivo más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Apendicectomía temprana, idealmente dentro de las primeras 24 horas",
        correcta: true,
        explicacion:
          "Correcta. En la apendicitis no complicada, el manejo estándar es la apendicectomía temprana (dentro de las 24 horas), junto con antibióticos perioperatorios de profilaxis (una sola dosis IV 30-60 minutos antes de la cirugía).",
      },
      {
        letra: "B",
        texto: "Antibióticos orales ambulatorios sin cirugía, en todos los casos",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque el manejo médico exclusivo (antibióticos sin apendicectomía) es una opción posible y segura en casos seleccionados de apendicitis no complicada, no es el manejo estándar de primera elección y se asocia a mayor tasa de recurrencia; además, requiere selección cuidadosa del paciente.",
      },
      {
        letra: "C",
        texto: "Observación sin ningún tratamiento activo",
        correcta: false,
        explicacion:
          "Incorrecta. La apendicitis aguda, aunque no esté complicada, requiere una conducta activa (quirúrgica o, en casos seleccionados, antibiótica); la observación pura no es apropiada.",
      },
      {
        letra: "D",
        texto: "Apendicectomía de intervalo, diferida 6-8 semanas",
        correcta: false,
        explicacion:
          "Incorrecta. La apendicectomía de intervalo se reserva para casos de plastrón apendicular o apendicitis flemonosa/perforada tratada inicialmente sin cirugía, no para la apendicitis no complicada estándar, que se opera de forma temprana.",
      },
    ],
    perla:
      "Apendicitis no complicada → apendicectomía temprana (<24h) + antibiótico profiláctico perioperatorio único, sin necesidad de antibióticos postoperatorios. Apendicitis perforada/complicada → apendicectomía de emergencia + antibióticos postoperatorios por 3-5 días.",
  },
  {
    tema: "Apendicitis aguda",
    dificultad: "Media",
    enunciado:
      "Durante el examen físico de un paciente con sospecha de apendicitis, al presionar la fosa ilíaca izquierda se reproduce dolor en la fosa ilíaca derecha. ¿Cómo se denomina este signo y qué sugiere?",
    opciones: [
      {
        letra: "A",
        texto: "Signo de Rovsing; sugiere irritación peritoneal",
        correcta: true,
        explicacion:
          "Correcta. El signo de Rovsing consiste en dolor referido en la fosa ilíaca derecha al presionar la fosa ilíaca izquierda (el gas desplazado distiende el ciego), y es sugestivo de irritación peritoneal en el contexto de apendicitis.",
      },
      {
        letra: "B",
        texto: "Signo del psoas; sugiere apéndice retrocecal",
        correcta: false,
        explicacion:
          "Incorrecta. El signo del psoas se explora con la extensión de la cadera derecha (no presionando el lado izquierdo) y sugiere un apéndice de localización retrocecal.",
      },
      {
        letra: "C",
        texto: "Signo del obturador; sugiere apéndice pélvico",
        correcta: false,
        explicacion:
          "Incorrecta. El signo del obturador se evalúa con la rotación interna de la cadera derecha flexionada, y sugiere un apéndice de localización pélvica.",
      },
      {
        letra: "D",
        texto: "Signo de Blumberg; sugiere íleo paralítico",
        correcta: false,
        explicacion:
          "Incorrecta. El signo de Blumberg (rebote doloroso) se explora liberando bruscamente la presión sobre el abdomen, y también indica irritación peritoneal, pero no es el signo descrito en este caso ni se relaciona con íleo paralítico.",
      },
    ],
    perla:
      "Signos según localización del apéndice inflamado: Rovsing (irritación peritoneal general), psoas (retrocecal), obturador (pélvico) — cada uno ayuda a orientar la posición anatómica del apéndice.",
  },
  {
    tema: "Hernias de la pared abdominal",
    dificultad: "Media",
    enunciado:
      "Varón de 45 años presenta una tumoración inguinal reductible que protruye medial a los vasos epigástricos inferiores, a través del triángulo de Hesselbach. ¿Qué tipo de hernia es la más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Hernia inguinal directa",
        correcta: true,
        explicacion:
          "Correcta. La hernia inguinal directa protruye medial a los vasos epigástricos inferiores, a través del triángulo de Hesselbach, como consecuencia de una debilidad adquirida de la pared abdominal posterior; es más frecuente en pacientes de mayor edad.",
      },
      {
        letra: "B",
        texto: "Hernia inguinal indirecta",
        correcta: false,
        explicacion:
          "Incorrecta. La hernia indirecta es congénita, sale lateral a los vasos epigástricos inferiores a través del anillo inguinal profundo (por persistencia del conducto peritoneo-vaginal), no a través del triángulo de Hesselbach.",
      },
      {
        letra: "C",
        texto: "Hernia crural (femoral)",
        correcta: false,
        explicacion:
          "Incorrecta. La hernia crural protruye por debajo del ligamento inguinal, medial a los vasos femorales, en una localización distinta al triángulo de Hesselbach.",
      },
      {
        letra: "D",
        texto: "Hernia de Spiegel",
        correcta: false,
        explicacion:
          "Incorrecta. La hernia de Spiegel emerge por el borde lateral del músculo recto abdominal, en una localización distinta a la región inguinal descrita.",
      },
    ],
    perla:
      "Hernia indirecta: congénita, lateral a vasos epigástricos inferiores, entra por el anillo inguinal profundo (es la más frecuente en general). Hernia directa: adquirida, medial a vasos epigástricos inferiores, protruye por el triángulo de Hesselbach. En la práctica, el tratamiento quirúrgico es el mismo para ambas.",
  },
  {
    tema: "Hernias de la pared abdominal",
    dificultad: "Alta",
    enunciado:
      "Mujer de 68 años presenta una hernia localizada por debajo del ligamento inguinal y medial a los vasos femorales. ¿Cuál de las siguientes afirmaciones sobre este tipo de hernia es correcta?",
    opciones: [
      {
        letra: "A",
        texto: "Es más frecuente en mujeres y tiene mayor riesgo de estrangulación que la hernia inguinal",
        correcta: true,
        explicacion:
          "Correcta. La hernia crural (femoral) es más frecuente en mujeres y, por transitar a través de un canal más estrecho, tiene mayor riesgo de estrangulación en comparación con las hernias inguinales.",
      },
      {
        letra: "B",
        texto: "Es más frecuente en hombres y tiene menor riesgo de estrangulación",
        correcta: false,
        explicacion:
          "Incorrecta. Es al revés: la hernia crural predomina en mujeres y tiene mayor (no menor) riesgo de estrangulación debido a lo estrecho del canal crural.",
      },
      {
        letra: "C",
        texto: "Es de fácil diagnóstico clínico y rara vez se confunde con otras entidades",
        correcta: false,
        explicacion:
          "Incorrecta. La hernia crural puede ser difícil de examinar y en ocasiones se confunde con abscesos inguinales o adenopatías femorales, requiriendo estudios de imagen para diferenciarla.",
      },
      {
        letra: "D",
        texto: "No requiere tratamiento quirúrgico si es asintomática",
        correcta: false,
        explicacion:
          "Incorrecta. Dado su alto riesgo de complicarse con estrangulación, la conducta habitual ante una hernia crural es la reparación quirúrgica, independientemente de la presencia de síntomas.",
      },
    ],
    perla:
      "Hasta un 30% de las hernias crurales se manifiestan directamente como una emergencia quirúrgica (estrangulación); en mujeres con clínica de hernia inguinal, siempre se debe descartar activamente una hernia crural asociada.",
  },
  {
    tema: "Hernias de la pared abdominal",
    dificultad: "Alta",
    enunciado:
      "Paciente presenta una hernia en la que solo el borde antimesentérico del intestino protruye a través del defecto de la pared, sin ocupar toda la circunferencia de la luz intestinal. Clínicamente puede evolucionar a estrangulación sin producir signos francos de obstrucción intestinal. ¿Cómo se denomina este tipo de hernia?",
    opciones: [
      {
        letra: "A",
        texto: "Hernia de Richter",
        correcta: true,
        explicacion:
          "Correcta. La hernia de Richter se caracteriza porque solo el borde antimesentérico del intestino protruye a través del orificio herniario; esto permite que el intestino pueda estrangularse sin que se produzcan los signos típicos de obstrucción intestinal completa, ya que la luz intestinal permanece parcialmente permeable.",
      },
      {
        letra: "B",
        texto: "Hernia en pantalón",
        correcta: false,
        explicacion:
          "Incorrecta. La hernia en pantalón es la combinación simultánea de una hernia inguinal directa e indirecta en el mismo lado, un concepto anatómico distinto al descrito.",
      },
      {
        letra: "C",
        texto: "Hernia deslizada",
        correcta: false,
        explicacion:
          "Incorrecta. En la hernia deslizada, parte de la pared del saco herniario está formada por una víscera (como el ciego o el colon sigmoide), un mecanismo distinto al de la hernia de Richter.",
      },
      {
        letra: "D",
        texto: "Hernia de Spiegel",
        correcta: false,
        explicacion:
          "Incorrecta. La hernia de Spiegel se define por su localización anatómica (borde del músculo recto abdominal), no por el mecanismo de protrusión parcial de la pared intestinal.",
      },
    ],
    perla:
      "La hernia de Richter es peligrosa precisamente porque puede estrangularse sin causar obstrucción intestinal franca (náuseas, vómitos, distensión), retrasando el diagnóstico hasta que ya hay isquemia de la pared intestinal comprometida.",
  },
  {
    tema: "Hernias de la pared abdominal",
    dificultad: "Media",
    enunciado:
      "Varón de 55 años con hernia inguinal conocida presenta dolor abdominal tipo cólico progresivo, náuseas, vómitos, y en el examen la hernia se encuentra firme, tensa, irreductible, con eritema suprayacente. Además presenta fiebre y taquicardia. ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Cirugía de urgencia, sin intentar maniobras de reducción manual",
        correcta: true,
        explicacion:
          "Correcta. Los hallazgos (irreductibilidad, eritema, signos de sepsis) son compatibles con hernia estrangulada, una emergencia quirúrgica; no se debe intentar la reducción manual forzada porque podría reintroducir tejido isquémico o necrótico a la cavidad abdominal.",
      },
      {
        letra: "B",
        texto: "Intentar reducción manual enérgica de la hernia antes de decidir el manejo",
        correcta: false,
        explicacion:
          "Incorrecta. Ante signos de estrangulación (eritema, sepsis), la reducción manual forzada está contraindicada, ya que podría reintroducir intestino necrótico a la cavidad abdominal sin haber resuelto la causa isquémica.",
      },
      {
        letra: "C",
        texto: "Manejo ambulatorio con analgésicos y control en una semana",
        correcta: false,
        explicacion:
          "Incorrecta. Los signos descritos (irreductibilidad, eritema, fiebre, taquicardia) indican una emergencia quirúrgica; el manejo ambulatorio diferido pone en riesgo la vida del paciente.",
      },
      {
        letra: "D",
        texto: "Antibióticos orales exclusivamente, sin cirugía",
        correcta: false,
        explicacion:
          "Incorrecta. Una hernia estrangulada con signos de sepsis requiere cirugía urgente para resecar el tejido no viable y resolver la causa mecánica; los antibióticos solos no son suficientes.",
      },
    ],
    perla:
      "Diferenciar hernia incarcerada (irreductible, pero sin necesariamente comprometer la vascularización, puede ser asintomática) de hernia estrangulada (compromiso vascular con isquemia/necrosis, signos de sepsis) — esta última es una emergencia quirúrgica absoluta.",
  },
  {
    tema: "Patología anorrectal",
    dificultad: "Media",
    enunciado:
      "Paciente presenta hemorroides internas, localizadas proximales a la línea dentada. ¿Por qué estas hemorroides suelen tratarse con procedimientos ambulatorios con mínima o ninguna anestesia, a diferencia de las externas?",
    opciones: [
      {
        letra: "A",
        texto: "Porque el tejido proximal a la línea dentada tiene inervación visceral, menos sensible al dolor",
        correcta: true,
        explicacion:
          "Correcta. Los tejidos proximales a la línea dentada (hemorroides internas) reciben inervación visceral, mucho menos sensible al dolor y la irritación que la inervación somática; por eso pueden tratarse con procedimientos ambulatorios (como la ligadura con banda elástica) sin necesidad de anestesia.",
      },
      {
        letra: "B",
        texto: "Porque las hemorroides internas nunca sangran ni se complican",
        correcta: false,
        explicacion:
          "Incorrecta. Las hemorroides internas sí pueden sangrar (de hecho, el sangrado indoloro es su síntoma más frecuente) y complicarse con prolapso; el motivo del manejo ambulatorio es la inervación, no la ausencia de complicaciones.",
      },
      {
        letra: "C",
        texto: "Porque siempre son de mayor tamaño que las externas",
        correcta: false,
        explicacion:
          "Incorrecta. El tamaño no es el factor determinante para el tipo de manejo; lo relevante es la ubicación respecto a la línea dentada y el tipo de inervación asociada.",
      },
      {
        letra: "D",
        texto: "Porque no requieren ningún tipo de seguimiento posterior",
        correcta: false,
        explicacion:
          "Incorrecta. Todas las hemorroides tratadas requieren seguimiento para vigilar la resolución de síntomas y descartar complicaciones o recurrencia.",
      },
    ],
    perla:
      "Línea dentada como referencia clave: por encima (hemorroides internas) = inervación visceral, poco dolor, tratamiento ambulatorio; por debajo (hemorroides externas) = inervación somática, mucho dolor, generalmente tratamiento quirúrgico bajo anestesia.",
  },
  {
    tema: "Patología anorrectal",
    dificultad: "Alta",
    enunciado:
      "Paciente con hemorroides internas grado III, sintomáticas, refractarias al tratamiento conservador con fibra y modificaciones dietéticas. No tiene coagulopatía, no usa anticoagulantes ni tiene hipertensión portal. ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Intentar ligadura con banda elástica antes de considerar cirugía",
        correcta: true,
        explicacion:
          "Correcta. Para hemorroides internas grado I, II o III refractarias al manejo conservador, se recomienda un procedimiento ambulatorio (preferentemente ligadura con banda elástica) como intervención inicial, reservando la cirugía para cuando este procedimiento no sea efectivo.",
      },
      {
        letra: "B",
        texto: "Ir directo a hemorroidectomía quirúrgica sin intentar procedimientos ambulatorios",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque algunos cirujanos prefieren la cirugía directa en hemorroides grado III con múltiples pedículos, la recomendación general es intentar primero la ligadura con banda elástica, ya que su recuperación es considerablemente más fácil que la de la hemorroidectomía.",
      },
      {
        letra: "C",
        texto: "Escleroterapia como primera opción en este paciente",
        correcta: false,
        explicacion:
          "Incorrecta. La escleroterapia se prefiere específicamente en pacientes con anticoagulación, inmunocompromiso o hipertensión portal; en un paciente sin esos factores de riesgo, la ligadura con banda elástica es más efectiva y requiere menos sesiones de tratamiento.",
      },
      {
        letra: "D",
        texto: "Continuar únicamente con tratamiento conservador de forma indefinida",
        correcta: false,
        explicacion:
          "Incorrecta. El paciente ya es refractario al tratamiento conservador; continuar solo con esa estrategia no está indicado cuando existen procedimientos ambulatorios efectivos disponibles.",
      },
    ],
    perla:
      "Jerarquía de manejo en hemorroides internas grado I-III refractarias: ligadura con banda elástica (primera línea, más efectiva y con menos sesiones que otras técnicas ambulatorias) → cirugía si falla. El grado IV requiere cirugía directamente, ya que los procedimientos ambulatorios son inefectivos en ese grado.",
  },
  {
    tema: "Patología anorrectal",
    dificultad: "Alta",
    enunciado:
      "Paciente en tratamiento anticoagulante con warfarina por fibrilación auricular presenta hemorroides internas grado II con sangrado persistente a pesar de manejo conservador. ¿Cuál es el procedimiento ambulatorio más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Escleroterapia",
        correcta: true,
        explicacion:
          "Correcta. En pacientes anticoagulados, inmunocomprometidos o con hipertensión portal, se prefiere la escleroterapia sobre la ligadura con banda elástica, ya que esta última se asocia a alto riesgo de sangrado tardío cuando se desprende la banda.",
      },
      {
        letra: "B",
        texto: "Ligadura con banda elástica",
        correcta: false,
        explicacion:
          "Incorrecta. La ligadura con banda elástica está contraindicada en pacientes anticoagulados por el riesgo de hemorragia tardía significativa cuando se desprende la banda (típicamente entre el día 2 y 7 tras el procedimiento).",
      },
      {
        letra: "C",
        texto: "Suspender la warfarina y proceder con hemorroidectomía quirúrgica de rutina",
        correcta: false,
        explicacion:
          "Incorrecta. No es necesario suspender la anticoagulación para un manejo conservador de bajo riesgo como la escleroterapia; la suspensión se reserva para procedimientos de mayor riesgo de sangrado como la ligadura o la cirugía, cuando son estrictamente necesarios.",
      },
      {
        letra: "D",
        texto: "Coagulación con infrarrojo como primera opción en este contexto",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque no está formalmente contraindicada, la escleroterapia está mejor estudiada específicamente en pacientes anticoagulados, inmunocomprometidos o con hipertensión portal.",
      },
    ],
    perla:
      "La ligadura con banda elástica está contraindicada en anticoagulación/antiagregación, hipertensión portal e inmunocompromiso relativo, por riesgo de sangrado tardío o sepsis; en estos grupos, la escleroterapia es la alternativa ambulatoria preferida.",
  },
  {
    tema: "Patología anorrectal",
    dificultad: "Alta",
    enunciado:
      "Paciente que fue sometido a ligadura con banda elástica por hemorroides internas acude 4 días después con dolor intenso, retención urinaria y fiebre. ¿Cuál es la complicación que debe sospecharse con máxima prioridad?",
    opciones: [
      {
        letra: "A",
        texto: "Sepsis perineal/pélvica",
        correcta: true,
        explicacion:
          "Correcta. La tríada de dolor severo, retención urinaria y fiebre tras un procedimiento ambulatorio anorrectal es la presentación clásica de la sepsis perineal, una complicación rara pero potencialmente mortal que requiere evaluación urgente.",
      },
      {
        letra: "B",
        texto: "Trombosis hemorroidal simple, de manejo conservador",
        correcta: false,
        explicacion:
          "Incorrecta. La combinación específica de fiebre y retención urinaria junto con dolor intenso va más allá de una trombosis hemorroidal simple y obliga a descartar sepsis perineal.",
      },
      {
        letra: "C",
        texto: "Estreñimiento postoperatorio simple",
        correcta: false,
        explicacion:
          "Incorrecta. El estreñimiento no explica la fiebre ni la retención urinaria; estos hallazgos indican un proceso infeccioso grave, no una simple dificultad para evacuar.",
      },
      {
        letra: "D",
        texto: "Reacción alérgica local al material de la banda elástica",
        correcta: false,
        explicacion:
          "Incorrecta. Una reacción alérgica local no explicaría la tríada sistémica de dolor severo, retención urinaria y fiebre; este cuadro es indicativo de un proceso séptico.",
      },
    ],
    perla:
      "Ante cualquier paciente con dolor severo, retención urinaria y fiebre después de un procedimiento ambulatorio anorrectal, se debe descartar sepsis perineal de inmediato — es una complicación rara pero con potencial de ser mortal si no se trata a tiempo.",
  },
  {
    tema: "Patología anorrectal",
    dificultad: "Media",
    enunciado:
      "Mujer en el tercer trimestre de embarazo presenta hemorroides sintomáticas con molestia y prurito leve, sin sangrado intratable ni trombosis extensa. ¿Cuál es el manejo más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Manejo conservador (dieta, hidratación, laxantes suaves) ya que los síntomas suelen mejorar tras el parto",
        correcta: true,
        explicacion:
          "Correcta. En el embarazo, el tratamiento de las hemorroides sintomáticas es primariamente conservador (modificaciones dietéticas y de estilo de vida, laxantes suaves para evitar el estreñimiento), ya que los síntomas generalmente mejoran después del parto; la cirugía se reserva para casos de hemorroides estranguladas, extensamente trombosadas, o sangrado intratable.",
      },
      {
        letra: "B",
        texto: "Hemorroidectomía quirúrgica programada antes del parto",
        correcta: false,
        explicacion:
          "Incorrecta. La cirugía rara vez es necesaria durante el embarazo y se reserva para casos complicados (estrangulación, trombosis extensa, sangrado intratable), no para síntomas leves-moderados.",
      },
      {
        letra: "C",
        texto: "Ligadura con banda elástica de rutina durante el embarazo",
        correcta: false,
        explicacion:
          "Incorrecta. Los procedimientos ambulatorios no son el manejo de primera línea durante el embarazo para síntomas leves; se prioriza el manejo conservador dado que los síntomas tienden a mejorar espontáneamente tras el parto.",
      },
      {
        letra: "D",
        texto: "Uso prolongado e indefinido de esteroides tópicos de alta potencia",
        correcta: false,
        explicacion:
          "Incorrecta. Los esteroides tópicos no deben usarse por más de una semana en ningún paciente por riesgo de atrofia de la mucosa, y en el embarazo se recomienda usar medicamentos tópicos con precaución adicional por la falta de datos de seguridad a largo plazo.",
      },
    ],
    perla:
      "La prevalencia de hemorroides sintomáticas durante el embarazo es de 25-35%, siendo más frecuente en el tercer trimestre y el posparto inmediato; el manejo conservador es la norma, ya que los síntomas suelen resolver espontáneamente después del parto.",
  },
  {
    tema: "Tumores apendiculares",
    dificultad: "Alta",
    enunciado:
      "Durante una apendicectomía por apendicitis aguda se encuentra incidentalmente un tumor carcinoide de 1.2 cm en la punta del apéndice, sin invasión de la base ni del mesenterio. ¿Cuál es el manejo quirúrgico más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Apendicectomía simple, sin necesidad de cirugía adicional",
        correcta: true,
        explicacion:
          "Correcta. Los tumores carcinoides apendiculares menores de 2 cm, sin invasión de la base ni del mesenterio, tienen bajo riesgo de metástasis, por lo que la apendicectomía simple es suficiente y curativa.",
      },
      {
        letra: "B",
        texto: "Hemicolectomía derecha de manera sistemática",
        correcta: false,
        explicacion:
          "Incorrecta. La hemicolectomía derecha se reserva para tumores carcinoides apendiculares ≥2 cm o con invasión de la base/mesenterio, criterios no cumplidos en este caso (1.2 cm, sin invasión).",
      },
      {
        letra: "C",
        texto: "Quimioterapia adyuvante sistemática tras la apendicectomía",
        correcta: false,
        explicacion:
          "Incorrecta. Un tumor carcinoide apendicular pequeño y de bajo riesgo, completamente resecado, no requiere quimioterapia adyuvante.",
      },
      {
        letra: "D",
        texto: "Reintervención en 6 semanas para ampliar márgenes independientemente del tamaño",
        correcta: false,
        explicacion:
          "Incorrecta. La decisión de ampliar la cirugía (a hemicolectomía) depende específicamente del tamaño (≥2 cm) y la invasión de la base/mesenterio, criterios que no se cumplen en este tumor de 1.2 cm sin invasión.",
      },
    ],
    perla:
      "Manejo del tumor carcinoide apendicular según tamaño: <2 cm y sin invasión de base/mesenterio → apendicectomía simple; ≥2 cm o con invasión → hemicolectomía derecha, por mayor riesgo de diseminación linfática.",
  },
  {
    tema: "Complicaciones quirúrgicas",
    dificultad: "Alta",
    enunciado:
      "Paciente sometido a resección transuretral de próstata (RTU) prolongada (más de 90 minutos) presenta confusión, náuseas y convulsiones en el posoperatorio inmediato, con hiponatremia severa en los exámenes. ¿Cuál es el mecanismo fisiopatológico de este cuadro?",
    opciones: [
      {
        letra: "A",
        texto: "Síndrome post-RTU por absorción de solución de irrigación hipotónica, causando hiponatremia dilucional y edema cerebral",
        correcta: true,
        explicacion:
          "Correcta. El síndrome post-RTU se produce por la absorción sistémica de grandes volúmenes de solución de irrigación hipotónica durante cirugías prolongadas, generando hiponatremia dilucional que puede llevar a edema cerebral; el riesgo aumenta significativamente cuando la cirugía supera aproximadamente una hora de duración.",
      },
      {
        letra: "B",
        texto: "Sepsis urinaria por contaminación del campo quirúrgico",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque la sepsis urinaria es una complicación posible tras procedimientos urológicos, el cuadro descrito (hiponatremia severa relacionada con la duración de la cirugía) es característico específicamente del síndrome post-RTU, no de un proceso séptico.",
      },
      {
        letra: "C",
        texto: "Embolia pulmonar masiva",
        correcta: false,
        explicacion:
          "Incorrecta. La embolia pulmonar se manifestaría con disnea aguda e hipoxemia, no con el cuadro neurológico asociado a hiponatremia severa descrito.",
      },
      {
        letra: "D",
        texto: "Reacción alérgica al material de sutura",
        correcta: false,
        explicacion:
          "Incorrecta. No hay relación entre una reacción alérgica local y el cuadro sistémico de hiponatremia con síntomas neurológicos descrito.",
      },
    ],
    perla:
      "Para prevenir el síndrome post-RTU, se recomienda que la duración de la cirugía sea menor a una hora; cuanto más prolongado el procedimiento, mayor es el volumen de solución hipotónica absorbido y mayor el riesgo de hiponatremia dilucional sintomática.",
  },
  {
    tema: "Toxicología",
    dificultad: "Media",
    enunciado:
      "Trabajador de una planta de extracción de oro presenta temblor de intención, irritabilidad, ansiedad marcada (eretismo) y estomatitis. ¿Cuál es la exposición tóxica más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Vapor de mercurio elemental",
        correcta: true,
        explicacion:
          "Correcta. La exposición crónica al vapor de mercurio elemental (la forma más peligrosa del mercurio) produce la tríada clásica de temblor de intención, eretismo (irritabilidad, ansiedad, cambios de personalidad) y estomatitis.",
      },
      {
        letra: "B",
        texto: "Plomo",
        correcta: false,
        explicacion:
          "Incorrecta. El plomo produce saturnismo, con manifestaciones como anemia, dolor abdominal y neuropatía, no la tríada específica de temblor-eretismo-estomatitis descrita.",
      },
      {
        letra: "C",
        texto: "Cadmio",
        correcta: false,
        explicacion:
          "Incorrecta. El cadmio se asocia principalmente a daño renal y pulmonar crónico, no al cuadro neuropsiquiátrico y mucoso descrito.",
      },
      {
        letra: "D",
        texto: "Oro metálico",
        correcta: false,
        explicacion:
          "Incorrecta. El oro, a diferencia de los otros metales pesados mencionados, no genera clínica tóxica relevante en este contexto.",
      },
    ],
    perla:
      "Entre los metales pesados tóxicos clásicos (arsénico, mercurio, plomo, cadmio), el mercurio en su forma de vapor elemental es la más peligrosa neurológicamente, con la tríada característica de temblor de intención, eretismo y estomatitis.",
  },
];

const GINECOLOGIA_QUESTIONS = [
  {
    tema: "Hemorragia uterina anormal",
    dificultad: "Media",
    enunciado:
      "Mujer de 32 años refiere sangrado menstrual de más de 80 mL por ciclo, con una duración dentro de los 7 días habituales, en ciclos regulares. ¿Cómo se denomina este patrón de sangrado?",
    opciones: [
      {
        letra: "A",
        texto: "Hipermenorrea",
        correcta: true,
        explicacion:
          "Correcta. La hipermenorrea se define como un sangrado menstrual de más de 80 mL, dentro de la duración habitual (hasta 7 días); es distinta de la menorragia, que implica prolongación de la duración del sangrado más allá de 7 días.",
      },
      {
        letra: "B",
        texto: "Menorragia",
        correcta: false,
        explicacion:
          "Incorrecta. La menorragia se refiere específicamente a una duración del sangrado mayor a 7 días, no solo a un mayor volumen dentro de la duración habitual.",
      },
      {
        letra: "C",
        texto: "Polimenorrea",
        correcta: false,
        explicacion:
          "Incorrecta. La polimenorrea se refiere a intervalos intermenstruales acortados (menos de 21 días), con cantidad y duración del sangrado normales, no a un mayor volumen del sangrado.",
      },
      {
        letra: "D",
        texto: "Metrorragia",
        correcta: false,
        explicacion:
          "Incorrecta. La metrorragia (sangrado intermenstrual) es un sangrado no cíclico, fuera del periodo menstrual esperado, distinto del patrón cíclico con mayor volumen descrito en este caso.",
      },
    ],
    perla:
      "Terminología clave: hipermenorrea = mayor volumen (>80 mL) en duración normal; menorragia = mayor duración (>7 días); polimenorrea = ciclos más frecuentes (<21 días); metrorragia = sangrado no cíclico, fuera de la menstruación.",
  },
  {
    tema: "Hemorragia uterina anormal",
    dificultad: "Alta",
    enunciado:
      "Mujer de 47 años, perimenopáusica, presenta sangrado uterino no cíclico, de duración e intensidad variable, sin síndrome premenstrual, tras un periodo previo de amenorrea de 6-8 semanas. ¿Cuál es el mecanismo más probable de este sangrado?",
    opciones: [
      {
        letra: "A",
        texto: "Hemorragia uterina disfuncional de tipo anovulatorio",
        correcta: true,
        explicacion:
          "Correcta. La hemorragia disfuncional anovulatoria es más frecuente en la perimenopausia y en la pubertad, producida por estímulo estrogénico continuo sin oposición de progesterona; es no cíclica, de duración e intensidad variable, sin síndrome premenstrual, y suele presentarse tras periodos de amenorrea.",
      },
      {
        letra: "B",
        texto: "Hemorragia uterina disfuncional de tipo ovulatorio",
        correcta: false,
        explicacion:
          "Incorrecta. La forma ovulatoria es típica de mujeres de 20-40 años, es cíclica, se asocia a polimenorrea o hipermenorrea, y sí presenta síndrome premenstrual — un patrón distinto al descrito.",
      },
      {
        letra: "C",
        texto: "Miomatosis uterina submucosa",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque los miomas pueden causar sangrado anormal, el patrón específicamente no cíclico tras amenorrea prolongada en la perimenopausia orienta primero al mecanismo hormonal disfuncional anovulatorio.",
      },
      {
        letra: "D",
        texto: "Amenaza de aborto",
        correcta: false,
        explicacion:
          "Incorrecta. No hay ningún dato en el caso que sugiera un embarazo en curso; el contexto (perimenopausia, patrón típico) orienta a causa disfuncional, no gestacional.",
      },
    ],
    perla:
      "La hemorragia uterina disfuncional anovulatoria es la causa más frecuente de sangrado uterino anormal en general, y predomina en los extremos de la vida reproductiva (pubertad y perimenopausia).",
  },
  {
    tema: "Enfermedad pélvica inflamatoria",
    dificultad: "Media",
    enunciado:
      "Mujer de 24 años, sexualmente activa, presenta dolor abdominal bajo bilateral que inició durante la menstruación, junto con descarga vaginal mucopurulenta. Al examen se palpa dolor a la movilización cervical, y la temperatura oral es de 38.5°C. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Enfermedad pélvica inflamatoria (EPI)",
        correcta: true,
        explicacion:
          "Correcta. El dolor abdominal bajo bilateral, la descarga mucopurulenta y la fiebre >38.3°C son hallazgos que aportan especificidad al diagnóstico clínico de enfermedad pélvica inflamatoria, una infección ascendente del tracto reproductivo superior.",
      },
      {
        letra: "B",
        texto: "Apendicitis aguda",
        correcta: false,
        explicacion:
          "Incorrecta. La apendicitis típicamente causa dolor unilateral en fosa ilíaca derecha sin descarga vaginal mucopurulenta ni dolor a la movilización cervical.",
      },
      {
        letra: "C",
        texto: "Quiste ovárico simple no complicado",
        correcta: false,
        explicacion:
          "Incorrecta. Un quiste ovárico simple no suele producir fiebre ni descarga mucopurulenta; estos hallazgos orientan a un proceso infeccioso pélvico.",
      },
      {
        letra: "D",
        texto: "Cistitis no complicada",
        correcta: false,
        explicacion:
          "Incorrecta. La cistitis se manifiesta con síntomas urinarios (disuria, frecuencia) más que con dolor pélvico bilateral y descarga cervical mucopurulenta.",
      },
    ],
    perla:
      "Hallazgos que añaden especificidad al diagnóstico clínico de EPI: temperatura oral >38.3°C, descarga mucopurulenta cervical, leucocitos abundantes en secreciones vaginales, y VSG o PCR elevados. La mayoría de los casos de EPI son subclínicos y quedan subdiagnosticados.",
  },
  {
    tema: "Enfermedad pélvica inflamatoria",
    dificultad: "Alta",
    enunciado:
      "Mujer con enfermedad pélvica inflamatoria presenta además dolor en el cuadrante superior derecho del abdomen. ¿Cómo se denomina esta complicación y cuál es su mecanismo?",
    opciones: [
      {
        letra: "A",
        texto: "Síndrome de Fitz-Hugh-Curtis, por perihepatitis asociada",
        correcta: true,
        explicacion:
          "Correcta. El síndrome de Fitz-Hugh-Curtis es una perihepatitis que se produce como complicación de la EPI, en la que el proceso infeccioso/inflamatorio se disemina hasta la cápsula hepática, generando dolor en el cuadrante superior derecho.",
      },
      {
        letra: "B",
        texto: "Colecistitis aguda concomitante no relacionada",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque el dolor en hipocondrio derecho podría hacer pensar en patología biliar, en el contexto de una EPI conocida el síndrome de Fitz-Hugh-Curtis es la explicación más probable y específica.",
      },
      {
        letra: "C",
        texto: "Absceso tubo-ovárico roto",
        correcta: false,
        explicacion:
          "Incorrecta. El absceso tubo-ovárico roto produce típicamente signos de abdomen agudo y shock séptico, no específicamente dolor aislado en cuadrante superior derecho como manifestación característica.",
      },
      {
        letra: "D",
        texto: "Pancreatitis aguda asociada",
        correcta: false,
        explicacion:
          "Incorrecta. No existe una asociación característica entre EPI y pancreatitis; el dolor en hipocondrio derecho en el contexto de EPI apunta específicamente a perihepatitis.",
      },
    ],
    perla:
      "El síndrome de Fitz-Hugh-Curtis (perihepatitis) es una complicación reconocida de la EPI, generalmente por diseminación de Chlamydia trachomatis o Neisseria gonorrhoeae hacia la cápsula hepática.",
  },
  {
    tema: "Enfermedad pélvica inflamatoria",
    dificultad: "Media",
    enunciado:
      "Mujer de 26 años con diagnóstico de EPI leve-moderada, hemodinámicamente estable, sin datos de absceso tubo-ovárico ni embarazo. ¿Cuál es el manejo más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Manejo ambulatorio con ceftriaxona en dosis única más doxiciclina (con o sin metronidazol)",
        correcta: true,
        explicacion:
          "Correcta. En EPI leve a moderada sin criterios de hospitalización, el manejo ambulatorio con ceftriaxona en dosis única asociada a doxiciclina (con o sin metronidazol) es una de las pautas de elección.",
      },
      {
        letra: "B",
        texto: "Hospitalización obligatoria en todos los casos de EPI",
        correcta: false,
        explicacion:
          "Incorrecta. La hospitalización se reserva para casos graves (shock séptico, absceso tubo-ovárico roto, imposibilidad de manejo oral, embarazo, falta de respuesta al tratamiento ambulatorio), no para todos los casos de EPI.",
      },
      {
        letra: "C",
        texto: "Observación sin antibióticos hasta confirmar cultivo",
        correcta: false,
        explicacion:
          "Incorrecta. El diagnóstico de EPI es fundamentalmente clínico y el tratamiento antibiótico empírico debe iniciarse sin demora para evitar secuelas como infertilidad o dolor pélvico crónico.",
      },
      {
        letra: "D",
        texto: "Analgesia únicamente, sin cobertura antibiótica",
        correcta: false,
        explicacion:
          "Incorrecta. La EPI es una infección que requiere tratamiento antibiótico dirigido; el manejo exclusivamente sintomático no trata la causa ni previene las complicaciones.",
      },
    ],
    perla:
      "El tratamiento temprano de la EPI es clave para prevenir secuelas a largo plazo como infertilidad tubárica, embarazo ectópico y dolor pélvico crónico; el umbral para iniciar tratamiento empírico debe ser bajo ante la sospecha clínica.",
  },
  {
    tema: "Patología endometrial",
    dificultad: "Media",
    enunciado:
      "Mujer posmenopáusica presenta sangrado uterino anormal. La ecografía transvaginal muestra un grosor endometrial de 6 mm. ¿Qué se debe sospechar y cuál es el punto de corte ecográfico relevante en la posmenopausia?",
    opciones: [
      {
        letra: "A",
        texto: "Hiperplasia endometrial; se sospecha con un endometrio mayor a 4 mm en la posmenopausia",
        correcta: true,
        explicacion:
          "Correcta. En una mujer posmenopáusica con sangrado uterino anormal, un grosor endometrial mayor a 4 mm por ecografía obliga a sospechar hiperplasia endometrial (u otra patología endometrial) y a completar el estudio, habitualmente con biopsia endometrial.",
      },
      {
        letra: "B",
        texto: "Hallazgo ecográfico normal para la edad, sin necesidad de más estudios",
        correcta: false,
        explicacion:
          "Incorrecta. En la posmenopausia, el endometrio normal suele ser delgado (atrófico); un grosor de 6 mm supera el punto de corte de 4 mm y amerita evaluación adicional, no debe considerarse normal sin más estudio.",
      },
      {
        letra: "C",
        texto: "Miomatosis uterina submucosa exclusivamente",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque los miomas submucosos pueden causar sangrado, el hallazgo ecográfico descrito (grosor endometrial aumentado) orienta primero a patología endometrial (hiperplasia o neoplasia), no específicamente a miomatosis.",
      },
      {
        letra: "D",
        texto: "Embarazo ectópico",
        correcta: false,
        explicacion:
          "Incorrecta. El embarazo ectópico no es una consideración diagnóstica en una mujer posmenopáusica.",
      },
    ],
    perla:
      "En mujeres posmenopáusicas con sangrado uterino anormal, un endometrio >4 mm por ecografía transvaginal es el punto de corte que obliga a descartar hiperplasia o neoplasia endometrial mediante biopsia.",
  },
  {
    tema: "Enfermedad trofoblástica gestacional",
    dificultad: "Alta",
    enunciado:
      "Paciente con antecedente de mola hidatiforme desarrolla una neoplasia trofoblástica gestacional maligna con metástasis pulmonares confirmadas por imagen, sin evidencia de compromiso cerebral ni hepático. ¿A qué estadio FIGO corresponde este caso?",
    opciones: [
      {
        letra: "A",
        texto: "Estadio III",
        correcta: true,
        explicacion:
          "Correcta. En la estadificación FIGO del coriocarcinoma gestacional: estadio I (limitado al útero), estadio II (extensión a la pelvis), estadio III (metástasis pulmonares), estadio IV (metástasis cerebrales o hepáticas). La afectación pulmonar aislada corresponde al estadio III.",
      },
      {
        letra: "B",
        texto: "Estadio I",
        correcta: false,
        explicacion:
          "Incorrecta. El estadio I corresponde a enfermedad limitada al útero, sin metástasis a distancia como las pulmonares descritas en este caso.",
      },
      {
        letra: "C",
        texto: "Estadio II",
        correcta: false,
        explicacion:
          "Incorrecta. El estadio II corresponde a extensión pélvica, no a metástasis pulmonares.",
      },
      {
        letra: "D",
        texto: "Estadio IV",
        correcta: false,
        explicacion:
          "Incorrecta. El estadio IV se reserva para metástasis cerebrales o hepáticas, ausentes en este caso (solo hay compromiso pulmonar).",
      },
    ],
    perla:
      "La mola hidatiforme es la forma benigna de enfermedad trofoblástica gestacional; el coriocarcinoma gestacional y la mola invasiva son las formas malignas. Estadificación FIGO: I-útero, II-pelvis, III-pulmón, IV-cerebro o hígado.",
  },
  {
    tema: "Patología uterina benigna",
    dificultad: "Media",
    enunciado:
      "Mujer de 42 años presenta hipermenorrea y dismenorrea progresiva, con un útero difusamente aumentado de tamaño, globuloso y de ecoestructura heterogénea en la ecografía, sin lesiones focales delimitadas. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Adenomiosis",
        correcta: true,
        explicacion:
          "Correcta. La adenomiosis se caracteriza por hipermenorrea y dismenorrea, con un útero globuloso, aumentado de tamaño y de ecoestructura heterogénea (sin lesiones focales bien delimitadas como en los miomas), debido a la implantación de tejido endometrial dentro del miometrio.",
      },
      {
        letra: "B",
        texto: "Miomatosis uterina",
        correcta: false,
        explicacion:
          "Incorrecta. Los miomas típicamente se visualizan como lesiones focales bien delimitadas dentro del útero, a diferencia del patrón difuso y heterogéneo descrito, más característico de la adenomiosis.",
      },
      {
        letra: "C",
        texto: "Endometriosis pélvica exclusivamente",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque la endometriosis y la adenomiosis comparten mecanismo fisiopatológico (tejido endometrial ectópico), la endometriosis se localiza fuera del útero, mientras que el cuadro descrito (útero globuloso y heterogéneo) es característico de la adenomiosis.",
      },
      {
        letra: "D",
        texto: "Pólipo endometrial",
        correcta: false,
        explicacion:
          "Incorrecta. Un pólipo endometrial se visualiza como una lesión focal dentro de la cavidad uterina, no como un aumento difuso y heterogéneo de todo el útero.",
      },
    ],
    perla:
      "La adenomiosis se define por la implantación de tejido endometrial dentro del miometrio, produciendo un útero globuloso, aumentado de tamaño, con ecoestructura heterogénea difusa (a diferencia de los miomas, que son lesiones focales bien delimitadas).",
  },
];

const NEUROLOGIA_QUESTIONS = [
  {
    tema: "Enfermedad de Parkinson",
    dificultad: "Media",
    enunciado:
      "Paciente con enfermedad de Parkinson inicia tratamiento con levodopa combinada con carbidopa. ¿Cuál es la razón principal de esta combinación?",
    opciones: [
      {
        letra: "A",
        texto: "La carbidopa inhibe la descarboxilasa periférica, aumentando la cantidad de levodopa que llega al cerebro y reduciendo efectos adversos periféricos",
        correcta: true,
        explicacion:
          "Correcta. La carbidopa inhibe la enzima descarboxilasa de aminoácidos aromáticos a nivel periférico (no cruza la barrera hematoencefálica), lo que evita que la levodopa se convierta en dopamina fuera del cerebro; esto aumenta la fracción de levodopa disponible para cruzar al SNC y reduce efectos adversos periféricos como náuseas e hipotensión.",
      },
      {
        letra: "B",
        texto: "La carbidopa por sí sola trata directamente los síntomas motores del Parkinson",
        correcta: false,
        explicacion:
          "Incorrecta. La carbidopa no tiene efecto antiparkinsoniano directo; su función es exclusivamente potenciar la disponibilidad de la levodopa administrada junto con ella.",
      },
      {
        letra: "C",
        texto: "La combinación evita completamente el desarrollo de discinesias a largo plazo",
        correcta: false,
        explicacion:
          "Incorrecta. A pesar de la combinación con carbidopa, el uso prolongado de levodopa se asocia con el desarrollo de complicaciones motoras como discinesias en un porcentaje relevante de pacientes tras varios años de tratamiento.",
      },
      {
        letra: "D",
        texto: "La carbidopa permite administrar dopamina directamente por vía oral",
        correcta: false,
        explicacion:
          "Incorrecta. La dopamina administrada directamente no es eficaz porque no atraviesa la barrera hematoencefálica; por eso se usa su precursor, la levodopa, que sí puede cruzarla mediante el transportador de aminoácidos neutros.",
      },
    ],
    perla:
      "La dopamina no puede administrarse directamente porque no cruza la barrera hematoencefálica; se usa su precursor levodopa (que sí la cruza), combinada con carbidopa (inhibidor periférico de la descarboxilasa) para maximizar la cantidad que llega al cerebro.",
  },
  {
    tema: "Enfermedad de Parkinson",
    dificultad: "Alta",
    enunciado:
      "Paciente en tratamiento con un inhibidor de la COMT para potenciar el efecto de la levodopa requiere monitorización estrecha de la función hepática. ¿A cuál de los siguientes fármacos corresponde esta advertencia?",
    opciones: [
      {
        letra: "A",
        texto: "Tolcapona",
        correcta: true,
        explicacion:
          "Correcta. La tolcapona, a diferencia de la entacapona, es liposoluble, atraviesa la barrera hematoencefálica y tiene una vida media más larga, pero se asocia a riesgo de hepatotoxicidad, por lo que requiere monitorización de la función hepática durante su uso.",
      },
      {
        letra: "B",
        texto: "Entacapona",
        correcta: false,
        explicacion:
          "Incorrecta. La entacapona es un inhibidor selectivo de la COMT, no cruza la barrera hematoencefálica y no se asocia al mismo riesgo de hepatotoxicidad que la tolcapona.",
      },
      {
        letra: "C",
        texto: "Selegilina",
        correcta: false,
        explicacion:
          "Incorrecta. La selegilina es un inhibidor selectivo de la MAO-B, no un inhibidor de la COMT, y su perfil de efectos adversos está relacionado con sus metabolitos anfetamínicos, no con hepatotoxicidad.",
      },
      {
        letra: "D",
        texto: "Amantadina",
        correcta: false,
        explicacion:
          "Incorrecta. La amantadina es un antiviral con efecto antidiscinético por bloqueo de receptores NMDA, sin la advertencia específica de hepatotoxicidad asociada a la tolcapona.",
      },
    ],
    perla:
      "Entre los inhibidores de la COMT, la tolcapona es más potente y cruza la barrera hematoencefálica, pero su uso requiere vigilancia de enzimas hepáticas por riesgo de hepatotoxicidad; la entacapona es más segura en ese aspecto aunque algo menos potente.",
  },
  {
    tema: "Enfermedad de Parkinson",
    dificultad: "Media",
    enunciado:
      "Varón de 58 años con enfermedad de Parkinson de predominio tremórico, con temblor y rigidez como síntomas principales y bradicinesia leve. ¿Qué clase de fármacos podría ser útil específicamente para el temblor y la rigidez en este paciente?",
    opciones: [
      {
        letra: "A",
        texto: "Anticolinérgicos (ej. trihexifenidilo, biperideno)",
        correcta: true,
        explicacion:
          "Correcta. Los anticolinérgicos (trihexifenidilo, biperideno) son útiles principalmente para el temblor y la rigidez, pero no mejoran significativamente la bradicinesia; se usan sobre todo en pacientes jóvenes con predominio tremórico, evitándose en adultos mayores por sus efectos adversos anticolinérgicos.",
      },
      {
        letra: "B",
        texto: "Inhibidores de la MAO-B en monoterapia para todos los síntomas motores por igual",
        correcta: false,
        explicacion:
          "Incorrecta. Los inhibidores de la MAO-B tienen un efecto modesto y generalizado, no una acción específica y preferente sobre el temblor y la rigidez como los anticolinérgicos.",
      },
      {
        letra: "C",
        texto: "Agonistas dopaminérgicos exclusivamente para la bradicinesia",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque los agonistas dopaminérgicos son útiles en el manejo global del Parkinson, no son la clase específicamente asociada al alivio preferente del temblor y la rigidez frente a la bradicinesia.",
      },
      {
        letra: "D",
        texto: "Inhibidores de la COMT en monoterapia sin levodopa",
        correcta: false,
        explicacion:
          "Incorrecta. Los inhibidores de la COMT no tienen efecto relevante en monoterapia; su función es potenciar la biodisponibilidad de la levodopa, no actuar de forma independiente sobre el temblor.",
      },
    ],
    perla:
      "Los anticolinérgicos mejoran preferentemente el temblor y la rigidez, pero no la bradicinesia, y se reservan generalmente para pacientes jóvenes por su perfil de efectos adversos (similares a atropina), que los hace menos tolerados en adultos mayores.",
  },
  {
    tema: "Cefalea",
    dificultad: "Media",
    enunciado:
      "Mujer de 30 años presenta episodio de migraña con aura, con dolor pulsátil moderado-severo que interfiere con sus actividades. Acude a urgencias 30 minutos después del inicio. ¿Cuál es el tratamiento abortivo específico de elección para la crisis aguda?",
    opciones: [
      {
        letra: "A",
        texto: "Triptanes",
        correcta: true,
        explicacion:
          "Correcta. Los triptanes son el tratamiento abortivo específico de primera línea para las crisis agudas de migraña, actuando sobre receptores serotoninérgicos 5-HT1B/1D para producir vasoconstricción e inhibir la sensibilización trigeminal; su efecto se observa en 20-60 minutos.",
      },
      {
        letra: "B",
        texto: "Corticoides en monoterapia",
        correcta: false,
        explicacion:
          "Incorrecta. Los corticoides son un tratamiento abortivo inespecífico, no la primera línea específica para la crisis aguda de migraña.",
      },
      {
        letra: "C",
        texto: "Neurolépticos en monoterapia",
        correcta: false,
        explicacion:
          "Incorrecta. Los neurolépticos también se consideran tratamiento abortivo inespecífico, útil como coadyuvante en algunos casos, pero no la primera línea específica para migraña.",
      },
      {
        letra: "D",
        texto: "Betabloqueadores en dosis única para la crisis aguda",
        correcta: false,
        explicacion:
          "Incorrecta. Los betabloqueadores se usan como tratamiento preventivo de la migraña (para reducir la frecuencia de episodios), no como tratamiento abortivo de la crisis aguda.",
      },
    ],
    perla:
      "Los triptanes están contraindicados en pacientes con enfermedad coronaria (por su efecto vasoconstrictor) y deben usarse con precaución si el paciente toma antidepresivos, por riesgo de síndrome serotoninérgico.",
  },
  {
    tema: "Cefalea",
    dificultad: "Alta",
    enunciado:
      "Varón de 45 años acude por cefalea de inicio súbito, que alcanzó su máxima intensidad en menos de un minuto, descrita como 'la peor cefalea de su vida'. ¿Cuál es el diagnóstico que debe descartarse con prioridad absoluta?",
    opciones: [
      {
        letra: "A",
        texto: "Hemorragia subaracnoidea",
        correcta: true,
        explicacion:
          "Correcta. Una cefalea 'en trueno' (de inicio súbito, máxima intensidad en segundos a un minuto) debe hacer sospechar hemorragia subaracnoidea hasta que se demuestre lo contrario, dado su potencial letal si no se diagnostica y trata a tiempo.",
      },
      {
        letra: "B",
        texto: "Migraña sin aura",
        correcta: false,
        explicacion:
          "Incorrecta. La migraña típicamente tiene un inicio más gradual, no el patrón explosivo de segundos característico de la cefalea en trueno.",
      },
      {
        letra: "C",
        texto: "Cefalea tensional",
        correcta: false,
        explicacion:
          "Incorrecta. La cefalea tensional es de intensidad leve-moderada y de inicio gradual, un cuadro completamente distinto al descrito.",
      },
      {
        letra: "D",
        texto: "Cefalea en racimos (cluster)",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque la cefalea en racimos es intensa y de inicio relativamente rápido, no alcanza su pico en segundos como la cefalea en trueno, y se acompaña de síntomas autonómicos unilaterales característicos (lagrimeo, congestión nasal) ausentes en este caso.",
      },
    ],
    perla:
      "Toda cefalea 'en trueno' (thunderclap headache) obliga a descartar hemorragia subaracnoidea de forma urgente, típicamente con TC craneal sin contraste y, si es negativa con alta sospecha, punción lumbar para buscar xantocromía.",
  },
  {
    tema: "Semiología neurológica",
    dificultad: "Media",
    enunciado:
      "Paciente presenta cefalea asociada a vértigo, diplopía, alteración de la audición y dificultad para la marcha con inestabilidad. ¿Qué localización anatómica sugiere este conjunto de síntomas?",
    opciones: [
      {
        letra: "A",
        texto: "Localización infratentorial (fosa posterior)",
        correcta: true,
        explicacion:
          "Correcta. La combinación de vértigo, diplopía, alteración de la audición e inestabilidad de la marcha sugiere compromiso de estructuras de la fosa posterior (tronco encefálico, cerebelo), es decir, una localización infratentorial.",
      },
      {
        letra: "B",
        texto: "Localización supratentorial frontal",
        correcta: false,
        explicacion:
          "Incorrecta. Las lesiones frontales supratentoriales se manifiestan más con cambios de personalidad, alteraciones motoras contralaterales o afasia (si es dominante), no con el conjunto de vértigo, diplopía y alteración auditiva descrito.",
      },
      {
        letra: "C",
        texto: "Localización occipital aislada",
        correcta: false,
        explicacion:
          "Incorrecta. Las lesiones occipitales se asocian principalmente a alteraciones del campo visual, no al conjunto de síntomas vestibulococleares y de coordinación descrito.",
      },
      {
        letra: "D",
        texto: "Localización medular",
        correcta: false,
        explicacion:
          "Incorrecta. El compromiso medular se manifiesta con alteraciones sensitivomotoras por debajo del nivel de la lesión, no con vértigo, diplopía o alteración auditiva, que son signos de tronco encefálico/cerebelo.",
      },
    ],
    perla:
      "Síntomas que orientan a localización infratentorial: vértigo, diplopía, alteración de pares craneales (audición, facial), ataxia/inestabilidad de la marcha — todos reflejan compromiso de tronco encefálico o cerebelo.",
  },
  {
    tema: "Cefalea",
    dificultad: "Media",
    enunciado:
      "Paciente presenta cefalea intensa de inicio súbito, acompañada de rigidez de nuca, signos de Kernig y Brudzinski positivos, y vómitos que aparecen sin náuseas previas ('en escopetazo'). ¿Cómo se denomina este cuadro y con qué entidades se asocia clásicamente?",
    opciones: [
      {
        letra: "A",
        texto: "Síndrome meníngeo; típico de hemorragia subaracnoidea y meningitis",
        correcta: true,
        explicacion:
          "Correcta. El síndrome meníngeo (cefalea intensa, rigidez nucal que empeora con el movimiento, signos de Kernig y Brudzinski positivos, y vómitos en escopetazo sin náuseas previas) es típico de la hemorragia subaracnoidea y de la meningitis.",
      },
      {
        letra: "B",
        texto: "Síndrome de hipertensión intracraneal; típico de lesiones ocupantes de espacio",
        correcta: false,
        explicacion:
          "Incorrecta. El síndrome de hipertensión intracraneal se caracteriza por un componente postural (empeora en decúbito), sin los signos meníngeos específicos (Kernig, Brudzinski) descritos en este caso.",
      },
      {
        letra: "C",
        texto: "Síndrome de hipotensión intracraneal; típico tras punción lumbar",
        correcta: false,
        explicacion:
          "Incorrecta. La hipotensión intracraneal produce cefalea que empeora al incorporarse (ortostática), sin el cuadro de irritación meníngea florida descrito.",
      },
      {
        letra: "D",
        texto: "Migraña con aura complicada",
        correcta: false,
        explicacion:
          "Incorrecta. La migraña no cursa con signos meníngeos como Kernig y Brudzinski; estos hallazgos indican irritación de las meninges, no un fenómeno migrañoso.",
      },
    ],
    perla:
      "Ante todo síndrome meníngeo hay que descartar de forma urgente hemorragia subaracnoidea y meningitis, dos causas potencialmente mortales que requieren diagnóstico y tratamiento precoces (TC craneal ± punción lumbar según el contexto clínico).",
  },
  {
    tema: "Cefalea",
    dificultad: "Media",
    enunciado:
      "Mujer de 35 años presenta episodios de cefalea bilateral, de cualidad opresiva (no pulsátil), intensidad leve-moderada, que no empeoran con el esfuerzo físico y no se acompañan de náuseas ni vómitos, con duración de varias horas. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Cefalea tipo tensión",
        correcta: true,
        explicacion:
          "Correcta. La cefalea tipo tensión se define por episodios de cualidad opresiva (no pulsátil), intensidad leve-moderada, localización bilateral, sin empeoramiento con el esfuerzo físico y sin náuseas ni vómitos asociados; es el tipo de cefalea primaria más frecuente y predomina en mujeres.",
      },
      {
        letra: "B",
        texto: "Migraña sin aura",
        correcta: false,
        explicacion:
          "Incorrecta. La migraña típicamente es de predominio hemicraneal, cualidad pulsátil, se agrava con el esfuerzo físico, y se acompaña de náuseas, vómitos, fotofobia o sonofobia — justo lo opuesto al cuadro descrito.",
      },
      {
        letra: "C",
        texto: "Cefalea en racimos",
        correcta: false,
        explicacion:
          "Incorrecta. La cefalea en racimos es unilateral, periocular, de gran intensidad y corta duración (15-180 minutos), con síntomas autonómicos ipsilaterales, un cuadro muy distinto al descrito.",
      },
      {
        letra: "D",
        texto: "Hemicránea continua",
        correcta: false,
        explicacion:
          "Incorrecta. La hemicránea continua es, como su nombre indica, estrictamente unilateral y continua, con síntomas trigeminoautonómicos asociados, a diferencia de la cefalea bilateral episódica descrita.",
      },
    ],
    perla:
      "La cefalea tipo tensión es la cefalea primaria más frecuente en general (aunque la migraña genera mayor discapacidad); se trata con AINEs o paracetamol en los episodios, y con antidepresivos tricíclicos o ISRSN como prevención en las formas crónicas.",
  },
  {
    tema: "Cefalea",
    dificultad: "Alta",
    enunciado:
      "Mujer de 24 años refiere episodios recurrentes de cefalea hemicraneal pulsátil de intensidad moderada-alta, con fotofobia, sonofobia y náuseas, de 4-72 horas de duración. Antes de cada episodio presenta escotomas centelleantes durante unos 20 minutos, que desaparecen justo antes de iniciar el dolor. ¿Cómo se clasifica este cuadro?",
    opciones: [
      {
        letra: "A",
        texto: "Migraña con aura",
        correcta: true,
        explicacion:
          "Correcta. La presencia de síntomas visuales positivos (escotomas centelleantes) que preceden a la cefalea por 5-60 minutos y desaparecen antes de que esta comience, junto con las características típicas de la cefalea migrañosa (hemicraneal, pulsátil, con náuseas/fotofobia/sonofobia), define la migraña con aura.",
      },
      {
        letra: "B",
        texto: "Migraña sin aura",
        correcta: false,
        explicacion:
          "Incorrecta. La migraña sin aura comparte las características de la cefalea, pero por definición no presenta la clínica de focalidad neurológica (aura) que precede o acompaña al dolor, la cual sí está presente en este caso.",
      },
      {
        letra: "C",
        texto: "Aura sin cefalea (migraña acefálgica)",
        correcta: false,
        explicacion:
          "Incorrecta. En este caso el aura sí se acompaña de cefalea posterior; la migraña acefálgica se refiere a episodios de aura sin que llegue a desarrollarse la cefalea.",
      },
      {
        letra: "D",
        texto: "Infarto migrañoso",
        correcta: false,
        explicacion:
          "Incorrecta. El infarto migrañoso requiere que los síntomas del aura persistan más allá de la duración de la cefalea, asociados a una lesión isquémica demostrada por imagen; en este caso el aura se resuelve antes de iniciar el dolor, sin persistencia de síntomas.",
      },
    ],
    perla:
      "La migraña con aura representa el 20-30% de los casos de migraña; las manifestaciones visuales son las más frecuentes (escotomas centelleantes, espectro de fortificación), aunque también puede haber síntomas sensitivos, motores o del lenguaje, típicamente 5-60 minutos antes del dolor.",
  },
  {
    tema: "Cefalea",
    dificultad: "Alta",
    enunciado:
      "Mujer de 47 años, fumadora, con migraña con aura conocida, presenta un episodio en el que los síntomas visuales del aura persisten más allá de la resolución de la cefalea. La resonancia magnética muestra una lesión isquémica en el territorio vascular correspondiente a los síntomas. ¿Cuál es esta complicación de la migraña?",
    opciones: [
      {
        letra: "A",
        texto: "Infarto migrañoso",
        correcta: true,
        explicacion:
          "Correcta. El infarto migrañoso se define por la persistencia de los síntomas del aura más allá de la duración de la cefalea, asociados a una lesión isquémica cerebral demostrada por imagen en el territorio vascular correspondiente; es más frecuente en mujeres mayores de 45 años, fumadoras y en tratamiento con anticonceptivos, especialmente en quienes padecen migraña con aura.",
      },
      {
        letra: "B",
        texto: "Estado de mal migrañoso (estatus migrañoso)",
        correcta: false,
        explicacion:
          "Incorrecta. El estatus migrañoso se define por una cefalea de más de 72 horas de duración a pesar del tratamiento, sin necesariamente implicar una lesión isquémica demostrada por imagen.",
      },
      {
        letra: "C",
        texto: "Migraña crónica",
        correcta: false,
        explicacion:
          "Incorrecta. La migraña crónica se define por la frecuencia (más de 15 días de cefalea al mes durante al menos 3 meses), no por la persistencia del aura ni por una lesión isquémica asociada.",
      },
      {
        letra: "D",
        texto: "Aura sin cefalea",
        correcta: false,
        explicacion:
          "Incorrecta. El aura sin cefalea implica ausencia de dolor asociado, mientras que en este caso sí hubo cefalea, con la particularidad de que el aura se prolongó y se asoció a un infarto demostrado.",
      },
    ],
    perla:
      "Los factores de riesgo para infarto migrañoso (mujer >45 años, tabaquismo, anticonceptivos hormonales, migraña con aura) son los mismos que aumentan el riesgo cardiovascular en general; el uso de anticonceptivos combinados suele evitarse en mujeres con migraña con aura por este motivo.",
  },
  {
    tema: "Cefaleas trigeminoautonómicas",
    dificultad: "Alta",
    enunciado:
      "Varón de 35 años presenta episodios de cefalea estrictamente unilateral, periocular, de gran intensidad, con duración de 30-60 minutos, que aparecen característicamente por la noche poco después de dormirse. Durante los episodios presenta lagrimeo, congestión nasal y ptosis-miosis ipsilaterales al dolor. ¿Cuál es el tratamiento sintomático de primera elección para la crisis aguda?",
    opciones: [
      {
        letra: "A",
        texto: "Sumatriptán subcutáneo u oxigenoterapia a alto flujo",
        correcta: true,
        explicacion:
          "Correcta. En la cefalea en racimos (cluster), el tratamiento sintomático de primera elección para la crisis aguda es el sumatriptán por vía subcutánea (por su rapidez) o la oxigenoterapia a alto flujo, que debe administrarse efectivamente a alto flujo para ser eficaz.",
      },
      {
        letra: "B",
        texto: "Verapamilo oral",
        correcta: false,
        explicacion:
          "Incorrecta. El verapamilo es el fármaco de elección para el tratamiento preventivo de la cefalea en racimos, no para abortar la crisis aguda.",
      },
      {
        letra: "C",
        texto: "Indometacina",
        correcta: false,
        explicacion:
          "Incorrecta. La respuesta excelente a indometacina es característica y diagnóstica de la hemicránea paroxística y la hemicránea continua, no de la cefalea en racimos.",
      },
      {
        letra: "D",
        texto: "Lamotrigina",
        correcta: false,
        explicacion:
          "Incorrecta. La lamotrigina es el tratamiento de elección para el SUNCT, otra cefalea trigeminoautonómica de duración mucho más breve, no para la cefalea en racimos.",
      },
    ],
    perla:
      "La cefalea en racimos predomina en varones (2:1), con episodios agrupados en 'racimos' (varios días con ataques diarios) seguidos de remisión; el tratamiento preventivo de elección es el verapamilo, mientras que el sintomático agudo es sumatriptán SC u oxígeno a alto flujo.",
  },
  {
    tema: "Cefaleas trigeminoautonómicas",
    dificultad: "Alta",
    enunciado:
      "Mujer de 40 años presenta episodios de cefalea unilateral periocular, de 5-20 minutos de duración, con una frecuencia de 10-15 episodios al día, acompañados de síntomas autonómicos ipsilaterales. Los episodios responden de forma completa y rápida a la indometacina. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Hemicránea paroxística",
        correcta: true,
        explicacion:
          "Correcta. La hemicránea paroxística predomina en mujeres, tiene episodios más breves (2-30 minutos) y más frecuentes al día que la cefalea en racimos, y la respuesta absoluta a indometacina es un criterio diagnóstico característico de esta entidad.",
      },
      {
        letra: "B",
        texto: "Cefalea en racimos",
        correcta: false,
        explicacion:
          "Incorrecta. La cefalea en racimos predomina en varones, tiene episodios más prolongados (15-180 minutos) y menos frecuentes al día, y no tiene la respuesta característica y diagnóstica a indometacina de la hemicránea paroxística.",
      },
      {
        letra: "C",
        texto: "SUNCT",
        correcta: false,
        explicacion:
          "Incorrecta. El SUNCT tiene episodios de duración aún más breve (segundos) y muchos más episodios al día, y su tratamiento de elección es la lamotrigina, no la indometacina.",
      },
      {
        letra: "D",
        texto: "Migraña sin aura",
        correcta: false,
        explicacion:
          "Incorrecta. La migraña no se asocia a síntomas autonómicos ipsilaterales tan marcados ni tiene la respuesta característica a indometacina descrita.",
      },
    ],
    perla:
      "Regla mnemotécnica de las cefaleas trigeminoautonómicas: a menor duración de cada episodio, mayor es la frecuencia diaria de ataques. La respuesta absoluta a indometacina es criterio diagnóstico tanto de la hemicránea paroxística como de la hemicránea continua.",
  },
  {
    tema: "Epilepsia",
    dificultad: "Alta",
    enunciado:
      "Paciente refiere que antes de sus crisis experimenta una molestia epigástrica que asciende hasta la región cervical, seguida de desconexión del medio con automatismos oroalimentarios. ¿En qué localización se origina característicamente este tipo de crisis?",
    opciones: [
      {
        letra: "A",
        texto: "Lóbulo temporal mesial",
        correcta: true,
        explicacion:
          "Correcta. El aura epigástrica ascendente (molestia que sube desde el epigastrio hasta la región cervical) es un signo localizador clásico del foco epiléptico en el lóbulo temporal mesial, frecuentemente asociado a automatismos oroalimentarios posteriores.",
      },
      {
        letra: "B",
        texto: "Lóbulo frontal",
        correcta: false,
        explicacion:
          "Incorrecta. Las crisis de origen frontal predominan con fenómenos motores, no con el aura epigástrica ascendente característica del lóbulo temporal mesial.",
      },
      {
        letra: "C",
        texto: "Lóbulo parietal",
        correcta: false,
        explicacion:
          "Incorrecta. Las crisis de origen parietal se manifiestan predominantemente con alteraciones sensitivas, no con el aura epigástrica descrita.",
      },
      {
        letra: "D",
        texto: "Lóbulo occipital",
        correcta: false,
        explicacion:
          "Incorrecta. Las crisis de origen occipital se manifiestan predominantemente con alteraciones visuales, no con el aura epigástrica ascendente.",
      },
    ],
    perla:
      "No confundir el aura epigástrica ascendente (molestia que sube desde el epigastrio, típica de foco temporal mesial) con la sensación de calor ascendente desde los pies que puede verse en los síncopes — es una trampa clásica de examen.",
  },
  {
    tema: "Epilepsia",
    dificultad: "Media",
    enunciado:
      "Niña de 6 años presenta episodios breves (pocos segundos) de interrupción brusca de la actividad con mirada fija, sin pérdida del tono postural, que se repiten varias veces al día; se recupera bruscamente sin confusión posterior y no recuerda lo sucedido. El EEG muestra descargas generalizadas punta-onda a 3 Hz, provocadas por hiperventilación. ¿Cuál es el tratamiento de elección?",
    opciones: [
      {
        letra: "A",
        texto: "Ácido valproico",
        correcta: true,
        explicacion:
          "Correcta. El cuadro corresponde a una epilepsia de ausencias de la infancia (crisis de ausencia típica, EEG punta-onda a 3 Hz, desencadenada por hiperventilación); el tratamiento de primera elección es el ácido valproico, con la etosuximida como segunda opción.",
      },
      {
        letra: "B",
        texto: "Carbamazepina",
        correcta: false,
        explicacion:
          "Incorrecta. La carbamazepina está contraindicada en las crisis de ausencia, ya que puede empeorarlas, al igual que la fenitoína.",
      },
      {
        letra: "C",
        texto: "ACTH",
        correcta: false,
        explicacion:
          "Incorrecta. La ACTH es el tratamiento de elección del síndrome de West, un cuadro de la infancia temprana con espasmos y retraso psicomotor, no de la epilepsia de ausencias.",
      },
      {
        letra: "D",
        texto: "Fenitoína",
        correcta: false,
        explicacion:
          "Incorrecta. Al igual que la carbamazepina, la fenitoína puede empeorar las crisis de ausencia y está contraindicada en este síndrome.",
      },
    ],
    perla:
      "Las ausencias (a diferencia de las crisis focales con alteración de consciencia) no tienen aura ni período poscrítico, se desencadenan con hiperventilación, muestran patrón EEG punta-onda generalizado, y responden bien a ácido valproico o etosuximida.",
  },
  {
    tema: "Epilepsia",
    dificultad: "Alta",
    enunciado:
      "Mujer de 24 años presenta un cuadro subagudo (menos de 3 meses) de alteración del comportamiento, crisis epilépticas y trastorno del movimiento. El EEG muestra un patrón de lentificación difusa con ondas delta y actividad rápida superpuesta. ¿Cuál es el estudio adicional obligado dada la asociación característica de esta entidad?",
    opciones: [
      {
        letra: "A",
        texto: "Estudio de imagen para descartar teratoma ovárico",
        correcta: true,
        explicacion:
          "Correcta. El cuadro es compatible con encefalitis por anticuerpos antirreceptor de NMDA (patrón EEG 'delta brush', alteración subaguda del comportamiento, crisis y trastorno del movimiento), que se asocia característicamente a tumores, en especial el teratoma ovárico, por lo que su búsqueda es obligatoria.",
      },
      {
        letra: "B",
        texto: "Biopsia muscular",
        correcta: false,
        explicacion:
          "Incorrecta. La biopsia muscular no forma parte del abordaje diagnóstico de la encefalitis anti-NMDA; el estudio de extensión relevante es la búsqueda de un tumor asociado, especialmente teratoma ovárico.",
      },
      {
        letra: "C",
        texto: "Colonoscopia",
        correcta: false,
        explicacion:
          "Incorrecta. No existe una asociación característica entre la encefalitis anti-NMDA y patología colónica que justifique este estudio.",
      },
      {
        letra: "D",
        texto: "Mamografía",
        correcta: false,
        explicacion:
          "Incorrecta. La asociación tumoral característica de esta encefalitis es con el teratoma ovárico, no con patología mamaria.",
      },
    ],
    perla:
      "El tratamiento de primera línea de la encefalitis anti-NMDA es corticoides intravenosos a dosis altas junto con plasmaféresis o inmunoglobulinas IV; si no hay mejoría, se escala a rituximab o ciclofosfamida. Si se documenta tumor, su tratamiento (extirpación) es obligatorio.",
  },
  {
    tema: "Epilepsia",
    dificultad: "Media",
    enunciado:
      "Niño de 2 años presenta una crisis convulsiva generalizada de 8 minutos de duración en el contexto de fiebre de 39°C, que se repite una segunda vez en las siguientes horas del mismo día. No tiene antecedentes neurológicos. ¿Cómo se clasifica esta crisis febril y cuál es su riesgo aproximado de desarrollar epilepsia?",
    opciones: [
      {
        letra: "A",
        texto: "Crisis febril compleja; riesgo de epilepsia del 4-15%",
        correcta: true,
        explicacion:
          "Correcta. Al durar más de 15 minutos y repetirse más de una vez en el mismo día, se clasifica como crisis febril compleja, con un riesgo estimado de epilepsia futura del 4-15%, mayor que el de las crisis febriles simples.",
      },
      {
        letra: "B",
        texto: "Crisis febril simple; riesgo de epilepsia similar a la población general",
        correcta: false,
        explicacion:
          "Incorrecta. La duración mayor a 15 minutos y la recurrencia en el mismo día son criterios de crisis febril compleja, no simple; las simples duran menos de 15 minutos y no recurren en 24 horas.",
      },
      {
        letra: "C",
        texto: "Estatus epiléptico febril; requiere tratamiento antiepiléptico de por vida obligatoriamente",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque una crisis de más de 5 minutos ya se considera prolongada y merece manejo agudo, el término correcto para esta presentación clínica es crisis febril compleja, y el tratamiento crónico dependerá de la causa identificada, no es automático ni obligatorio de por vida.",
      },
      {
        letra: "D",
        texto: "Crisis febril simple; no requiere ninguna evaluación adicional",
        correcta: false,
        explicacion:
          "Incorrecta. Al cumplir criterios de complejidad (duración y recurrencia), sí amerita una evaluación más completa para descartar causas subyacentes, a diferencia de las crisis febriles simples.",
      },
    ],
    perla:
      "Crisis febril compleja = focal, y/o >15 minutos, y/o más de una en el mismo día, y/o con déficit neurológico postictal (parálisis de Todd); las crisis febriles prolongadas en los primeros 5 años de vida son un antecedente frecuente en pacientes que después desarrollan esclerosis mesial temporal.",
  },
  {
    tema: "Epilepsia",
    dificultad: "Media",
    enunciado:
      "Paciente presenta una crisis convulsiva 10 días después de sufrir un traumatismo craneoencefálico moderado, sin haber presentado crisis en la primera semana. ¿Cómo se clasifica esta crisis y cuál es la conducta terapéutica más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Crisis postraumática tardía; iniciar tratamiento antiepiléptico crónico",
        correcta: true,
        explicacion:
          "Correcta. Las crisis que ocurren más allá de la primera semana tras un TCE se consideran tardías, con un riesgo de recurrencia del 70%, por lo que en la práctica ya se consideran una epilepsia postraumática y ameritan tratamiento antiepiléptico crónico.",
      },
      {
        letra: "B",
        texto: "Crisis postraumática inmediata; no requiere tratamiento preventivo",
        correcta: false,
        explicacion:
          "Incorrecta. Las crisis inmediatas ocurren en las primeras 24 horas tras el TCE, no a los 10 días; esta clasificación no corresponde al caso descrito.",
      },
      {
        letra: "C",
        texto: "Crisis postraumática precoz; tratamiento preventivo solo durante unas semanas",
        correcta: false,
        explicacion:
          "Incorrecta. Las crisis precoces ocurren entre el día 1 y el 7 tras el TCE; al ocurrir en el día 10, esta crisis se clasifica como tardía, con manejo más prolongado (crónico) dado su alto riesgo de recurrencia.",
      },
      {
        letra: "D",
        texto: "No tiene relación con el traumatismo previo dado el tiempo transcurrido",
        correcta: false,
        explicacion:
          "Incorrecta. Las crisis postraumáticas tardías, por definición, ocurren después de la primera semana y sí se consideran relacionadas con el traumatismo previo, con un riesgo de recurrencia particularmente alto.",
      },
    ],
    perla:
      "Clasificación de crisis postraumáticas: inmediatas (<24h, sin riesgo de epilepsia), precoces (día 1-7, riesgo moderado, tratamiento temporal), tardías (>7 días, riesgo de recurrencia del 70%, tratamiento antiepiléptico crónico).",
  },
  {
    tema: "Epilepsia",
    dificultad: "Media",
    enunciado:
      "Niño de 8 años presenta episodios nocturnos de hormigueo en la lengua y las encías, dificultad para hablar y babeo, que en ocasiones se generalizan a una crisis tónico-clónica mientras duerme. El desarrollo psicomotor es normal y el EEG muestra puntas centrotemporales. ¿Cuál es el pronóstico esperado de este síndrome?",
    opciones: [
      {
        letra: "A",
        texto: "Remisión espontánea en aproximadamente el 98% de los casos hacia los 14 años",
        correcta: true,
        explicacion:
          "Correcta. El cuadro corresponde a la epilepsia rolándica (epilepsia parcial benigna de la infancia con paroxismos centrotemporales), que debuta entre los 7-10 años, predomina durante el sueño, y remite espontáneamente en aproximadamente el 98% de los casos hacia los 14 años, sin requerir tratamiento en la mayoría de los casos.",
      },
      {
        letra: "B",
        texto: "Evolución habitual hacia epilepsia farmacorresistente en la adultez",
        correcta: false,
        explicacion:
          "Incorrecta. La epilepsia rolándica es, por definición, un síndrome benigno con excelente pronóstico y remisión espontánea, no una evolución hacia farmacorresistencia.",
      },
      {
        letra: "C",
        texto: "Deterioro neurológico progresivo con retraso psicomotor esperado",
        correcta: false,
        explicacion:
          "Incorrecta. A diferencia de síndromes como West o Lennox-Gastaut, la epilepsia rolándica no se asocia a deterioro neurológico ni retraso psicomotor.",
      },
      {
        letra: "D",
        texto: "Requiere cirugía de epilepsia en la mayoría de los casos",
        correcta: false,
        explicacion:
          "Incorrecta. Dada su naturaleza benigna y autolimitada, la gran mayoría de los casos ni siquiera requieren tratamiento farmacológico, y mucho menos manejo quirúrgico.",
      },
    ],
    perla:
      "En la epilepsia rolándica, si se decide tratar, la carbamazepina debe evitarse porque paradójicamente puede empeorar las crisis; dado el excelente pronóstico espontáneo, muchos casos no requieren ningún fármaco antiepiléptico.",
  },
  {
    tema: "Epilepsia",
    dificultad: "Alta",
    enunciado:
      "Lactante de 5 meses presenta contracciones musculares breves en salvas, de predominio flexor, que aparecen al despertar, junto con detención del desarrollo psicomotor. El EEG intercrítico muestra una actividad de base completamente desorganizada con ondas lentas de alto voltaje. ¿Cuál es el tratamiento de elección?",
    opciones: [
      {
        letra: "A",
        texto: "Hormona adrenocorticotrópica (ACTH)",
        correcta: true,
        explicacion:
          "Correcta. El cuadro corresponde al síndrome de West (espasmos infantiles, detención del desarrollo psicomotor, e hipsarritmia intercrítica en el EEG, criterio imprescindible para el diagnóstico); la ACTH es el tratamiento de elección, aunque la respuesta terapéutica suele ser subóptima.",
      },
      {
        letra: "B",
        texto: "Ácido valproico en monoterapia",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque puede usarse en otros síndromes epilépticos de la infancia, el tratamiento de elección específico del síndrome de West es la ACTH.",
      },
      {
        letra: "C",
        texto: "Etosuximida",
        correcta: false,
        explicacion:
          "Incorrecta. La etosuximida se utiliza en las epilepsias de ausencia, no en el síndrome de West.",
      },
      {
        letra: "D",
        texto: "Observación sin tratamiento farmacológico",
        correcta: false,
        explicacion:
          "Incorrecta. El síndrome de West requiere tratamiento activo dado el riesgo de deterioro psicomotor progresivo; no es una entidad de manejo expectante.",
      },
    ],
    perla:
      "La tríada del síndrome de West (espasmos en salvas, detención del desarrollo, hipsarritmia intercrítica) debuta característicamente entre el 4º y 7º mes de vida, predomina en varones (1.5:1), y la hipsarritmia (patrón interictal) es un criterio diagnóstico imprescindible.",
  },
  {
    tema: "Epilepsia",
    dificultad: "Media",
    enunciado:
      "Mujer de 17 años presenta sacudidas musculares breves en miembros superiores, característicamente al despertar tras trasnochar en una fiesta con consumo de alcohol y privación de sueño, manteniendo el nivel de consciencia. También ha tenido crisis tónico-clónicas generalizadas ocasionales. ¿Cuál es el tratamiento más adecuado considerando su edad y sexo?",
    opciones: [
      {
        letra: "A",
        texto: "Levetiracetam",
        correcta: true,
        explicacion:
          "Correcta. El cuadro corresponde a epilepsia mioclónica juvenil (mioclonías al despertar, favorecidas por privación de sueño y alcohol, con crisis tónico-clónicas asociadas); aunque el ácido valproico es el tratamiento de elección en general, en mujeres en edad fértil se prefiere levetiracetam por el alto riesgo teratógeno del valproico.",
      },
      {
        letra: "B",
        texto: "Ácido valproico, sin considerar alternativas por ser el más eficaz",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque el valproico es muy eficaz en la epilepsia mioclónica juvenil, está contraindicado en mujeres en edad fértil por su alto riesgo teratógeno, salvo que no exista alternativa adecuada; en este caso sí existe (levetiracetam).",
      },
      {
        letra: "C",
        texto: "Carbamazepina",
        correcta: false,
        explicacion:
          "Incorrecta. La carbamazepina puede empeorar las mioclonías y las crisis de ausencia, por lo que no es apropiada en la epilepsia mioclónica juvenil.",
      },
      {
        letra: "D",
        texto: "Fenitoína",
        correcta: false,
        explicacion:
          "Incorrecta. Al igual que la carbamazepina, la fenitoína puede empeorar las mioclonías y no es el tratamiento de elección en este síndrome.",
      },
    ],
    perla:
      "La epilepsia mioclónica juvenil es el prototipo de epilepsia generalizada idiopática (10% de todas las epilepsias); los desencadenantes clásicos son la privación de sueño y el consumo de alcohol, con crisis típicamente al despertar. El ácido valproico está contraindicado en mujeres en edad fértil sin alternativa adecuada.",
  },
  {
    tema: "Epilepsia",
    dificultad: "Alta",
    enunciado:
      "Paciente con epilepsia del lóbulo temporal mesial (esclerosis mesial temporal) continúa con crisis frecuentes a pesar de haber probado dos esquemas antiepilépticos adecuados y bien tolerados (monoterapia y politerapia). La RMN muestra atrofia e hiperintensidad hipocampal en T2/FLAIR. ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Evaluación para tratamiento quirúrgico (amigdalohipocampectomía)",
        correcta: true,
        explicacion:
          "Correcta. La esclerosis mesial temporal es el paradigma de epilepsia farmacorresistente (solo 10-30% se controla únicamente con fármacos), con buena respuesta a la cirugía; ante fracaso de dos esquemas antiepilépticos adecuados, está indicada la evaluación quirúrgica, siendo la amigdalohipocampectomía (a menudo con lobectomía temporal anterior) la técnica de elección.",
      },
      {
        letra: "B",
        texto: "Probar indefinidamente más combinaciones de fármacos antiepilépticos antes de considerar cirugía",
        correcta: false,
        explicacion:
          "Incorrecta. Una vez fracasan dos esquemas adecuados y bien tolerados, se considera epilepsia farmacorresistente y debe evaluarse la cirugía, no continuar indefinidamente probando fármacos.",
      },
      {
        letra: "C",
        texto: "Estimulación cerebral profunda como primera opción quirúrgica en este caso",
        correcta: false,
        explicacion:
          "Incorrecta. En la epilepsia del lóbulo temporal medial farmacorresistente, la técnica quirúrgica de elección es la resectiva (amigdalohipocampectomía), no las técnicas no resectivas como la estimulación cerebral profunda, que se reservan para otros contextos.",
      },
      {
        letra: "D",
        texto: "Suspender todo tratamiento antiepiléptico dado que no ha funcionado",
        correcta: false,
        explicacion:
          "Incorrecta. Suspender el tratamiento antiepiléptico sin alternativa expone al paciente a mayor riesgo de crisis; la conducta adecuada es evaluar la cirugía, no eliminar el manejo farmacológico sin más.",
      },
    ],
    perla:
      "La epilepsia se considera farmacorresistente cuando persiste tras el uso de dos esquemas adecuados y bien tolerados (monoterapia o politerapia); en la esclerosis mesial temporal, la amigdalohipocampectomía (con o sin lobectomía temporal anterior) ofrece buenos resultados, muy superiores a mantener solo tratamiento médico.",
  },
  {
    tema: "Enfermedades neuromusculares",
    dificultad: "Alta",
    enunciado:
      "Paciente con miastenia gravis conocida presenta debilidad respiratoria progresiva que requiere soporte ventilatorio (crisis miasténica). ¿Cuál es el tratamiento de elección para esta emergencia?",
    opciones: [
      {
        letra: "A",
        texto: "Inmunoglobulina intravenosa o plasmaféresis",
        correcta: true,
        explicacion:
          "Correcta. En la crisis miasténica (debilidad grave con compromiso respiratorio), el tratamiento de elección es la inmunoglobulina intravenosa o la plasmaféresis, ambas con eficacia similar, para reducir rápidamente los anticuerpos patogénicos circulantes.",
      },
      {
        letra: "B",
        texto: "Aumentar la dosis de piridostigmina de forma indefinida",
        correcta: false,
        explicacion:
          "Incorrecta. Durante una crisis miasténica, aumentar los anticolinesterásicos puede incluso precipitar una crisis colinérgica (por exceso de acetilcolina), que se manifiesta de forma similar y complica el diagnóstico diferencial.",
      },
      {
        letra: "C",
        texto: "Corticoides en dosis altas como única medida inmediata",
        correcta: false,
        explicacion:
          "Incorrecta. Los corticoides a dosis altas pueden inicialmente empeorar transitoriamente la debilidad muscular en la miastenia, por lo que no son la medida de elección para la crisis aguda; se prefieren inmunoglobulina o plasmaféresis por su acción más rápida y segura.",
      },
      {
        letra: "D",
        texto: "Timectomía de urgencia",
        correcta: false,
        explicacion:
          "Incorrecta. La timectomía es un tratamiento a largo plazo para la miastenia gravis (especialmente si hay timoma), no una medida de manejo agudo de la crisis miasténica.",
      },
    ],
    perla:
      "Ante una masa mediastinal en un paciente con miastenia gravis, siempre hay que pensar en timoma; la crisis miasténica es una emergencia que requiere soporte ventilatorio e inmunoglobulina IV o plasmaféresis como tratamiento de elección.",
  },
  {
    tema: "Neuropatías",
    dificultad: "Media",
    enunciado:
      "Varón de 30 años presenta debilidad ascendente simétrica de instauración progresiva en los últimos días, dos semanas después de un episodio de diarrea. ¿Cuál es el agente infeccioso más frecuentemente asociado a este cuadro?",
    opciones: [
      {
        letra: "A",
        texto: "Campylobacter jejuni",
        correcta: true,
        explicacion:
          "Correcta. El síndrome de Guillain-Barré se asocia clásicamente a un antecedente de infección gastrointestinal por Campylobacter jejuni (mecanismo de mimetismo molecular), que precede a la debilidad ascendente en días a semanas.",
      },
      {
        letra: "B",
        texto: "Escherichia coli enterotoxigénica",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque puede causar diarrea del viajero, no es el agente clásicamente asociado al desencadenamiento del síndrome de Guillain-Barré.",
      },
      {
        letra: "C",
        texto: "Salmonella typhi",
        correcta: false,
        explicacion:
          "Incorrecta. La Salmonella typhi causa fiebre tifoidea, pero no es el agente gastrointestinal clásicamente vinculado al Guillain-Barré.",
      },
      {
        letra: "D",
        texto: "Vibrio cholerae",
        correcta: false,
        explicacion:
          "Incorrecta. El cólera produce diarrea acuosa profusa, pero no es el patógeno asociado clásicamente al desencadenamiento de esta polineuropatía autoinmune.",
      },
    ],
    perla:
      "La variante de Miller Fisher del síndrome de Guillain-Barré se caracteriza por ataxia, oftalmoplejía y alteración sensitiva marcada; en general, dentro del espectro de Guillain-Barré, las formas con compromiso sensitivo-motor combinado tienen peor pronóstico.",
  },
  {
    tema: "Neuroimagen",
    dificultad: "Media",
    enunciado:
      "Paciente con antecedente de traumatismo craneoencefálico presenta una colección hemática extraaxial con forma de lente biconvexa en la TC craneal, sin cruzar las suturas craneales. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Hematoma epidural",
        correcta: true,
        explicacion:
          "Correcta. El hematoma epidural se caracteriza en la TC por una colección con forma de lente biconvexa, que no cruza las suturas craneales (porque la duramadre está adherida a ellas), típicamente asociado a lesión de la arteria meníngea media.",
      },
      {
        letra: "B",
        texto: "Hematoma subdural agudo",
        correcta: false,
        explicacion:
          "Incorrecta. El hematoma subdural agudo se ve hiperdenso con forma de semiluna (cóncavo), no biconvexo, y sí puede cruzar las suturas craneales al no estar limitado por su adherencia dural.",
      },
      {
        letra: "C",
        texto: "Hemorragia subaracnoidea",
        correcta: false,
        explicacion:
          "Incorrecta. La hemorragia subaracnoidea se visualiza como hiperdensidad siguiendo los surcos y cisternas cerebrales, no como una colección extraaxial focal con forma de lente.",
      },
      {
        letra: "D",
        texto: "Contusión cerebral",
        correcta: false,
        explicacion:
          "Incorrecta. La contusión cerebral es una lesión intraparenquimatosa (dentro del cerebro), no una colección extraaxial con la morfología descrita.",
      },
    ],
    perla:
      "En la TC craneal: hematoma epidural = lente biconvexo, no cruza suturas; hematoma subdural agudo = semiluna hiperdensa, sí puede cruzar suturas (y se vuelve isodenso-hipodenso en fase subaguda-crónica); hemorragia subaracnoidea = hiperdensidad en los surcos.",
  },
];

const PEDIATRIA_QUESTIONS = [
  {
    tema: "Cardiopatías congénitas",
    dificultad: "Media",
    enunciado:
      "Lactante con síndrome de Down presenta un defecto del septum interauricular localizado inmediatamente por debajo del septo, cerca de las válvulas auriculoventriculares. ¿Qué tipo de comunicación interauricular es característica de este síndrome?",
    opciones: [
      {
        letra: "A",
        texto: "Ostium primum",
        correcta: true,
        explicacion:
          "Correcta. La comunicación interauricular tipo ostium primum, localizada más baja que el septo (cerca de las válvulas auriculoventriculares), es el subtipo de CIA característicamente asociado al síndrome de Down. Es una entidad distinta del canal auriculoventricular completo (que además incluye un defecto ventricular y una válvula AV única), aunque ambas comparten esta localización baja del defecto septal.",
      },
      {
        letra: "B",
        texto: "Ostium secundum",
        correcta: false,
        explicacion:
          "Incorrecta. El ostium secundum es el tipo más frecuente de CIA en la población general (90% de los casos), localizado en la porción media del septo, pero no es el característicamente asociado al síndrome de Down.",
      },
      {
        letra: "C",
        texto: "Tipo seno venoso",
        correcta: false,
        explicacion:
          "Incorrecta. El tipo seno venoso se localiza cerca de la desembocadura de la vena cava superior, y no es el tipo específicamente asociado al síndrome de Down.",
      },
      {
        letra: "D",
        texto: "Foramen oval permeable",
        correcta: false,
        explicacion:
          "Incorrecta. El foramen oval permeable es una variante frecuente y generalmente benigna, distinta de una comunicación interauricular verdadera tipo ostium primum.",
      },
    ],
    perla:
      "En el síndrome de Down, la CIA tipo ostium primum es el subtipo de comunicación interauricular más característico. Ojo: no debe confundirse con el canal auriculoventricular (AV) completo, una entidad distinta y más compleja (combina CIA ostium primum + CIV tipo entrada + una válvula AV única compartida), que es la cardiopatía congénita específica más asociada al síndrome de Down — hasta el 80% de todos los casos de canal AV completo ocurren en personas con este síndrome. En contraste, el síndrome de DiGeorge se asocia a truncus arterioso, y el síndrome de Turner a coartación de aorta.",
  },
  {
    tema: "Cardiopatías congénitas",
    dificultad: "Media",
    enunciado:
      "Adulto joven, habitualmente asintomático en la infancia, es evaluado por infecciones pulmonares recurrentes. El examen físico revela un desdoblamiento fijo y amplio del segundo ruido cardíaco, y el EKG muestra sobrecarga de cavidades derechas con bloqueo de rama derecha. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Comunicación interauricular (CIA)",
        correcta: true,
        explicacion:
          "Correcta. El desdoblamiento fijo y amplio del segundo ruido cardíaco, junto con sobrecarga de cavidades derechas y bloqueo de rama derecha en el EKG, es el cuadro clásico de la CIA; suele ser asintomática en la infancia y manifestarse en la vida adulta, a veces con infecciones pulmonares recurrentes por el hiperflujo pulmonar.",
      },
      {
        letra: "B",
        texto: "Comunicación interventricular (CIV)",
        correcta: false,
        explicacion:
          "Incorrecta. La CIV se manifiesta con un soplo pansistólico paraesternal izquierdo intenso y sobrecarga de cavidades izquierdas, no con el desdoblamiento fijo del segundo ruido característico de la CIA.",
      },
      {
        letra: "C",
        texto: "Persistencia del conducto arterioso (PCA)",
        correcta: false,
        explicacion:
          "Incorrecta. El PCA se caracteriza por un soplo continuo 'en maquinaria' y sobrecarga de cavidades izquierdas, un patrón distinto al descrito.",
      },
      {
        letra: "D",
        texto: "Tetralogía de Fallot",
        correcta: false,
        explicacion:
          "Incorrecta. La tetralogía de Fallot se manifiesta típicamente con cianosis progresiva desde el primer año de vida, no con el cuadro auscultatorio y electrocardiográfico descrito.",
      },
    ],
    perla:
      "El desdoblamiento fijo y amplio del segundo ruido cardíaco (que no varía con la respiración) es un hallazgo altamente característico de la comunicación interauricular, reflejando el cortocircuito izquierda-derecha constante y el hiperflujo pulmonar resultante.",
  },
  {
    tema: "Cardiopatías congénitas",
    dificultad: "Baja",
    enunciado:
      "Recién nacido con un soplo pansistólico paraesternal izquierdo, áspero e intenso. ¿Cuál es la cardiopatía congénita más frecuente que debe sospecharse?",
    opciones: [
      {
        letra: "A",
        texto: "Comunicación interventricular (CIV)",
        correcta: true,
        explicacion:
          "Correcta. La comunicación interventricular es la cardiopatía congénita más frecuente en general; se manifiesta con un soplo pansistólico paraesternal izquierdo, áspero e intenso, que paradójicamente se ausculta con más intensidad en los defectos pequeños (por el mayor gradiente de presión y velocidad del flujo a través de un orificio restrictivo).",
      },
      {
        letra: "B",
        texto: "Comunicación interauricular (CIA)",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque es una cardiopatía congénita frecuente, no es la más común en general, y su presentación auscultatoria característica es el desdoblamiento fijo del segundo ruido, no el soplo pansistólico paraesternal izquierdo intenso.",
      },
      {
        letra: "C",
        texto: "Coartación de aorta",
        correcta: false,
        explicacion:
          "Incorrecta. La coartación de aorta se manifiesta con hipertensión en miembros superiores y pulsos femorales disminuidos o retrasados, no con el soplo pansistólico descrito.",
      },
      {
        letra: "D",
        texto: "Estenosis pulmonar aislada",
        correcta: false,
        explicacion:
          "Incorrecta. La estenosis pulmonar produce un soplo sistólico eyectivo en foco pulmonar, distinto del soplo pansistólico paraesternal izquierdo característico de la CIV.",
      },
    ],
    perla:
      "En la CIV, la intensidad del soplo no se correlaciona con la gravedad: los defectos pequeños generan soplos muy intensos (alto gradiente de presión), mientras que los defectos grandes pueden tener soplos menos llamativos e incluso desaparecer si se desarrolla síndrome de Eisenmenger (inversión del shunt).",
  },
  {
    tema: "Cardiopatías congénitas",
    dificultad: "Media",
    enunciado:
      "Recién nacido prematuro presenta un soplo continuo 'en maquinaria' en el foco pulmonar, con pulso céler y saltón, e irradiación infraclavicular izquierda. ¿Cuál es el manejo farmacológico más adecuado para el cierre de esta condición?",
    opciones: [
      {
        letra: "A",
        texto: "Ibuprofeno o indometacina",
        correcta: true,
        explicacion:
          "Correcta. El cuadro descrito corresponde a persistencia del conducto arterioso (PCA); en el recién nacido prematuro, los inhibidores de la ciclooxigenasa (ibuprofeno o indometacina) promueven el cierre farmacológico del ductus.",
      },
      {
        letra: "B",
        texto: "Prostaglandina E1",
        correcta: false,
        explicacion:
          "Incorrecta. La prostaglandina E1 se utiliza para mantener el ductus arterioso ABIERTO en cardiopatías ductus-dependientes (como la transposición de grandes vasos), es decir, el efecto opuesto al buscado en este caso.",
      },
      {
        letra: "C",
        texto: "Betabloqueadores",
        correcta: false,
        explicacion:
          "Incorrecta. Los betabloqueadores no tienen un rol en el cierre farmacológico del conducto arterioso persistente.",
      },
      {
        letra: "D",
        texto: "Diuréticos como tratamiento definitivo único",
        correcta: false,
        explicacion:
          "Incorrecta. Los diuréticos pueden usarse como manejo sintomático de la sobrecarga de volumen, pero no cierran el ductus; el tratamiento dirigido al cierre es con inhibidores de la ciclooxigenasa.",
      },
    ],
    perla:
      "Ojo con el efecto opuesto de las prostaglandinas según el contexto: en el PCA que se quiere cerrar, se usan inhibidores de la síntesis de prostaglandinas (ibuprofeno/indometacina); en cardiopatías ductus-dependientes donde se necesita mantener el ductus abierto, se administra prostaglandina E1.",
  },
  {
    tema: "Cardiopatías congénitas",
    dificultad: "Alta",
    enunciado:
      "Recién nacido presenta cianosis progresiva que se agrava marcadamente con el cierre espontáneo del conducto arterioso. La ecocardiografía muestra que la aorta nace del ventrículo derecho y la arteria pulmonar del ventrículo izquierdo. ¿Cuál es el manejo inicial más urgente?",
    opciones: [
      {
        letra: "A",
        texto: "Infusión de prostaglandina E1 para mantener el ductus permeable",
        correcta: true,
        explicacion:
          "Correcta. En la transposición de grandes vasos, la supervivencia depende de que exista mezcla de sangre entre ambas circulaciones (a través de CIA, CIV o ductus arterioso); mantener el ductus abierto con prostaglandina E1 es la medida inicial urgente mientras se define el manejo definitivo (habitualmente quirúrgico).",
      },
      {
        letra: "B",
        texto: "Indometacina para cerrar el ductus arterioso",
        correcta: false,
        explicacion:
          "Incorrecta. Cerrar el ductus en este contexto sería catastrófico, ya que el paciente depende de esa comunicación (o de otras) para sobrevivir mientras no se corrija la anomalía anatómica.",
      },
      {
        letra: "C",
        texto: "Observación sin intervención, ya que suele resolverse espontáneamente",
        correcta: false,
        explicacion:
          "Incorrecta. La transposición de grandes vasos es incompatible con la vida sin algún tipo de comunicación entre las circulaciones; sin intervención, el paciente fallece rápidamente tras el cierre natural del ductus.",
      },
      {
        letra: "D",
        texto: "Betabloqueadores para reducir el consumo miocárdico de oxígeno",
        correcta: false,
        explicacion:
          "Incorrecta. Los betabloqueadores no son el manejo urgente de esta cardiopatía ductus-dependiente; la prioridad es mantener la mezcla de sangre entre circulaciones con prostaglandina E1.",
      },
    ],
    perla:
      "La transposición de grandes vasos solo es viable si coexiste algún defecto que permita la mezcla de sangre (CIA, CIV o ductus arterioso persistente); es la cardiopatía cianótica ductus-dependiente clásica que requiere prostaglandina E1 de forma urgente al nacer.",
  },
  {
    tema: "Cardiopatías congénitas",
    dificultad: "Media",
    enunciado:
      "Niño de 2 años con tetralogía de Fallot presenta un episodio de cianosis súbita, agitación e hiperpnea durante el llanto. La madre refiere que el niño adopta espontáneamente la posición de cuclillas, lo cual parece aliviar el episodio. ¿Cuál es la explicación fisiológica de esta maniobra?",
    opciones: [
      {
        letra: "A",
        texto: "Aumenta la resistencia vascular sistémica (poscarga), reduciendo el cortocircuito derecha-izquierda",
        correcta: true,
        explicacion:
          "Correcta. La posición de cuclillas aumenta la resistencia vascular sistémica (poscarga), lo que reduce el gradiente que favorece el paso de sangre desconcentrada de derecha a izquierda a través del defecto septal, mejorando temporalmente la saturación de oxígeno.",
      },
      {
        letra: "B",
        texto: "Disminuye la resistencia vascular pulmonar, aumentando el flujo pulmonar",
        correcta: false,
        explicacion:
          "Incorrecta. El mecanismo principal no es una reducción de la resistencia pulmonar, sino un aumento de la resistencia vascular sistémica que reduce el shunt derecha-izquierda.",
      },
      {
        letra: "C",
        texto: "Reduce la frecuencia cardíaca de forma refleja, disminuyendo el consumo de oxígeno",
        correcta: false,
        explicacion:
          "Incorrecta. El beneficio de la posición de cuclillas se explica principalmente por el aumento de la poscarga sistémica, no por un efecto cronotrópico negativo reflejo.",
      },
      {
        letra: "D",
        texto: "Disminuye el retorno venoso al corazón derecho, aliviando la sobrecarga de volumen",
        correcta: false,
        explicacion:
          "Incorrecta. El mecanismo relevante en Fallot es hemodinámico a través del aumento de la resistencia sistémica, no una reducción del retorno venoso.",
      },
    ],
    perla:
      "En la tetralogía de Fallot, cualquier maniobra o condición que DISMINUYA la resistencia vascular sistémica (llanto, ejercicio, fiebre) empeora la cianosis al aumentar el shunt derecha-izquierda; por el contrario, aumentar la poscarga (cuclillas) la mejora — el principio opuesto al de la mayoría de cardiopatías.",
  },
  {
    tema: "Nutrición infantil",
    dificultad: "Media",
    enunciado:
      "Lactante con desnutrición aguda severa presenta edema bipodálico, piel seca y descamativa, cabello despigmentado y de fácil desprendimiento, y apatía. Su peso corporal no está tan disminuido como se esperaría por el grado de desnutrición. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Kwashiorkor",
        correcta: true,
        explicacion:
          "Correcta. El kwashiorkor se caracteriza por edema bipodálico (por hipoalbuminemia), piel seca con descamación, cambios en el color y textura del cabello, y apatía; el peso puede estar relativamente conservado por el edema, enmascarando la severidad real de la desnutrición.",
      },
      {
        letra: "B",
        texto: "Marasmo",
        correcta: false,
        explicacion:
          "Incorrecta. El marasmo se caracteriza por emaciación severa (pérdida marcada de peso y masa muscular), irritabilidad y ausencia de edema, un cuadro distinto al descrito.",
      },
      {
        letra: "C",
        texto: "Desnutrición crónica leve",
        correcta: false,
        explicacion:
          "Incorrecta. El cuadro descrito (edema, cambios cutáneos y del cabello, apatía) corresponde a una forma de desnutrición aguda severa, no a una forma crónica leve.",
      },
      {
        letra: "D",
        texto: "Deficiencia aislada de hierro",
        correcta: false,
        explicacion:
          "Incorrecta. La deficiencia aislada de hierro produce anemia ferropénica, no el cuadro pluricarencial completo con edema y cambios cutáneos descrito.",
      },
    ],
    perla:
      "Diferenciar marasmo (emaciación severa, irritabilidad, sin edema, por déficit calórico-proteico global) de kwashiorkor (edema, piel y cabello alterados, apatía, por déficit predominantemente proteico) — ambos son formas de desnutrición aguda severa con manejo nutricional cuidadoso y progresivo.",
  },
  {
    tema: "Dermatología neonatal",
    dificultad: "Media",
    enunciado:
      "Recién nacido de piel oscura presenta pústulas frágiles sin base eritematosa, presentes desde el nacimiento, que al romperse dejan máculas hiperpigmentadas con un collarete descamativo. El frotis del contenido muestra predominio de neutrófilos, sin bacterias. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Melanosis pustulosa neonatal transitoria",
        correcta: true,
        explicacion:
          "Correcta. La melanosis pustulosa neonatal transitoria es una dermatosis benigna presente desde el nacimiento, más frecuente en recién nacidos de piel oscura, con pústulas frágiles sin base eritematosa que dejan máculas hiperpigmentadas residuales con collarete descamativo; el frotis muestra neutrófilos sin gérmenes.",
      },
      {
        letra: "B",
        texto: "Impétigo ampolloso",
        correcta: false,
        explicacion:
          "Incorrecta. El impétigo ampolloso presenta datos infecciosos y bacterias visibles en la tinción del contenido de las lesiones, con bullas más francas, a diferencia del cuadro estéril descrito.",
      },
      {
        letra: "C",
        texto: "Candidiasis congénita",
        correcta: false,
        explicacion:
          "Incorrecta. La candidiasis congénita típicamente compromete palmas y plantas, con eritema difuso, y no deja el patrón pigmentario residual característico de la melanosis pustulosa.",
      },
      {
        letra: "D",
        texto: "Eritema tóxico del recién nacido",
        correcta: false,
        explicacion:
          "Incorrecta. El eritema tóxico se caracteriza por pápulas y pústulas sobre una base eritematosa, con predominio de eosinófilos en el frotis, a diferencia de las pústulas sin base eritematosa y el predominio de neutrófilos descritos.",
      },
    ],
    perla:
      "La melanosis pustulosa neonatal transitoria es una entidad benigna y autolimitada; su principal valor está en diferenciarla de cuadros infecciosos (impétigo, candidiasis) mediante la ausencia de eritema de base, el frotis con neutrófilos sin gérmenes, y el patrón de máculas hiperpigmentadas residuales.",
  },
  {
    tema: "Exantemas infecciosos",
    dificultad: "Media",
    enunciado:
      "Niña de 6 años presenta febrícula, seguida de eritema intenso en ambas mejillas ('mejillas abofeteadas'), y posteriormente un exantema reticulado en tronco y extremidades que recurre de forma intermitente durante varias semanas. ¿Cuál es el agente causal y una complicación importante a vigilar?",
    opciones: [
      {
        letra: "A",
        texto: "Parvovirus B19; puede causar aplasia medular o hidrops fetal si la madre está embarazada",
        correcta: true,
        explicacion:
          "Correcta. El eritema infeccioso (quinta enfermedad) está causado por Parvovirus B19, con fases características (mejillas abofeteadas, exantema en encaje en tronco/extremidades, y patrón reticular recurrente); sus complicaciones incluyen aplasia medular (especialmente en pacientes con hemoglobinopatías) e hidrops fetal o aborto si afecta a una gestante.",
      },
      {
        letra: "B",
        texto: "Virus del sarampión; puede causar panencefalitis esclerosante subaguda",
        correcta: false,
        explicacion:
          "Incorrecta. El sarampión cursa con fiebre alta, manchas de Koplik y un exantema morbiliforme cefalocaudal distinto, no con el patrón de 'mejillas abofeteadas' y exantema reticular descrito.",
      },
      {
        letra: "C",
        texto: "Virus de la rubéola; puede causar síndrome de rubéola congénita",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque la rubéola también cursa con fiebre baja y exantema, no presenta el patrón característico de 'mejillas abofeteadas' seguido de exantema reticular recurrente propio del eritema infeccioso.",
      },
      {
        letra: "D",
        texto: "Virus herpes humano 6; puede causar convulsiones febriles",
        correcta: false,
        explicacion:
          "Incorrecta. El virus herpes humano 6 causa el exantema súbito (roséola), con fiebre alta seguida de exantema tras la defervescencia, un patrón distinto al descrito.",
      },
    ],
    perla:
      "El eritema infeccioso cursa característicamente con febrícula (no fiebre alta); el tratamiento es sintomático. En pacientes con anemias hemolíticas crónicas, el Parvovirus B19 puede precipitar una crisis aplásica transitoria grave.",
  },
  {
    tema: "Cirugía pediátrica",
    dificultad: "Media",
    enunciado:
      "Lactante de 4 semanas presenta vómitos posprandiales no biliosos, progresivos, con alcalosis metabólica hipoclorémica e hipokalemia en los exámenes de laboratorio, y una masa palpable en 'oliva' en epigastrio. ¿Cuál es la conducta más adecuada antes de la cirugía?",
    opciones: [
      {
        letra: "A",
        texto: "Corregir la alcalosis metabólica y la deshidratación antes de la piloromiotomía",
        correcta: true,
        explicacion:
          "Correcta. Ante estenosis hipertrófica de píloro, el manejo inicial es la corrección de la alcalosis metabólica hipoclorémica, la hipokalemia y la deshidratación con fluidoterapia; la piloromiotomía (cirugía definitiva) se realiza una vez que el paciente está metabólicamente estable, no como primera medida urgente.",
      },
      {
        letra: "B",
        texto: "Piloromiotomía de emergencia sin corrección metabólica previa",
        correcta: false,
        explicacion:
          "Incorrecta. Operar sin corregir primero las alteraciones metabólicas (alcalosis, hipokalemia, deshidratación) aumenta significativamente el riesgo anestésico y quirúrgico; la estenosis pilórica no es una emergencia quirúrgica inmediata, sino que permite optimización previa.",
      },
      {
        letra: "C",
        texto: "Administrar bicarbonato de sodio para corregir aún más el pH",
        correcta: false,
        explicacion:
          "Incorrecta. El paciente ya presenta alcalosis metabólica; administrar bicarbonato empeoraría el trastorno ácido-base en la dirección incorrecta.",
      },
      {
        letra: "D",
        texto: "Iniciar alimentación enteral forzada para evaluar tolerancia antes de cualquier intervención",
        correcta: false,
        explicacion:
          "Incorrecta. Forzar la alimentación enteral en un paciente con obstrucción pilórica mecánica no resuelve el problema y puede empeorar los vómitos y el desequilibrio hidroelectrolítico.",
      },
    ],
    perla:
      "En la estenosis hipertrófica de píloro, la secuencia correcta es: corregir primero la alcalosis metabólica hipoclorémica, la hipokalemia y la deshidratación con fluidoterapia, y solo después realizar la piloromiotomía (no 'pilorotomía') como tratamiento definitivo.",
  },
  {
    tema: "Urgencias urológicas pediátricas",
    dificultad: "Alta",
    enunciado:
      "Adolescente presenta dolor testicular súbito e intenso, con el testículo elevado y en posición horizontal, sin reflejo cremastérico. ¿Cuál es la conducta más adecuada y en qué ventana de tiempo se prefiere realizarla?",
    opciones: [
      {
        letra: "A",
        texto: "Exploración quirúrgica urgente con orquidopexia bilateral, idealmente dentro de las primeras 6 horas",
        correcta: true,
        explicacion:
          "Correcta. Ante sospecha de torsión testicular, se requiere exploración quirúrgica urgente; la orquidopexia (fijación bilateral, ya que la anomalía anatómica predisponente suele ser bilateral) se prefiere realizar dentro de las primeras 6 horas para maximizar la viabilidad testicular.",
      },
      {
        letra: "B",
        texto: "Manejo expectante con analgésicos, ya que suele tratarse de torsión del apéndice testicular",
        correcta: false,
        explicacion:
          "Incorrecta. El manejo con analgésicos y observación es apropiado para la torsión del apéndice testicular (dolor menos intenso, reflejo cremastérico conservado), no para la sospecha de torsión testicular verdadera, que es una emergencia quirúrgica.",
      },
      {
        letra: "C",
        texto: "Iniciar doxiciclina y ceftriaxona empíricas asumiendo orquiepididimitis",
        correcta: false,
        explicacion:
          "Incorrecta. El cuadro descrito (dolor súbito e intenso, testículo horizontal, ausencia de reflejo cremastérico) es característico de torsión testicular, no de orquiepididimitis, que tendría un inicio más gradual y datos infecciosos asociados.",
      },
      {
        letra: "D",
        texto: "Orquiectomía inmediata sin intento previo de destorsión ni evaluación de viabilidad",
        correcta: false,
        explicacion:
          "Incorrecta. La orquiectomía se reserva para cuando el testículo se confirma necrótico o inviable durante la exploración quirúrgica (generalmente tras más de 24 horas de torsión), no como primera conducta sin evaluar la viabilidad.",
      },
    ],
    perla:
      "Diferenciar torsión testicular (emergencia quirúrgica, dolor súbito e intenso, ausencia de reflejo cremastérico, orquidopexia bilateral idealmente <6h) de torsión del apéndice testicular (dolor menos intenso, manejo analgésico) y de orquiepididimitis (inicio gradual, tratamiento con doxiciclina + ceftriaxona).",
  },
];

const NEUMOLOGIA_QUESTIONS = [
  {
    tema: "EPOC",
    dificultad: "Baja",
    enunciado:
      "Paciente con EPOC conocido presenta exacerbación con aumento de disnea, tos y esputo purulento. ¿Cuál es el manejo broncodilatador inicial más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Combinación de broncodilatadores de acción corta: SAMA + SABA",
        correcta: true,
        explicacion:
          "Correcta. En la exacerbación de EPOC, el manejo broncodilatador inicial es la combinación de un anticolinérgico de acción corta (SAMA) con un beta-agonista de acción corta (SABA), habitualmente nebulizados o en aerocámara.",
      },
      {
        letra: "B",
        texto: "Broncodilatadores de acción prolongada (LABA/LAMA) exclusivamente",
        correcta: false,
        explicacion:
          "Incorrecta. Los broncodilatadores de acción prolongada son para el manejo de mantenimiento crónico, no para el tratamiento agudo de una exacerbación, donde se prefieren los de acción corta por su inicio de acción más rápido.",
      },
      {
        letra: "C",
        texto: "Antibióticos como única medida, sin broncodilatadores",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque los antibióticos pueden estar indicados según las características de la exacerbación (esputo purulento), el manejo broncodilatador con SAMA + SABA es parte fundamental del tratamiento inicial, no debe omitirse.",
      },
      {
        letra: "D",
        texto: "Corticoides inhalados en monoterapia sin broncodilatadores",
        correcta: false,
        explicacion:
          "Incorrecta. Los corticoides (generalmente sistémicos en la exacerbación) se usan como coadyuvantes, no en monoterapia sin broncodilatadores de acción corta.",
      },
    ],
    perla:
      "El manejo estándar de la exacerbación de EPOC combina broncodilatadores de acción corta (SAMA + SABA), corticoides sistémicos, y antibióticos si hay criterios de infección bacteriana (aumento de purulencia del esputo junto con aumento de volumen o disnea).",
  },
  {
    tema: "Asma",
    dificultad: "Media",
    enunciado:
      "Paciente con crisis asmática presenta sibilantes intensos a la auscultación y saturación de oxígeno de 92% respirando aire ambiente. ¿Cómo se clasifica la severidad de esta exacerbación?",
    opciones: [
      {
        letra: "A",
        texto: "Exacerbación moderada",
        correcta: true,
        explicacion:
          "Correcta. Sibilantes intensos con SpO2 entre 90-95% corresponden a una exacerbación asmática moderada; una SpO2 <90% indicaría una exacerbación severa.",
      },
      {
        letra: "B",
        texto: "Exacerbación leve",
        correcta: false,
        explicacion:
          "Incorrecta. La exacerbación leve se caracteriza por sibilantes menos intensos y saturación de oxígeno más conservada, no por el cuadro descrito.",
      },
      {
        letra: "C",
        texto: "Exacerbación severa",
        correcta: false,
        explicacion:
          "Incorrecta. La exacerbación severa se define por una SpO2 <90%, umbral no alcanzado en este caso (92%).",
      },
      {
        letra: "D",
        texto: "Paro respiratorio inminente",
        correcta: false,
        explicacion:
          "Incorrecta. Esta categoría implica signos de agotamiento respiratorio extremo (silencio auscultatorio, alteración de conciencia), no descritos en este caso.",
      },
    ],
    perla:
      "En la clasificación de severidad de la exacerbación asmática, la saturación de oxígeno es un parámetro clave: 90-95% con sibilantes intensos sugiere exacerbación moderada; <90% sugiere exacerbación severa.",
  },
  {
    tema: "Tuberculosis",
    dificultad: "Media",
    enunciado:
      "Paciente con diagnóstico de tuberculosis pulmonar pansensible, sin comorbilidades relevantes. ¿Cuál es el esquema de tratamiento actualmente recomendado?",
    opciones: [
      {
        letra: "A",
        texto: "2HRZE/4HR, administrado todos los días",
        correcta: true,
        explicacion:
          "Correcta. El esquema actual para TBC pansensible es 2HRZE/4HR (2 meses de isoniazida, rifampicina, pirazinamida y etambutol, seguidos de 4 meses de isoniazida y rifampicina), administrado todos los días; el esquema previo de administración 3 veces por semana ya no se recomienda. Este esquema aplica también a formas extrapulmonares y pacientes con VIH, con excepción de las formas osteoarticular, miliar y del SNC.",
      },
      {
        letra: "B",
        texto: "2HRZE/4HR administrado 3 veces por semana",
        correcta: false,
        explicacion:
          "Incorrecta. El esquema de administración intermitente (3 veces por semana) ya no es el recomendado actualmente; el tratamiento debe administrarse todos los días.",
      },
      {
        letra: "C",
        texto: "Monoterapia con isoniazida durante 9 meses",
        correcta: false,
        explicacion:
          "Incorrecta. La monoterapia con isoniazida se usa para el tratamiento de la infección tuberculosa latente, no para la enfermedad tuberculosa activa, que siempre requiere esquema combinado.",
      },
      {
        letra: "D",
        texto: "2HRZE/7HR para todos los casos sin excepción",
        correcta: false,
        explicacion:
          "Incorrecta. La fase de continuación estándar es de 4 meses (HR), no 7; los esquemas prolongados se reservan para formas específicas como la TBC osteoarticular, miliar o del SNC.",
      },
    ],
    perla:
      "El esquema 2HRZE/4HR diario es el estándar actual para TBC pansensible, incluyendo formas extrapulmonares y pacientes con VIH (con excepción de TBC osteoarticular, miliar y del SNC, que requieren esquemas más prolongados). En pediatría de bajo riesgo, el esquema es 2HRZE/2HR.",
  },
  {
    tema: "Insuficiencia respiratoria",
    dificultad: "Alta",
    enunciado:
      "Paciente con síndrome de distrés respiratorio agudo presenta una relación PaO2/FiO2 (PaFi) de 120. ¿Qué implica este valor respecto al manejo ventilatorio?",
    opciones: [
      {
        letra: "A",
        texto: "Es indicación de ventilación mecánica invasiva",
        correcta: true,
        explicacion:
          "Correcta. Una PaFi <150 es uno de los criterios que indican la necesidad de ventilación mecánica invasiva en el síndrome de distrés respiratorio agudo, junto con un gradiente A-a >450 o una PaO2 <55 mmHg con FiO2 al 100%.",
      },
      {
        letra: "B",
        texto: "Es un valor normal que no requiere ninguna intervención",
        correcta: false,
        explicacion:
          "Incorrecta. Una PaFi de 120 está claramente por debajo del umbral de 150 que indica compromiso respiratorio severo con necesidad de soporte ventilatorio invasivo.",
      },
      {
        letra: "C",
        texto: "Solo indica manejo con oxígeno suplementario por cánula nasal",
        correcta: false,
        explicacion:
          "Incorrecta. Con una PaFi tan baja, el soporte con cánula nasal es insuficiente; se requiere ventilación mecánica invasiva según los criterios establecidos.",
      },
      {
        letra: "D",
        texto: "Contraindica el uso de ventilación mecánica",
        correcta: false,
        explicacion:
          "Incorrecta. Es precisamente lo contrario: una PaFi baja es una indicación para iniciar ventilación mecánica invasiva, no una contraindicación.",
      },
    ],
    perla:
      "Criterios de indicación de ventilación mecánica invasiva en distrés respiratorio agudo: PaFi <150, gradiente alveolo-arterial de oxígeno (A-a) >450, o PaO2 <55 mmHg con FiO2 al 100%.",
  },
];

const NEFROLOGIA_QUESTIONS = [
  {
    tema: "Glomerulopatías",
    dificultad: "Media",
    enunciado:
      "Niño de 6 años presenta astenia, edemas, hipertensión arterial, y en el examen de orina se observan cilindros hemáticos y hematíes dismórficos, dos semanas después de una faringoamigdalitis. ¿Cuál es el patrón histológico esperado en este síndrome nefrítico?",
    opciones: [
      {
        letra: "A",
        texto: "Patrón endocapilar, típico de las formas posinfecciosas",
        correcta: true,
        explicacion:
          "Correcta. Las glomerulonefritis posinfecciosas (como la posestreptocócica) típicamente muestran un patrón de proliferación endocapilar, a diferencia de las formas autoinmunes, que suelen cursar con depósitos extracapilares (semilunas).",
      },
      {
        letra: "B",
        texto: "Patrón extracapilar, típico de las formas posinfecciosas",
        correcta: false,
        explicacion:
          "Incorrecta. El patrón extracapilar (con formación de semilunas) es más característico de las glomerulonefritis autoinmunes/rápidamente progresivas, no de las formas posinfecciosas clásicas.",
      },
      {
        letra: "C",
        texto: "Patrón membranoso puro",
        correcta: false,
        explicacion:
          "Incorrecta. El patrón membranoso es característico del síndrome nefrótico (no nefrítico), y no es el hallazgo típico de las glomerulonefritis posinfecciosas.",
      },
      {
        letra: "D",
        texto: "Ausencia de alteraciones histológicas (enfermedad de cambios mínimos)",
        correcta: false,
        explicacion:
          "Incorrecta. La enfermedad de cambios mínimos se asocia al síndrome nefrótico, no al síndrome nefrítico con cilindros hemáticos descrito en este caso.",
      },
    ],
    perla:
      "Síndrome nefrítico: astenia, edemas, hipertensión, cilindros hemáticos y hematuria. Las formas posinfecciosas (ej. posestreptocócica) muestran patrón endocapilar; las formas autoinmunes suelen mostrar depósitos extracapilares (semilunas), asociadas a peor pronóstico funcional renal.",
  },
  {
    tema: "Patología renal",
    dificultad: "Alta",
    enunciado:
      "Paciente diabético presenta fiebre, dolor lumbar, hematuria con coágulos, y en la urografía se observa un defecto de relleno en forma de 'dedo de guante' en la papila renal. ¿Cuál es el diagnóstico más probable?",
    opciones: [
      {
        letra: "A",
        texto: "Necrosis papilar renal",
        correcta: true,
        explicacion:
          "Correcta. La necrosis papilar renal debe sospecharse en pacientes con diabetes mellitus o anemia de células falciformes, presentando fiebre, hematuria con coágulos, dolor, y el característico 'signo de la papila en dedo de guante' en estudios de imagen; también se asocia a pielonefritis, obstrucción urinaria, tuberculosis, cirrosis, uso de AINEs y trombosis renal.",
      },
      {
        letra: "B",
        texto: "Carcinoma de células renales",
        correcta: false,
        explicacion:
          "Incorrecta. El carcinoma renal se presenta típicamente con hematuria, masa palpable y dolor, pero sin el signo radiológico específico de 'papila en dedo de guante', que es característico de la necrosis papilar.",
      },
      {
        letra: "C",
        texto: "Glomerulonefritis rápidamente progresiva",
        correcta: false,
        explicacion:
          "Incorrecta. La glomerulonefritis rápidamente progresiva se manifiesta con deterioro rápido de la función renal y sedimento nefrítico, no con el hallazgo radiológico papilar descrito.",
      },
      {
        letra: "D",
        texto: "Pielonefritis xantogranulomatosa",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque también cursa con fiebre y dolor, la pielonefritis xantogranulomatosa se caracteriza por destrucción renal difusa con masa inflamatoria, no por el signo específico de papila en dedo de guante.",
      },
    ],
    perla:
      "Factores de riesgo para necrosis papilar renal: diabetes mellitus, anemia de células falciformes, pielonefritis, obstrucción urinaria, tuberculosis, cirrosis, uso de AINEs y trombosis renal — un acrónimo útil es 'NSAID' (Necrosis papilar, Sickle cell, Analgésicos/AINEs, Infección/obstrucción, Diabetes).",
  },
  {
    tema: "Trastornos hidroelectrolíticos",
    dificultad: "Alta",
    enunciado:
      "Paciente con secuela de accidente cerebrovascular, postrado, es encontrado en estado de coma y catatonia. Los exámenes muestran hiponatremia severa con osmolaridad urinaria elevada, compatible con SIADH. ¿Cuál es la explicación de su estado de conciencia?",
    opciones: [
      {
        letra: "A",
        texto: "La hiponatremia severa por SIADH puede producir coma por edema cerebral",
        correcta: true,
        explicacion:
          "Correcta. La hiponatremia severa (especialmente si es de instauración rápida) causa edema cerebral por el desplazamiento osmótico de agua hacia las neuronas, pudiendo manifestarse con alteración del estado de conciencia hasta el coma; el SIADH es una causa reconocida de hiponatremia en pacientes con patología del SNC, incluyendo secuelas de ACV.",
      },
      {
        letra: "B",
        texto: "El coma se debe exclusivamente a la progresión natural del ACV, sin relación con el sodio",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque el ACV puede tener secuelas neurológicas propias, la hiponatremia severa documentada es una causa metabólica reversible que puede explicar directamente el deterioro del estado de conciencia y debe corregirse activamente.",
      },
      {
        letra: "C",
        texto: "Se debe a hipernatremia asociada a diabetes insípida central",
        correcta: false,
        explicacion:
          "Incorrecta. El caso describe hiponatremia (SIADH), no hipernatremia; la diabetes insípida central produciría el cuadro electrolítico opuesto.",
      },
      {
        letra: "D",
        texto: "No existe relación fisiopatológica entre el sodio sérico y el nivel de conciencia",
        correcta: false,
        explicacion:
          "Incorrecta. Las alteraciones severas y/o rápidas del sodio sérico (tanto hipo como hipernatremia) tienen un efecto directo y bien establecido sobre la función neurológica y el nivel de conciencia.",
      },
    ],
    perla:
      "El SIADH es una causa frecuente de hiponatremia en pacientes con patología del sistema nervioso central (ACV, TCE, tumores, infecciones); la hiponatremia severa o de instauración rápida puede causar edema cerebral, convulsiones y coma, requiriendo corrección cuidadosa para evitar el síndrome de desmielinización osmótica por corrección demasiado rápida.",
  },
];

const GASTROENTEROLOGIA_QUESTIONS = [
  {
    tema: "Hemorragia digestiva alta",
    dificultad: "Alta",
    enunciado:
      "Paciente con hemorragia digestiva alta es sometido a endoscopía, encontrándose un vaso visible no sangrante en la base de una úlcera gástrica (Forrest IIa). ¿Cuál es el manejo más adecuado?",
    opciones: [
      {
        letra: "A",
        texto: "Hemostasia endoscópica combinada con inhibidor de bomba de protones endovenoso en infusión continua",
        correcta: true,
        explicacion:
          "Correcta. Un vaso visible no sangrante (Forrest IIa) tiene un riesgo alto de resangrado (aproximadamente 40-50%), por lo que el manejo recomendado es la hemostasia endoscópica combinada con IBP endovenoso en infusión continua; el IBP solo, sin terapia endoscópica, es insuficiente en este escenario de alto riesgo.",
      },
      {
        letra: "B",
        texto: "Solo inhibidor de bomba de protones oral, sin terapia endoscópica",
        correcta: false,
        explicacion:
          "Incorrecta. Un Forrest IIa tiene alto riesgo de resangrado y requiere terapia hemostática endoscópica activa, no solo manejo farmacológico oral.",
      },
      {
        letra: "C",
        texto: "Cirugía de urgencia como primera línea, sin intentar manejo endoscópico",
        correcta: false,
        explicacion:
          "Incorrecta. La cirugía se reserva para los casos de falla del manejo endoscópico, no como primera línea ante un Forrest IIa, donde la endoscopía terapéutica es efectiva en la mayoría de los casos.",
      },
      {
        letra: "D",
        texto: "Observación sin ninguna intervención, dado que no hay sangrado activo en el momento de la endoscopía",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque no hay sangrado activo en el momento del examen, el alto riesgo de resangrado del Forrest IIa (40-50%) justifica la hemostasia endoscópica profiláctica, no la observación pasiva.",
      },
    ],
    perla:
      "Clasificación de Forrest para HDA por úlcera péptica: Ia (sangrado en chorro), Ib (sangrado en capa), IIa (vaso visible no sangrante, alto riesgo de resangrado), IIb (coágulo adherido), IIc (mancha hemática), III (base limpia). De Ia a IIa se indica endoscopía + IBP EV; en IIb depende de si sangra al retirar el coágulo.",
  },
  {
    tema: "Infecciones en cirrosis",
    dificultad: "Alta",
    enunciado:
      "Paciente cirrótico con ascitis presenta fiebre y dolor abdominal. El líquido ascítico muestra un recuento elevado de neutrófilos. ¿Cuál es el tratamiento antibiótico de elección y qué medida adicional ayuda a prevenir el síndrome hepatorrenal?",
    opciones: [
      {
        letra: "A",
        texto: "Ceftriaxona o cefotaxima, asociada a albúmina intravenosa",
        correcta: true,
        explicacion:
          "Correcta. En la peritonitis bacteriana espontánea (predominantemente por gérmenes gram negativos), el tratamiento antibiótico de elección es ceftriaxona o cefotaxima; la administración de albúmina intravenosa asociada ayuda a prevenir el desarrollo de síndrome hepatorrenal, una complicación grave de esta infección.",
      },
      {
        letra: "B",
        texto: "Vancomicina, sin necesidad de albúmina adicional",
        correcta: false,
        explicacion:
          "Incorrecta. La vancomicina cubre gram positivos y no es el antibiótico de elección en la PBE, donde predominan los gram negativos; además, la albúmina sí aporta beneficio comprobado en la prevención del síndrome hepatorrenal.",
      },
      {
        letra: "C",
        texto: "Metronidazol en monoterapia",
        correcta: false,
        explicacion:
          "Incorrecta. El metronidazol cubre anaerobios, que no son los gérmenes predominantes en la peritonitis bacteriana espontánea; las cefalosporinas de tercera generación son de elección.",
      },
      {
        letra: "D",
        texto: "Ciprofloxacino como tratamiento del episodio agudo",
        correcta: false,
        explicacion:
          "Incorrecta. El ciprofloxacino (o norfloxacino) se usa como profilaxis de la PBE en pacientes de alto riesgo, no como tratamiento de elección del episodio agudo, donde se prefieren las cefalosporinas de tercera generación.",
      },
    ],
    perla:
      "En la peritonitis bacteriana espontánea predominan los gérmenes gram negativos; el tratamiento es ceftriaxona o cefotaxima, asociado a albúmina IV para prevenir el síndrome hepatorrenal. El norfloxacino se usa como profilaxis en pacientes cirróticos de alto riesgo.",
  },
  {
    tema: "Insuficiencia hepática",
    dificultad: "Media",
    enunciado:
      "Paciente con hepatitis aguda viral desarrolla encefalopatía, coagulopatía severa e ictericia progresiva, compatible con falla hepática fulminante. Se encuentra en un centro de salud de baja complejidad. ¿Cuál es la conducta más adecuada?",
    opciones: [
      {
        letra: "A",
        texto: "Manejo de soporte con hidratación endovenosa y traslado urgente a un centro de mayor complejidad",
        correcta: true,
        explicacion:
          "Correcta. La falla hepática fulminante es una complicación grave de la hepatitis aguda que requiere manejo de soporte (hidratación endovenosa, monitoreo estrecho) y traslado urgente a un centro de mayor complejidad, donde se puede evaluar la necesidad de trasplante hepático y manejo especializado de las complicaciones.",
      },
      {
        letra: "B",
        texto: "Manejo ambulatorio con control en una semana",
        correcta: false,
        explicacion:
          "Incorrecta. La falla hepática fulminante es una emergencia médica con alta mortalidad si no se maneja adecuadamente; el manejo ambulatorio diferido no es apropiado.",
      },
      {
        letra: "C",
        texto: "Iniciar antivirales de acción directa como tratamiento definitivo inmediato en el centro de baja complejidad",
        correcta: false,
        explicacion:
          "Incorrecta. El manejo definitivo de la falla hepática fulminante (que puede incluir evaluación para trasplante) requiere un centro especializado; en el nivel de baja complejidad la prioridad es estabilizar y trasladar.",
      },
      {
        letra: "D",
        texto: "Alta con recomendaciones dietéticas exclusivamente",
        correcta: false,
        explicacion:
          "Incorrecta. Dada la gravedad y el riesgo vital de la falla hepática fulminante, el alta sin manejo activo ni traslado no es una conducta segura.",
      },
    ],
    perla:
      "La falla hepática fulminante es una complicación grave y potencialmente mortal de la hepatitis aguda; en un centro de baja complejidad, la prioridad es el soporte básico (hidratación EV) y el traslado urgente a un centro con capacidad de manejo especializado, incluyendo la posible necesidad de trasplante hepático.",
  },
];

const HEMATOLOGIA_QUESTIONS = [
  {
    tema: "Neoplasias mieloproliferativas",
    dificultad: "Media",
    enunciado:
      "Paciente presenta leucocitosis marcada con predominio de células mieloides en distintos estadios de maduración, y el estudio citogenético confirma la presencia del cromosoma Filadelfia. En un control posterior se observa aumento de células inmaduras y trombocitosis. ¿Cómo se interpreta este último hallazgo?",
    opciones: [
      {
        letra: "A",
        texto: "Progresión a fase acelerada de leucemia mieloide crónica",
        correcta: true,
        explicacion:
          "Correcta. El cromosoma Filadelfia es característico de la leucemia mieloide crónica; el aumento de células inmaduras junto con trombocitosis en la evolución sugiere progresión a la fase acelerada de la enfermedad, un cambio pronóstico importante que requiere reevaluación del tratamiento.",
      },
      {
        letra: "B",
        texto: "Transformación a linfoma de Hodgkin",
        correcta: false,
        explicacion:
          "Incorrecta. El linfoma de Hodgkin es una entidad distinta, no relacionada con el cromosoma Filadelfia ni con la evolución descrita de la leucemia mieloide crónica.",
      },
      {
        letra: "C",
        texto: "Evolución hacia leucemia linfocítica crónica",
        correcta: false,
        explicacion:
          "Incorrecta. La leucemia linfocítica crónica es una neoplasia de línea linfoide, no relacionada con el cromosoma Filadelfia ni con la progresión descrita de una neoplasia mieloide.",
      },
      {
        letra: "D",
        texto: "Remisión completa de la enfermedad",
        correcta: false,
        explicacion:
          "Incorrecta. El aumento de células inmaduras y la trombocitosis son signos de progresión de la enfermedad, no de remisión, que se caracterizaría por la normalización de estos parámetros.",
      },
    ],
    perla:
      "El cromosoma Filadelfia (t(9;22), gen de fusión BCR-ABL) es el marcador característico de la leucemia mieloide crónica; la progresión a fase acelerada (más células inmaduras, trombocitosis o trombocitopenia) precede a la fase blástica, de peor pronóstico.",
  },
  {
    tema: "Anemias",
    dificultad: "Baja",
    enunciado:
      "Paciente con anemia ferropénica confirmada, sin antecedente de cirugía gástrica ni intolerancia digestiva previa. ¿Cuál es la vía de administración de hierro de primera línea?",
    opciones: [
      {
        letra: "A",
        texto: "Hierro oral",
        correcta: true,
        explicacion:
          "Correcta. El hierro oral es el tratamiento de primera línea para la anemia ferropénica en la mayoría de los pacientes; el hierro parenteral se reserva para casos de intolerancia o falta de respuesta a la vía oral, o cuando se requiere una elevación más rápida de la hemoglobina.",
      },
      {
        letra: "B",
        texto: "Hierro parenteral en todos los casos, por su mayor eficacia",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque el hierro parenteral puede lograr una recuperación más rápida, no es la primera línea en pacientes sin contraindicaciones ni intolerancia a la vía oral, dado su mayor costo y riesgo de reacciones adversas.",
      },
      {
        letra: "C",
        texto: "Transfusión de glóbulos rojos como primera medida en todos los casos",
        correcta: false,
        explicacion:
          "Incorrecta. La transfusión se reserva para anemia sintomática severa o inestabilidad hemodinámica, no como manejo de primera línea de la anemia ferropénica no complicada.",
      },
      {
        letra: "D",
        texto: "Eritropoyetina exógena",
        correcta: false,
        explicacion:
          "Incorrecta. La eritropoyetina se usa en anemias asociadas a enfermedad renal crónica u otras condiciones específicas, no como tratamiento de primera línea de la anemia ferropénica simple.",
      },
    ],
    perla:
      "En pacientes gastrectomizados, se prefiere el hierro parenteral sobre el oral, ya que la ausencia de ácido gástrico compromete significativamente la absorción del hierro administrado por vía oral.",
  },
  {
    tema: "Microangiopatías trombóticas",
    dificultad: "Alta",
    enunciado:
      "Paciente presenta anemia hemolítica microangiopática, trombocitopenia, compromiso neurológico fluctuante, lesión renal y fiebre. Se documenta déficit de la enzima ADAMTS13. ¿Cuál es el diagnóstico y el tratamiento de elección?",
    opciones: [
      {
        letra: "A",
        texto: "Púrpura trombocitopénica trombótica; plasmaféresis y corticoides",
        correcta: true,
        explicacion:
          "Correcta. La péntada clásica (anemia hemolítica microangiopática, trombocitopenia por consumo, compromiso neurológico, lesión renal y fiebre) junto con el déficit de ADAMTS13 (que normalmente degrada el factor von Willebrand, y cuya ausencia genera microtrombos plaquetarios) es diagnóstica de púrpura trombocitopénica trombótica; el tratamiento de elección es la plasmaféresis asociada a corticoides.",
      },
      {
        letra: "B",
        texto: "Síndrome hemolítico urémico típico; manejo exclusivamente de soporte, sin plasmaféresis",
        correcta: false,
        explicacion:
          "Incorrecta. El síndrome hemolítico urémico típico (asociado a E. coli productora de toxina Shiga) predomina en niños con predominio de daño renal sin el déficit de ADAMTS13; el cuadro descrito con déficit específico de esta enzima corresponde a PTT, que sí requiere plasmaféresis urgente.",
      },
      {
        letra: "C",
        texto: "Coagulación intravascular diseminada; manejo con plasma fresco congelado exclusivamente",
        correcta: false,
        explicacion:
          "Incorrecta. Aunque la CID también puede cursar con trombocitopenia y hemólisis, el hallazgo específico de déficit de ADAMTS13 es diagnóstico de PTT, no de CID, y el tratamiento de elección en PTT es la plasmaféresis, no solo plasma fresco congelado.",
      },
      {
        letra: "D",
        texto: "Anemia hemolítica autoinmune; corticoides en monoterapia",
        correcta: false,
        explicacion:
          "Incorrecta. La anemia hemolítica autoinmune no cursa característicamente con la péntada descrita ni con déficit de ADAMTS13; el diagnóstico y manejo específico de este caso corresponden a la PTT.",
      },
    ],
    perla:
      "La PTT se produce por déficit (congénito o adquirido, por autoanticuerpos) de ADAMTS13, la enzima que degrada los multímeros grandes del factor von Willebrand; sin ella, se forman microtrombos plaquetarios diseminados. El tratamiento de elección es la plasmaféresis urgente, ya que retrasar el tratamiento aumenta significativamente la mortalidad.",
  },
];

const DERMATOLOGIA_QUESTIONS = [
  {
    tema: "Farmacología dermatológica",
    dificultad: "Media",
    enunciado:
      "Mujer de 22 años con acné severo va a iniciar tratamiento con isotretinoína oral. ¿Qué medida es obligatoria antes de iniciar el fármaco?",
    opciones: [
      {
        letra: "A",
        texto: "Realizar una prueba de embarazo",
        correcta: true,
        explicacion:
          "Correcta. La isotretinoína oral es un retinoide de categoría X (altamente teratogénico), por lo que toda mujer en edad fértil debe realizarse una prueba de embarazo antes de iniciar el tratamiento, además de usar anticoncepción efectiva durante y después del mismo.",
      },
      {
        letra: "B",
        texto: "Suspender cualquier método anticonceptivo antes de iniciar el fármaco",
        correcta: false,
        explicacion:
          "Incorrecta. Es exactamente lo contrario: se debe asegurar un método anticonceptivo efectivo antes y durante el tratamiento con isotretinoína, dado su alto riesgo teratogénico.",
      },
      {
        letra: "C",
        texto: "Ninguna medida especial, ya que los retinoides orales son seguros en el embarazo",
        correcta: false,
        explicacion:
          "Incorrecta. Los retinoides orales como la isotretinoína están formalmente contraindicados en el embarazo por su alto riesgo teratogénico; sí existe una diferencia con los retinoides tópicos, que tienen menor absorción sistémica y distinto perfil de riesgo.",
      },
      {
        letra: "D",
        texto: "Realizar biopsia cutánea previa de forma sistemática",
        correcta: false,
        explicacion:
          "Incorrecta. La biopsia cutánea no es un requisito para iniciar isotretinoína; la medida obligatoria relevante es descartar embarazo antes del inicio del tratamiento.",
      },
    ],
    perla:
      "Los retinoides orales (isotretinoína) son categoría X en el embarazo (teratogénicos) y requieren prueba de embarazo negativa antes de iniciar el tratamiento en mujeres en edad fértil; los retinoides tópicos, en cambio, sí pueden usarse con las precauciones adecuadas.",
  },
  {
    tema: "Infecciones micóticas",
    dificultad: "Media",
    enunciado:
      "Niño presenta una masa inflamatoria dolorosa en el cuero cabelludo, con alopecia localizada y adenopatías cervicales asociadas. Se sospecha infección por Microsporum canis. ¿Cuál es el diagnóstico y el tratamiento de elección?",
    opciones: [
      {
        letra: "A",
        texto: "Querion de Celso (tiña de la cabeza inflamatoria); griseofulvina o terbinafina, con o sin corticoides",
        correcta: true,
        explicacion:
          "Correcta. El querion de Celso es la forma inflamatoria de la tiña de la cabeza, con una masa inflamatoria del cuero cabelludo, alopecia y adenopatías cervicales, típicamente causada por Microsporum canis; el tratamiento de elección es griseofulvina o terbinafina, pudiendo asociarse corticoides para reducir la respuesta inflamatoria y el riesgo de cicatrización con alopecia permanente.",
      },
      {
        letra: "B",
        texto: "Impétigo estafilocócico; tratamiento con mupirocina tópica exclusivamente",
        correcta: false,
        explicacion:
          "Incorrecta. El impétigo es una infección bacteriana superficial que no cursa con la masa inflamatoria profunda ni las adenopatías asociadas descritas; el cuadro es más compatible con una infección micótica inflamatoria del cuero cabelludo.",
      },
      {
        letra: "C",
        texto: "Foliculitis decalvante; tratamiento con isotretinoína",
        correcta: false,
        explicacion:
          "Incorrecta. La foliculitis decalvante es una entidad inflamatoria crónica distinta, no asociada característicamente a Microsporum canis ni al cuadro agudo descrito.",
      },
      {
        letra: "D",
        texto: "Alopecia areata; observación sin tratamiento antimicrobiano",
        correcta: false,
        explicacion:
          "Incorrecta. La alopecia areata no cursa con masa inflamatoria, dolor ni adenopatías, y no está causada por un hongo; el cuadro descrito con estos hallazgos apunta a una infección micótica inflamatoria (querion de Celso).",
      },
    ],
    perla:
      "El querion de Celso es la forma más severa e inflamatoria de la tiña de la cabeza; el tratamiento antifúngico sistémico (griseofulvina o terbinafina) es necesario porque los antifúngicos tópicos no penetran adecuadamente el folículo piloso.",
  },
];

const EPIDEMIOLOGIA_QUESTIONS = [
  {
    tema: "Sesgos en investigación",
    dificultad: "Media",
    enunciado:
      "En un estudio observacional, los participantes con síntomas más severos de la enfermedad estudiada tienen mayor probabilidad de aceptar participar, mientras que los asintomáticos tienden a rechazar la invitación. ¿Cómo se denomina este tipo de sesgo?",
    opciones: [
      {
        letra: "A",
        texto: "Sesgo de autoselección (o de no respuesta sistemática)",
        correcta: true,
        explicacion:
          "Correcta. El sesgo de autoselección (también llamado de no respuesta sistemática) ocurre cuando la participación de los sujetos en el estudio está fuertemente motivada por su propio estado de salud o nivel de exposición, distorsionando la representatividad de la muestra.",
      },
      {
        letra: "B",
        texto: "Sesgo de memoria (recall bias)",
        correcta: false,
        explicacion:
          "Incorrecta. El sesgo de memoria ocurre cuando los participantes recuerdan de forma diferencial exposiciones pasadas según su estado de enfermedad, un fenómeno distinto a la selección diferencial para participar en el estudio.",
      },
      {
        letra: "C",
        texto: "Sesgo del observador",
        correcta: false,
        explicacion:
          "Incorrecta. El sesgo del observador se refiere a que el investigador mide o clasifica de forma diferencial según el conocimiento del estado de exposición o enfermedad, no a la decisión de los participantes de involucrarse en el estudio.",
      },
      {
        letra: "D",
        texto: "Sesgo de confusión (confounding)",
        correcta: false,
        explicacion:
          "Incorrecta. El sesgo de confusión ocurre por la presencia de una tercera variable asociada tanto a la exposición como al desenlace, distinto al fenómeno de participación diferencial descrito en este caso.",
      },
    ],
    perla:
      "Los sesgos en investigación pueden clasificarse ampliamente en sesgos de selección de participantes, sesgos de medición, y factores de confusión; el sesgo de autoselección es un tipo específico de sesgo de selección relacionado con la motivación de los sujetos para participar.",
  },
  {
    tema: "Niveles de prevención",
    dificultad: "Baja",
    enunciado:
      "Un programa de salud pública busca minimizar los efectos adversos derivados del propio tratamiento médico ya administrado a los pacientes, evitando la sobremedicalización y el daño iatrogénico. ¿A qué nivel de prevención corresponde esta intervención?",
    opciones: [
      {
        letra: "A",
        texto: "Prevención cuaternaria",
        correcta: true,
        explicacion:
          "Correcta. La prevención cuaternaria busca específicamente evitar o mitigar el daño causado por el propio sistema de salud o tratamiento médico (sobremedicalización, procedimientos innecesarios, efectos adversos evitables).",
      },
      {
        letra: "B",
        texto: "Prevención primaria",
        correcta: false,
        explicacion:
          "Incorrecta. La prevención primaria actúa antes de que aparezca la enfermedad (vacunación, promoción de estilos de vida saludables), no sobre los efectos del tratamiento ya administrado.",
      },
      {
        letra: "C",
        texto: "Prevención secundaria",
        correcta: false,
        explicacion:
          "Incorrecta. La prevención secundaria corresponde al diagnóstico y tratamiento oportuno de la enfermedad ya presente, no a evitar el daño causado por dicho tratamiento.",
      },
      {
        letra: "D",
        texto: "Prevención terciaria",
        correcta: false,
        explicacion:
          "Incorrecta. La prevención terciaria se enfoca en la rehabilitación tras la enfermedad, no específicamente en evitar el daño derivado de las intervenciones médicas mismas.",
      },
    ],
    perla:
      "Niveles de prevención: primaria (antes de la enfermedad), secundaria (diagnóstico y tratamiento oportuno), terciaria (rehabilitación), cuaternaria (evitar el daño causado por el propio sistema de salud o tratamiento, incluyendo la sobremedicalización).",
  },
  {
    tema: "Diseños de estudio",
    dificultad: "Media",
    enunciado:
      "Al inicio de un brote epidémico de una enfermedad nueva, con información limitada sobre su comportamiento, ¿qué tipo de estudios son los más apropiados para generar las primeras hipótesis etiológicas?",
    opciones: [
      {
        letra: "A",
        texto: "Estudios descriptivos: reportes de casos, series de casos, estudios transversales y ecológicos",
        correcta: true,
        explicacion:
          "Correcta. Al inicio de una epidemia, cuando la información disponible es limitada, los estudios descriptivos (reportes de caso, series de casos, transversales, ecológicos) son los más apropiados, ya que describen las variables epidemiológicas básicas (tiempo, persona, lugar) y a partir de ellas se generan las primeras hipótesis, que luego se contrastan con estudios analíticos.",
      },
      {
        letra: "B",
        texto: "Ensayos clínicos aleatorizados controlados",
        correcta: false,
        explicacion:
          "Incorrecta. Los ensayos clínicos aleatorizados son estudios experimentales que se diseñan una vez que existen hipótesis específicas a probar, típicamente sobre intervenciones terapéuticas; no son el punto de partida para generar hipótesis en un brote nuevo con información limitada.",
      },
      {
        letra: "C",
        texto: "Estudios de cohorte prospectivos de gran tamaño muestral",
        correcta: false,
        explicacion:
          "Incorrecta. Los estudios de cohorte prospectivos requieren tiempo, recursos y conocimiento previo sobre las exposiciones relevantes a estudiar; no son la primera opción cuando aún se está caracterizando un brote nuevo.",
      },
      {
        letra: "D",
        texto: "Metaanálisis de la literatura existente",
        correcta: false,
        explicacion:
          "Incorrecta. Un metaanálisis requiere estudios previos ya publicados sobre el tema; ante una enfermedad completamente nueva, no existe aún literatura suficiente para realizar esta síntesis.",
      },
    ],
    perla:
      "La secuencia lógica de investigación epidemiológica ante un fenómeno nuevo es: estudios descriptivos (generan hipótesis) → estudios analíticos observacionales, como casos y controles o cohortes (prueban hipótesis) → ensayos clínicos (confirman eficacia de intervenciones).",
  },
];

const ALL_QUESTIONS = [
  ...CARDIO_QUESTIONS.map((q) => ({ ...q, especialidad: "Cardiología" })),
  ...ENDOCRINO_QUESTIONS.map((q) => ({ ...q, especialidad: "Endocrinología" })),
  ...OBSTETRICIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Obstetricia" })),
  ...PSIQUIATRIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Psiquiatría" })),
  ...REUMATOLOGIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Reumatología" })),
  ...EKG_QUESTIONS.map((q) => ({ ...q, especialidad: "EKG" })),
  ...INFECTOLOGIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Infectología" })),
  ...CIRUGIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Cirugía" })),
  ...GINECOLOGIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Ginecología" })),
  ...NEUROLOGIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Neurología" })),
  ...PEDIATRIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Pediatría" })),
  ...NEUMOLOGIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Neumología" })),
  ...NEFROLOGIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Nefrología" })),
  ...GASTROENTEROLOGIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Gastroenterología" })),
  ...HEMATOLOGIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Hematología" })),
  ...DERMATOLOGIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Dermatología" })),
  ...EPIDEMIOLOGIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Epidemiología" })),
].map(mezclarOpcionesPregunta);

const ESPECIALIDADES = [
  "Todas",
  "Cardiología",
  "Endocrinología",
  "Obstetricia",
  "Psiquiatría",
  "Reumatología",
  "EKG",
  "Infectología",
  "Cirugía",
  "Ginecología",
  "Neurología",
  "Pediatría",
  "Neumología",
  "Nefrología",
  "Gastroenterología",
  "Hematología",
  "Dermatología",
  "Epidemiología",
];




const FONT_IMPORTS =
  "@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');";

const WRAP_STYLE = {
  fontFamily: "'Inter', sans-serif",
  color: PALETTE.ink,
  maxWidth: 720,
  margin: "0 auto",
  padding: "0 4px",
};

const STATS_KEY = "banco_mir_enarm_stats_v1";

function cargarEstadisticas() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function guardarEstadisticas(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // localStorage no disponible; se pierde el progreso silenciosamente
  }
}

function registrarRespuesta(especialidad, tema, esCorrecta) {
  const stats = cargarEstadisticas();
  if (!stats[especialidad]) stats[especialidad] = {};
  if (!stats[especialidad][tema]) stats[especialidad][tema] = { correctas: 0, total: 0 };
  stats[especialidad][tema].total += 1;
  if (esCorrecta) stats[especialidad][tema].correctas += 1;
  guardarEstadisticas(stats);
}

function Waveform({ pulse }) {
  return (
    <svg
      viewBox="0 0 600 80"
      style={{ width: "100%", height: 60, display: "block" }}
      preserveAspectRatio="none"
    >
      <polyline
        points="0,40 60,40 80,40 95,10 110,70 125,40 160,40 220,40 240,40 255,15 270,65 285,40 320,40 380,40 400,40 415,10 430,70 445,40 480,40 540,40 560,40 575,15 590,65 600,40"
        fill="none"
        stroke={pulse === "correct" ? PALETTE.teal : pulse === "wrong" ? PALETTE.crimson : PALETTE.ink}
        strokeWidth={pulse ? 3 : 2}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          filter: pulse ? "drop-shadow(0 0 4px rgba(0,0,0,0.15))" : "none",
          transition: "stroke 0.25s ease, stroke-width 0.25s ease",
        }}
      />
    </svg>
  );
}

function GridBackdrop() {
  const lines = [];
  for (let x = 0; x <= 600; x += 20) {
    lines.push(
      <line
        key={"v" + x}
        x1={x}
        y1={0}
        x2={x}
        y2={300}
        stroke={x % 100 === 0 ? PALETTE.gridMajor : PALETTE.gridMinor}
        strokeWidth={x % 100 === 0 ? 1 : 0.5}
      />
    );
  }
  for (let y = 0; y <= 300; y += 20) {
    lines.push(
      <line
        key={"h" + y}
        x1={0}
        y1={y}
        x2={600}
        y2={y}
        stroke={y % 100 === 0 ? PALETTE.gridMajor : PALETTE.gridMinor}
        strokeWidth={y % 100 === 0 ? 1 : 0.5}
      />
    );
  }
  return (
    <svg
      viewBox="0 0 600 300"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }}
    >
      {lines}
    </svg>
  );
}

function ModoEstudio() {
  const [especialidad, setEspecialidad] = useState("Todas");
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [pulse, setPulse] = useState(null);
  const [expanded, setExpanded] = useState(new Set());

  const pool =
    especialidad === "Todas"
      ? ALL_QUESTIONS
      : ALL_QUESTIONS.filter((item) => item.especialidad === especialidad);

  const q = pool[idx];
  const total = pool.length;
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.correcta).length;

  function cambiarEspecialidad(nueva) {
    setEspecialidad(nueva);
    setIdx(0);
    setSelected(null);
    setAnswers({});
    setFinished(false);
    setPulse(null);
    setExpanded(new Set());
  }

  function manejarClick(opcion) {
    if (selected === null) {
      // Primera vez que responde esta pregunta: se registra como su respuesta
      setSelected(opcion.letra);
      setAnswers((prev) => ({ ...prev, [idx]: opcion }));
      setPulse(opcion.correcta ? "correct" : "wrong");
      setTimeout(() => setPulse(null), 900);
      registrarRespuesta(q.especialidad, q.tema, opcion.correcta);
    } else {
      // Ya respondió: solo abre/cierra el análisis de esa alternativa, sin cambiar el puntaje
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(opcion.letra)) next.delete(opcion.letra);
        else next.add(opcion.letra);
        return next;
      });
    }
  }

  function siguiente() {
    if (idx + 1 < total) {
      setIdx(idx + 1);
      setSelected(answers[idx + 1] ? answers[idx + 1].letra : null);
      setExpanded(new Set());
    } else {
      setFinished(true);
    }
  }

  function anterior() {
    if (idx > 0) {
      setIdx(idx - 1);
      setSelected(answers[idx - 1] ? answers[idx - 1].letra : null);
      setExpanded(new Set());
    }
  }

  function reiniciar() {
    setIdx(0);
    setSelected(null);
    setAnswers({});
    setFinished(false);
    setPulse(null);
    setExpanded(new Set());
  }

  const fontImports = FONT_IMPORTS;
  const wrap = WRAP_STYLE;

  if (finished) {
    const pct = Math.round((correctCount / total) * 100);
    return (
      <div style={wrap}>
        <style>{fontImports}</style>
        <div
          style={{
            background: PALETTE.paper,
            border: `1px solid ${PALETTE.cardBorder}`,
            borderRadius: 4,
            padding: "32px 28px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              letterSpacing: 1.5,
              color: PALETTE.slate,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Resultado final
          </div>
          <div
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 48,
              fontWeight: 700,
              color: pct >= 70 ? PALETTE.teal : PALETTE.crimson,
              lineHeight: 1,
            }}
          >
            {correctCount}/{total}
          </div>
          <div style={{ fontSize: 14, color: PALETTE.slate, marginTop: 6, marginBottom: 24 }}>
            {pct}% de respuestas correctas · Cardiología
          </div>
          <button
            onClick={reiniciar}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              padding: "10px 22px",
              background: PALETTE.ink,
              color: PALETTE.paper,
              border: "none",
              borderRadius: 3,
              cursor: "pointer",
            }}
          >
            Reintentar el bloque
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <style>{fontImports}</style>

      {/* Header con trazo ECG */}
      <div
        style={{
          background: PALETTE.ink,
          borderRadius: "4px 4px 0 0",
          padding: "14px 20px 4px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 4,
          }}
        >
          <div style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 700, fontSize: 17, color: PALETTE.paper }}>
            Banco de Preguntas · {especialidad === "Todas" ? "Mixto" : especialidad}
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              color: pulse === "correct" ? "#5FCFC9" : pulse === "wrong" ? "#E8858F" : "#9AAAAC",
              letterSpacing: 1,
            }}
          >
            MIR / ENARM
          </div>
        </div>
        <Waveform pulse={pulse} />
      </div>

      {/* Pestañas de especialidad */}
      <div
        style={{
          display: "flex",
          gap: 6,
          padding: "10px 20px",
          background: "#F1ECE2",
          borderLeft: `1px solid ${PALETTE.cardBorder}`,
          borderRight: `1px solid ${PALETTE.cardBorder}`,
          flexWrap: "wrap",
        }}
      >
        {ESPECIALIDADES.map((esp) => {
          const activa = especialidad === esp;
          const count =
            esp === "Todas"
              ? ALL_QUESTIONS.length
              : ALL_QUESTIONS.filter((item) => item.especialidad === esp).length;
          return (
            <button
              key={esp}
              onClick={() => cambiarEspecialidad(esp)}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11.5,
                padding: "6px 12px",
                borderRadius: 14,
                border: `1px solid ${activa ? PALETTE.ink : PALETTE.cardBorder}`,
                background: activa ? PALETTE.ink : "transparent",
                color: activa ? PALETTE.paper : PALETTE.slate,
                cursor: "pointer",
              }}
            >
              {esp} ({count})
            </button>
          );
        })}
      </div>

      {/* Barra de progreso */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 20px",
          background: "#F1ECE2",
          borderLeft: `1px solid ${PALETTE.cardBorder}`,
          borderRight: `1px solid ${PALETTE.cardBorder}`,
        }}
      >
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: PALETTE.slate }}>
          Pregunta {idx + 1} / {total}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {pool.map((_, i) => {
            const ans = answers[i];
            let bg = "#D9D2C4";
            if (ans) bg = ans.correcta ? PALETTE.teal : PALETTE.crimson;
            if (i === idx) bg = PALETTE.ink;
            return (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: bg,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Tarjeta de pregunta */}
      <div
        style={{
          position: "relative",
          background: PALETTE.paper,
          border: `1px solid ${PALETTE.cardBorder}`,
          borderTop: "none",
          padding: "22px 24px 26px",
        }}
      >
        <GridBackdrop />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                padding: "3px 8px",
                background: "rgba(27,43,46,0.08)",
                color: PALETTE.ink,
                borderRadius: 3,
                fontWeight: 600,
              }}
            >
              {q.especialidad}
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                padding: "3px 8px",
                background: "rgba(31,111,107,0.12)",
                color: PALETTE.teal,
                borderRadius: 3,
              }}
            >
              {q.tema}
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                padding: "3px 8px",
                background: "rgba(27,43,46,0.06)",
                color: PALETTE.slate,
                borderRadius: 3,
              }}
            >
              Dificultad: {q.dificultad}
            </span>
          </div>

          <p style={{ fontSize: 16, lineHeight: 1.55, marginBottom: 20 }}>{q.enunciado}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.opciones.map((op) => {
              const isSelected = selected === op.letra;
              const showState = selected !== null;
              const isOpen = showState && (isSelected || op.correcta || expanded.has(op.letra));
              let borderColor = PALETTE.cardBorder;
              let bg = "#FFFFFF";
              if (showState && op.correcta) {
                borderColor = PALETTE.teal;
                bg = "rgba(31,111,107,0.07)";
              } else if (showState && isSelected && !op.correcta) {
                borderColor = PALETTE.crimson;
                bg = "rgba(163,38,56,0.07)";
              } else if (showState && expanded.has(op.letra)) {
                borderColor = "#C9C1B2";
                bg = "rgba(27,43,46,0.03)";
              }
              return (
                <div key={op.letra}>
                  <button
                    onClick={() => manejarClick(op)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      padding: "12px 14px",
                      background: bg,
                      border: `1.5px solid ${borderColor}`,
                      borderRadius: 4,
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontWeight: 600,
                        fontSize: 13,
                        color:
                          showState && op.correcta
                            ? PALETTE.teal
                            : showState && isSelected
                            ? PALETTE.crimson
                            : PALETTE.slate,
                        minWidth: 16,
                      }}
                    >
                      {op.letra}
                    </span>
                    <span style={{ fontSize: 14.5, lineHeight: 1.4, flex: 1 }}>{op.texto}</span>
                    {showState && !isSelected && !op.correcta && (
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: 11,
                          color: PALETTE.slate,
                          whiteSpace: "nowrap",
                          marginLeft: 6,
                        }}
                      >
                        {expanded.has(op.letra) ? "Ocultar ▲" : "Analizar ▼"}
                      </span>
                    )}
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: PALETTE.slate,
                        padding: "8px 14px 4px 30px",
                        borderLeft: `2px solid ${op.correcta ? PALETTE.teal : PALETTE.crimson}`,
                        marginLeft: 4,
                        marginTop: 2,
                      }}
                    >
                      {op.explicacion}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selected && (
            <div
              style={{
                marginTop: 18,
                padding: "12px 14px",
                background: "rgba(27,43,46,0.05)",
                borderRadius: 4,
                fontSize: 13.5,
                lineHeight: 1.55,
              }}
            >
              <strong style={{ fontFamily: "'Source Serif 4', serif" }}>Perla clínica:</strong> {q.perla}
            </div>
          )}
        </div>
      </div>

      {/* Navegación */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "14px 4px",
        }}
      >
        <button
          onClick={anterior}
          disabled={idx === 0}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            padding: "9px 16px",
            background: "transparent",
            color: idx === 0 ? "#C9C1B2" : PALETTE.ink,
            border: `1.5px solid ${idx === 0 ? "#E4DCCF" : PALETTE.ink}`,
            borderRadius: 3,
            cursor: idx === 0 ? "default" : "pointer",
          }}
        >
          ← Anterior
        </button>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: PALETTE.slate, alignSelf: "center" }}>
          {correctCount} correctas de {answeredCount} respondidas
        </div>
        <button
          onClick={siguiente}
          disabled={selected === null}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            padding: "9px 18px",
            background: selected === null ? "#E4DCCF" : PALETTE.ink,
            color: selected === null ? "#A79F8F" : PALETTE.paper,
            border: "none",
            borderRadius: 3,
            cursor: selected === null ? "default" : "pointer",
          }}
        >
          {idx + 1 === total ? "Ver resultado" : "Siguiente →"}
        </button>
      </div>
    </div>
  );
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function mezclarOpcionesPregunta(q) {
  const opcionesMezcladas = shuffleArray(q.opciones).map((op, i) => ({
    ...op,
    letra: String.fromCharCode(65 + i), // A, B, C, D, E...
  }));
  return { ...q, opciones: opcionesMezcladas };
}

function formatTiempo(segundos) {
  const s = Math.max(0, segundos);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

const CANTIDADES_EXAMEN = [5, 10, 15, 20];
const SEGUNDOS_POR_PREGUNTA = 60;

function ModoExamen() {
  const [fase, setFase] = useState("config");
  const [especialidadExamen, setEspecialidadExamen] = useState("Todas");
  const [cantidadElegida, setCantidadElegida] = useState(10);
  const [preguntasExamen, setPreguntasExamen] = useState([]);
  const [idxExamen, setIdxExamen] = useState(0);
  const [respuestasExamen, setRespuestasExamen] = useState({});
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [reviewExpanded, setReviewExpanded] = useState(new Set());
  const intervalRef = useRef(null);

  const disponibles =
    especialidadExamen === "Todas"
      ? ALL_QUESTIONS.length
      : ALL_QUESTIONS.filter((q) => q.especialidad === especialidadExamen).length;

  useEffect(() => {
    if (fase !== "activo") return;
    intervalRef.current = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [fase]);

  useEffect(() => {
    if (fase === "activo" && tiempoRestante === 0) {
      finalizarExamen();
    }
  }, [tiempoRestante, fase]);

  function iniciarExamen() {
    const pool =
      especialidadExamen === "Todas"
        ? ALL_QUESTIONS
        : ALL_QUESTIONS.filter((q) => q.especialidad === especialidadExamen);
    const n = Math.min(cantidadElegida, pool.length);
    const seleccion = shuffleArray(pool).slice(0, n);
    setPreguntasExamen(seleccion);
    setIdxExamen(0);
    setRespuestasExamen({});
    setReviewExpanded(new Set());
    setTiempoRestante(n * SEGUNDOS_POR_PREGUNTA);
    setFase("activo");
  }

  function elegirRespuesta(letra) {
    setRespuestasExamen((prev) => ({ ...prev, [idxExamen]: letra }));
  }

  function irA(i) {
    if (i >= 0 && i < preguntasExamen.length) setIdxExamen(i);
  }

  function finalizarExamen() {
    clearInterval(intervalRef.current);
    preguntasExamen.forEach((q, i) => {
      const letraElegida = respuestasExamen[i];
      if (letraElegida === undefined) return;
      const opCorrecta = q.opciones.find((o) => o.correcta);
      registrarRespuesta(q.especialidad, q.tema, letraElegida === opCorrecta.letra);
    });
    setFase("resultados");
  }

  function nuevoExamen() {
    clearInterval(intervalRef.current);
    setFase("config");
  }

  function toggleReview(key) {
    setReviewExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  // ---------- PANTALLA: CONFIGURACIÓN ----------
  if (fase === "config") {
    return (
      <div style={WRAP_STYLE}>
        <style>{FONT_IMPORTS}</style>
        <div
          style={{
            background: PALETTE.ink,
            borderRadius: "4px 4px 0 0",
            padding: "14px 20px 16px",
          }}
        >
          <div style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 700, fontSize: 17, color: PALETTE.paper }}>
            Modo Examen
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9AAAAC", marginTop: 2 }}>
            Sin feedback inmediato · tiempo límite · resumen al final
          </div>
        </div>

        <div
          style={{
            background: PALETTE.paper,
            border: `1px solid ${PALETTE.cardBorder}`,
            borderTop: "none",
            padding: "22px 24px 26px",
          }}
        >
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: PALETTE.slate, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
              Especialidad
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ESPECIALIDADES.map((esp) => {
                const activa = especialidadExamen === esp;
                const count =
                  esp === "Todas" ? ALL_QUESTIONS.length : ALL_QUESTIONS.filter((q) => q.especialidad === esp).length;
                return (
                  <button
                    key={esp}
                    onClick={() => setEspecialidadExamen(esp)}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 11.5,
                      padding: "6px 12px",
                      borderRadius: 14,
                      border: `1px solid ${activa ? PALETTE.ink : PALETTE.cardBorder}`,
                      background: activa ? PALETTE.ink : "transparent",
                      color: activa ? PALETTE.paper : PALETTE.slate,
                      cursor: "pointer",
                    }}
                  >
                    {esp} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: 26 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: PALETTE.slate, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
              Número de preguntas
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {CANTIDADES_EXAMEN.map((n) => {
                const activa = cantidadElegida === n;
                const deshabilitada = n > disponibles;
                return (
                  <button
                    key={n}
                    onClick={() => !deshabilitada && setCantidadElegida(n)}
                    disabled={deshabilitada}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 13,
                      fontWeight: 600,
                      padding: "8px 16px",
                      borderRadius: 4,
                      border: `1.5px solid ${activa ? PALETTE.ink : PALETTE.cardBorder}`,
                      background: activa ? PALETTE.ink : "transparent",
                      color: deshabilitada ? "#C9C1B2" : activa ? PALETTE.paper : PALETTE.ink,
                      cursor: deshabilitada ? "default" : "pointer",
                    }}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            <div style={{ fontSize: 12, color: PALETTE.slate, marginTop: 8 }}>
              {disponibles} preguntas disponibles en "{especialidadExamen}" · {SEGUNDOS_POR_PREGUNTA}s por pregunta →{" "}
              {formatTiempo(Math.min(cantidadElegida, disponibles) * SEGUNDOS_POR_PREGUNTA)} en total
            </div>
          </div>

          <button
            onClick={iniciarExamen}
            disabled={disponibles === 0}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              padding: "11px 24px",
              background: PALETTE.ink,
              color: PALETTE.paper,
              border: "none",
              borderRadius: 3,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Comenzar examen
          </button>
        </div>
      </div>
    );
  }

  // ---------- PANTALLA: EXAMEN ACTIVO ----------
  if (fase === "activo") {
    const q = preguntasExamen[idxExamen];
    const respondida = respuestasExamen[idxExamen] !== undefined;
    const totalRespondidas = Object.keys(respuestasExamen).length;
    const urgente = tiempoRestante <= 60;

    return (
      <div style={WRAP_STYLE}>
        <style>{FONT_IMPORTS}</style>
        <div
          style={{
            background: PALETTE.ink,
            borderRadius: "4px 4px 0 0",
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 700, fontSize: 15, color: PALETTE.paper }}>
            Pregunta {idxExamen + 1} / {preguntasExamen.length}
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 18,
              fontWeight: 700,
              color: urgente ? "#E8858F" : "#5FCFC9",
              letterSpacing: 1,
            }}
          >
            ⏱ {formatTiempo(tiempoRestante)}
          </div>
        </div>

        {/* Navegador de preguntas */}
        <div
          style={{
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
            padding: "10px 20px",
            background: "#F1ECE2",
            borderLeft: `1px solid ${PALETTE.cardBorder}`,
            borderRight: `1px solid ${PALETTE.cardBorder}`,
          }}
        >
          {preguntasExamen.map((_, i) => {
            const contestada = respuestasExamen[i] !== undefined;
            const actual = i === idxExamen;
            return (
              <button
                key={i}
                onClick={() => irA(i)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: `1.5px solid ${actual ? PALETTE.ink : PALETTE.cardBorder}`,
                  background: actual ? PALETTE.ink : contestada ? "rgba(31,111,107,0.15)" : "transparent",
                  color: actual ? PALETTE.paper : PALETTE.ink,
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Tarjeta de pregunta */}
        <div
          style={{
            position: "relative",
            background: PALETTE.paper,
            border: `1px solid ${PALETTE.cardBorder}`,
            borderTop: "none",
            padding: "22px 24px 26px",
          }}
        >
          <GridBackdrop />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  padding: "3px 8px",
                  background: "rgba(27,43,46,0.08)",
                  color: PALETTE.ink,
                  borderRadius: 3,
                  fontWeight: 600,
                }}
              >
                {q.especialidad}
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  padding: "3px 8px",
                  background: "rgba(31,111,107,0.12)",
                  color: PALETTE.teal,
                  borderRadius: 3,
                }}
              >
                {q.tema}
              </span>
            </div>

            <p style={{ fontSize: 16, lineHeight: 1.55, marginBottom: 20 }}>{q.enunciado}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.opciones.map((op) => {
                const marcada = respuestasExamen[idxExamen] === op.letra;
                return (
                  <button
                    key={op.letra}
                    onClick={() => elegirRespuesta(op.letra)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      padding: "12px 14px",
                      background: marcada ? "rgba(27,43,46,0.06)" : "#FFFFFF",
                      border: `1.5px solid ${marcada ? PALETTE.ink : PALETTE.cardBorder}`,
                      borderRadius: 4,
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontWeight: 600,
                        fontSize: 13,
                        color: marcada ? PALETTE.ink : PALETTE.slate,
                        minWidth: 16,
                      }}
                    >
                      {op.letra}
                    </span>
                    <span style={{ fontSize: 14.5, lineHeight: 1.4 }}>{op.texto}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navegación */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 4px" }}>
          <button
            onClick={() => irA(idxExamen - 1)}
            disabled={idxExamen === 0}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              padding: "9px 16px",
              background: "transparent",
              color: idxExamen === 0 ? "#C9C1B2" : PALETTE.ink,
              border: `1.5px solid ${idxExamen === 0 ? "#E4DCCF" : PALETTE.ink}`,
              borderRadius: 3,
              cursor: idxExamen === 0 ? "default" : "pointer",
            }}
          >
            ← Anterior
          </button>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: PALETTE.slate, alignSelf: "center" }}>
            {totalRespondidas} / {preguntasExamen.length} respondidas
          </div>
          {idxExamen + 1 === preguntasExamen.length ? (
            <button
              onClick={finalizarExamen}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                padding: "9px 18px",
                background: PALETTE.crimson,
                color: PALETTE.paper,
                border: "none",
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              Terminar examen
            </button>
          ) : (
            <button
              onClick={() => irA(idxExamen + 1)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                padding: "9px 18px",
                background: PALETTE.ink,
                color: PALETTE.paper,
                border: "none",
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              Siguiente →
            </button>
          )}
        </div>
      </div>
    );
  }

  // ---------- PANTALLA: RESULTADOS ----------
  const totalPreguntas = preguntasExamen.length;
  const correctas = preguntasExamen.filter((q, i) => {
    const letra = respuestasExamen[i];
    const opCorrecta = q.opciones.find((o) => o.correcta);
    return letra && opCorrecta && letra === opCorrecta.letra;
  }).length;
  const sinResponder = preguntasExamen.filter((_, i) => respuestasExamen[i] === undefined).length;
  const pct = totalPreguntas ? Math.round((correctas / totalPreguntas) * 100) : 0;

  return (
    <div style={WRAP_STYLE}>
      <style>{FONT_IMPORTS}</style>
      <div
        style={{
          background: PALETTE.paper,
          border: `1px solid ${PALETTE.cardBorder}`,
          borderRadius: 4,
          padding: "28px 24px",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            letterSpacing: 1.5,
            color: PALETTE.slate,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Resultado del examen
        </div>
        <div
          style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 44,
            fontWeight: 700,
            color: pct >= 70 ? PALETTE.teal : PALETTE.crimson,
            lineHeight: 1,
          }}
        >
          {correctas}/{totalPreguntas}
        </div>
        <div style={{ fontSize: 14, color: PALETTE.slate, marginTop: 6, marginBottom: 4 }}>
          {pct}% correctas
          {sinResponder > 0 ? ` · ${sinResponder} sin responder` : ""}
          {" · "}
          {especialidadExamen}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18 }}>
          <button
            onClick={nuevoExamen}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              padding: "9px 18px",
              background: PALETTE.ink,
              color: PALETTE.paper,
              border: "none",
              borderRadius: 3,
              cursor: "pointer",
            }}
          >
            Nuevo examen
          </button>
        </div>
      </div>

      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: PALETTE.slate, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
        Revisión pregunta por pregunta
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {preguntasExamen.map((q, i) => {
          const letraElegida = respuestasExamen[i];
          const opCorrecta = q.opciones.find((o) => o.correcta);
          const acerto = letraElegida === opCorrecta.letra;
          const sinContestar = letraElegida === undefined;
          const key = `${i}`;
          const abierta = reviewExpanded.has(key);

          return (
            <div
              key={i}
              style={{
                background: PALETTE.paper,
                border: `1px solid ${PALETTE.cardBorder}`,
                borderRadius: 4,
                padding: "14px 16px",
              }}
            >
              <button
                onClick={() => toggleReview(key)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 10,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <div style={{ display: "flex", gap: 10 }}>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontWeight: 700,
                      fontSize: 13,
                      color: sinContestar ? PALETTE.slate : acerto ? PALETTE.teal : PALETTE.crimson,
                      minWidth: 18,
                    }}
                  >
                    {sinContestar ? "–" : acerto ? "✓" : "✕"}
                  </span>
                  <span style={{ fontSize: 14, lineHeight: 1.45 }}>
                    <strong>{i + 1}.</strong> {q.enunciado}
                  </span>
                </div>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: PALETTE.slate, whiteSpace: "nowrap" }}>
                  {abierta ? "Ocultar ▲" : "Ver ▼"}
                </span>
              </button>

              {abierta && (
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {q.opciones.map((op) => {
                    const esElegida = letraElegida === op.letra;
                    let borderColor = PALETTE.cardBorder;
                    let bg = "#FFFFFF";
                    if (op.correcta) {
                      borderColor = PALETTE.teal;
                      bg = "rgba(31,111,107,0.07)";
                    } else if (esElegida) {
                      borderColor = PALETTE.crimson;
                      bg = "rgba(163,38,56,0.07)";
                    }
                    return (
                      <div
                        key={op.letra}
                        style={{
                          border: `1.5px solid ${borderColor}`,
                          background: bg,
                          borderRadius: 4,
                          padding: "10px 12px",
                        }}
                      >
                        <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontWeight: 600,
                              fontSize: 12,
                              color: op.correcta ? PALETTE.teal : esElegida ? PALETTE.crimson : PALETTE.slate,
                            }}
                          >
                            {op.letra}
                            {esElegida ? " · tu respuesta" : ""}
                          </span>
                          <span style={{ fontSize: 13.5, fontWeight: 500 }}>{op.texto}</span>
                        </div>
                        <div style={{ fontSize: 12.5, color: PALETTE.slate, lineHeight: 1.5, paddingLeft: 2 }}>
                          {op.explicacion}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function barraColor(pct) {
  if (pct >= 80) return PALETTE.teal;
  if (pct >= 60) return "#B08900";
  return PALETTE.crimson;
}

function ModoEstadisticas() {
  const [stats, setStats] = useState(null);
  const [confirmandoReset, setConfirmandoReset] = useState(false);

  useEffect(() => {
    setStats(cargarEstadisticas());
  }, []);

  function reiniciarStats() {
    guardarEstadisticas({});
    setStats({});
    setConfirmandoReset(false);
  }

  if (stats === null) {
    return (
      <div style={WRAP_STYLE}>
        <style>{FONT_IMPORTS}</style>
        <p style={{ fontFamily: "'Inter', sans-serif", color: PALETTE.slate }}>Cargando estadísticas…</p>
      </div>
    );
  }

  const especialidadesConDatos = Object.keys(stats);
  let totalPreguntas = 0;
  let totalCorrectas = 0;

  const filasEspecialidad = especialidadesConDatos
    .map((esp) => {
      let correctas = 0;
      let total = 0;
      Object.values(stats[esp]).forEach((t) => {
        correctas += t.correctas;
        total += t.total;
      });
      totalPreguntas += total;
      totalCorrectas += correctas;
      return {
        especialidad: esp,
        correctas,
        total,
        pct: total ? Math.round((correctas / total) * 100) : 0,
      };
    })
    .sort((a, b) => b.total - a.total);

  const filasTema = [];
  especialidadesConDatos.forEach((esp) => {
    Object.entries(stats[esp]).forEach(([tema, t]) => {
      if (t.total > 0) {
        filasTema.push({
          especialidad: esp,
          tema,
          correctas: t.correctas,
          total: t.total,
          pct: Math.round((t.correctas / t.total) * 100),
        });
      }
    });
  });
  filasTema.sort((a, b) => a.pct - b.pct || b.total - a.total);
  const temasAReforzar = filasTema.slice(0, 8);

  const pctGlobal = totalPreguntas ? Math.round((totalCorrectas / totalPreguntas) * 100) : 0;

  return (
    <div style={WRAP_STYLE}>
      <style>{FONT_IMPORTS}</style>

      <div
        style={{
          background: PALETTE.ink,
          borderRadius: "4px 4px 0 0",
          padding: "14px 20px 16px",
        }}
      >
        <div style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 700, fontSize: 17, color: PALETTE.paper }}>
          Estadísticas
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#9AAAAC", marginTop: 2 }}>
          Progreso acumulado en este navegador · Estudio + Examen
        </div>
      </div>

      <div
        style={{
          background: PALETTE.paper,
          border: `1px solid ${PALETTE.cardBorder}`,
          borderTop: "none",
          padding: "22px 24px 26px",
        }}
      >
        {totalPreguntas === 0 ? (
          <div style={{ textAlign: "center", padding: "20px 0", color: PALETTE.slate, fontSize: 14 }}>
            Aún no has respondido preguntas. Practica en Modo Estudio o Modo Examen y tus estadísticas van a
            aparecer aquí automáticamente.
          </div>
        ) : (
          <>
            {/* Resumen global */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: 40,
                  fontWeight: 700,
                  color: barraColor(pctGlobal),
                  lineHeight: 1,
                }}
              >
                {pctGlobal}%
              </div>
              <div style={{ fontSize: 13, color: PALETTE.slate, marginTop: 6 }}>
                {totalCorrectas} de {totalPreguntas} preguntas correctas en total
              </div>
            </div>

            {/* Por especialidad */}
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: PALETTE.slate,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              Por especialidad
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 }}>
              {filasEspecialidad.map((fila) => (
                <div key={fila.especialidad}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600 }}>{fila.especialidad}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: PALETTE.slate, fontSize: 12 }}>
                      {fila.correctas}/{fila.total} · {fila.pct}%
                    </span>
                  </div>
                  <div style={{ height: 8, background: "#EFE9DC", borderRadius: 4, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${fila.pct}%`,
                        background: barraColor(fila.pct),
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Temas a reforzar */}
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                color: PALETTE.slate,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              Temas a reforzar
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 26 }}>
              {temasAReforzar.map((fila) => (
                <div
                  key={`${fila.especialidad}-${fila.tema}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: `1px solid ${PALETTE.cardBorder}`,
                    borderLeft: `3px solid ${barraColor(fila.pct)}`,
                    borderRadius: 4,
                    padding: "9px 12px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{fila.tema}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: PALETTE.slate }}>
                      {fila.especialidad}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontWeight: 700,
                      fontSize: 15,
                      color: barraColor(fila.pct),
                    }}
                  >
                    {fila.pct}%
                  </div>
                </div>
              ))}
            </div>

            {/* Reiniciar */}
            <div style={{ textAlign: "center" }}>
              {confirmandoReset ? (
                <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                  <span style={{ fontSize: 13, color: PALETTE.slate, alignSelf: "center" }}>
                    ¿Borrar todo tu progreso guardado?
                  </span>
                  <button
                    onClick={reiniciarStats}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: 12.5,
                      padding: "7px 14px",
                      background: PALETTE.crimson,
                      color: PALETTE.paper,
                      border: "none",
                      borderRadius: 3,
                      cursor: "pointer",
                    }}
                  >
                    Sí, borrar
                  </button>
                  <button
                    onClick={() => setConfirmandoReset(false)}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: 12.5,
                      padding: "7px 14px",
                      background: "transparent",
                      color: PALETTE.ink,
                      border: `1px solid ${PALETTE.cardBorder}`,
                      borderRadius: 3,
                      cursor: "pointer",
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmandoReset(true)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 12.5,
                    padding: "7px 14px",
                    background: "transparent",
                    color: PALETTE.slate,
                    border: `1px solid ${PALETTE.cardBorder}`,
                    borderRadius: 3,
                    cursor: "pointer",
                  }}
                >
                  Reiniciar estadísticas
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [modo, setModo] = useState("estudio");

  return (
    <div style={{ ...WRAP_STYLE, marginBottom: 10 }}>
      <style>{FONT_IMPORTS}</style>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[
          { id: "estudio", label: "📖 Modo Estudio" },
          { id: "examen", label: "⏱ Modo Examen" },
          { id: "estadisticas", label: "📊 Estadísticas" },
        ].map((m) => {
          const activo = modo === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setModo(m.id)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 13.5,
                padding: "10px 18px",
                borderRadius: "4px 4px 0 0",
                border: `1px solid ${PALETTE.cardBorder}`,
                borderBottom: activo ? "none" : `1px solid ${PALETTE.cardBorder}`,
                background: activo ? PALETTE.paper : "#EFE9DC",
                color: activo ? PALETTE.ink : PALETTE.slate,
                cursor: "pointer",
                position: "relative",
                top: 1,
              }}
            >
              {m.label}
            </button>
          );
        })}
      </div>
      {modo === "estudio" ? <ModoEstudio /> : modo === "examen" ? <ModoExamen /> : <ModoEstadisticas />}
    </div>
  );
}
