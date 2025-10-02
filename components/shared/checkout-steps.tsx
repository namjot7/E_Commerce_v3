import { cn } from "@/lib/utils";
import React from "react";

const CheckoutSteps = ({ current = 0 }) => {
    const ary = ['Login page', 'Shipping Address', 'Payment Method', 'Place Order'];
    return (
        <div className="flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10">
            {ary.map((step, index) => (
                <React.Fragment key={step}>
                    <div className={cn('p-2 rounded-full text-sm w-56 text-center', index === current ? 'bg-secondary' : '')}>
                        {step}
                    </div>
                    {step !== 'Place Order' && (
                        <hr className="w-16 border-t border-gray-400" />
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default CheckoutSteps;