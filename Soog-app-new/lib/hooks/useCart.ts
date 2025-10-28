import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart, CartItem } from '../../features/cartSlice';
import { RootState } from '../store';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart) as { items: CartItem[] };

  const addItem = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const removeItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  const getTotalPrice = () => {
    return items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((count: number, item: CartItem) => count + item.quantity, 0);
  };

  return {
    items,
    addItem,
    removeItem,
    updateItemQuantity,
    clear,
    getTotalPrice,
    getItemCount,
  };
};