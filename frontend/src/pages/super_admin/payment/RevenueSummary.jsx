import { Card, Row, Col } from "antd";

const RevenueSummary = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card className="rounded-xl shadow">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-semibold">₹1,20,000</h2>
        </Card>
      </Col>

      <Col span={8}>
        <Card className="rounded-xl shadow">
          <p className="text-gray-500">Commission Earned</p>
          <h2 className="text-2xl font-semibold">₹12,000</h2>
        </Card>
      </Col>

      <Col span={8}>
        <Card className="rounded-xl shadow">
          <p className="text-gray-500">Merchant Payouts</p>
          <h2 className="text-2xl font-semibold">₹1,08,000</h2>
        </Card>
      </Col>
    </Row>
  );
};

export default RevenueSummary;
