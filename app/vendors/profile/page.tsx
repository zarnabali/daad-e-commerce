"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Package, 
  ShoppingCart, 
  User, 
  Edit,
  Save,
  X,
  MapPin,
  CreditCard,
  Percent,
  Mail,
  Phone,
  Building,
  Globe,
  DollarSign
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ScrollToTop from "@/components/scroll-to-top"

// Mock data for vendor profile
const mockVendorProfile = {
  name: "Fashion Forward Co.",
  email: "vendor@fashionforward.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  address: "123 Fashion Street, New York, NY 10001",
  company: "Fashion Forward Co.",
  website: "https://fashionforward.com",
  description: "Premium fashion retailer specializing in contemporary clothing and accessories for all ages.",
  adminPercentage: 30,
  paymentDetails: {
    bankName: "Chase Bank",
    accountNumber: "****1234",
    routingNumber: "021000021",
    accountType: "Business Checking"
  },
  businessInfo: {
    taxId: "12-3456789",
    businessType: "LLC",
    established: "2020",
    employees: "25-50"
  }
}

export default function VendorProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(mockVendorProfile)
  const [editData, setEditData] = useState(mockVendorProfile)

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setEditData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setEditData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSave = () => {
    setProfile(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profile)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Vendor Profile</h1>
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
                <Link
                  href="/vendors/order"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <Package className="h-5 w-5 mr-3" />
                  Order Management
                </Link>
              </li>
              <li>
                <div className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg border border-blue-200">
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </div>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header with Edit Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <Button onClick={handleCancel} variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>

            {/* Admin Percentage Highlight */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-center text-center">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-blue-600">
                      <Percent className="h-8 w-8 mr-3" />
                      <span className="text-2xl font-bold">Admin Percentage</span>
                    </div>
                    <div className="text-4xl font-bold text-blue-700">
                      {profile.adminPercentage}%
                    </div>
                    <p className="text-blue-600 text-sm">
                      Platform fee applied to every order
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    {isEditing ? (
                      <Input
                        value={editData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 text-gray-400 mr-2" />
                          {profile.company}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                    {isEditing ? (
                      <Input
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          {profile.name}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          {profile.email}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {isEditing ? (
                      <Input
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          {profile.phone}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    {isEditing ? (
                      <Input
                        value={editData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 text-gray-400 mr-2" />
                          {profile.website}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    {isEditing ? (
                      <Select value={editData.businessInfo.businessType} onValueChange={(value) => handleInputChange('businessInfo.businessType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Select Business Type</SelectItem>
                          <SelectItem value="LLC">LLC</SelectItem>
                          <SelectItem value="Corporation">Corporation</SelectItem>
                          <SelectItem value="Partnership">Partnership</SelectItem>
                          <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {profile.businessInfo.businessType}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  {isEditing ? (
                    <Textarea
                      value={editData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-md border">
                      {profile.description}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City & State</label>
                    {isEditing ? (
                      <Input
                        value={editData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="City, State"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          {profile.location}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                    {isEditing ? (
                      <Input
                        value={editData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Street address"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {profile.address}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    {isEditing ? (
                      <Input
                        value={editData.paymentDetails.bankName}
                        onChange={(e) => handleInputChange('paymentDetails.bankName', e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 text-gray-400 mr-2" />
                          {profile.paymentDetails.bankName}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                    {isEditing ? (
                      <Select value={editData.paymentDetails.accountType} onValueChange={(value) => handleInputChange('paymentDetails.accountType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Select Account Type</SelectItem>
                          <SelectItem value="Business Checking">Business Checking</SelectItem>
                          <SelectItem value="Business Savings">Business Savings</SelectItem>
                          <SelectItem value="Personal Checking">Personal Checking</SelectItem>
                          <SelectItem value="Personal Savings">Personal Savings</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {profile.paymentDetails.accountType}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    {isEditing ? (
                      <Input
                        value={editData.paymentDetails.accountNumber}
                        onChange={(e) => handleInputChange('paymentDetails.accountNumber', e.target.value)}
                        placeholder="****1234"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                          {profile.paymentDetails.accountNumber}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                    {isEditing ? (
                      <Input
                        value={editData.paymentDetails.routingNumber}
                        onChange={(e) => handleInputChange('paymentDetails.routingNumber', e.target.value)}
                        placeholder="021000021"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {profile.paymentDetails.routingNumber}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
                    {isEditing ? (
                      <Input
                        value={editData.businessInfo.taxId}
                        onChange={(e) => handleInputChange('businessInfo.taxId', e.target.value)}
                        placeholder="12-3456789"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {profile.businessInfo.taxId}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                    {isEditing ? (
                      <Input
                        value={editData.businessInfo.established}
                        onChange={(e) => handleInputChange('businessInfo.established', e.target.value)}
                        placeholder="2020"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {profile.businessInfo.established}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
                    {isEditing ? (
                      <Select value={editData.businessInfo.employees} onValueChange={(value) => handleInputChange('businessInfo.employees', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Select Employees</SelectItem>
                          <SelectItem value="1-10">1-10</SelectItem>
                          <SelectItem value="11-25">11-25</SelectItem>
                          <SelectItem value="25-50">25-50</SelectItem>
                          <SelectItem value="50-100">50-100</SelectItem>
                          <SelectItem value="100+">100+</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {profile.businessInfo.employees}
                      </div>
                    )}
                  </div>
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
