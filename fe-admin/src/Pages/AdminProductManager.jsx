import React, { useState, useEffect } from "react";
import ProductForm from "../Components/Products/ProductForm";
import ProductTable from "../Components/Products/ProductTable";

function AdminProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Get bearer token (you might want to get this from localStorage, context, or props)
  const getBearerToken = () => {
    return localStorage.getItem('token') || 'your-bearer-token-here';
  };

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:80", {
          headers: {
            'Authorization': `Bearer ${getBearerToken()}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.products || []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Create new product via API
  const createProduct = async (productData) => {
    try {
      const response = await fetch("http://localhost:80/product/create", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getBearerToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      const createdProduct = await response.json();
      return createdProduct;
    } catch (error) {
      throw error;
    }
  };

  // Update product via API (assuming you have an update endpoint)
  const updateProduct = async (productId, productData) => {
    try {
      const response = await fetch(`http://localhost:80/product/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getBearerToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }

      const updatedProduct = await response.json();
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  };

  // Open modal for adding new product
  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  // Open modal for editing product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  // Handle form submission with API integration
  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    setError(null);

    try {
      // Prepare data for API
      const productData = {
        name: formData.name,
        desc: formData.desc,
        type: formData.type,
        banner: formData.banner,
        unit: parseInt(formData.unit),
        price: parseFloat(formData.price),
        available: formData.available,
        suplier: formData.suplier
      };

      if (editingProduct) {
        // Update existing product
        const updatedProduct = await updateProduct(editingProduct._id, productData);
        setProducts(prev => prev.map(p => 
          p._id === editingProduct._id ? updatedProduct : p
        ));
      } else {
        // Create new product
        const newProduct = await createProduct(productData);
        setProducts(prev => [newProduct, ...prev]);
      }
      
      setShowModal(false);
      setEditingProduct(null);
    } catch (err) {
      setError(err.message);
      // Don't close modal on error so user can retry
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:80/product/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getBearerToken()}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
              <p className="text-gray-600 text-sm">Manage your product inventory</p>
            </div>
            <button
              onClick={handleAddProduct}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="text-red-400 text-sm">⚠️</div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{products.length}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{products.filter(p => p.available).length}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-red-600">{products.filter(p => !p.available).length}</div>
            <div className="text-sm text-gray-600">Out of Stock</div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Products Table */}
        <ProductTable
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onAddProduct={handleAddProduct}
          searchTerm={searchTerm}
        />

        {/* Form Modal */}
        {showModal && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            onClose={() => setShowModal(false)}
            isSubmitting={submitting}
          />
        )}
      </div>
    </div>
  );
}

export default AdminProductManager;