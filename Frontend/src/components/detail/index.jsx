import {useParams} from "react-router-dom"
import dota2Account from "../../assets/images.jfif"
import Profile from "../../assets/default_photo.webp"
import {BsChatRightDots} from "react-icons/bs"
import {BiSolidStar, BiX} from "react-icons/bi";
import ShippingCart from "./ShippingCart.jsx";
import {useOutsideClick} from '../../utils/clickOutSide'
import {useRef, useState} from "react";
import {Transition, TransitionChild} from "@headlessui/react";

export default function Detail() {
    const {itemId} = useParams()
    const refs = useRef({})
    const [cartOpen, setCartOpen] = useState(false)
    const outsiteRef = useOutsideClick(() => setCartOpen(false))

    const classToggle = (el, ...args) => args.map(e => el.classList.toggle(e))

    const clickDesc = (e) => {
        classToggle(refs.current.description, 'line-clamp-2', 'active')
        e.currentTarget.innerText = refs.current.description.classList.contains('active') ? 'Less More' : 'Show More'
    }

    return (<div className={'xl:max-w-5xl md:max-w-4xl mx-auto'}>
        <div className={'fixed w-full bottom-0 left-0 flex justify-center px-5 py-3 bg-white z-10 md:hidden'}>
            <div className="flex gap-3 items-center w-full max-w-3xl ">
                <div className="rounded outline outline-2 p-2 outline-blue-300 cursor-pointer">
                    <BsChatRightDots className="stroke-[1.4px] stroke-blue-500"/>
                </div>
                <div className="rounded px-2 py-1.5 w-full cursor-pointer outline outline-2 outline-blue-300"
                     onClick={() => setCartOpen(!cartOpen)}>
                    <div className="mx-auto w-fit">
                        <span className="text-blue-500 font-semibold text-sm">
                            Tambah keranjang
                        </span>
                    </div>
                </div>
                <div className="rounded px-2 py-1.5 bg-blue-500 w-full cursor-pointer">
                    <div className="mx-auto w-fit">
                        <span className="text-white font-semibold text-sm">
                            Beli Sekarang
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <Transition show={cartOpen}>
            <TransitionChild>
                <div
                    className={`fixed inset-0 bg-black/30 transition duration-300 data-[closed]:opacity-0 z-10 md:hidden`}>
                    <TransitionChild>
                        <div
                            className={'fixed w-screen bottom-0 z-10 transition-transform duration-300 data-[leave]:data-[closed]:translate-y-full data-[enter]:duration-100 data-[enter]:data-[closed]:translate-y-full'}>
                            <div ref={outsiteRef} className={'bg-white mx-auto p-1 rounded-lg max-w-md'}>
                                <div className={'w-fit ml-auto mr-4 mt-2 p-1.5 rounded-md hover:bg-slate-200'}
                                     onClick={() => setCartOpen(false)}>
                                    <BiX/>
                                </div>
                                <ShippingCart className={'md:hidden mx-auto mt-3'} showBuyNow={false} showNote={false}/>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </TransitionChild>
        </Transition>
        <div className={'mb-12 flex gap-6 relative'}>
            <div className={'mx-auto flex flex-col gap-3 py-4'}>
                {/*Image product*/}
                <div className={''}>
                    <div className={'flex flex-col w-full'}>
                        <div className={'pb-[56.65%] overflow-hidden bg-slate-200 relative'}>
                            <div className={'absolute right-0 left-0 mx-auto w-fit h-full'}>
                                <img src={dota2Account} alt="Account dota2"
                                     className={'w-full h-full object-cover'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-4 mx-5'}>
                        <div className={'text-xl font-bold'}>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ab quam ut aperiam esse</span>
                        </div>
                        <div className={'font-bold text-xl text-blue-500'}>
                            <span>RP 10.000</span>
                        </div>
                        <div className={'flex gap-2'}>
                            <div className={'bg-blue-200 w-fit py-1 rounded text-center'}>
                                <p className={'mx-2 text-xs align-middle text-blue-700'}>Anti Scam</p>
                            </div>
                            <div className={'bg-blue-200 w-fit py-1 rounded text-center'}>
                                <p className={'mx-2 text-xs align-middle text-blue-700'}>Termurah</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'p-2 my-2 md:p-0 md:m-0 md:border-b bg-slate-100'}></div>
                {/*Profile store*/}
                <div className={'flex gap-3 mx-5 items-center'}>
                    <div className={'rounded-full overflow-hidden'}>
                        <img src={Profile} alt="User" width={40}/>
                    </div>
                    <div>
                        <a href={'#username'} className={'font-bold'}>
                            <h2>Username</h2>
                        </a>
                        <p className={'text-xs text-slate-400'}>Last active 3 hours ago</p>
                    </div>
                    <div className={'ml-auto flex items-center gap-1'}>
                        <BiSolidStar className={'fill-yellow-400'}/>
                        <span className={'text-xs font-bold'}>4.8 / 5</span>
                        <BiSolidStar className={'fill-yellow-400'}/>
                    </div>
                </div>
                {/*End profile store*/}
                <div className={'p-2 my-2 md:p-0 md:m-0 md:border-b bg-slate-100'}></div>
                {/*Description*/}
                <div className={'mx-5 flex flex-col gap-3'}>
                    <div className={'text-xl font-bold'}>
                        <h1>Depcription</h1>
                    </div>
                    <div className={'flex gap-2 flex-wrap'}>
                        <div className={'bg-gray-300 px-2 py-1 rounded-md'}>
                            <p className={'text-sm'}>Skin: 102</p>
                        </div>
                        <div className={'bg-gray-300 px-2 py-1 rounded-md'}>
                            <p className={'text-sm'}>MMR: 10k</p>
                        </div>
                        <div className={'bg-gray-300 px-2 py-1 rounded-md'}>
                            <p className={'text-sm'}>Rank: Immortal</p>
                        </div>
                        <div className={'bg-gray-300 px-2 py-1 rounded-md'}>
                            <p className={'text-sm'}>Pesona: Luna, Invoker</p>
                        </div>
                        <div className={'bg-gray-300 px-2 py-1 rounded-md'}>
                            <p className={'text-sm'}>Arcana: Rubik, Pudge</p>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-3'}>
                        <span id={'description'} ref={ref => refs.current['description'] = ref}
                              className={'line-clamp-2'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum maxime numquam vero! Ad aperiam, aut consequuntur culpa deleniti dignissimos est hic id ipsum nihil officia omnis praesentium repellendus tenetur velit.</span>
                        <div className={'text-blue-500 w-fit ml-auto cursor-pointer'}>
                            <p className={'font-bold text-sm'} onClick={clickDesc}>Show More</p>
                        </div>
                    </div>
                </div>
                {/*End Descripion*/}
            </div>
            {/*Detail Shipping*/}
            <ShippingCart className={'hidden md:block min-w-fit'}/>
            {/*End Detail Shipping*/}
        </div>
    </div>)
}