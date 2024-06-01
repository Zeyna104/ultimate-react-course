import React from 'react';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';
import { useDispatch } from 'react-redux';

const DeleteItem = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(id))}>
      Delete
    </Button>
  );
};

export default DeleteItem;
