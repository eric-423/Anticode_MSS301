import { User, Film, ShoppingBag, BarChart2 } from 'lucide-react';
import sampleData from "./sampleData";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';



const Dashboard = () => {
    return (
        <div className="p-8 space-y-8">
            {/* Các chỉ số chính */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Doanh thu hôm nay</p>
                        <p className="text-3xl font-bold text-gray-800">{sampleData.revenueData[0].value}đ</p>
                        <p className="text-green-500 text-sm mt-1">+15% so với hôm qua</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                        <BarChart2 className="h-6 w-6 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Vé đã bán</p>
                        <p className="text-3xl font-bold text-gray-800">{sampleData.revenueData[0].tickets}đ</p>
                        <p className="text-green-500 text-sm mt-1">+8% so với hôm qua</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                        <Film className="h-6 w-6 text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Sản phẩm bán ra</p>
                        <p className="text-3xl font-bold text-gray-800">850</p>
                        <p className="text-red-500 text-sm mt-1">-2% so với hôm qua</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                        <ShoppingBag className="h-6 w-6 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Khách hàng mới</p>
                        <p className="text-3xl font-bold text-gray-800">75</p>
                        <p className="text-green-500 text-sm mt-1">+10% so với tuần trước</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                        <User className="h-6 w-6 text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Biểu đồ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="font-bold text-lg mb-4 text-gray-700">Doanh thu hàng tháng</h3>
                    <ResponsiveContainer width="100%" height={300}>

                        <LineChart data={sampleData.revenueData}>

                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `${value / 1000}k`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ccc', borderRadius: '8px' }}
                                formatter={(value, name) => [`${value.toLocaleString()}đ`, name]}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="Vé" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Sản phẩm" stroke="#10B981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="font-bold text-lg mb-4 text-gray-700">Top phim doanh thu cao</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={sampleData.topMoviesData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {sampleData.topMoviesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={sampleData.COLORS[index % sampleData.COLORS.length]} />
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