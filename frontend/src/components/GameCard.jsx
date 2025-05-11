import './GameCard.css'
import InfoBadge from './Badges'

const GameCard = ({title, price, genre, onClick}) => {
    const handleClick = () => {
        console.log("GameCard clicked:", { title, price, genre });
        onClick?.();
    };

    return (
        <div className='w- game-card rounded-md cursor-pointer' onClick={handleClick}>
            <div className="group relative block overflow-hidden rounded-md">
                <img
                    src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
                    alt=""
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 rounded-t-xl"
                />

                <div className="relative card-content p-6">
                    <div className="flex flex-wrap gap-2">
                        <InfoBadge genre={genre} />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-white text-left">{title}</h3>

                    <p className="mt-1.5 text-sm text-stone-400 text-left">Rs. {typeof price === 'number' ? price.toFixed(2) : price}</p>

                    <div className="mt-4">
                        <button
                            className="card-btn block w-full rounded-xs p-4 text-sm font-medium transition hover:scale-105"
                            onClick={handleClick}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameCard;
