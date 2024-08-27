import {BsChatRightDots} from "react-icons/bs";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
export default function ShippingCart({className: className, showCart, showBuyNow, showNote}) {
    showCart = showCart == null ? true : showCart
    showBuyNow = showBuyNow == null ? true : showBuyNow
    showNote = showNote == null ? true : showNote
    const stock = 2
    const [valueStock, setValueStock] = useState(1)

    const setValueOnChange = (event) => {
        const value = event.target.value
        console.log(value > stock)
        if (value <= stock){
            setValueStock(parseInt(value))
        }
    }

    const onClickDeIn = (event) => {
        const count = {decrement: (a, b) => a<=1 ? a : a-1, increment: (a, b) => a>=b ? a : a+1}
        const mode = event.currentTarget.id
        setValueStock(count[mode](valueStock, stock))
    }

    return (
        <>
            {/*Detail Shipping*/}
            <div className={`rounded border mx-7 h-fit sticky top-5 ${className}`}>
                <div className={'p-5 flex flex-col gap-4'}>
                    <div className={'border-b flex justify-between items-center pb-2'}>
                        <h2 className={'text-xl font-bold'}>Detail Shipping</h2>
                        <div className={'rounded border p-2 border-blue-400 cursor-pointer'}>
                            <BsChatRightDots className={'fill-blue-500'}/>
                        </div>
                    </div>
                    <div className={'flex gap-2 items-center'}>
                        <div className="relative flex items-center max-w-36 border rounded-xl">
                            <button type="button" id="decrement"
                                    className={`p-2 ${!(valueStock > 1) ? 'text-slate-300 cursor-not-allowed' : 'text-blue-500'}`}
                                    onClick={onClickDeIn}>
                                <svg className="w-3 h-3" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M1 1h16"/>
                                </svg>
                            </button>
                            <input type="number"
                                   className="bg-gray-50 no-spinner text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Amount" value={valueStock} onChange={setValueOnChange} onBlur={() => !valueStock && setValueStock(1)}/>
                            <button type="button" id="increment"
                                    data-input-counter-increment="quantity-input"
                                    className={`p-2 ${(valueStock >= stock) ? 'text-slate-300 cursor-not-allowed' : 'text-blue-500'}`} onClick={onClickDeIn}>
                                <svg className="w-3 h-3" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M9 1v16M1 9h16"/>
                                </svg>
                            </button>
                        </div>
                        <div className={'text-nowrap'}>
                            <p>Stock: <span>{stock}</span></p>
                        </div>
                    </div>
                    {showNote &&
                        <div>
                            <div className={'rounded-md border mb-1'}>
                                <input type="text" className={'w-full py-1 px-2'}/>
                            </div>
                            <p className={'text-sm text-slate-500'}>Note to seller (Opsional)</p>
                        </div>
                    }
                </div>
                <div className={'px-5'}>
                    <div className={'w-fit ml-auto'}>
                        <p className={'text-slate-500 line-through'}>Rp 15.000</p>
                    </div>
                    <div className={'flex justify-between items-center'}>
                        <p>Subtotal:</p>
                        <span className={'font-bold text-xl text-blue-500'}>Rp 10.000</span>
                    </div>
                </div>
                <div className={'flex flex-col gap-2 px-5 py-4'}>
                    {showCart &&
                        <div className="rounded px-2 py-1.5 w-full cursor-pointer border border-blue-300 text-blue-500">
                            <div className="mx-auto w-fit">
                                <span className="font-semibold text-sm">
                                    Tambah keranjang
                                </span>
                            </div>
                        </div>
                    }
                    {showBuyNow &&
                        <div className="rounded px-2 py-1.5 bg-blue-500 text-white w-full cursor-pointer hover:bg-blue-500/80">
                            <div className="mx-auto w-fit">
                                <span className="font-semibold text-sm">
                                    Beli Sekarang
                                </span>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {/*End Detail Shipping*/}
        </>
    )
}