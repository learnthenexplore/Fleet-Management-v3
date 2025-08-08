 // src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sidebarConfig } from '../routes/sidebarConfig';

const Sidebar = () => {
  const user = useSelector((state) => state.user.user);
  if (!user) return null;

  const items = sidebarConfig[user.employeeType] || [];

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <nav className="space-y-2">
        {items.map((item) => {
          if (item.permission && !user.permissions.includes(item.permission)) return null;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700 font-semibold' : ''}`
              }
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
