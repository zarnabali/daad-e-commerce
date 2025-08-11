"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Package, 
  ShoppingCart, 
  User, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  ArrowUpDown,
  X,
  Image as ImageIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import ScrollToTop from "@/components/scroll-to-top"

// Mock data for products
const mockProducts = [
  {
    id: "PROD-001",
    name: "Classic T-Shirt",
    description: "Premium cotton classic t-shirt with modern fit",
    image: "/images/product-tshirt.png",
    colors: ["White", "Black", "Navy"],
    price: 29.99,
    quantity: 150,
    category: "T-Shirts",
    status: "active"
  },
  {
    id: "PROD-002",
    name: "Denim Jeans",
    description: "High-quality denim jeans with perfect fit",
    image: "/images/product-pants.jpg",
    colors: ["Blue", "Black", "Gray"],
    price: 79.99,
    quantity: 75,
    category: "Jeans",
    status: "active"
  },
  {
    id: "PROD-003",
    name: "Sneakers",
    description: "Comfortable and stylish sneakers for everyday wear",
    image: "/images/product-boots.jpg",
    colors: ["White", "Black", "Red"],
    price: 129.99,
    quantity: 50,
    category: "Footwear",
    status: "active"
  },
  {
    id: "PROD-004",
    name: "Hoodie",
    description: "Warm and cozy hoodie perfect for cold weather",
    image: "/images/product-polo.png",
    colors: ["Gray", "Black", "Navy"],
    price: 59.99,
    quantity: 100,
    category: "Hoodies",
    status: "active"
  },
  {
    id: "PROD-005",
    name: "Cap",
    description: "Stylish baseball cap with embroidered logo",
    image: "/images/product-glasses.jpg",
    colors: ["Black", "White", "Red"],
    price: 24.99,
    quantity: 200,
    category: "Accessories",
    status: "active"
  }
]

const categories = ["T-Shirts", "Jeans", "Footwear", "Hoodies", "Accessories", "Dresses", "Jackets"]
const statuses = ["active", "inactive", "out-of-stock"]

export default function ProductManagement() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("default")
  const [products, setProducts] = useState(mockProducts)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    colors: "",
    image: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newProduct = {
      id: `PROD-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      image: formData.image || "/images/placeholder.jpg",
      colors: formData.colors.split(",").map(color => color.trim()),
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      category: formData.category,
      status: "active"
    }

    setProducts(prev => [newProduct, ...prev])
    setFormData({
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
      colors: "",
      image: ""
    })
    setShowAddForm(false)
  }

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId))
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "quantity":
        return b.quantity - a.quantity
      default:
        return 0
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
              <h1 className="text-xl font-semibold text-gray-900">Product Management</h1>
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
                <div className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg border border-blue-200">
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  Product Management
                </div>
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
          <div className="space-y-6">
            {/* Header with Add Product Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
              <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {statuses.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
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
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="name">Name A-Z</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="quantity">Quantity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Product Form */}
            {showAddForm && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Add New Product</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddForm(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <Input
                          name="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <Input
                          name="quantity"
                          type="number"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          placeholder="0"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Colors (comma-separated)</label>
                        <Input
                          name="colors"
                          value={formData.colors}
                          onChange={handleInputChange}
                          placeholder="Red, Blue, Green"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <Input
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter product description"
                        rows={3}
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Add Product
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Products Table */}
            <Card>
              <CardHeader>
                <CardTitle>Products ({sortedProducts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Image</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Product Details</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedProducts.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <ImageIcon className="h-6 w-6 text-gray-400" />
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.description}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                Colors: {product.colors.join(", ")}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary">{product.category}</Badge>
                          </td>
                          <td className="py-3 px-4 font-medium">${product.price}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.quantity > 50 ? 'bg-green-100 text-green-800' :
                              product.quantity > 20 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.quantity}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={
                              product.status === 'active' ? 'bg-green-100 text-green-800' :
                              product.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {product.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
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