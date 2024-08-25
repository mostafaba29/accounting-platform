import Image from 'next/image';
import { Product } from '../types/ProductTableColumns';
import {useQueryClient,useMutation} from '@tanstack/react-query';
import { removeFromCart } from '@/lib/api/userApi';
import { useToast } from '../ui/use-toast';
import { Trash } from 'lucide-react';
import {Button} from '@/components/ui/button';
interface CartItemProps {
    item: Product;
}
export default function CartItem({ item}: CartItemProps) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const {mutateAsync,isPending,isError} = useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] });
            toast({
                title: 'Item successfully removed from cart',

            })
        },
        onError: () => {
            toast({
                title: 'Failed to remove item from cart',
                variant:'destructive'
            })
        }
    })

    const removeItem = async () => {
        try {
            await mutateAsync(item._id);
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };

  return (
    <div className="flex items-center p-4 border-b">
      <div className="flex-shrink-0 w-32 h-32 mr-4">
        {item.coverImage && (
          <Image src={item.coverImage} alt={item.title_EN} width={128} height={128} className="object-cover" />
        )}
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-semibold">{item.title_EN}</h2>
        <p className="text-gray-600 mt-1">${item.basic_version.price.toFixed(2) || item.open_version.price.toFixed(2)}</p>
      </div>
      <div className="flex-shrink-0 ml-4">
        <Button 
          className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-700 disabled:opacity-50"
          onClick={removeItem}
          disabled={isPending}
        >
          <Trash className="h-4 w-4" />
          {isPending ? 'Removing...' : 'Remove'}
        </Button>
        {isError && <p className="text-red-500 text-sm mt-1">Error removing item</p>}
      </div>
    </div>
  );
}