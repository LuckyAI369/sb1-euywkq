import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Inventory = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'CCTV Camera', model: 'HD-1080P', quantity: 50, price: 199.99 },
    { id: 2, name: 'DVR', model: '8-Channel', quantity: 20, price: 299.99 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (editingItem) {
      setInventory(inventory.map(item => item.id === editingItem.id ? { ...item, ...data } : item));
    } else {
      setInventory([...inventory, { id: Date.now(), ...data }]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
    reset();
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
    if (item) {
      reset(item);
    } else {
      reset();
    }
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Inventory</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="mr-2" /> Add Item
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.model}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => openModal(item)} className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              {editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register('name', { required: true })}
                placeholder="Item Name"
                className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                {...register('model', { required: true })}
                placeholder="Model"
                className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                {...register('quantity', { required: true, min: 0 })}
                type="number"
                placeholder="Quantity"
                className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                {...register('price', { required: true, min: 0 })}
                type="number"
                step="0.01"
                placeholder="Price"
                className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  {editingItem ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;