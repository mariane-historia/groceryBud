import React from 'react';

interface ListItem {
  id: string;
  title: string;
  purchased: boolean;
}

interface ListProps {
  items: ListItem[];
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
  togglePurchase: (id: string) => void;
}

const List: React.FC<ListProps> = ({ items, removeItem, editItem, togglePurchase }) => {
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const { id, title, purchased } = item;
        return (
          <article className={`grocery-item${purchased ? ' purchased' : ''}`} key={id}>
            <label>
              <input
                type='checkbox'
                checked={purchased}
                onChange={() => togglePurchase(id)}
              />
              <span className={`item-title${purchased ? ' completed' : ''}`}>{title}</span>
            </label>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                Edit
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)}
              >
                Delete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
