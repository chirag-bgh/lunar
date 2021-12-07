import shoe from  './LandingAssets/shoe.png'
import shoe2 from  './LandingAssets/shoe2.png'
import xbox from  './LandingAssets/xbox.png'
import { IoMdMoon } from 'react-icons/all'
import './card.css'


const Landingv2 = () => {
    return (
        <section className="w-screen h-screen bg-dark flex flex-col justify-center items-center font-display">
            <h1 className="text-bold text-3xl text-white">Accepting payments with crypto, now easier than ever</h1>
            <div className="bg-primary p-3 mt-5 rounded-lg">
                <h1 className="text-dark font-bold">Get Started</h1>
            </div>
            <Card imageSrc={shoe2} price={0.04212}/>
            <Card imageSrc={xbox} price={0.03734}/>
        </section>
    )
}

const Card = ({imageSrc, price}:{imageSrc:string, price:number}) => {
    return (
        <div className="card flex flex-col w-72 justify-center items-center p-6 rounded-lg">
            <h1 className="font-display font-bold text-2xl mr-auto">{price} <span className="text-primary">ETH</span></h1>
            <img src={imageSrc} alt="shoe" className="overlay w-52"/>
            <div className="flex flex-col justify-center items-center bg-primary rounded-lg text-dark w-full h-24">
                <h1 className="font-display text-dark text-xl font-bold mt-8">Pay in crypto</h1> 
                <div className="flex text-sm flex-shrink text-dark font-medium mb-1 mt-auto justify-center items-center">
                    <IoMdMoon/>
                <h1 className="text-dark">lunar</h1> 
                </div>
            </div>
        </div>
    )
}

export default Landingv2