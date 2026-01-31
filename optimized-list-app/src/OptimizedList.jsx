import { useState, useMemo, useEffect } from "react";

function OptimizedList(){
    const [search, setSearch] = useState("");
    console.log(search);

    const items = useMemo(() =>
        Array.from({ length: 1000 }, (_, i) =>({
            id: i,
            name: `Product ${i + 1}`
        })), 
    []);
    
    const filtered = useMemo(() =>{
        return items.filter(item => item.name.trim().toLowerCase().includes(search.toLowerCase()));
    }, [search, items]);

        const [visibleCount, setVisibleCount] = useState(20);

        useEffect(() => {
            setVisibleCount(Math.min(20, filtered.length));
        }, [filtered.length, search]);

        const displayedItems = filtered.slice(0, visibleCount);

        const showMore = () => {
            setVisibleCount(prev => Math.min(filtered.length, prev + 20));
        };

        const handleMoreKey = (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                showMore();
            }
        };

    return (
        <div className="optimized-list">
            <h2>Optimzed List</h2>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="product-info">
                    <p>Total Products: {filtered.length}</p>
                </div>
            <div className="big-array">
                <ul>
                        { displayedItems.map(item =>(
                            <li key={item.id}>{item.name}</li>
                        )) }
                        {filtered.length > displayedItems.length && (
                            <li
                                className="more-count"
                                onClick={showMore}
                                role="button"
                                tabIndex={0}
                                onKeyDown={handleMoreKey}
                            >
                                and {filtered.length - displayedItems.length} more
                            </li>
                        )}
                </ul>
            </div>
        </div>
    );
}
export default OptimizedList;