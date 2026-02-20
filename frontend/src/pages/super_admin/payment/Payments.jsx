import RevenueSummary from "./RevenueSummary";
import PaymentControls from "./PaymentControls";
import MerchantPayoutTable from "./MerchantPayoutTable";

const Payments = () => {
  return (
    <div className="p-6 space-y-6">
      <RevenueSummary />
      <PaymentControls />
      <MerchantPayoutTable />
    </div>
  );
};

export default Payments;
