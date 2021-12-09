// Moralis
import {
    useNewMoralisObject,
    useMoralis,
    useMoralisQuery,
} from "react-moralis";

const GetRevenue = () => {
    const { user } = useMoralis();
    const { data } = useMoralisQuery("  ", (query) =>
        query.equalTo("user", user)
    );
    let json = JSON.stringify(data, null, 2);
    return (
        // <p>{JSON.parse(json)}</p>
        <p>asdlkfjhasldkfjh</p>
    );

}


export {GetRevenue};