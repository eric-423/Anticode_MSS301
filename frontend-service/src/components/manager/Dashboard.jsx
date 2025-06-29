import { User, Film, ShoppingBag, BarChart2 } from "lucide-react";
import sampleData from "./sampleData";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import {
  getCustomerWeekly,
  getDailyRevenue,
  getMonthlyProdutRevenue,
  getMontlyTicketRevenue,
  getMovieTop,
  getProductSold,
  getTicketsSold,
} from "../../utils/api-dashboard";

const formatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const Dashboard = () => {
  const [todayRevenue, setTodayRevenue] = useState();
  const [revenueChangePercentage, setRevenueChangePercentage] = useState(null);

  const fetchRevenues = async () => {
    try {
      const today = new Date();
      const yesterday = new Date().setDate(today.getDate() - 1);
      const [todayRes, yesterdayRes] = await Promise.all([
        getDailyRevenue(formatter.format(today)),
        getDailyRevenue(formatter.format(yesterday)),
      ]);

      const todayRev = todayRes.data.revenue;
      const yesterdayRev = yesterdayRes.data.revenue;
      setTodayRevenue(todayRev);
      if (yesterdayRev !== null && yesterdayRev !== 0) {
        const change = ((todayRev - yesterdayRev) / yesterdayRev) * 100;
        setRevenueChangePercentage(change);
      } else if (todayRev !== null && todayRev > 0) {
        setRevenueChangePercentage(100);
      } else {
        setRevenueChangePercentage(0);
      }
    } catch (err) {
      setTodayRevenue(0);
      setRevenueChangePercentage(0);
    } finally {
    }
  };

  const [ticketSold, setTicketSold] = useState();
  const [ticketChangePercentage, setTicketChangePercentage] = useState();

  const fetchTicketSold = async () => {
    try {
      const today = new Date();
      const yesterday = new Date().setDate(today.getDate() - 1);
      const [todayRes, yesterdayRes] = await Promise.all([
        getTicketsSold(formatter.format(today)),
        getTicketsSold(formatter.format(yesterday)),
      ]);

      const todayTicketSold = todayRes.data.number;
      const yesterdayTicketSold = yesterdayRes.data.number;
      setTicketSold(todayTicketSold);
      if (yesterdayTicketSold !== null && yesterdayTicketSold !== 0) {
        const changePercentage =
          ((todayTicketSold - yesterdayTicketSold) / yesterdayTicketSold) * 100;
        setTicketChangePercentage(changePercentage.toFixed(2));
      } else if (todayTicketSold > 0) {
        setTicketChangePercentage(100);
      } else {
        setTicketChangePercentage(0);
      }
    } catch (error) {}
  };

  const [productSold, setProductSold] = useState();
  const [productChangePercentage, setProductChangePercentage] = useState();

  const fetchProductSold = async () => {
    try {
      const today = new Date();
      const yesterday = new Date().setDate(today.getDate() - 1);
      const [todayRes, yesterdayRes] = await Promise.all([
        getProductSold(formatter.format(today)),
        getProductSold(formatter.format(yesterday)),
      ]);
      const todayProductSold = todayRes.data.number;
      const yesterdayProductSold = yesterdayRes.data.number;
      setProductSold(todayProductSold);
      if (yesterdayProductSold !== null && yesterdayProductSold !== 0) {
        const changePercentage =
          ((todayProductSold - yesterdayProductSold) / yesterdayProductSold) *
          100;
        setProductChangePercentage(changePercentage.toFixed(2));
      } else if (todayProductSold > 0) {
        setProductChangePercentage(100);
      } else {
        setProductChangePercentage(0);
      }
    } catch (error) {}
  };

  const [revenueData, setRevenueData] = useState();
  const fecthProductRevenue = async () => {
    try {
      const today = new Date();
      const [productRes, ticketRes] = await Promise.all([
        getMonthlyProdutRevenue(formatter.format(today)),
        getMontlyTicketRevenue(formatter.format(today)),
      ]);
      const productMontlyRevenue = productRes.data;
      const ticketMontlyRevenue = ticketRes.data;
      const revenueData = [];
      Array.from({ length: 12 }).map((item, index) => {
        revenueData.push({
          name: "T" + (index + 1),
          Vé: ticketMontlyRevenue[index]?.revenue,
          "Sản phẩm": productMontlyRevenue[index]?.revenue,
        });
      });
      setRevenueData(revenueData);
    } catch (error) {}
  };

  const [topMovie, setTopMovie] = useState();
  const fecthTopMovie = async () => {
    try {
      const topMovieRes = await getMovieTop();
      const topMovies = [];
      topMovieRes.data?.map((item) => {
        topMovies.push({
          name: item?.movieName,
          value: item?.revenue,
        });
      });
      setTopMovie(topMovies);
    } catch (error) {}
  };

  const [customerRegistration, setCustomerRegistration] = useState();
  const [customerChangePercentage, setCustomerChangePercentage] = useState();
  const fecthCustomerRegistration = async () => {
    const currentWeek = new Date();
    const previousWeek = new Date().setDate(currentWeek.getDate() - 7);
    const [currentWeekRes, previousWeekRes] = await Promise.all([
      getCustomerWeekly(formatter.format(currentWeek)),
      getCustomerWeekly(formatter.format(previousWeek)),
    ]);
    const currentWeekData = currentWeekRes.data.number;
    const previousWeekData = previousWeekRes.data.number;
    setCustomerRegistration(currentWeekData);
    if (previousWeekData !== null && previousWeekData !== 0) {
      const changePercentage =
        ((currentWeekData - previousWeekData) / previousWeekData) * 100;
      setCustomerChangePercentage(changePercentage.toFixed(2));
    } else if (currentWeekData > 0) {
      setCustomerChangePercentage(100);
    } else {
      setCustomerChangePercentage(0);
    }
  };

  useEffect(() => {
    if (todayRevenue === null || todayRevenue === undefined) fetchRevenues();
    if (ticketSold === null || ticketSold === undefined) fetchTicketSold();
    if (productSold === null || productSold === undefined) fetchProductSold();
    if (revenueData === null || revenueData === undefined)
      fecthProductRevenue();
    if (topMovie === null || topMovie === undefined) fecthTopMovie();
    if (customerRegistration === null || customerRegistration === undefined)
      fecthCustomerRegistration();
  }, []);

  return (
    <div className="p-8 space-y-8">
      {/* Các chỉ số chính */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Doanh thu hôm nay</p>
            <p className="text-3xl font-bold text-gray-800">
              {todayRevenue && todayRevenue}đ
            </p>
            <p className="text-green-500 text-sm mt-1">
              +{revenueChangePercentage}% so với hôm qua
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <BarChart2 className="h-6 w-6 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Vé đã bán</p>
            <p className="text-3xl font-bold text-gray-800">
              {ticketSold && ticketSold}
            </p>
            <p className="text-green-500 text-sm mt-1">
              {ticketChangePercentage}% so với hôm qua
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <Film className="h-6 w-6 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Sản phẩm bán ra</p>
            <p className="text-3xl font-bold text-gray-800">{productSold}</p>
            <p className="text-green-500 text-sm mt-1">
              {productChangePercentage}% so với hôm qua
            </p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <ShoppingBag className="h-6 w-6 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Khách hàng mới</p>
            <p className="text-3xl font-bold text-gray-800">
              {customerRegistration}
            </p>
            <p className="text-green-500 text-sm mt-1">
              +{customerChangePercentage}% so với tuần trước
            </p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <User className="h-6 w-6 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-lg mb-4 text-gray-700">
            Doanh thu hàng tháng
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData && revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
                formatter={(value, name) => [
                  `${value.toLocaleString()}đ`,
                  name,
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Vé"
                stroke="#3B82F6"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="Sản phẩm"
                stroke="#10B981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-lg mb-4 text-gray-700">
            Top phim doanh thu cao
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topMovie && topMovie}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {topMovie &&
                  topMovie?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={sampleData.COLORS[index % sampleData.COLORS.length]}
                    />
                  ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} vé`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
