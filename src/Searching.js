import React, { useState } from 'react';
import './Searching.css';

const Searching = () => {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState('');
    const [searching, setSearching] = useState(false);
    const [found, setFound] = useState(null);
    const [low, setLow] = useState(null);
    const [high, setHigh] = useState(null);
    const [mid, setMid] = useState(null);

    const generateArray = () => {
        const newArray = [];
        for (let i = 0; i < 20; i++) {
            newArray.push(Math.floor(Math.random() * 100) + 1);
        }
        newArray.sort((a, b) => a - b); 
        setArray(newArray);
        setFound(null);
        setSearching(false);
        setLow(null);
        setHigh(null);
        setMid(null);
    };

    const handleTargetChange = (e) => {
        setTarget(e.target.value);
    };

    const binarySearch = async () => {
        setSearching(true);
        setFound(false);

        let l = 0;
        let h = array.length - 1;

        while (l <= h) {
            const m = Math.floor((l + h) / 2);
            setLow(l);
            setHigh(h);
            setMid(m);

            if (array[m] === parseInt(target, 10)) {
                setFound(true);
                break;
            } else if (array[m] < target) {
                l = m + 1;
            } else {
                h = m - 1;
            }
            await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization
        }

        if (!found) setFound(false);
        setSearching(false);
    };

    return (
        <div className="container">
            <h1>Binary Search Visualizer</h1>
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        key={idx}
                        className="array-bar"
                        style={{
                            height: `${value * 3}px`,
                            backgroundColor:
                                idx === mid
                                    ? 'yellow'
                                    : idx >= low && idx <= high
                                    ? 'lightgreen'
                                    : 'turquoise',
                        }}
                    >
                        {value}
                    </div>
                ))}
            </div>
            <div className="controls">
                <button onClick={generateArray} disabled={searching}>
                    Generate New Array
                </button>
                <input
                    type="number"
                    placeholder="Target Value"
                    value={target}
                    onChange={handleTargetChange}
                    disabled={searching}
                />
                <button onClick={binarySearch} disabled={searching || target === ''}>
                    Start Search
                </button>
            </div>
            {found !== null && (
                <div className="result">
                    {found ? (
                        <p>Target {target} found at index {mid}!</p>
                    ) : (
                        <p>Target {target} not found in the array.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Searching;