import React, { useState, useEffect } from 'react';
import './Sorting.css';

const BubbleSortVisualizer = () => {
    const [array, setArray] = useState([]);
    const [sorting, setSorting] = useState(false);
    const [sorted, setSorted] = useState(false);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < 20; i++) {
            newArray.push(Math.floor(Math.random() * 100) + 1);
        }
        setArray(newArray);
        setSorted(false);
        setSorting(false);
    };

    const bubbleSort = async () => {
        setSorting(true);
        const arr = array.slice();
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    setArray([...arr]);
                    await new Promise(resolve => setTimeout(resolve, 100)); 
                }
            }
        }
        setSorting(false);
        setSorted(true);
    };

    return (
        <div className="container">
            <h1>Bubble Sort Visualizer</h1>
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            height: `${value * 3}px`,
                            backgroundColor: sorted ? 'green' : 'turquoise',
                        }}
                    ></div>
                ))}
            </div>
            <div className="controls">
                <button onClick={resetArray} disabled={sorting}>
                    Generate New Array
                </button>
                <button onClick={bubbleSort} disabled={sorting || sorted}>
                    Start Sorting
                </button>
            </div>
        </div>
    );
};

export default BubbleSortVisualizer;