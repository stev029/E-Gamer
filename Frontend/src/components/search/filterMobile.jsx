import { useState } from "react";
import { BiChevronDown, BiChevronUp, BiSolidStar, BiX } from "react-icons/bi";

export default function Filter({ onClose, className, ...props }) {
    const [isOpen, setIsOpen] = useState({ price: true, rating: true });
    return (
        // eslint-disable-next-line react/prop-types
        <div className={`bg-white rounded-t-lg w-screen px-3 max-w-[520px] ${className}`}>
            {onClose &&
                <div className="font-bold ml-auto w-fit mt-3 p-1 rounded-md border hover:bg-slate-300" onClick={onClose}>
                    <BiX />
                </div>
            }
            <div className="font-bold mt-2">
                <span>Filter</span>
            </div>
            <div className="my-3 rounded border pl-4 pb-3">
                <div className="flex justify-between items-center pt-3 cursor-pointer" onClick={() => setIsOpen(current => ({ ...current, price: !current.price }))}>
                    <span className="font-bold">Price</span>
                    {isOpen.price ?
                        <BiChevronDown className="w-5 h-5 mr-1" />
                        : <BiChevronUp className="w-5 h-5 mr-1" />
                    }
                </div>
                {isOpen.price &&
                    <div className="mt-2 mr-4 flex flex-col gap-2">
                        <div className="relative w-full">
                            <input type="number" id="minimum" className="block w-full pl-8 py-1.5 text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="minimum" className="absolute text-xs ml-7 px-2 bg-white text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:-translate-x-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Minimum</label>
                            <div className="absolute top-1 ml-2">
                                <label htmlFor="minimum" className="text-sm font-bold">Rp</label>
                            </div>
                        </div>
                        <div className="relative w-full">
                            <input type="number" id="maximum" className="block w-full pl-8 py-1.5 text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="maximum" className="absolute text-xs ml-7 px-2 bg-white text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:-translate-x-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Maximum</label>
                            <div className="absolute top-1 ml-2">
                                <label htmlFor="maximum" className="text-sm font-bold">Rp</label>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="my-3 rounded border pl-4 pb-3">
                <div className="flex justify-between items-center pt-3 cursor-pointer" onClick={() => setIsOpen(current => ({ ...current, rating: !current.rating }))}>
                    <span className="font-bold">Rating</span>
                    {isOpen.rating ?
                        <BiChevronDown className="w-5 h-5 mr-1" />
                        : <BiChevronUp className="w-5 h-5 mr-1" />
                    }
                </div>
                {isOpen.rating &&
                    <div className="mt-3">
                        <div className="gap-2 flex items-center">
                            <input type="checkbox" className="w-5 h-5" name="rate-4" id="rate-4" />
                            <div className="text-xs flex items-center gap-1">
                                <BiSolidStar className="w-full fill-yellow-400" />
                                <label htmlFor="rate-4">4</label>
                            </div>
                        </div>
                        <div className="mt-2 gap-2 flex items-center">
                            <input type="checkbox" className="w-5 h-5" name="rate-5" id="rate-5" />
                            <div className="text-xs flex items-center gap-1">
                                <BiSolidStar className="w-full fill-yellow-400" />
                                <label htmlFor="rate-5">5</label>
                            </div>
                        </div>
                    </div>
                }
            </div>
            { props.children }
        </div>
    )
}