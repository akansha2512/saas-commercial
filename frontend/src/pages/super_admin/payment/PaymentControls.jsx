import { Card, Select, InputNumber, Button } from "antd";

const PaymentControls = () => {
  return (
    <Card className="mt-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Payment Controls</h3>

      <div className="flex gap-6 items-center">
        <div>
          <p className="text-gray-600 mb-1">Commission (%)</p>
          <InputNumber min={1} max={50} defaultValue={10} />
        </div>

        <div>
          <p className="text-gray-600 mb-1">Payout Cycle</p>
          <Select
            defaultValue="monthly"
            options={[
              { value: "weekly", label: "Weekly" },
              { value: "biweekly", label: "Bi-Weekly" },
              { value: "monthly", label: "Monthly" },
            ]}
            style={{ width: 150 }}
          />
        </div>

        <Button type="primary" className="mt-6">
          Save Settings
        </Button>
      </div>
    </Card>
  );
};

export default PaymentControls;
