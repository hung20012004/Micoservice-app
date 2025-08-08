import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaEdit, FaTimes, FaPlus } from 'react-icons/fa';

const AddressManager = ({ onAddressChange, selectedAddressId, onSelectAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: '',
    isDefault: false
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      console.log('Fetching addresses...'); // Debug log
      
      const token = localStorage.getItem('token');
      console.log('Token for fetch:', token ? 'Token exists' : 'No token'); // Debug log
      
      const response = await fetch('http://localhost:80/customer/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Fetch response status:', response.status); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error response:', errorText); // Debug log
        throw new Error(`Failed to fetch addresses: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data); // Debug log
      
      const userAddresses = data.address || [];
      console.log('User addresses:', userAddresses); // Debug log
      
      setAddresses(userAddresses);
      
      // Set default selected address and pass address object
      if (userAddresses.length > 0 && !selectedAddressId) {
        const defaultAddress = userAddresses.find(addr => addr.isDefault);
        const addressToSelect = defaultAddress || userAddresses[0];
        console.log('Auto-selecting address:', addressToSelect); // Debug log
        if (onSelectAddress) {
          onSelectAddress(addressToSelect._id, addressToSelect);
        }
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
      alert('Error loading addresses: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    
    console.log('handleAddAddress called', { newAddress }); // Debug log
    
    if (!newAddress.street.trim() || !newAddress.city.trim()) {
      alert('Please fill in required fields (Street and City)');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'Token exists' : 'No token'); // Debug log
      
      const addressPayload = {
        street: newAddress.street,
        city: newAddress.city,
        postalCode: newAddress.postalCode,
        country: newAddress.country
      };
      
      console.log('Sending payload:', addressPayload); // Debug log

      const response = await fetch('http://localhost:80/customer/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addressPayload)
      });

      console.log('Response status:', response.status); // Debug log
      console.log('Response ok:', response.ok); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText); // Debug log
        throw new Error(`Failed to create address: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Success result:', result); // Debug log
      
      // Refresh addresses after successful creation
      await fetchAddresses();
      
      // Reset form
      setNewAddress({ street: '', city: '', postalCode: '', country: '', isDefault: false });
      setShowAddForm(false);
      
      alert('Address added successfully!');
    } catch (err) {
      console.error('Add address error:', err); // Debug log
      alert('Error adding address: ' + err.message);
    }
  };

  const handleEditAddress = (address, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setEditingId(address._id);
    setNewAddress({
      street: address.street || '',
      city: address.city || '',
      postalCode: address.postalCode || '',
      country: address.country || '',
      isDefault: address.isDefault || false
    });
    setShowAddForm(true);
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!newAddress.street.trim() || !newAddress.city.trim()) {
      alert('Please fill in required fields (Street and City)');
      return;
    }

    try {
      const addressPayload = {
        street: newAddress.street,
        city: newAddress.city,
        postalCode: newAddress.postalCode,
        country: newAddress.country
      };

      const response = await fetch(`http://localhost:80/customer/address/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(addressPayload)
      });

      if (!response.ok) {
        throw new Error('Failed to update address');
      }

      // Refresh addresses after successful update
      await fetchAddresses();
      
      // Reset form
      setEditingId(null);
      setNewAddress({ street: '', city: '', postalCode: '', country: '', isDefault: false });
      setShowAddForm(false);
      
      alert('Address updated successfully!');
    } catch (err) {
      alert('Error updating address: ' + err.message);
    }
  };

  const handleDeleteAddress = async (addressId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const response = await fetch(`http://localhost:80/customer/address/${addressId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete address');
        }

        // Refresh addresses after successful deletion
        await fetchAddresses();
        
        alert('Address deleted successfully!');
      } catch (err) {
        alert('Error deleting address: ' + err.message);
      }
    }
  };

  const handleSetDefault = async (addressId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const response = await fetch(`http://localhost:80/customer/address/${addressId}/default`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to set default address');
      }

      // Refresh addresses after successful update
      await fetchAddresses();
      
      alert('Default address updated successfully!');
    } catch (err) {
      alert('Error setting default address: ' + err.message);
    }
  };

  // Updated function to pass both addressId and address object
  const handleSelectAddress = (address, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onSelectAddress) {
      onSelectAddress(address._id, address);
    }
    // Also call onAddressChange if provided for backward compatibility
    if (onAddressChange) {
      onAddressChange(address._id, address);
    }
  };

  const handleToggleAddForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAddForm(!showAddForm);
  };

  const handleCancelForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAddForm(false);
    setEditingId(null);
    setNewAddress({ street: '', city: '', postalCode: '', country: '', isDefault: false });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="animate-pulse">
          <div className="flex items-center mb-6">
            <div className="h-6 w-6 bg-gray-300 rounded mr-3"></div>
            <div className="h-6 bg-gray-300 rounded w-48"></div>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaMapMarkerAlt className="mr-3 text-green-600" />
          Delivery Addresses
        </h2>
        <button
          type="button"
          onClick={handleToggleAddForm}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaPlus />
          <span>Add Address</span>
        </button>
      </div>

      {/* Add/Edit Address Form */}
      {showAddForm && (
        <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Address' : 'Add New Address'}
          </h3>
          <div onSubmit={editingId ? handleUpdateAddress : handleAddAddress}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter street address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter city"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter postal code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter country"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                type="button"
                onClick={editingId ? handleUpdateAddress : handleAddAddress}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {editingId ? 'Update' : 'Add'} Address
              </button>
              <button
                type="button"
                onClick={handleCancelForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <FaMapMarkerAlt className="text-gray-400 text-4xl mx-auto mb-4" />
          <p className="text-gray-600">No addresses added yet</p>
          <p className="text-gray-500 text-sm">Click "Add Address" to add your first delivery address</p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div 
              key={address._id} 
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedAddressId === address._id 
                  ? 'border-green-500 bg-green-50' 
                  : address.isDefault 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={(e) => handleSelectAddress(address, e)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {address.isDefault && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                    {selectedAddressId === address._id && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-gray-800">{address.street}</p>
                  <p className="text-gray-600">
                    {address.city}{address.postalCode && ` ${address.postalCode}`}
                  </p>
                  {address.country && (
                    <p className="text-gray-600">{address.country}</p>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={(e) => handleSetDefault(address._id, e)}
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => handleEditAddress(address, e)}
                    className="text-green-600 hover:text-green-800 p-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteAddress(address._id, e)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressManager;