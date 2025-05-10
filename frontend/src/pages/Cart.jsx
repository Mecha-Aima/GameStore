/* Cart Items List: 
For each item: thumbnail, title (link back to details), unit price, quantity input (±), subtotal, "Remove" button
Order Summary Sidebar: Total items, subtotal, estimated tax/shipping (if any), grand total
Actions: "Continue Shopping" link, "Proceed to Order Summary" button */
import Header from '../components/Header';
import Footer from '../components/Footer';
import add from '../assets/icons/add.svg';
import minus from '../assets/icons/minus.svg';

export default function Cart() {
    const orderItems = [
        {
            id: 1,
            title: "PC system All in One APPLE iMac (2023)",
            price: 1499,
            quantity: 2,
            imageUrl: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
        },
        {
            id: 2,
            title: "PlayStation 5 Digital Edition",
            price: 399.99,
            quantity: 1,
            imageUrl: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg"
        },
        {
            id: 3,
            title: "Xbox Series X",
            price: 499.99,
            quantity: 1,
            imageUrl: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-dark.svg"
        },
        {
            id: 4,
            title: "Nintendo Switch OLED",
            price: 349.99,
            quantity: 1,
            imageUrl: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/switch-dark.svg"
        },
        {
            id: 5,
            title: "Gaming PC RTX 4080",
            price: 2499.99,
            quantity: 1,
            imageUrl: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/pc-dark.svg"
        },
        {
            id: 6,
            title: "Gaming Laptop RTX 4070",
            price: 1799.99,
            quantity: 1,
            imageUrl: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/laptop-dark.svg"
        }
    ];

    // Split items into cart items and recommended items
    const cartItems = orderItems.slice(0, -3);
    const recommendedItems = orderItems.slice(-3);

    return (
        <div className="min-h-screen text-white flex bg-navy-100 flex-col gap-8 items-center justify-center h-900px">
            <Header />
            <section className="py-8 antialiased bg-slate-900 md:py-16 rounded-lg mb-24 mt-32">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="rounded-lg bg-navy-90 p-4 shadow-sm md:p-6">
                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                <a href="#" className="shrink-0 md:order-1">
                                    <img className="h-20 w-20" src={item.imageUrl} alt={item.title} />
                                </a>

                                <label htmlFor={`counter-input-${item.id}`} className="sr-only">Choose quantity:</label>
                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                    <div className="flex items-center">
                                        <button type="button" id={`decrement-button-${item.id}`} data-input-counter-decrement={`counter-input-${item.id}`} style={{ padding: '4px 12px' }} className="shrink-0 items-center justify-center rounded-md bg-teal-90 border border-navy-50 hover:bg-navy-50 focus:outline-none focus:ring-2 focus:ring-gray-700">
                                            <img src={minus} alt="minus" style={{ width: '16px', height: '16px', padding: '0px' }} />
                                        </button>
                                        <input type="text" id={`counter-input-${item.id}`} data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-white focus:outline-none focus:ring-0" placeholder="" value={item.quantity} required />
                                        <button type="button" id={`increment-button-${item.id}`} data-input-counter-increment={`counter-input-${item.id}`} style={{ padding: '4px 12px' }} className="shrink-0 items-center justify-center rounded-md bg-teal-90 border border-navy-50 hover:bg-navy-50 focus:outline-none focus:ring-2 focus:ring-gray-700">
                                            <img src={add} alt="add" style={{ width: '16px', height: '16px', padding: '0px' }} />
                                        </button>
                                    </div>
                                    <div className="text-end md:order-4 md:w-32">
                                        <p className="text-base font-bold text-teal-10">${item.price}</p>
                                    </div>
                                </div>

                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md justify-start text-left">
                                    <a href="#" className="font-medium text-navy-10 hover:underline text-left">{item.title}</a>

                                    <div className="flex items-center gap-4">
                                        <button type="button" className="inline-flex items-start justify-start text-sm text-red-400 hover:underline " style={{ padding: '12px 0px'}}>
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
                                <div key={item.id} className="space-y-6 overflow-hidden rounded-lg p-6 bg-navy-90 shadow-sm">
                                    <a href="#" className="overflow-hidden rounded">
                                        <img className="mx-auto h-44 w-44" src={item.imageUrl} alt={item.title} />
                                    </a>
                                    <div>
                                        <a href="#" className="text-lg font-semibold leading-tight text-white hover:underline">{item.title}</a>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-teal-10">
                                            ${item.price}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2.5">
                                        <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-teal-90 px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-50 focus:outline-none focus:ring-4 focus:ring-primary-800">
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
                                    <dd className="text-base font-medium text-white">#ORD-2024-001</dd>
                                </dl>

                                <dl className="flex items-start justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-400">Order Date</dt>
                                    <dd className="text-base font-medium text-white">March 15, 2024</dd>
                                </dl>

                                <dl className="flex items-start justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-400">Customer Name</dt>
                                    <dd className="text-base font-medium text-white">John Doe</dd>
                                </dl>

                                <dl className="flex items-start justify-between gap-4">
                                    <dt className="text-base font-normal text-gray-400 text-left">Customer Address</dt>
                                    <dd className="text-base font-medium text-white text-right">123 Gaming St, Game City</dd>
                                </dl>

                                <dl className="flex items-start justify-between gap-4 border-t border-navy-40 pt-2">
                                    <dt className="text-base font-normal text-gray-400">Total Amount</dt>
                                    <dd className="text-base font-bold text-teal-10">$1,499.00</dd>
                                </dl>
                            </div>
                        </div>

                        <button className="w-full mt-6 flex items-center justify-center rounded-lg bg-teal-90 px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-50 focus:outline-none focus:ring-4 focus:ring-primary-800">
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