import React, { useState, useEffect } from 'react';
import './index.css';
import List from './List';
import Alert from './Alert';

interface Item {
  id: string;
  title: string;
  purchased: boolean;
}

function getLocalStorage() {
  const data = localStorage.getItem('list');
  return data ? JSON.parse(data) : [];
}

function App() {
  const [name, setName] = useState<string>('');
  const [list, setList] = useState<Item[]>(getLocalStorage());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editID, setEditID] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    show: boolean;
    msg: string;
    type: string;
  }>({
    show: false,
    msg: '',
    type: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      showAlert(true, 'success', 'item added to the list');
      const newItem: Item = {
        id: new Date().getTime().toString(),
        title: name,
        purchased: false,
      };
      setList([...list, newItem]);
      setName('');
    }
  }
  

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  const removeItem = (id: string) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id: string) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    if (specificItem) {
      setName(specificItem.title);
    }
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const togglePurchase = (id: string) => {
    setList((prevList) => 
      prevList.map((item) => 
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  }

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && (
          <Alert
            type={alert.type}
            msg={alert.msg}
            removeAlert={() => showAlert(false)}
          />
        )}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
        <List items={list} removeItem={removeItem} editItem={editItem} togglePurchase={togglePurchase}/>
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
    );
  }

export default App;
