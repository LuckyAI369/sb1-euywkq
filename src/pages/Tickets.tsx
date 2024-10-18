import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const Tickets = () => {
  const [tickets, setTickets] = useState([
    { id: 1, customer: 'John Doe', issue: 'Camera not working', priority: 'High', status: 'Open', createdAt: '2024-03-10' },
    { id: 2, customer: 'Jane Smith', issue: 'DVR configuration', priority: 'Medium', status: 'In Progress', createdAt: '2024-03-12' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (editingTicket) {
      setTickets(tickets.map(t => t.id === editingTicket.id ? { ...t, ...data } : t));
    } else {
      setTickets([...tickets, { id: Date.now(), ...data, createdAt: new Date().toISOString().split('T')[0] }]);
    }
    setIsModalOpen(false);
    setEditingTicket(null);
    reset();
  };

  const openModal = (ticket = null) => {
    setEditingTicket(ticket);
    setIsModalOpen(true);
    if (ticket) {
      reset(ticket);
    } else {
      reset();
    }
  };

  const deleteTicket = (id) => {
    setTickets(tickets.filter(t => t.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Support Tickets</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="mr-2" /> Add Ticket
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs fonticient text-gray-500 uppercase tracking-wider">Issue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.issue}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                    ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ticket.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                    ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{format(new Date(ticket.createdAt), 'MMM dd, yyyy')}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => openModal(ticket)} className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => deleteTicket(ticket.id)} className="text-red-600 hover:text-red-900">
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
              {editingTicket ? 'Edit Ticket' : 'Add New Ticket'}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register('customer', { required: true })}
                placeholder="Customer"
                className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <textarea
                {...register('issue', { required: true })}
                placeholder="Issue Description"
                className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
                rows="3"
              ></textarea>
              <select
                {...register('priority', { required: true })}
                className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <select
                {...register('status', { required: true })}
                className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
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
                  {editingTicket ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;