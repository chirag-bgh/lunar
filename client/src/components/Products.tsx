import { useNewMoralisObject,useMoralis,useMoralisQuery } from "react-moralis";
import Moralis from "moralis";


const CreateProduct = ({name,price}:{price:number, name:string}) => {
    const { isSaving, error, save } = useNewMoralisObject('Products');
    const { user } = useMoralis();
    console.log("Hello")
    return (<div>
        {error}
        <button onClick={() => save({name, price,user})} disabled={isSaving}>Create Product</button>
      </div>)
    }
const FetchProduct = () => {
        const { user } = useMoralis();
    
        const { data, error, isLoading } = useMoralisQuery("Products", query =>
        query
          .equalTo("user", user)
          );
    
    if (error) {
      console.log(error)
      return <span>🤯</span>;
    }
    
    if (isLoading) {
      return <span>🙄</span>;
    }
    
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
       
        }


export { CreateProduct,FetchProduct };