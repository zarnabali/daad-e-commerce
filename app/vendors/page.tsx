"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Package, 
  ShoppingCart, 
  User, 
  Settings, 
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  DollarSign,
  MapPin,
  CreditCard,
  Percent
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ScrollToTop from "@/components/scroll-to-top"

// Mock data for vendor dashboard
const mockVendorData = {
  name: "Fashion Forward Co.",
  email: "vendor@fashionforward.com",
  location: "New York, NY",
  totalProducts: 35,
  totalOrders: 10,
  adminPercentage: 30,
  latestOrders: [
    {
      id: "ORD-001",
      buyerName: "John Smith",
      buyerId: "BUY-001",
      products: [
        { id: "PROD-001", name: "Classic T-Shirt", quantity: 2 },
        { id: "PROD-002", name: "Denim Jeans", quantity: 1 }
      ],
      totalPrice: 89.99,
      status: "confirmed",
      date: "2024-01-15"
    },
    {
      id: "ORD-002",
      buyerName: "Sarah Johnson",
      buyerId: "BUY-002",
      products: [
        { id: "PROD-003", name: "Sneakers", quantity: 1 }
      ],
      totalPrice: 129.99,
      status: "shipped",
      date: "2024-01-14"
    },
    {
      id: "ORD-003",
      buyerName: "Mike Davis",
      buyerId: "BUY-003",
      products: [
        { id: "PROD-004", name: "Hoodie", quantity: 1 },
        { id: "PROD-005", name: "Cap", quantity: 1 }
      ],
      totalPrice: 79.99,
      status: "delivered",
      date: "2024-01-13"
    },
    {
      id: "ORD-004",
      buyerName: "Lisa Wilson",
      buyerId: "BUY-004",
      products: [
        { id: "PROD-006", name: "Dress", quantity: 1 }
      ],
      totalPrice: 149.99,
      status: "pending",
      date: "2024-01-12"
    },
    {
      id: "ORD-005",
      buyerName: "Tom Brown",
      buyerId: "BUY-005",
      products: [
        { id: "PROD-007", name: "Jacket", quantity: 1 }
      ],
      totalPrice: 199.99,
      status: "confirmed",
      date: "2024-01-11"
    }
  ]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-yellow-100 text-yellow-800"
    case "confirmed": return "bg-blue-100 text-blue-800"
    case "shipped": return "bg-purple-100 text-purple-800"
    case "delivered": return "bg-green-100 text-green-800"
    case "cancelled": return "bg-red-100 text-red-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Vendor Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {mockVendorData.name}</span>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Package className="h-5 w-5 mr-3" />
                  Dashboard
                </button>
              </li>
              <li>
                <Link
                  href="/vendors/products"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  Product Management
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors/order"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <Package className="h-5 w-5 mr-3" />
                  Order Management
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors/profile"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockVendorData.totalProducts}</div>
                    <p className="text-xs text-muted-foreground">
                      Active products in your store
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockVendorData.totalOrders}</div>
                    <p className="text-xs text-muted-foreground">
                      Orders received this month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Admin Percentage</CardTitle>
                    <Percent className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockVendorData.adminPercentage}%</div>
                    <p className="text-xs text-muted-foreground">
                      Platform fee per order
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Latest Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Latest Orders</span>
                    <Link href="/vendors/order">
                      <Button variant="outline" size="sm">
                        View All Orders
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Buyer</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Products</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Total</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockVendorData.latestOrders.map((order) => (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-mono text-sm">{order.id}</td>
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium">{order.buyerName}</div>
                                <div className="text-sm text-gray-500">{order.buyerId}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="space-y-1">
                                {order.products.map((product) => (
                                  <div key={product.id} className="text-sm">
                                    {product.name} x {product.quantity}
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4 font-medium">${order.totalPrice}</td>
                            <td className="py-3 px-4">
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusText(order.status)}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-500">{order.date}</td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
      
      <ScrollToTop />
    </div>
  )
}
