const URL_SERVER = `${process.env.REACT_APP_API_URL}/purchase/`;

export const createPurchase = async (purchase) => {
    try {
        const response = await fetch(URL_SERVER, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(purchase)
        });
        return await response.json();
    }catch(error){
        console.log(error);
    }
}

