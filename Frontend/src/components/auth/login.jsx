export default function SignIn() {
    return (
        <div className="bg-white w-full p-10 rounded-2xl shadow-lg min-w-72 max-w-96">
            <h1 className="mx-auto mb-7 w-fit text-3xl font-bold text-blue-500">My Game</h1>
            <div className="flex justify-between items-center">
                <span className="text-2xl uppercase font-semibold">Login</span>
                <a href="/register" className="text-blue-500 font-bold">
                    <span className="hover:underline">Register</span>
                </a>
            </div>
            <div className="mt-5">
                <form action="">
                    <div className="mb-3">
                        <label htmlFor="email" className="text-gray-600">Email</label>
                        <input type="email" name="email" id="email" placeholder="example@mail.com" className="w-full py-1 px-2 rounded border border-gray-600" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="text-gray-600">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter Password" className="w-full py-1 px-2 rounded border border-gray-600" />
                    </div>
                    <div className="w-fit ml-auto mb-3">
                        <a href="#" className="text-blue-500 hover:underline">
                            <span>Forgot Password?</span>
                        </a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="rounded bg-blue-500 hover:bg-blue-400">
                            <button type="submit" className="w-full p-1 font-bold text-slate-100">Login</button>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-full h-0 border-gray-300 border-b my-auto"></div>
                            <span className="text-nowrap">or login with</span>
                            <div className="w-full h-0 border-gray-300 border-b my-auto"></div>
                        </div>
                        <div className="border-2 rounded-md hover:bg-slate-100">
                            <button type="button" className="w-full text-sm p-1 font-semibold text-gray-500 flex justify-center items-center gap-1">
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                <span>Goggle</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}