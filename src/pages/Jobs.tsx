import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const Jobs = () => {
  const [jobs, setJobs] = useState([
    { id: 1, customer: 'John Doe', type: 'Installation', date: '2024-03-15', status: 'Scheduled' },
    { id: 2, customer: 'Jane Smith', type: 'Maintenance', date: '2024-03-18', status: 'In Progress' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (editingJob) {
      setJobs(jobs.map(j => j.id === editingJob.id ? { ...j, ...data } : j));
    } else {
      setJobs([...jobs, { id: Date.now(), ...data }]);
    }
    setIsModalOpen(false);
    setEditingJob(null);
    reset();
  };

  const openModal = (job = null) => {
    setEditingJob(job);
    setIsModalOpen(true);
    if (job) {
      reset(job);
    } else {
      reset();
    }
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Jobs</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="mr-2" /> Add Job
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap">{job.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{job.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{format(new Date(job.date), 'MMM dd, yyyy')}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    job.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => openModal(job)} className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => deleteJob(job.id)} className="text-red-600 hover:text-red-900">
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
              {editingJob ? 'Edit Job' : 'Add New Job'}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register('customer', { required: true })}
                placeholder="Customer"
                className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <select
                {...register('type', { required: true })}
                className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Type</option>
                <option value="Installation">Installation</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Repair">Repair</option>
              </select>
              <input
                {...register('date', { required: true })}
                type="date"
                className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <select
                {...register('status', { required: true })}
                className="mb-3 w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
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
                  {editingJob ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;