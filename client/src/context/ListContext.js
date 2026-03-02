import React, { createContext, useState, useEffect, useContext } from 'react';
import './Toast.css';

const ListContext = createContext();

export const useList = () => {
    return useContext(ListContext);
};

export const ListProvider = ({ children }) => {
    const [myList, setMyList] = useState([]);
    const [toastMessage, setToastMessage] = useState(null);

    useEffect(() => {
        const storedList = localStorage.getItem('netflix_mylist');
        if (storedList) {
            setMyList(JSON.parse(storedList));
        }
    }, []);

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const toggleFromList = (movie) => {
        let updatedList = [];
        const isCurrentlyInList = myList.find((item) => item.id === movie.id);

        if (isCurrentlyInList) {
            updatedList = myList.filter((item) => item.id !== movie.id);
            showToast("Removed from My List");
        } else {
            updatedList = [...myList, movie];
            showToast("Added to My List ✓");
        }

        setMyList(updatedList);
        localStorage.setItem('netflix_mylist', JSON.stringify(updatedList));
    };

    const isInList = (movieId) => {
        return myList.some((item) => item.id === movieId);
    };

    return (
        <ListContext.Provider value={{ myList, toggleFromList, isInList }}>
            {children}
            {toastMessage && (
                <div className="netflix-toast animate-slide-up">
                    {toastMessage}
                </div>
            )}
        </ListContext.Provider>
    );
};
