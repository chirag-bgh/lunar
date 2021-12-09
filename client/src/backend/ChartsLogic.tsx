// Moralis
import {
    useNewMoralisObject,
    useMoralis,
    useMoralisQuery,
} from "react-moralis";

import { useState } from "react";

const GetRevenue = () => {
    
    // const [productPrices, setProductPrices] = useState('')
    
    var allProductPrices = []
    const { user } = useMoralis();
    let  { data } = useMoralisQuery("Products", (query) =>
    query.equalTo("user", user));
    const data2 = JSON.parse(JSON.stringify(data, null, 2))
    const listItems = data2.map((d, index) =>
        allProductPrices.push({
            name: index, 
            uv: d.price,
        })
    );
    console.log(allProductPrices);
    

}


export default GetRevenue;