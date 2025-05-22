/* 
Product Details Page
Game Showcase: Large cover image carousel or static image
Details Panel: Title, developer/publisher info, genre tags, platform icons
Description: Expandable text block with scroll or "Read more"
Purchase Box: Price, quantity selector, "Add to Cart" button, stock availability
*/

import { useLocation } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import pc from "../assets/icons/pc.svg";
import xbox from "../assets/icons/xbox.svg";
import ps from "../assets/icons/playstation.svg";
import mobile from "../assets/icons/mobile.svg";
import InfoBadge from "../components/Badges";
import { useCart } from '../CartContext';
import { useUser } from '../UserContext';
import { useState } from 'react';

const ProductDetails = () => {
    const location = useLocation();
    const game = location.state?.game;
    const { cart, addToCart } = useCart();
    const { user, orderId, setOrderId } = useUser();
    const [loading, setLoading] = useState(false);

    if (!game) {
        return (
            <div className="min-h-screen bg-neutral-900">
                <Header />
                <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 items-center my-24">
                    <h1 className="text-4xl font-bold text-white mb-4 text-center">Game not found</h1>
                </div>
                <Footer />
            </div>
        );
    }

    const isInCart = cart.some(item => item.game_id === game.game_id);

    const handleAddToCart = async () => {
        console.log("Handle add to cart")
        if (!user) return;
        setLoading(true);
        try {
            console.log("Order ID: ", orderId)
            if (cart.length === 0 && !orderId) {
                // Create order first
                const res = await fetch('/api/orders/add', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ customer_id: user.user_id }),
                });
                const data = await res.json();
                console.log("Data: ", data)
                if (res.ok && data.order?.order_id) {
                    setOrderId(data.order.order_id);
                    console.log("Order added successfully")
                }
            }
    
            addToCart(game);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900">
            <Header />
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 py-16 px-4 md:px-8 items-center my-24">
                <div className="flex-1 flex items-start justify-center h-full">
                    <img 
                        src={game.image_url} 
                        alt={game.title} 
                        className="rounded-2xl object-cover w-full max-w-xl shadow-lg h-full max-h-[800px]"
                    />
                </div>
                <div className="flex-1 flex flex-col items-start justify-between h-full max-h-[800px] gap-8 max-w-[">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-bold text-white mb-4 text-left">{game.title}</h1>
                        <p className="text-neutral-200 text-md text-left leading-relaxed">
                            {game.description}
                        </p> 
                    </div>
                    <div>
                        <h5 className="font-semibold text-white text-left mb-2 ">Platform:</h5>
                        {game.platform?.includes("PC") && <span className="inline-flex items-start mr-4 text-gray-400"><img src={pc} alt="PC" className="w-6 h-6 mr-1 inline" />PC</span>}
                        {game.platform?.includes("Xbox") && <span className="inline-flex items-start text-gray-400"><img src={xbox} alt="Xbox" className="w-6 h-6 mr-1 inline" />Xbox</span>}
                        {game.platform?.includes("Playstation") && <span className="inline-flex items-start text-gray-400"><img src={ps} alt="Playstation" className="w-6 h-6 mr-1 inline" />Playstation</span>}
                        {game.platform?.includes("Mobile") && <span className="inline-flex items-start text-gray-400"><img src={mobile} alt="Mobile" className="w-6 h-6 mr-1 inline" />Mobile</span>}
                    </div>
                    <div className="text-neutral-400 mb-2 text-left">
                        <div>Release Date: <span className="text-white ml-2">{new Date(game.release_date).toLocaleDateString()}</span></div>
                        <div>Genre: <span className="text-white ml-2 inline-block mt-2"><InfoBadge genre={game.genre} /></span></div>
                    </div>
                    <div className="bg-neutral-800 rounded-2xl p-8 flex flex-col gap-4 w-full mt-4 shadow-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-white">Price: Rs. {typeof game.price === 'number' ? game.price.toFixed(2) : game.price}</span>
                            <span className="text-green-400 font-medium">In Stock: {game.stock}</span>
                        </div>
                        <button 
                            className="bg-teal-400 hover:bg-teal-600 text-black text-lg font-semibold rounded-xl py-3 disabled:opacity-60" 
                            onClick={handleAddToCart}
                            disabled={loading || isInCart}
                        >
                            {isInCart ? 'Added to Cart' : (loading ? 'Adding...' : 'Add to Cart')}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetails;