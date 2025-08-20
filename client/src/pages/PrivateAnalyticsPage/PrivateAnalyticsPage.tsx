import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useState } from "react";

const salesByCategory = [
  {
    name: "Electrónicos",
    value: 45,
    sales: 125000,
    color: "hsl(var(--chart-1))",
  },
  { name: "Ropa", value: 25, sales: 68000, color: "hsl(var(--chart-2))" },
  { name: "Hogar", value: 15, sales: 42000, color: "hsl(var(--chart-3))" },
  { name: "Deportes", value: 10, sales: 28000, color: "hsl(var(--chart-4))" },
  { name: "Otros", value: 5, sales: 15000, color: "hsl(var(--chart-5))" },
];

const monthlyPerformance = [
  { month: "Ene", ventas: 65000, ordenes: 420, clientes: 280, conversion: 3.2 },
  { month: "Feb", ventas: 59000, ordenes: 380, clientes: 250, conversion: 2.8 },
  { month: "Mar", ventas: 80000, ordenes: 520, clientes: 340, conversion: 4.1 },
  { month: "Abr", ventas: 81000, ordenes: 530, clientes: 350, conversion: 4.3 },
  { month: "May", ventas: 95000, ordenes: 620, clientes: 410, conversion: 4.8 },
  { month: "Jun", ventas: 89000, ordenes: 580, clientes: 385, conversion: 4.5 },
];

const customerSegments = [
  { segment: "Nuevos", count: 1250, percentage: 35, growth: 12.5 },
  { segment: "Recurrentes", count: 1890, percentage: 53, growth: 8.2 },
  { segment: "VIP", count: 428, percentage: 12, growth: 15.8 },
];

const topPerformingProducts = [
  {
    name: "iPhone 15 Pro",
    category: "Electrónicos",
    sales: 1250,
    revenue: 1562500,
    margin: 22.5,
    trend: "up",
  },
  {
    name: "Nike Air Max",
    category: "Deportes",
    sales: 890,
    revenue: 178000,
    margin: 35.2,
    trend: "up",
  },
  {
    name: 'Samsung TV 55"',
    category: "Electrónicos",
    sales: 340,
    revenue: 510000,
    margin: 18.7,
    trend: "down",
  },
  {
    name: "Sofá Moderno",
    category: "Hogar",
    sales: 125,
    revenue: 187500,
    margin: 28.3,
    trend: "up",
  },
];
function PrivateAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");
  const [category, setCategory] = useState("all");
  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Analíticas Avanzadas
          </h1>
          <p className="text-muted-foreground">
            Análisis detallado del rendimiento de tu negocio
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Mes</SelectItem>
              <SelectItem value="3m">3 Meses</SelectItem>
              <SelectItem value="6m">6 Meses</SelectItem>
              <SelectItem value="1y">1 Año</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="electronics">Electrónicos</SelectItem>
              <SelectItem value="clothing">Ropa</SelectItem>
              <SelectItem value="home">Hogar</SelectItem>
              <SelectItem value="sports">Deportes</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>

          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Tasa de Conversión
            </CardTitle>
            <Target className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">4.2%</div>
            <div className="flex items-center space-x-1 text-xs">
              <ArrowUpRight className="w-3 h-3 text-chart-4" />
              <span className="text-chart-4">+0.8%</span>
              <span className="text-muted-foreground">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Valor de Vida (CLV)
            </CardTitle>
            <Users className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">$485</div>
            <div className="flex items-center space-x-1 text-xs">
              <ArrowUpRight className="w-3 h-3 text-chart-4" />
              <span className="text-chart-4">+12.5%</span>
              <span className="text-muted-foreground">
                vs trimestre anterior
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Tasa de Retorno
            </CardTitle>
            <Zap className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">68%</div>
            <div className="flex items-center space-x-1 text-xs">
              <ArrowUpRight className="w-3 h-3 text-chart-4" />
              <span className="text-chart-4">+5.2%</span>
              <span className="text-muted-foreground">
                clientes recurrentes
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Margen Promedio
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">24.8%</div>
            <div className="flex items-center space-x-1 text-xs">
              <ArrowDownRight className="w-3 h-3 text-chart-5" />
              <span className="text-chart-5">-1.2%</span>
              <span className="text-muted-foreground">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Tendencia de Ingresos
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Evolución mensual de ventas y órdenes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                ventas: { label: "Ventas", color: "hsl(var(--chart-1))" },
                ordenes: { label: "Órdenes", color: "hsl(var(--chart-2))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyPerformance}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="ventas"
                    stackId="1"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Ventas por Categoría
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Distribución de ingresos por categoría de producto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Porcentaje", color: "hsl(var(--chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {salesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {salesByCategory.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center space-x-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {category.name}
                  </span>
                  <span className="text-xs font-medium text-card-foreground">
                    {category.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segments and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segments */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Segmentos de Clientes
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Análisis de comportamiento por tipo de cliente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {customerSegments.map((segment) => (
              <div
                key={segment.segment}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-8 bg-chart-1 rounded-full" />
                  <div>
                    <p className="font-medium text-card-foreground">
                      {segment.segment}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {segment.count.toLocaleString()} clientes
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-card-foreground">
                    {segment.percentage}%
                  </p>
                  <div className="flex items-center space-x-1">
                    <ArrowUpRight className="w-3 h-3 text-chart-4" />
                    <span className="text-xs text-chart-4">
                      +{segment.growth}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Performing Products */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Productos de Alto Rendimiento
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Productos con mejor performance este mes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformingProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center space-x-3">
                  <Badge
                    variant="outline"
                    className="w-6 h-6 p-0 flex items-center justify-center text-xs"
                  >
                    {index + 1}
                  </Badge>
                  <div>
                    <p className="font-medium text-card-foreground">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">
                    ${product.revenue.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {product.margin}% margen
                    </span>
                    {product.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-chart-4" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-chart-5" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Embudo de Conversión
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Análisis del proceso de compra de los usuarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              conversion: {
                label: "Tasa de Conversión",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyPerformance}
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="month" type="category" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="conversion"
                  fill="hsl(var(--chart-3))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
export default PrivateAnalyticsPage;
