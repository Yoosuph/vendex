import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/utils/cn';

// Custom Tooltip for dark & light mode
export const CustomAnalyticsTooltip = ({ active, payload, label, prefix = '$', suffix = '' }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-container-lowest/95 backdrop-blur-xl border border-outline-variant/50 p-3 rounded-xl shadow-xl text-xs space-y-1">
        <p className="font-semibold text-secondary">{label}</p>
        {payload.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-on-surface">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color || item.stroke || '#ee4455' }} />
              {item.name || 'Value'}:
            </span>
            <span className="font-mono font-bold text-on-surface">
              {prefix}{typeof item.value === 'number' ? item.value.toLocaleString(undefined, { minimumFractionDigits: prefix === '$' ? 2 : 0, maximumFractionDigits: 2 }) : item.value}{suffix}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// 1. Interactive Revenue & Volume Area Chart
export function RevenueAreaChart({
  data = [],
  title = "Revenue Performance",
  subtitle = "Daily sales volume and gross revenue",
  timeRange,
  setTimeRange,
  height = 240,
}) {
  const [metric, setMetric] = useState('revenue'); // 'revenue' | 'orders'

  return (
    <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl shadow-subtle border border-outline-variant/40 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">{title}</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/10 text-primary">
              Live
            </span>
          </div>
          {subtitle && <p className="text-xs text-secondary mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Metric Selector */}
          <div className="bg-surface-container-low p-1 rounded-xl flex items-center border border-outline-variant/30">
            <button
              onClick={() => setMetric('revenue')}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all',
                metric === 'revenue' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-on-surface'
              )}
            >
              Revenue
            </button>
            <button
              onClick={() => setMetric('orders')}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all',
                metric === 'orders' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-on-surface'
              )}
            >
              Orders
            </button>
          </div>

          {/* Time range selector if provided */}
          {timeRange && setTimeRange && (
            <div className="bg-surface-container-low p-1 rounded-xl flex items-center border border-outline-variant/30">
              {['7d', '30d', 'all'].map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={cn(
                    'px-2 py-1 rounded-lg text-xs font-semibold uppercase transition-all',
                    timeRange === r ? 'bg-surface-container-lowest text-primary font-bold shadow-subtle' : 'text-secondary'
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ee4455" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ee4455" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-outline-variant/30" />
            <XAxis
              dataKey="date"
              stroke="currentColor"
              className="text-secondary text-[10px]"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="currentColor"
              className="text-secondary text-[10px]"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => metric === 'revenue' ? `$${v}` : v}
            />
            <Tooltip
              content={
                <CustomAnalyticsTooltip
                  prefix={metric === 'revenue' ? '$' : ''}
                  suffix={metric === 'orders' ? ' orders' : ''}
                />
              }
            />
            {metric === 'revenue' ? (
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#ee4455"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorRev)"
              />
            ) : (
              <Area
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#3B82F6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorOrders)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 2. Interactive Donut Chart for Order Fulfillment / Status Distribution
export function FulfillmentDonutChart({
  delivered = 0,
  processing = 0,
  cancelled = 0,
  onHold = 0,
  total = 0,
  height = 200,
}) {
  const data = [
    { name: 'Delivered', value: delivered, color: '#2D7A4F' },
    { name: 'Processing', value: processing, color: '#F5A623' },
    { name: 'Cancelled', value: cancelled, color: '#ee4455' },
    { name: 'On Hold', value: onHold, color: '#6B7280' },
  ].filter(d => d.value > 0);

  const safeTotal = total || (delivered + processing + cancelled + onHold) || 1;
  const successRate = total ? Math.round((delivered / total) * 100) : 0;

  return (
    <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl shadow-subtle border border-outline-variant/40 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Order Fulfillment</h3>
          <p className="text-xs text-secondary">Delivery completion & status</p>
        </div>
        <span className="text-xs font-bold text-success bg-success-container/30 px-2 py-0.5 rounded-full">
          {successRate}% Success
        </span>
      </div>

      <div className="relative flex items-center justify-center" style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.length > 0 ? data : [{ name: 'None', value: 1, color: '#e5e7eb' }]}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
            >
              {(data.length > 0 ? data : [{ color: '#e5e7eb' }]).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomAnalyticsTooltip prefix="" suffix=" orders" />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-black text-on-surface font-mono">{safeTotal}</span>
          <span className="text-[10px] text-secondary font-semibold uppercase">Total</span>
        </div>
      </div>

      {/* Grid Legend */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant/20 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-success" />
          <span className="text-secondary text-[11px]">Delivered: <strong className="text-on-surface">{delivered}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-warning" />
          <span className="text-secondary text-[11px]">Processing: <strong className="text-on-surface">{processing}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-error" />
          <span className="text-secondary text-[11px]">Cancelled: <strong className="text-on-surface">{cancelled}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
          <span className="text-secondary text-[11px]">On Hold: <strong className="text-on-surface">{onHold}</strong></span>
        </div>
      </div>
    </div>
  );
}

// 3. Category Revenue Distribution Bar Chart
export function CategoryDistributionChart({ data = [], height = 200 }) {
  return (
    <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl shadow-subtle border border-outline-variant/40 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Category Revenue</h3>
          <p className="text-xs text-secondary">Sales contribution by category</p>
        </div>
        <span className="material-symbols-outlined text-secondary text-base">pie_chart</span>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.slice(0, 6)} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="text-outline-variant/30" />
            <XAxis type="number" stroke="currentColor" className="text-secondary text-[10px]" tickFormatter={(v) => `$${v}`} />
            <YAxis type="category" dataKey="name" stroke="currentColor" className="text-secondary text-[10px]" width={80} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomAnalyticsTooltip prefix="$" />} />
            <Bar dataKey="value" name="Sales" fill="#ee4455" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
