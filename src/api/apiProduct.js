const URL_SERVER = `${process.env.REACT_APP_API_URL}/product/`;


export const getAllProducts = async () => {
    try{
        const response = await fetch(URL_SERVER);
        return await response.json();
    }catch(error){
        console.log(error);
    }
}

export const getProductById = async (id) => {
    try {
        const response = await fetch(URL_SERVER + id);
        return await response.json();
    }catch(error){
        console.log(error);
    }
}

export const createProduct = async (product) => {
    try {
        const response = await fetch(URL_SERVER, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product)
        });
        return await response.json();
    }catch(error){
        console.log(error);
    }
}

export const updateProduct = async (id, product) => {
    try {
        const response = await fetch(URL_SERVER + id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product)
        });
        return await response.json();
    }catch(error){
        console.log(error);
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(URL_SERVER + id, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"}
        });
        return await response.json();
    }catch(error){
        console.log(error);
    }
}