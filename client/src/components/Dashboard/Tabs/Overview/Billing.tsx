export interface BillingProps {
  revenue: number;
  transactions: number;
}

const Billing = ({ revenue, transactions }: BillingProps) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center justify-center w-1/2 h-16 rounded-lg bg-primary shadow-primary">
        <p className="text-black text-sm font-medium leading-5">REVENUE</p>
        <h2 className="text-black text-2xl font-semibold leading-none">
          {revenue} MATIC
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-16 rounded-lg bg-dark">
        <p className="text-sm font-light leading-5">TRANSACTIONS</p>
        <h2 className="text-2xl font-semibold leading-none">{transactions}</h2>
      </div>
    </div>
  );
};

export default Billing;
