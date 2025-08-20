/*
🟦 Custom Hook para Debounce:

- useDebounce es un hook genérico que puede usarse con cualquier tipo de valor
- Retrasa la actualización del valor por un tiempo especificado (300ms por defecto)
- Limpia el timeout cuando el componente se desmonta o el valor cambia

- Lo uso para

- Para evitar clics repetitivos y ocasionar bugs.
-Evitar que el servidor reciba multimples solicitudes consecutivas.
- Usada en el boton de like, boton de follow, y useSearch

*/

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
