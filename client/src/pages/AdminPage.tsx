import React from 'react';
import ComprehensiveAdminDashboard from '@/components/dashboards/admin/ComprehensiveAdminDashboard';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const AdminPage = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <ComprehensiveAdminDashboard />
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;