interface CartSummaryProps {
    items: any[];
}
export default function CartSummary({ items }: CartSummaryProps) {
    const total = items.reduce((total, item) => total + (item.product.basic_version.price || item.product.open_version.price) , 0);

  
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <button className="w-full mt-6 bg-unitedPrimary hover:bg-cyan-700 text-white  font-semibold py-3 rounded-md transition duration-300">
          Proceed to Checkout
        </button>
      </div>
    );
  }