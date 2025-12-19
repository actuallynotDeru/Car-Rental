import { useLocation, Navigate } from "react-router-dom";
import Header from "@/components/Header"
import OrderDetails from "./components/OrderDetails"
import OrderSummary from "./components/OrderSummary"

const PaymentForms = () => {
    const location = useLocation();
    const orderData = location.state;

    // Safety: Redirect if user jumps here without renting
    if (!orderData) {
        return <Navigate to="/" replace />;
    }

    // Calculate Final Total to pass to the Pay Button
    const finalTotal = orderData.totalPrice + orderData.serviceFee + orderData.tax;

    return(
        <>
            <Header />
            <div className="w-full flex flex-row justify-center align-middle pt-5">

                {/* Left: Contact and Card Container */}
                <div className="w-2xl">
                    <p className="font-semibold text-4xl">Complete Your Order</p>
                    <p className="pb-2 text-gray-500">Secure checkout powered by industry-standard encryption</p>
                    
                    {/* --- UPDATED: Pass the correct props --- */}
                    <OrderDetails 
                        totalPrice={finalTotal} 
                        orderData={orderData} 
                    />
                    {/* -------------------------------------- */}
                </div>

                {/* Right: Item summary */}
                <div className="w-l flex flex-col pl-10">
                    <OrderSummary data={orderData} />
                </div>
            
            </div>
        </>
    )
}

export default PaymentForms