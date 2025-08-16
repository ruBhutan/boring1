
import React from 'react';
import { useAuth } from './AuthContext';
import ComprehensiveAdminDashboard from './dashboards/admin/ComprehensiveAdminDashboard';
import TourManagerDashboard from './dashboards/TourManagerDashboard';
import GuideDashboard from './dashboards/GuideDashboard';
import DriverDashboard from './dashboards/DriverDashboard';
import TouristDashboard from './dashboards/TouristDashboard';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle } from 'lucide-react';

const RoleBasedDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please log in to access your dashboard.
        </AlertDescription>
      </Alert>
    );
  }

  switch (user.role) {
    case 'admin':
      return <ComprehensiveAdminDashboard />;
    case 'tour_manager':
      return <TourManagerDashboard />;
    case 'guide':
      return <GuideDashboard />;
    case 'driver':
      return <DriverDashboard />;
    case 'tourist':
      return <TouristDashboard />;
    default:
      return (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Unknown user role: {user.role}
          </AlertDescription>
        </Alert>
      );
  }
};

export default RoleBasedDashboard;
