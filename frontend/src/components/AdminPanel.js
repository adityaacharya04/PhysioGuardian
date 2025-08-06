import React from 'react';

const AdminPanel = () => {
  const manageUsers = () => {
    console.log('Managing users...');
  };

  const manageTherapists = () => {
    console.log('Managing therapists...');
  };

  const manageContent = () => {
    console.log('Managing content...');
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={manageUsers}>Manage Users</button>
      <button onClick={manageTherapists}>Manage Therapists</button>
      <button onClick={manageContent}>Manage Content</button>
    </div>
  );
};

export default AdminPanel;
