import {BiLeftArrow} from "react-icons/bi";
import dota2Img from '../../assets/images.jfif'
import {useEffect, useRef, useState} from "react";

export default function Cart() {
    const stock = 3
    const refs = useRef({})
    // const [noteSeller, setNoteSeller] = useState({})
    const [amount, setAmount] = useState({})
    const [checkStates, setCheckStates] = useState({})

    useEffect(() => {
        Object.keys(refs.current).map((k) => {
            setAmount(prevState => ({...prevState, [k]: 1}))
            setCheckStates(prevState => ({...prevState, [k]: false}))
        })
    }, [])

    function CheckAll(obj) {
        for (const o in obj)
            if (!obj[o]) return false;
        // setCheckAllStates(true)
        return true;
    }

    const checkedBtn = (event) => {
        // console.dir(event.currentTarget)
        setCheckStates(prevState => {
            const nextState = {}
            Object.keys(prevState).map(k => nextState[k] = event.target.checked)
            return nextState
        })
    }

    const setValueOnChange = (event) => {
        const value = event.target.value
        const amountRef = event.currentTarget.dataset.amount
        if (value <= stock) {
            setAmount(prevState => ({...prevState, [amountRef]: parseInt(value)}))
        }
    }

    const onClickDeIn = (event) => {
        const count = {decrement: (a) => a <= 1 ? a : a - 1, increment: (a, b) => a >= b ? a : a + 1}
        const mode = event.currentTarget.id
        const amountRef = event.currentTarget.dataset.amount
        const valueStock = amount[amountRef]
        // console.log(valueStock)
        setAmount(prevState => ({...prevState, [amountRef]: count[mode](valueStock, stock)}))
    }

    return (
        <div className={'bg-gray-100'}>
            <div className={'max-w-md m-auto relative bg-white min-h-screen h-full pb-16'}>
                <div className={'px-5 flex flex-col border-b'}>
                    <div className={'flex py-2 gap-2 items-center'}>
                        <div className={'cursor-pointer'}>
                            <BiLeftArrow/>
                        </div>
                        <h2 className={'font-bold'}>Cart</h2>
                    </div>
                    <div className={'flex justify-between my-4'}>
                        <div className={'flex gap-2'}>
                            <input type="checkbox" id={'Sall'} checked={CheckAll(checkStates)}
                                   onChange={checkedBtn}/>
                            <div className={'text-xs py-1 font-semibold cursor-pointer'}>
                                <label htmlFor={'Sall'}>Select all</label>
                            </div>
                        </div>
                        <div className={'text-blue-500 text-sm font-bold'}>
                            <p>Delete all</p>
                        </div>
                    </div>
                </div>
                <div className={''}>
                    {[...Array(3)].map((x, i) =>
                        <div id={`cart-${i}`} key={i}
                             ref={ref => refs.current[i] = ref}>
                            <div className={'px-5 py-4'}>
                                <div className={'flex gap-2 my-2'}>
                                    <div>
                                        <input type="checkbox" checked={checkStates[i]}
                                               onClick={() => setCheckStates(prevState => ({
                                                   ...prevState,
                                                   [i]: !checkStates[i]
                                               }))}/>
                                    </div>
                                    <div className={'ml-2 flex gap-2'}>
                                        <div className={'w-10 h-10 min-w-14'}>
                                            <img src={dota2Img} alt="dota 2"/>
                                        </div>
                                        <div className={'flex flex-col gap-2'}>
                                            <div className={'w-full line-clamp-2'}>
                                                <h2 className={'font-semibold'}>Lorem ipsum dolor sit amet consectetur
                                                    adipisicing
                                                    elit. Maxime ab quam ut
                                                    aperiam
                                                    esse</h2>
                                            </div>
                                            <div className={'text-sm font-bold'}>
                                                <p className={'text-blue-500'}>Rp 15.000</p>
                                            </div>
                                            <div className={'flex gap-2'}>
                                                <div className={'bg-blue-200 w-fit py-1 rounded text-center'}>
                                                    <p className={'mx-2 text-xs align-middle text-blue-700'}>Anti
                                                        Scam</p>
                                                </div>
                                                <div className={'bg-blue-200 w-fit py-1 rounded text-center'}>
                                                    <p className={'mx-2 text-xs align-middle text-blue-700'}>Termurah</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={'pl-7 mt-5'}>
                                    <div className={'rounded-md border mb-1'}>
                                        <input type="text" className={'w-full py-1 px-2'}/>
                                    </div>
                                    <p className={'text-sm text-slate-500'}>Note to seller (Opsional)</p>
                                    <div className={'flex gap-2 items-center justify-between mt-3'}>
                                        <div className={'text-nowrap font-semibold'}>
                                            <p>Stock: <span className={'font-normal'}>{stock}</span></p>
                                        </div>
                                        <div className="relative flex items-center max-w-36 border rounded-xl">
                                            <button type="button" id="decrement" data-amount={i}
                                                    className={`p-2 ${!(amount[i] > 1) ? 'text-slate-300 cursor-not-allowed' : 'text-blue-500'}`}
                                                    onClick={onClickDeIn}>
                                                <svg className="w-3 h-3" aria-hidden="true"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth="2" d="M1 1h16"/>
                                                </svg>
                                            </button>
                                            <input type="number" data-amount={i}
                                                   className="bg-gray-50 no-spinner text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   placeholder="Amount" value={amount[i]}
                                                   onBlur={() => !amount[i] && setAmount(prevState => ({
                                                       ...prevState,
                                                       [i]: 1
                                                   }))}
                                                   onChange={setValueOnChange}/>
                                            <button type="button" id="increment" data-amount={i}
                                                    data-input-counter-increment="quantity-input"
                                                    className={`p-2 ${(amount[i] >= stock) ? 'text-slate-300 cursor-not-allowed' : 'text-blue-500'}`}
                                                    onClick={onClickDeIn}>
                                                <svg className="w-3 h-3" aria-hidden="true"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          strokeWidth="2" d="M9 1v16M1 9h16"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'p-1.5 bg-slate-100'}></div>
                        </div>
                    )}
                </div>
                <div className={'fixed h-16 bottom-0 w-full max-w-md z-10 bg-white'}>
                    <div className={'px-5 py-3 flex justify-between border-t'}>
                        <div className={''}>
                            <div className={'text-xs'}>
                                <span>Total 2 product</span>
                            </div>
                            <div className="font-bold text-blue-500">
                                <h2>Rp 15.000</h2>
                            </div>
                        </div>
                        <div className={'bg-blue-500 rounded-xl cursor-pointer'}>
                            <button className={'text-white font-bold my-auto h-full text-sm px-2'}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}