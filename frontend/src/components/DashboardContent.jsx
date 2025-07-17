import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft,
  Plus,
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const DashboardContent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Deal Flow Screening</h1>
              <p className="text-sm text-gray-600 mt-1">Back</p>
            </div>
          </div>
          <Button className="bg-[#3F1470] hover:bg-[#5A1F9B] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="font-medium">Total Projects</span>
            <span className="font-bold text-gray-900">1</span>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              type="text" 
              placeholder="Search"
              className="pl-10 bg-white border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <span>Project</span>
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  </div>
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <span>Date Modified</span>
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  </div>
                </th>
                <th className="w-12 px-6 py-4"></th>
                <th className="w-12 px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="text-gray-900">automating with ai</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600">16 Jul 2025, 10:18 am</span>
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </td>
                <td className="px-6 py-4">
                  <Button 
                    size="icon" 
                    className="bg-[#3F1470] hover:bg-[#5A1F9B] text-white w-8 h-8"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-6 space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="text-gray-600"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button 
            variant={currentPage === 1 ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentPage(1)}
            className={currentPage === 1 ? "bg-[#3F1470] text-white" : "text-gray-600"}
          >
            1
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="text-gray-600"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
