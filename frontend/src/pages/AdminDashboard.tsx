import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const COLORS = ['#2d5016', '#4a7c2a', '#6ba644', '#8ed05e', '#b3e88d'];

// Mock data for Tourist Footfall
const footfallData = [
  { month: "Jan", visitors: 45000 },
  { month: "Feb", visitors: 52000 },
  { month: "Mar", visitors: 68000 },
  { month: "Apr", visitors: 75000 },
  { month: "May", visitors: 62000 },
  { month: "Jun", visitors: 48000 },
  { month: "Jul", visitors: 55000 },
  { month: "Aug", visitors: 71000 },
  { month: "Sep", visitors: 89000 },
  { month: "Oct", visitors: 125000 },
  { month: "Nov", visitors: 98000 },
  { month: "Dec", visitors: 82000 },
];

// Mock data for Popularity of MP Regions
const regionData = [
  { name: "Khajuraho", visitors: 145000, percentage: 28 },
  { name: "Kanha", visitors: 132000, percentage: 25 },
  { name: "Bandhavgarh", visitors: 98000, percentage: 19 },
  { name: "Pachmarhi", visitors: 78000, percentage: 15 },
  { name: "Sanchi", visitors: 62000, percentage: 12 },
  { name: "Orchha", visitors: 45000, percentage: 9 },
];

const categoryData = [
  { name: "Wildlife", value: 35 },
  { name: "Heritage", value: 28 },
  { name: "Adventure", value: 18 },
  { name: "Tribal", value: 12 },
  { name: "Religious", value: 7 },
];

const AdminDashboard = () => {
  return (
    <main className="pt-20 min-h-screen bg-cream">
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Tourism Analytics Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Data-driven insights for managing tourism flow and enhancing visitor experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Tourist Footfall Chart */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Monthly Tourist Footfall
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={footfallData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#2d5016"
                    strokeWidth={3}
                    name="Visitors"
                    dot={{ fill: "#2d5016", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Tourism Category Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Popularity of MP Regions */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Popularity of MP Regions
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value.toLocaleString()} visitors`, "Visitors"]}
                />
                <Legend />
                <Bar dataKey="visitors" fill="#2d5016" name="Number of Visitors" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground mb-2">Total Visitors (Year)</p>
              <p className="text-3xl font-bold text-foreground">850K+</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground mb-2">Peak Month</p>
              <p className="text-3xl font-bold text-foreground">October</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground mb-2">Most Popular</p>
              <p className="text-3xl font-bold text-foreground">Khajuraho</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground mb-2">Avg. Stay</p>
              <p className="text-3xl font-bold text-foreground">3.5 Days</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;




