import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchData } from './api';
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
  const [selectedType, setSelectedType] = useState('product');

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData(selectedType);
      setData(fetchedData);
    };

    loadData();
  }, [selectedType]);

  const handleSave = async (updatedItem) => {
    setData((prevData) => prevData.map((item) => (item._id === updatedItem._id ? updatedItem : item)));
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

  return (
    <div className="flex">
      <SideBar onIconClick={handleIconClick} />
      <div className="p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-4">{getTypeName()} Management</h1>
        {(selectedType === 'product' || selectedType === 'user' || selectedType === 'blog') && (
          <div className="mb-4">
            <AddItemButton type={selectedType} onClick={() => setIsAddingItem(true)} />
          </div>
        )}
        <DataTable columns={getColumns()} data={data} onEdit={handleEdit} />
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
      </div>
    </div>
  );
};

export default MainComponent;
