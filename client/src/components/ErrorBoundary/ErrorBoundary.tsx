/*
Que hace un ErrorBoundary
 - Catchea errores de componentes en runtime
 - Maneja errores de JavaScript reales (undefined, null , etc)
 - Protege contra crashes de la app
 - Funciona DENTRO de una ruta válida

 Si algun componente se rompe en runtime , este Error Boundary catchea el error
 y mustra una UI. el cual defino en render().

 Y solo funciona con class components, los metodos del ciclo de vida de una clase
 como getDerivedStateFromError y componentDidCatch, interceptan los errores de render.

*/

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="min-h-[200px] flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Algo salió mal
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Recargá la página o intentá más tarde
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Recargar página
                            </button>
                        </div>
                    </div>
                )
            );
        }
        return this.props.children; // si no hay error retorna el children
    }
}
