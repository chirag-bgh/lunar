import {
  CreateSubscription,
  FetchSubscription,
} from "../../../backend/Subscription";

const Subscriptions = () => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-between items-start">
        <h2 className="text-3xl underline font-medium">Subscription Plans</h2>
      </div>
      <div className="flex h-8 justify-between items-between gap-1 mt-12">
        <div className="flex justify-center items-center">
          <input
            className="h-full w-72 bg-dark rounded-sm text-white pl-2 outline-none text-sm"
            type="text"
            placeholder="Search by product, ID, or subscribers"
          />
          <div className="w-16 h-full rounded-sm bg-primary flex justify-center items-center">
            Search
          </div>
        </div>
      </div>

      <FetchSubscription />
    </div>
  );
};

export default Subscriptions;
