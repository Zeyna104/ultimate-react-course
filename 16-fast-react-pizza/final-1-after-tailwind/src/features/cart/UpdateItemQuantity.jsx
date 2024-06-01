import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decrQuantity, incrQuantity } from './cartSlice';

const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decrQuantity(pizzaId))}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(incrQuantity(pizzaId))}>
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
