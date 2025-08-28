import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  Target,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

function AIInsightsCards() {
  const insights = [
    {
      title: "Análisis de Ventas",
      description: "Tendencias y patrones de compra detectados",
      icon: TrendingUp,
      status: "positive",
      value: "+23%",
      detail: "Incremento en conversiones esta semana",
    },
    {
      title: "Segmentación de Clientes",
      description: "Nuevos segmentos identificados",
      icon: Users,
      status: "info",
      value: "3 grupos",
      detail: "Oportunidades de personalización",
    },
    {
      title: "Productos Destacados",
      description: "Items con mayor potencial de venta",
      icon: ShoppingCart,
      status: "positive",
      value: "12 productos",
      detail: "Recomendados para promoción",
    },
    {
      title: "Objetivos de Marketing",
      description: "Estrategias sugeridas por IA",
      icon: Target,
      status: "warning",
      value: "5 acciones",
      detail: "Pendientes de implementar",
    },
    {
      title: "Alertas de Inventario",
      description: "Productos con stock bajo",
      icon: AlertCircle,
      status: "alert",
      value: "8 items",
      detail: "Requieren reposición urgente",
    },
    {
      title: "Sugerencias IA",
      description: "Recomendaciones personalizadas",
      icon: Lightbulb,
      status: "info",
      value: "Nuevas",
      detail: "Ideas para optimizar tu tienda",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "alert":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {insights.map((insight, index) => {
        const Icon = insight.icon;
        return (
          <Card
            key={index}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-medium">
                    {insight.title}
                  </CardTitle>
                </div>
                <Badge className={getStatusColor(insight.status)}>
                  {insight.value}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {insight.description}
              </p>
              <p className="text-xs text-foreground font-medium">
                {insight.detail}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
export default AIInsightsCards;
