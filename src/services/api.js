const apiUrl = 'http://ecommerce.us-west-2.elasticbeanstalk.com';

const getToken = () => {
    try {
        const storedAuthData = JSON.parse(localStorage.getItem('authData'));
        return storedAuthData['token'];
    }catch(e) {
        return ''
    }
} 

class _Get {

    call = async ({
        url,
        data = {}
    }) => {
        const params = data;
        const query = new URLSearchParams(params).toString();
        url = `${apiUrl}${url}?${query}`;
        let token = getToken();
        let response = await fetch(url, {
            headers: {
                'Authorization': token
            }
        });
        response = response.json();
        return Promise.resolve(response);
    }

    products = () => {
        return this.call({
            url: '/admin/product'
        });
    }

    orders = () => {
        return this.call({
            url: '/admin/order'
        });
    }

    productInfo = ({
        product_id,
    }) => {
        return this.call({
            url: `/admin/product/${product_id}`,
        })
    }

    orderInfo = ({
        sale_id,
    }) => {
        return this.call({
            url: `/admin/order/${sale_id}`,
        })
    }

}

class _Post {

    call = async ({
        url,
        data = {}
    }) => {
        url = `${apiUrl}${url}`;
        let token = getToken();
        let response = await fetch(url,
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
                },
                body: JSON.stringify(data)
            } 
        );
        response = response.json();
        return Promise.resolve(response);
    }

    rowCall = async ({
        url,
        data
    }) => {
        url = `${apiUrl}${url}`;
        let token = getToken();
        let response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'image/png',
                    'Authorization': token
                },
                body: data
            } 
        );
        response = response.json();
        return Promise.resolve(response);
    }

    login = ({
        email,
        password,
    }) => {
        return this.call({
            url: '/outer/admin/login',
            data: {
                email,
                password,
            }
        });
    }

    createProduct = ({
        name,
        description,
        stock,
        price
    }) => {
        return this.call({
            url: '/admin/product',
            data: {
                name,
                description,
                stock,
                price
            }
        })
    }

    updateProductImage = ({
        product_id,
        data
    }) => {
        return this.rowCall({
            url: `/admin/product/${product_id}/image`,
            data
        })
    }

}

class _Put {

    call = async ({
        url,
        data = {}
    }) => {
        url = `${apiUrl}${url}`;
        let token = getToken();
        let response = await fetch(url,
            {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
                },
                body: JSON.stringify(data)
            } 
        );
        response = response.json();
        return Promise.resolve(response);
    }

    updateProduct = ({
        name,
        description,
        stock,
        price,
        product_id
    }) => {
        return this.call({
            url: `/admin/product/${product_id}`,
            data: {
                name,
                description,
                stock,
                price
            }
        })
    }

}

const GET = new _Get();
const POST = new _Post();
const PUT = new _Put();
class _API {

    get = GET;

    post = POST;

    put = PUT;

}

const API = new _API();

export {
    API
}