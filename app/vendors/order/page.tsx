"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Package, 
  ShoppingCart, 
  User, 
  Eye,
  Edit,
  Search,
  Filter,
  Calendar,
  DollarSign,
  User as UserIcon,
  Package as PackageIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ScrollToTop from "@/components/scroll-to-top"

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    buyerId: "BUY-001",
    buyerName: "John Smith",
    buyerEmail: "john.smith@email.com",
    products: [
      { id: "PROD-001", name: "Classic T-Shirt", quantity: 2, price: 29.99 },
      { id: "PROD-002", name: "Denim Jeans", quantity: 1, price: 79.99 }
    ],
    totalPrice: 139.97,
    status: "confirmed",
    date: "2024-01-15",
    shippingAddress: "123 Main St, New York, NY 10001"
  },
  {
    id: "ORD-002",
    buyerId: "BUY-002",
    buyerName: "Sarah Johnson",
    buyerEmail: "sarah.johnson@email.com",
    products: [
      { id: "PROD-003", name: "Sneakers", quantity: 1, price: 129.99 }
    ],
    totalPrice: 129.99,
    status: "shipped",
    date: "2024-01-14",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210"
  },
  {
    id: "ORD-003",
    buyerId: "BUY-003",
    buyerName: "Mike Davis",
    buyerEmail: "mike.davis@email.com",
    products: [
      { id: "PROD-004", name: "Hoodie", quantity: 1, price: 59.99 },
      { id: "PROD-005", name: "Cap", quantity: 1, price: 24.99 }
    ],
    totalPrice: 84.98,
    status: "delivered",
    date: "2024-01-13",
    shippingAddress: "789 Pine Rd, Chicago, IL 60601"
  },
  {
    id: "ORD-004",
    buyerId: "BUY-004",
    buyerName: "Lisa Wilson",
    buyerEmail: "lisa.wilson@email.com",
    products: [
      { id: "PROD-006", name: "Dress", quantity: 1, price: 149.99 }
    ],
    totalPrice: 149.99,
    status: "pending",
    date: "2024-01-12",
    shippingAddress: "321 Elm St, Miami, FL 33101"
  },
  {
    id: "ORD-005",
    buyerId: "BUY-005",
    buyerName: "Tom Brown",
    buyerEmail: "tom.brown@email.com",
    products: [
      { id: "PROD-007", name: "Jacket", quantity: 1, price: 199.99 }
    ],
    totalPrice: 199.99,
    status: "confirmed",
    date: "2024-01-11",
    shippingAddress: "654 Maple Dr, Seattle, WA 98101"
  },
  {
    id: "ORD-006",
    buyerId: "BUY-006",
    buyerName: "Emma Garcia",
    buyerEmail: "emma.garcia@email.com",
    products: [
      { id: "PROD-008", name: "Sweater", quantity: 1, price: 89.99 },
      { id: "PROD-009", name: "Scarf", quantity: 1, price: 34.99 }
    ],
    totalPrice: 124.98,
    status: "shipped",
    date: "2024-01-10",
    shippingAddress: "987 Cedar Ln, Austin, TX 73301"
  },
  {
    id: "ORD-007",
    buyerId: "BUY-007",
    buyerName: "David Lee",
    buyerEmail: "david.lee@email.com",
    products: [
      { id: "PROD-010", name: "Polo Shirt", quantity: 2, price: 45.99 }
    ],
    totalPrice: 91.98,
    status: "delivered",
    date: "2024-01-09",
    shippingAddress: "147 Birch Way, Denver, CO 80201"
  }
]

const orderStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]

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

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("date-new")
  const [orders, setOrders] = useState(mockOrders)

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "date-new":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "date-old":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "total-high":
        return b.totalPrice - a.totalPrice
      case "total-low":
        return a.totalPrice - b.totalPrice
      case "buyer":
        return a.buyerName.localeCompare(b.buyerName)
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Order Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/vendors">
                <Button variant="outline" size="sm">
                  Back to Dashboard
                </Button>
              </Link>
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
                <Link
                  href="/vendors"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <Package className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
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
                <div className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg border border-blue-200">
                  <Package className="h-5 w-5 mr-3" />
                  Order Management
                </div>
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
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">All Orders</h2>
              <div className="text-sm text-gray-600">
                Total Orders: {orders.length}
              </div>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by buyer, order ID, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {orderStatuses.map(status => (
                          <SelectItem key={status} value={status}>{getStatusText(status)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date-new">Latest First</SelectItem>
                        <SelectItem value="date-old">Oldest First</SelectItem>
                        <SelectItem value="total-high">Total: High to Low</SelectItem>
                        <SelectItem value="total-low">Total: Low to High</SelectItem>
                        <SelectItem value="buyer">Buyer Name A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
              <CardHeader>
                <CardTitle>Orders ({sortedOrders.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Buyer Details</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Products</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Total</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-mono text-sm font-medium">{order.id}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="font-medium">{order.buyerName}</span>
                              </div>
                              <div className="text-sm text-gray-500">{order.buyerEmail}</div>
                              <div className="text-sm text-gray-500">{order.buyerId}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              {order.products.map((product) => (
                                <div key={product.id} className="flex items-center text-sm">
                                  <PackageIcon className="h-3 w-3 text-gray-400 mr-2" />
                                  <span>{product.name} x {product.quantity}</span>
                                  <span className="ml-2 text-gray-500">${product.price}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-lg">${order.totalPrice}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="space-y-2">
                              <Badge className={getStatusColor(order.status)}>
                                {getStatusText(order.status)}
                              </Badge>
                              <div className="mt-2">
                                <Select 
                                  value={order.status} 
                                  onValueChange={(value) => updateOrderStatus(order.id, value)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {orderStatuses.map(status => (
                                      <SelectItem key={status} value={status}>
                                        {getStatusText(status)}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm text-gray-500">{order.date}</div>
                          </td>
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
        </main>
      </div>
      
      <ScrollToTop />
    </div>
  )
}