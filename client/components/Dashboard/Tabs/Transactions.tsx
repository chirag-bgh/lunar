import { useState } from "react";
import { FetchTransaction } from "../../../backend/transaction";

const Transactions = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-between items-start">
        <h2 className="text-3xl underline font-medium">Transactions</h2>
      </div>
      <div className="flex h-8 justify-end items-between gap-1 mt-12">
        <input
          className="h-full w-72 bg-dark rounded-sm text-white pl-2 outline-none text-sm"
          type="text"
          placeholder="Search by product, ID, or subscribers"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="w-16 h-full rounded-sm bg-primary flex font-semibold cursor-pointer justify-center items-center">
          Search
        </div>
      </div>

      <FetchTransaction query={query} />
    </div>
  );
};

export default Transactions;
