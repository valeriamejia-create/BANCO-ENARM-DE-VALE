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
          "Correcta. La hipomanía se caracteriza por síntomas similares a la manía pero de menor duración (típicamente 3-4 días, mínimo 4 según DSM-5) y sin causar deterioro funcional severo ni requerir hospitalización.",
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
];

const ALL_QUESTIONS = [
  ...CARDIO_QUESTIONS.map((q) => ({ ...q, especialidad: "Cardiología" })),
  ...ENDOCRINO_QUESTIONS.map((q) => ({ ...q, especialidad: "Endocrinología" })),
  ...OBSTETRICIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Obstetricia" })),
  ...PSIQUIATRIA_QUESTIONS.map((q) => ({ ...q, especialidad: "Psiquiatría" })),
];

const ESPECIALIDADES = ["Todas", "Cardiología", "Endocrinología", "Obstetricia", "Psiquiatría"];


const FONT_IMPORTS =
  "@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');";

const WRAP_STYLE = {
  fontFamily: "'Inter', sans-serif",
  color: PALETTE.ink,
  maxWidth: 720,
  margin: "0 auto",
  padding: "0 4px",
};

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
      setFase("resultados");
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

export default function App() {
  const [modo, setModo] = useState("estudio");

  return (
    <div style={{ ...WRAP_STYLE, marginBottom: 10 }}>
      <style>{FONT_IMPORTS}</style>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[
          { id: "estudio", label: "📖 Modo Estudio" },
          { id: "examen", label: "⏱ Modo Examen" },
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
      {modo === "estudio" ? <ModoEstudio /> : <ModoExamen />}
    </div>
  );
}
