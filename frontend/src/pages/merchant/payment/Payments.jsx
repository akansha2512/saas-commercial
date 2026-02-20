import PaymentDashboard from "./PaymentsDashboard"
import PaymentHistory from "./PayoutHistory"
const Payments = () => {
  return (
    <div className="p-6 space-y-6">
        <PaymentDashboard/>
        <PaymentHistory/>
    </div>
  );
};

export default Payments;