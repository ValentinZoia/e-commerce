import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Bot, Settings, Sparkles } from "lucide-react";
import { AIChatInterface, AIInsightsCards } from "./_components";

function PrivateAdminAI() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Chat Interface */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-balance mb-2">
              ¡Hola! Soy tu asistente de ventas inteligente
            </h2>
            <p className="text-muted-foreground text-pretty">
              Pregúntame cualquier cosa sobre tu e-commerce. Puedo ayudarte con
              análisis de ventas, estrategias de marketing, optimización de
              productos y mucho más.
            </p>
          </div>
          <AIChatInterface />
        </div>

        {/* Right Column - Quick Actions & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent-ai" />
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-transparent hover:bg-accent-ai hover:text-accent-foreground-ai"
                variant="outline"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analizar ventas del mes
              </Button>
              <Button
                className="w-full justify-start bg-transparent hover:bg-accent-ai hover:text-accent-foreground-ai"
                variant="outline"
              >
                <Bot className="h-4 w-4 mr-2" />
                Sugerir productos trending
              </Button>
              <Button
                className="w-full justify-start bg-transparent hover:bg-accent-ai hover:text-accent-foreground-ai"
                variant="outline"
              >
                <Settings className="h-4 w-4 mr-2" />
                Optimizar precios
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Consultas hoy
                  </span>
                  <span className="font-semibold text-primary">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Sugerencias aplicadas
                  </span>
                  <span className="font-semibold text-accent-ai">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Tiempo ahorrado
                  </span>
                  <span className="font-semibold text-green-600">3.2h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Insights Section */}
      <div className="mt-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Insights Inteligentes</h2>
          <p className="text-muted-foreground">
            Análisis automático de tu e-commerce generado por VentaBot Pro
          </p>
        </div>
        <AIInsightsCards />
      </div>
    </>
  );
}
export default PrivateAdminAI;
