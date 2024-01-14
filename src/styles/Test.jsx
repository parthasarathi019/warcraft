import React, { useState, useEffect } from 'react';

const YourComponent = ({ user }) => {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`${import.meta.env.VITE_DataHost}/ProductAddToCart?userEmail=${user?.email}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchData();
    }, [user]); // Refetch whenever the user changes

    // Periodically refetch data every 5 seconds (adjust the interval as needed)
    useEffect(() => {
        const intervalId = setInterval(fetchData, 5000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [user]); // Refetch whenever the user changes

    return (
        // Your component JSX here
        <div>
            {/* Render your data */}
        </div>
    );
};

export default YourComponent;
