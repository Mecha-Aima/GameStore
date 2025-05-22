/* Cart Items List: 
For each item: thumbnail, title (link back to details), unit price, quantity input (±), subtotal, "Remove" button
Order Summary Sidebar: Total items, subtotal, estimated tax/shipping (if any), grand total
Actions: "Continue Shopping" link, "Proceed to Order Summary" button */
import Header from '../components/Header';
import Footer from '../components/Footer';
import add from '../assets/icons/add.svg';
import minus from '../assets/icons/minus.svg';
import { useGames } from '../GamesContext';
import { useCart } from '../CartContext';
import { useUser } from '../UserContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity } = useCart();
    const { user, orderId } = useUser();

    // Use game context for recommended items
    const { getGameById } = useGames();
    const recommendedItems = [101, 102, 103]
        .map(id => getGameById(id))
        .filter(Boolean);

    useEffect(() => {
        console.log('Cart updated:', cart);
    }, [cart]);

    // Compute total amount
    const computeTotalAmount = () => {
        return cart.reduce((total, item) => {
            const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
            return total + price * (item.quantity || 1);
        }, 0);
    };

    useEffect(() => {
        const stored = localStorage.getItem('orderId');
        if (stored) {
            console.log("Order ID: ", stored);
        }
        console.log("Order ID: ", orderId)
        if (!user || !orderId) return;
        console.log(orderId)
        const fetchOrder = async () => {
            const res = await fetch(`/api/orders/get?order_id=${orderId}`,
            {
                method: 'GET',
            });
            const data = await res.json();
            console.log("Data: ", data)
        }
        fetchOrder();
    }, []);

    const today = new Date().toLocaleDateString();

    return (
        <div className="min-h-screen text-white flex bg-navy-100 flex-col gap-8 items-center justify-center h-900px">
            <Header />
            <section className="py-8 antialiased bg-slate-900 md:py-16 rounded-lg mb-24 mt-32">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    <div className="space-y-6">
                    {cart.map((item) => (
                        <div key={item.game_id} className="rounded-lg bg-navy-90 p-4 shadow-sm md:p-6">
                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                <a href="#" className="shrink-0 md:order-1">
                                    <img className=" w-20" src={item.image_url} alt={item.title} />
                                </a>

                                <label htmlFor={`counter-input-${item.game_id}`} className="sr-only">Choose quantity:</label>
                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                    <div className="flex items-center">
                                        <button type="button" id={`decrement-button-${item.game_id}`} data-input-counter-decrement={`counter-input-${item.game_id}`} style={{ padding: '4px 12px' }} className="shrink-0 items-center justify-center rounded-md bg-teal-50 border border-navy-50 hover:bg-navy-50 focus:outline-none focus:ring-2 focus:ring-gray-700 disabled:opacity-50" onClick={() => updateQuantity(item.game_id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                            <img src={minus} alt="minus" style={{ width: '16px', height: '16px', padding: '0px' }} />
                                        </button>
                                        <input type="text" id={`counter-input-${item.game_id}`} data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-white focus:outline-none focus:ring-0" placeholder="" value={item.quantity} required readOnly />
                                        <button type="button" id={`increment-button-${item.game_id}`} data-input-counter-increment={`counter-input-${item.game_id}`} style={{ padding: '4px 12px' }} className="shrink-0 items-center justify-center rounded-md bg-teal-50 border border-navy-50 hover:bg-navy-50 focus:outline-none focus:ring-2 focus:ring-gray-700 disabled:opacity-50" onClick={() => updateQuantity(item.game_id, item.quantity + 1)} disabled={item.stock <= item.quantity}>
                                            <img src={add} alt="add" style={{ width: '16px', height: '16px', padding: '0px' }} />
                                        </button>
                                    </div>
                                    <div className="text-end md:order-4 md:w-32">
                                        <p className="text-base font-bold text-teal-10">Rs. {typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</p>
                                    </div>
                                </div>

                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md justify-start text-left">
                                    <a href="#" className="font-medium text-navy-10 hover:underline text-left">{item.title}</a>

                                    <div className="flex items-center gap-4">
                                        <button type="button" className="inline-flex items-start justify-start text-sm text-red-400 hover:underline " style={{ padding: '12px 0px'}} onClick={() => removeFromCart(item.game_id)}>
                                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                            </svg>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="hidden xl:mt-8 xl:block">
                        <h3 className="text-2xl font-semibold text-white">People also bought</h3>
                        <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                            {recommendedItems.map((item) => (
                                <div key={item.game_id} className="flex flex-col justify-between items-center overflow-hidden rounded-lg p-6 bg-navy-90 shadow-sm h-[600px]">
                                    <a href="#" className="overflow-hidden rounded mb-8">
                                        <img className="mx-auto" src={item.image_url} alt={item.title} />
                                    </a>
                                    <div>
                                        <a href="#" className="text-lg font-semibold mt-4 leading-tight text-white hover:underline">{item.title}</a>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-teal-10">
                                            Rs. {typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2.5 w-full">
                                        <button 
                                            type="button" 
                                            className="inline-flex w-full items-center justify-center rounded-lg bg-teal-90 px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-50 focus:outline-none focus:ring-4 focus:ring-primary-800">
                                            <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                            </svg>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="mx-auto mt-6 max-w-md flex-1 space-y-6 lg:mt-0 lg:w-96">
                    <div className="space-y-4 rounded-lg bg-navy-90 px-6 py-16 shadow-sm">
                        <h3 className="text-xl font-semibold text-white">Order Summary</h3>
                        
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <dl className="flex items-start justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-400">Order ID</dt>
                                    <dd className="text-base font-medium text-white">{orderId ? orderId : 'N/A'}</dd>
                                </dl>

                                <dl className="flex items-start justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-400">Order Date</dt>
                                    <dd className="text-base font-medium text-white">{today}</dd>
                                </dl>

                                <dl className="flex items-start justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-400">Customer Name</dt>
                                    <dd className="text-base font-medium text-white">{user?.fullName || user?.username || 'N/A'}</dd>
                                </dl>

                                <dl className="flex items-start justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-400 text-left">Customer Address</dt>
                                    <dd className="text-base font-medium text-white text-right">{user?.address || 'N/A'}</dd>
                                </dl>

                                <dl className="flex items-start justify-between gap-4 border-t border-navy-40 pt-2">
                                    <dt className="text-base font-normal text-gray-400">Total Amount</dt>
                                    <dd className="text-base font-bold text-teal-10">Rs. {computeTotalAmount().toFixed(2)}</dd>
                                </dl>
                            </div>
                        </div>

                        <button onClick={() => navigate('/ordersummary')} className="w-full mt-6 flex items-center justify-center rounded-lg bg-teal-50 px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-50 focus:outline-none focus:ring-4 focus:ring-primary-800">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
                </div>
            </div>
            </section>
            <Footer />
        </div>
    );
}