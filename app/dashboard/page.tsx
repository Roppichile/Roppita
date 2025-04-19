import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Roppita
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Mi cuenta
            </Button>
            <Button variant="outline" size="sm">
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <DashboardNav />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bienvenido de nuevo</CardTitle>
                  <CardDescription>Aquí tienes un resumen de tu actividad reciente.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-sm text-gray-500">Proyectos activos</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold">3,456</div>
                        <div className="text-sm text-gray-500">Visitas este mes</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold">85%</div>
                        <div className="text-sm text-gray-500">Tasa de finalización</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actividad reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">Todos</TabsTrigger>
                      <TabsTrigger value="projects">Proyectos</TabsTrigger>
                      <TabsTrigger value="tasks">Tareas</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <div key={item} className="flex items-center gap-4 p-4 border rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div>
                              <div className="font-medium">Actividad {item}</div>
                              <div className="text-sm text-gray-500">Hace {item} horas</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="projects">
                      <div className="p-4 text-center text-gray-500">No hay proyectos recientes</div>
                    </TabsContent>
                    <TabsContent value="tasks">
                      <div className="p-4 text-center text-gray-500">No hay tareas recientes</div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
