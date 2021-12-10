const Settings = () => {
    return (
        <div className="w-full">
        <h1 className="text-3xl underline font-medium">Settings</h1>
        <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="urls h-24 mt-10 ">
                <h1 className="font-display text-white font-medium">Callback URL: </h1>
                <input className="h-10 w-72 bg-dark rounded-sm text-white pl-2 outline-none text-sm" type="text" placeholder="Enter callback URL here" value="">
                </input>
            </div>
        
            <div className="bg-primary p-5 mt-2 flex justify-center items-center  h-10 gap-1 rounded-lg cursor-pointer mt-10">
                <h1 className="text-dark font-display font-semibold">Set Configuration</h1>
            </div>
        </div>
        </div>
        
    );
}

export default Settings