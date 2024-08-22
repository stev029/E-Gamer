import game from "../assets/Game.png"
import content from "../assets/ContentImg.png"
import valo from "../assets/Valo.png"

export default function Home(){
    return (
        <div className="my-14 mx-auto sm:w-full md:w-3/4">
            <div className="rounded-xl border block gap-4 p-5 shadow-md md:flex">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-krona w-3/4 text-center">Lets you play Better</h1>
                    <p className="text-xl font-light">Making masters</p>
                </div>
                <div className="w-fit mx-auto md:ml-4 my-4 md:my-0">
                    <div className="w-[calc(100vh_/_2)] rounded rounded-tl-3xl rounded-br-3xl rounded-bl-xl rounded-tr-2xl overflow-hidden">
                        <img src={ game } alt="Game" className="object-fill w-full"/>
                    </div>
                </div>
            </div>
            
            {/* Hot Games */}
            <div className="my-6 rounded-xl border shadow-md px-4 py-3">
                <div className="flex justify-between font-bold">
                    <span className="">Hot Games</span>
                    <a href="#" className="hover:underline">
                        <span className="text-xs">See More &gt;</span>
                    </a>
                </div>
                <div className="mt-3 grid gap-3 grid-flow-col auto-cols-[calc((100%_-_2*25px)/4)] sm:auto-cols-[calc((100%_-_2*25px)/5)] md:grid-flow-row md:grid-cols-6 overflow-x-auto">
                    <div className="w-full">
                        <div className="rounded-md overflow-hidden">
                            <a href="#">
                                <img src={ content } alt="Item" className="min-w-14 w-full"/>
                            </a>
                        </div>
                        <div className="w-fit mx-auto font-bold my-2">
                            <a href="#">Dota2</a>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="rounded-md overflow-hidden">
                            <a href="#">
                                <img src={ content } alt="Item" className="min-w-14 w-full"/>
                            </a>
                        </div>
                        <div className="w-fit mx-auto font-bold my-2">
                            <a href="#">Dota2</a>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="rounded-md overflow-hidden">
                            <a href="#">
                                <img src={ content } alt="Item" className="min-w-14 w-full"/>
                            </a>
                        </div>
                        <div className="w-fit mx-auto font-bold my-2">
                            <a href="#">Dota2</a>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="rounded-md overflow-hidden">
                            <a href="#">
                                <img src={ content } alt="Item" className="min-w-14 w-full"/>
                            </a>
                        </div>
                        <div className="w-fit mx-auto font-bold my-2">
                            <a href="#">Dota2</a>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="rounded-md overflow-hidden">
                            <a href="#">
                                <img src={ content } alt="Item" className="min-w-14 w-full"/>
                            </a>
                        </div>
                        <div className="w-fit mx-auto font-bold my-2">
                            <a href="#">Dota2</a>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="rounded-md overflow-hidden">
                            <a href="#">
                                <img src={ content } alt="Item" className="min-w-14 w-full"/>
                            </a>
                        </div>
                        <div className="w-fit mx-auto font-bold my-2">
                            <a href="#">Dota2</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hot Games */}


            {/* suggest */}
            <div className="my-6 rounded-xl border shadow-md px-4 pt-4 pb-6">
                <div className="flex justify-between font-bold">
                    <span className="">Suggest</span>
                    <a href="#" className="hover:underline">
                        <span className="text-xs">See More &gt;</span>
                    </a>
                </div>
                <div className="mt-3 grid gap-3 grid-cols-4 md:grid-cols-5">
                    <div className="w-full rounded-lg overflow-hidden border shadow-lg">
                        <div className="relative overflow-hidden pb-[100%] bg-gray-200">
                            <a href="#">
                                <img src={ content } alt="Item" className="w-full absolute top-0"/>
                            </a>
                        </div>
                        <div className="mt-2 px-1.5">
                            <div className="truncate line-clamp-2 text-wrap tracking-tight leading-none hover:underline">
                                <a href="#" className="text-sm">Account Dota2 arcana pudge, rubix, immo rank</a>
                            </div>
                            <div className="mt-1 mb-2">
                                <span className="font-bold">Rp80000</span>
                                <p className="text-xs">Sold 28</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded-lg overflow-hidden border shadow-lg">
                        <div className="relative overflow-hidden pb-[100%] bg-gray-200">
                            <a href="#">
                                <img src={ valo } alt="Item" className="w-full absolute"/>
                            </a>
                        </div>
                        <div className="mt-2 px-1.5">
                            <div className="truncate line-clamp-2 text-wrap tracking-tight leading-none hover:underline">
                                <a href="#" className="text-sm">Valo Account full agent, Skin(Vandal: Ion, Prime, Elder, Araxy&apos;s)</a>
                            </div>
                            <div className="mt-1 mb-2">
                                <span className="font-bold">Rp400000</span>
                                <p className="text-xs">Sold 24</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded-lg overflow-hidden border shadow-lg">
                        <div className="relative overflow-hidden pb-[100%] bg-gray-200">
                            <a href="#">
                                {/* <img src={ valo } alt="Item" className="w-full absolute"/> */}
                            </a>
                        </div>
                        <div className="mt-2 px-1.5">
                            <div className="truncate line-clamp-2 text-wrap tracking-tight leading-none hover:underline">
                                <a href="#" className="text-sm">Valo Account full agent, Skin(Vandal: Ion, Prime, Elder, Araxy&apos;s)</a>
                            </div>
                            <div className="mt-1 mb-2">
                                <span className="font-bold">Rp400000</span>
                                <p className="text-xs">Sold 24</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded-lg overflow-hidden border shadow-lg">
                        <div className="relative overflow-hidden pb-[100%] bg-gray-200">
                            <a href="#">
                                {/* <img src={ valo } alt="Item" className="w-full absolute"/> */}
                            </a>
                        </div>
                        <div className="mt-2 px-1.5">
                            <div className="truncate line-clamp-2 text-wrap tracking-tight leading-none hover:underline">
                                <a href="#" className="text-sm">Valo Account full agent, Skin(Vandal: Ion, Prime, Elder, Araxy&apos;s)</a>
                            </div>
                            <div className="mt-1 mb-2">
                                <span className="font-bold">Rp400000</span>
                                <p className="text-xs">Sold 24</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded-lg overflow-hidden border shadow-lg">
                        <div className="relative overflow-hidden pb-[100%] bg-gray-200">
                            <a href="#">
                                {/* <img src={ valo } alt="Item" className="w-full absolute"/> */}
                            </a>
                        </div>
                        <div className="mt-2 px-1.5">
                            <div className="truncate line-clamp-2 text-wrap tracking-tight leading-none hover:underline">
                                <a href="#" className="text-sm">Valo Account full agent, Skin(Vandal: Ion, Prime, Elder, Araxy&apos;s)</a>
                            </div>
                            <div className="mt-1 mb-2">
                                <span className="font-bold">Rp400000</span>
                                <p className="text-xs">Sold 24</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded-lg overflow-hidden border shadow-lg">
                        <div className="relative overflow-hidden pb-[100%] bg-gray-200">
                            <a href="#">
                                {/* <img src={ valo } alt="Item" className="w-full absolute"/> */}
                            </a>
                        </div>
                        <div className="mt-2 px-1.5">
                            <div className="truncate line-clamp-2 text-wrap tracking-tight leading-none hover:underline">
                                <a href="#" className="text-sm">Valo Account full agent, Skin(Vandal: Ion, Prime, Elder, Araxy&apos;s)</a>
                            </div>
                            <div className="mt-1 mb-2">
                                <span className="font-bold">Rp400000</span>
                                <p className="text-xs">Sold 24</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded-lg overflow-hidden border shadow-lg">
                        <div className="relative overflow-hidden pb-[100%] bg-gray-200">
                            <a href="#">
                                {/* <img src={ valo } alt="Item" className="w-full absolute"/> */}
                            </a>
                        </div>
                        <div className="mt-2 px-1.5">
                            <div className="truncate line-clamp-2 text-wrap tracking-tight leading-none hover:underline">
                                <a href="#" className="text-sm">Valo Account full agent, Skin(Vandal: Ion, Prime, Elder, Araxy&apos;s)</a>
                            </div>
                            <div className="mt-1 mb-2">
                                <span className="font-bold">Rp400000</span>
                                <p className="text-xs">Sold 24</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full rounded-lg overflow-hidden border shadow-lg">
                        <div className="relative overflow-hidden pb-[100%] bg-gray-200">
                            <a href="#">
                                {/* <img src={ valo } alt="Item" className="w-full absolute"/> */}
                            </a>
                        </div>
                        <div className="mt-2 px-1.5">
                            <div className="truncate line-clamp-2 text-wrap tracking-tight leading-none hover:underline">
                                <a href="#" className="text-sm">Valo Account full agent, Skin(Vandal: Ion, Prime, Elder, Araxy&apos;s)</a>
                            </div>
                            <div className="mt-1 mb-2">
                                <span className="font-bold">Rp400000</span>
                                <p className="text-xs">Sold 24</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Suggest */}
        </div>
    )
}