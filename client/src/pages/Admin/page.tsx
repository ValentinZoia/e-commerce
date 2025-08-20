// import { RootState } from "@/store/store";
// import { capitalizeFirstLetter } from "@/utilities";
// import { useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  DollarSign,
  Package,
  ShoppingCart,
  Star,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const salesData = [
  { name: "Ene", ventas: 4000, ordenes: 240 },
  { name: "Feb", ventas: 3000, ordenes: 198 },
  { name: "Mar", ventas: 5000, ordenes: 300 },
  { name: "Abr", ventas: 4500, ordenes: 278 },
  { name: "May", ventas: 6000, ordenes: 389 },
  { name: "Jun", ventas: 5500, ordenes: 349 },
];

const topProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    sales: 1250,
    revenue: 1562500,
    image: "/iphone-15-pro-hands.png",
  },
  {
    id: 2,
    name: "MacBook Air M3",
    sales: 890,
    revenue: 1068000,
    image: "/macbook-air-m3.png",
  },
  {
    id: 3,
    name: "AirPods Pro",
    sales: 2100,
    revenue: 525000,
    image: "/airpods-pro-lifestyle.png",
  },
];

const AdminPage = () => {
  // const { user } = useSelector((state: RootState) => state.auth);
  // const username = capitalizeFirstLetter(user?.username as string);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Resumen general de tu negocio</p>
        </div>
        <Badge variant={"outline"} className="text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          Hoy: {new Date().toLocaleDateString("es-ES")}
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Ventas Hoy</CardTitle>
            <DollarSign className="size-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              $12,450
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">+12.5%</span> vs ayer
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Órdenes Totales
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">+8.2%</span> este mes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Productos
            </CardTitle>
            <Package className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">+15</span> nuevos esta semana
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Categorías
            </CardTitle>
            <Tag className="h-4 w-4 text-chart-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">48</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">+3</span> este mes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Tendencia de Ventas
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Ventas mensuales de los últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                ventas: {
                  label: "Ventas",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="ventas"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Productos Más Vendidos
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Top 3 productos este mes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50"
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 flex items-center justify-center text-xs"
                  >
                    {index + 1}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{product.sales} vendidos</span>
                    <span>•</span>
                    <span>${product.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <Star className="w-4 h-4 text-chart-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Ventas del Mes
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Comparacion con el mes anterior
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">
              $89,450
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <TrendingUp className="w-4 h-4 text-chart-4" />
              <span className="text-chart-4">+5.2%</span>
              <span className="text-muted-foreground">que el mes pasado</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Clientes Activos
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Usuarios que compraron este mes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">1,847</div>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4 text-chart-3" />
              <span className="text-chart-4">+12.5%</span>
              <span className="text-muted-foreground">nuevos clientes</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Ticket Promedio
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Valor promedio por orden
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">
              $156.80
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <DollarSign className="w-4 h-4 text-chart-1" />
              <span className="text-chart-4">+5.2%</span>
              <span className="text-muted-foreground">vs promedio</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default AdminPage;
