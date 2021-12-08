import shoe2 from  './LandingAssets/shoe2.png'
import xbox from  './LandingAssets/xbox.png'
import blob1 from './LandingAssets/blob1.svg'
import blob2 from './LandingAssets/blob2.svg'
import background from './LandingAssets/background.svg'
import { IoMdMoon } from 'react-icons/all'
import './extended.css'


const Landingv2 = () => {
    return (
        <section className="w-screen h-screen bg-dark flex flex-col ">
            <div className="flex flex-col w-screen h-1/2 justify-center items-center font-display p-4">
                <h1 className="text-bold text-3xl mt-auto mb-12 text-white">Accepting payments with crypto, now easier than ever</h1>
                <div className="bg-primary p-3 rounded-lg mb-44 ">
                    <h1 className="text-dark font-bold">Get Started</h1>
                </div>
            </div>
            <img src={blob1} alt="glow" className="absolute bottom-0 right-1" />
            <img src={blob2} alt="glow" className="absolute top-0 -left-12" />
            <div className="absolute flex w-screen h-screen justify-center items-center">
                <img src={background} alt="background" className="screen mt-56 w-6/12"/>
            </div>
            {/* TODO: Fix card alignment issues on smaller width screens */}
            <Card imageSrc={shoe2} price={0.04212} classname="bottom-0 right-1 mr-44 mb-44"/>
            <Card imageSrc={xbox} price={0.03734} classname="bottom-0 left-1 ml-52 mb-64"/>
        </section>
    )
}

const Card = ({imageSrc, price, classname}:{imageSrc:string, price:number, classname?:string}) => {
    return (
        <div className={"absolute card flex flex-col w-3/12 justify-center items-center p-6 rounded-lg " + classname}>
            <h1 className="font-display font-bold text-2xl mr-auto">{price} <span className="text-primary">ETH</span></h1>
            <img src={imageSrc} alt="shoe" className="w-52"/>
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