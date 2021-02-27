import { useState, useEffect } from 'react'

const TotalAmount = () => {

    const [retrievePrice, setRetrievePrice] = useState('');
    const [sumTotal] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            const productsResponse = await JSON.parse(localStorage.getItem('products'));
            if (productsResponse) {
                setRetrievePrice(productsResponse);
            }
        }

        let interval = setInterval(() => fetchData(), 1000);
        return () => {
            clearInterval(interval);
        }
    }, [])


    if (!(retrievePrice && Object.keys(retrievePrice).length)) {
        return ''
    }

    let total = retrievePrice.map((total => ((total.total))))
    let reducer = total.reduce(function (prev, curr) {
        return (Number(prev) || 0) + (Number(curr) || 0);
    });

    return { sumTotal, reducer }
}

export default TotalAmount
