const currentMonth = new Date().toLocaleString("es-ES", { month: "long" });

export const periodObject = {
  today: {
    value: "today",
    label: "Hoy",
  },
  week: {
    value: "week",
    label: "Esta Semana",
  },
  month: {
    value: "month",
    label: currentMonth,
  },
} as const;
