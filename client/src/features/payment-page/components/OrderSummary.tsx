import { Separator } from "@/components/ui/separator"
import { ShoppingCart } from "lucide-react"

const orderItems = [ // dummy info
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Noise-cancelling, 30hr battery",
    price: 299.0,
    originalPrice: 399.0,
    quantity: 1,
    image: "/wireless-headphones.png",
  },
  {
    id: 2,
    name: "USB-C Charging Cable",
    description: "2m braided cable",
    price: 29.0,
    quantity: 1,
    image: "/usb-cable-product.jpg",
  },
]

export default function OrderSummary() {
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="sticky top-8 rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-semibold text-foreground">Order summary</h2>
      </div>

      <div className="space-y-4">
        {orderItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="text-sm font-medium text-foreground">{item.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                <div className="flex items-center gap-2">
                  {item.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">₱{item.originalPrice.toFixed(2)}</span>
                  )}
                  <span className="text-sm font-medium text-foreground">₱{item.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-6 bg-border" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">₱{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground">₱{tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator className="my-6 bg-border" />

      <div className="flex justify-between text-lg font-semibold">
        <span className="text-foreground">Total</span>
        <span className="text-foreground">₱{total.toFixed(2)}</span>
      </div>

    </div>
  )
}