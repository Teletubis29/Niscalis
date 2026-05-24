import Link from "next/link";
import { Package, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Products",
      value: "124",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Users",
      value: "856",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Orders",
      value: "342",
      icon: ShoppingCart,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Revenue",
      value: "$45,230",
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/products/create">
              <Button className="w-full">Add New Product</Button>
            </Link>
            <Button variant="outline" className="w-full">
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Database</span>
              <span className="text-green-600">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span>API</span>
              <span className="text-green-600">Running</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
