import { Card, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const { Title, Text } = Typography;

export default function SelectStore() {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/store/get-stores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStores(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = (store) => {
    localStorage.setItem("activeStoreId", store.id);
    navigate(`/merchant/${store.slug}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fff2ef] via-[#ffdbb6] via-[#f7a5a5] to-[#1a2a4f] flex items-center justify-center">

     
      <div className="w-[420px] bg-white p-8 rounded-3xl shadow-2xl">

        <Title level={3}>Select Store</Title>
        <Text className="text-gray-500 block mb-6">
          Choose your store to continue
        </Text>

        {/*  Store list */}
        <div className="flex flex-col gap-3">
          {stores.map((store) => (
            <div
              key={store.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <Text strong>{store.name}</Text>
                <br />
                <Text
                  className={
                    store.status === "active"
                      ? "text-green-500"
                      : "text-orange-500"
                  }
                >
                  {store.status === "active"
                    ? "Active"
                    : "Pending"}
                  
                  
                </Text>
                <br />
                    <Text type="secondary" className="text-medium">
                      {store.status === "active"
                        ? "You can access your store"
                        : "Wait for admin approval"}
                    </Text>
              </div>
              

              <Button
                type="primary"
                size="small"
                disabled={store.status !== "active"}
                onClick={() => handleSelect(store)}
                className={`!p-5 text-medium rounded-lg shadow-md ${
                  store.status === "active"
                    ? "!bg-[#1a2a4f] hover:!bg-[#0f1a33] text-white"
                    : "!bg-gray-300 !text-gray-600 cursor-not-allowed"
                }`}
              >
                Enter to your store
              </Button>
            </div>
          ))}
        </div>

        {/* Create store */}
        <div className="mt-6 text-center">
          <Button
            type="dashed"
            block
            onClick={() => navigate("/create-store")}
          >
            + Create New Store
          </Button>
        </div>

        <div className="text-center mt-4">
          <Text>
            Want to do it later?{" "}
            <span
              // onClick={() => navigate("/dashboard")} 
              className="font-semibold cursor-pointer text-blue-500"
            >
              Skip for now
            </span>
          </Text>
        </div>

      </div>
    </div>
  );
}