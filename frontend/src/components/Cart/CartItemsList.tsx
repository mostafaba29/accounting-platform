import CartItem from './CartItem';

interface CartItemsListProps {
    items: any[];
}
export default function CartItemList({ items}: CartItemsListProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-xl text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {items.map((item, index) => (
        <CartItem key={index} item={item.product}  />
      ))}
    </div>
  );
}