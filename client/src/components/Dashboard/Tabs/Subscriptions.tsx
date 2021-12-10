import { useState } from "react";
import { FetchSubscription } from "../../../backend/Subscription";

const Subscriptions = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-between items-start">
        <h2 className="text-3xl underline font-medium">Subscription Plans</h2>
      </div>
      <div className="flex h-8 justify-between items-between gap-1 mt-12">
        {/* <div className='px-5 h-full rounded-sm bg-primary flex justify-center items-center'>
          <CreateSubscription name='Shoes' price={0.4} recurrence='Monthly' />
        </div> */}
        <div></div>
        <div className="flex justify-center items-center">
          <input
            className="h-full w-72 bg-dark rounded-sm text-white pl-2 outline-none text-sm"
            type="text"
            placeholder="Search by product, ID, or subscribers"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="w-16 h-full rounded-sm bg-primary flex justify-center items-center">
            Search
          </div>
        </div>
      </div>

      <FetchSubscription query={query} />
    </div>
  );
};

export default Subscriptions;
