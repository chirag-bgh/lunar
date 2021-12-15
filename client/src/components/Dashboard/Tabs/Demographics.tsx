import {
  GetCities,
  GetCountries,
  GetUserLeaderboard,
  GetUsers,
} from "../../../backend/Demographics";

import DonutChart from "react-donut-chart";
import { useMoralis, useMoralisQuery } from "react-moralis";
import DemographicsClass from "../../../classes/Demographics";

const Demographics = () => {
  const { user } = useMoralis();

  const { data, error, isLoading } = useMoralisQuery("Demographics", (query) =>
    query.equalTo("user", user.id)
  );

  if (error) {
    return <span>🤯</span>;
  }

  if (isLoading) {
    return <span>🙄</span>;
  }

  let json = JSON.stringify(data, null, 2);

  let demographics: DemographicsClass[] = JSON.parse(json);

  let subscriptionArr: number[] = demographics.map(
    (demographic) => demographic.subscriptions
  );
  let purchasesArr: number[] = demographics.map(
    (demographic) => demographic.purchases
  );

  function add(accumulator, a) {
    return accumulator + a;
  }

  const subscriptions = subscriptionArr.reduce(add, 0);
  const purchases = purchasesArr.reduce(add, 0);

  const chartData = [
    { label: "Subscriptions", value: subscriptions },
    { label: "Product Purchases", value: purchases },
  ];

  const colors = ["#82ca9d", "#a7FdFF"];

  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-between items-start mb-20">
        <h2 className="text-3xl underline font-medium">Demographics</h2>
      </div>
      <div className="flex flex-col justify-start items-start gap-4 mr-8 w-5/6">
        <div className="flex justify-start items-stretch gap-4 w-full">
          <div className="bg-dark w-1/3 py-4 min-h-fit rounded-md border-2 border-gray-600 flex flex-col justify-evenly items-center">
            <p className="my-2 text-xl">Total Users</p>
            <GetUsers />
          </div>
          <div className="bg-dark w-1/3 py-4 rounded-md border-2 border-gray-600 flex flex-col justify-between items-center">
            <p className="my-2 text-xl">Users by Country</p>
            <GetCountries />
            <div></div>
          </div>
          <div className="bg-dark w-1/3 py-4 rounded-md border-2 border-gray-600 flex flex-col justify-between items-center">
            <p className="my-2 text-xl">Users by City</p>
            <GetCities />
            <div></div>
          </div>
        </div>
        <div className="flex justify-start items-start gap-4 w-full">
          <div className="bg-dark w-full py-4 max-h-80 rounded-md border-2 border-gray-600 flex flex-col justify-between items-center">
            <p className="my-2 text-xl">Top Customers</p>
            <GetUserLeaderboard />
            <div></div>
          </div>
        </div>
        <div className="rounded-md border-2 border-gray-600 bg-dark w-full py-2 max-h-80  flex flex-col justify-between items-center">
          <DonutChart
            legend={false}
            colors={colors}
            width="500"
            data={chartData}
            onMouseEnter={(item) => {
              //console.log(`mousing over: ${item.label}`)
              return item;
            }}
            onClick={(item, toggled) => {
              if (toggled) {
                console.log(`selecting: ${item.label}`);
              } else {
                console.log(`unselecting: ${item.label}`);
              }
              return item;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Demographics;