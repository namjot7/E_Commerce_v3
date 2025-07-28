import React from 'react'

const ProductPrice = ({ value, className }: { value: number; className?: string; }) => {
    // Ensure two decimal places
    const stringVal = value.toFixed(2);

    // get the int/float
    const [int, float] = stringVal.split('.');

    return (
        <div className={`text-2xl ${className}`}>
            <span className="text-xs align-super">$</span>
            {int}
            <span className="text-xs">.{float}</span>
        </div>
    )
}

export default ProductPrice