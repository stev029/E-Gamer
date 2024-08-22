import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import Filter from "./search/filterMobile";

export default function SearchItem() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [filter, setFilter] = useState(false)
    const [queryParams] = useSearchParams();
    const querySearch = queryParams.get('q');
    const navigate = useNavigate();

    const filterClose = () => {
        setFilter(!filter)
    }

    useEffect(() => {
        if (!querySearch) {
            navigate('/');
        }
    }, [])

    return (
        <div className="flex max-w-[calc(100vw_*_0.9)] mx-auto gap-4">
            <div className="my-6 px-4 pt-4 pb-6">
                <div className="flex justify-between items-center">
                    <div className="rounded-lg border-2 p-1 cursor-pointer hover:bg-slate-100 md:hidden" onClick={() => setFilter(!filter)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Filter by</span>
                        <div className="rounded py-1 px-3 border flex items-center">
                            <span>Newest</span>
                            <div className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                {filter &&
                    <div className="h-screen w-screen bg-gray-400/40 fixed top-0 left-0 z-20 md:hidden">
                        <div className="relative h-full flex justify-center">
                            <Filter onClose={filterClose} className="absolute bottom-0" />
                        </div>
                    </div>
                }
                <div className="mt-3 grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
                    {[...Array(9)].map((x, i) =>
                        <div className="w-full rounded-lg overflow-hidden border shadow-lg" key={i}>
                            <div className="relative overflow-hidden pb-[100%] bg-gray-200">
                                <a href="#">
                                    {/* <img src={ content } alt="Item" className="w-full absolute top-0"/> */}
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
                    )}
                </div>
            </div>
            <div className="my-8">
                <Filter className={"max-w-[calc(100vw_*_0.3)] hidden md:block"} />
            </div>
        </div>
    )
}