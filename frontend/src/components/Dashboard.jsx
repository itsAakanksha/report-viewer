import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
