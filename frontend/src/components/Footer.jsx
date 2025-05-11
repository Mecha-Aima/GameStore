import logo from '../assets/logo/logo.png'
import facebook from '../assets/icons/facebook.svg'
import instagram from '../assets/icons/instagram.svg'
import linkedin from '../assets/icons/linkedin.svg'
import pinterest from '../assets/icons/pinterest.svg'
import './Footer.css'

const Footer = () => {

    const footerNavs = [
        {
            href: '/home',
            name: 'Home'
        },
        {
            href: '/cart',
            name: 'Cart'
        },
        {
            href: '/contact',
            name: 'Contact'
        }
    ]

    return (
        <footer className="my-0 bottom-0 left-0 right-0 text-slate-400 bg-dark-bg-2 px-4 py-5 max-w-screen-xl mx-auto md:px-8">
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <a href="/"><img src={logo} className="w-32 sm:mx-auto" /></a>
                <p className="leading-relaxed mt-2 text-[15px]">
                    A private online marketplace for buying and selling latest video games.
                </p>
            </div>
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                {
                    footerNavs.map((item, idx) => (
                        <li key={idx} className="text-center text-slate-100 hover:text-stone-500">
                            <a href={item.href}>
                                { item.name }
                            </a>
                        </li>
                    ))
                }
            </ul>
            <div className="mt-8 items-center justify-between sm:flex">
                <div className="mt-4 sm:mt-0 text-stone-300">
                    &copy; 2025 PlayTrix All rights reserved.
                </div>
                <div className="mt-6 sm:mt-0">
                    <ul className="flex items-center space-x-4">
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <a href="#">
                                <img src={facebook} className="w-6 h-6" alt="Facebook" />
                            </a>
                        </li>

                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <a href="#">
                                <img src={instagram} className="w-6 h-6" alt="Instagram" />
                            </a>
                        </li>

                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <a href="#">
                                <img src={linkedin} className="w-6 h-6" alt="LinkedIn" />
                            </a>
                        </li>

                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <a href="#">
                                <img src={pinterest} className="w-6 h-6" alt="Pinterest" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
