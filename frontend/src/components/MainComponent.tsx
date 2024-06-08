import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from './DataTable';
import EditForm from './EditForm';
import AddItemButton from './AddItemButton';
import Modal from './Modal';
import AddForm from './AddForm';
import SideBar from './Sidebar';
import { columns as productColumns } from '@/components/ProductTableColumns';
import { columns as userColumns } from '@/components/UserTableColumns';
import { columns as blogColumns } from '@/components/BlogTableColumns';

const MainComponent = () => {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [selectedType, setSelectedType] = useState('home');

  useEffect(() => {
    if (['product', 'user', 'blog'].includes(selectedType)) {
      const loadData = async () => {
        setData([]);
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/${selectedType}s`);
          console.log(response.data.data.data);
          setData(response.data.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      loadData();
    }
  }, [selectedType]);

  const handleSave = async (updatedItem) => {
    setData((prevData) =>
      prevData.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );
    setEditingItem(null);
  };

  const handleAdd = async (newItem) => {
    setData((prevData) => [...prevData, newItem]);
    setIsAddingItem(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleClose = () => {
    setEditingItem(null);
    setIsAddingItem(false); 
  };

  const handleIconClick = (icon) => {
    setSelectedType(icon);
  };

  const getColumns = () => {
    switch (selectedType) {
      case 'user':
        return userColumns;
      case 'blog':
        return blogColumns;
      default:
        return productColumns;
    }
  };

  const getTypeName = () => {
    switch (selectedType) {
      case 'user':
        return 'User';
      case 'blog':
        return 'Blog';
      default:
        return 'Product';
    }
  };

  const shouldShowTable = ['product', 'user', 'blog'].includes(selectedType);

  return (
    <div className="flex h-screen justify-between">
      <SideBar onIconClick={handleIconClick} />
      <div >
        {shouldShowTable ? (
          <div className="flex flex-col items-center mx-8">
            <div className="flex flex-row justify-between items-center w-full my-2 ">
              <h1 className="text-2xl font-bold">{getTypeName()} Management</h1>
              <AddItemButton type={selectedType} onClick={() => setIsAddingItem(true)} />
            </div>
            <div className="overflow-x-auto mb-8">
              <DataTable columns={getColumns()} data={data} onEdit={handleEdit} />
            </div>
          </div>
        ) : (
          <div className="h-96 mb-8"></div>
        )}
        {editingItem && (
          <Modal isOpen={true} onClose={handleClose}>
            <EditForm item={editingItem} onClose={handleClose} onSave={handleSave} type={selectedType} />
          </Modal>
        )}
        {isAddingItem && (
          <Modal isOpen={true} onClose={handleClose}>
            <AddForm type={selectedType} onClose={handleClose} onSave={handleAdd} />
          </Modal>
        )}
        {selectedType === 'home' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
            <p>This is the home section.</p>
          </div>
        )}
        {selectedType === 'settings' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p>This is the settings section.</p>
          </div>
        )}
        {selectedType === 'statistics' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Statistics</h1>
            <p>This is the statistics section.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainComponent;
