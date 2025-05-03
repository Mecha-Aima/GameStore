import { useEffect, useState } from 'react'
import './Header.css'
import logo from '../assets/logo/logo.png'

const Header = () => {

    const [state, setState] = useState(false)

    const navigation = [
        { title: "Home", path: "#" },
        { title: "Cart", path: "#" },
        { title: "Contact", path: "#" }
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 bg-dark-bg py-4 md:text-sm ${state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
            <div className="gap-x-8 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div>
                    <a href="#">
                        <img
                            src={logo}
                            width={70}
                            height={70}
                            alt="Playtrix logo"
                        />
                    </a>
                    <div className="md:hidden">
                        <button className="menu-btn text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                    <ul className="justify-center items-center space-y-6 md:flex md:space-x-12 md:space-y-0 text-base">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-white hover:text-gray-200">
                                        <a href={item.path} className="block link:text-white">
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="flex-1 gap-x-10 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        <a href="#" className="block text-white hover:text-gray-200 text-base">
                            Log in
                        </a>
                        <a href="#" className="flex items-center justify-center gap-x-1 py-2 px-4 text-gray-800 font-medium bg-teal-50 hover:bg-teal-30 active:bg-teal-200 rounded-full md:inline-flex text-base">
                            Sign Up
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;