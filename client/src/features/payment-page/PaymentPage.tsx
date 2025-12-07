import Header from "@/components/Header"
import OrderDetails from "./components/OrderDetails"
import OrderSummary from "./components/OrderSummary"

interface PaymentFormsProps{
    ProductName: string
    ProductPrice: number
}

const PaymentForms = ()  => {
    return(
        <>
            <Header />
            <div className="w-full flex flex-row justify-center align-middle pt-5">

                {/* Contact and Card Container */}
                <div className="w-2xl">
                    <p className="font-semibold text-4xl">Complete Your Order</p>
                    <p className="pb-2">Secure checkout powered by industry-standard encryption</p>
                    <OrderDetails itemPrice = {1200}/>
                </div>

                {/* item summary */}
                <div className="w-l flex flex-col justify-center pl-10 ">
                    <OrderSummary />
                </div>
            
            </div>
        </>
    )
}

export default PaymentForms