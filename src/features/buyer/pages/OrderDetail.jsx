import React, { useContext, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import ErrorState from '@/shared/components/ErrorState';
import Button from '@/shared/components/Button';

const statusBadge = (status) => {
  const map = {
    Delivered: 'bg-emerald-50 text-emerald-700',
    Shipped: 'bg-blue-50 text-blue-700',
    Processing: 'bg-amber-50 text-amber-700',
    'In Transit': 'bg-indigo-50 text-indigo-700',
    Cancelled: 'bg-red-50 text-red-500',
    Pending: 'bg-gray-100 text-gray-600',
  };
  return map[status] || 'bg-gray-100 text-gray-600';
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, loading } = useContext(MarketplaceContext);

  const order = useMemo(() => orders.find(o => o.id === id), [orders, id]);

  if (loading) return <LoadingSpinner text="Loading order..." />;

  if (!order) {
    return (
      <div className="p-8">
        <ErrorState message="Order not found." onRetry={() => navigate('/buyer/orders')} />
      </div>
    );
  }

  const items = order.items || [];
  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
  const tax = subtotal * 0.08;
  const shipping = 0;
  const total = Number(order.total) || subtotal + tax + shipping;
  const ship = order.shippingDetails || {};
  const steps = ['Processing', 'Shipped', 'Delivered'];
  const currentStep = steps.indexOf(order.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate('/buyer/orders')} icon={<span className="material-symbols-outlined text-[20px]">arrow_back</span>} />
          <div>
            <h1 className="text-[22px] font-bold text-gray-900">Order #{order.id}</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">{order.date || '—'} · {items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <span className={`inline-block px-3 py-1.5 rounded-full text-[12px] font-semibold ${statusBadge(order.status)}`}>
          {order.status || 'Pending'}
        </span>
      </div>

      {/* Progress tracker */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[18px] transition-colors ${
                  i <= currentStep ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  <span className="material-symbols-outlined text-[20px]">
                    {i < currentStep ? 'check' : i === currentStep ? 'hourglass_top' : 'radio_button_unchecked'}
                  </span>
                </div>
                <span className={`text-[12px] font-medium ${i <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>{step}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-[2px] mx-2 mt-[-20px] rounded-full transition-colors ${i < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-[15px] font-semibold text-gray-900">Items</h2>
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4">
              <div className="w-20 h-20 rounded-lg bg-gray-50 overflow-hidden shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <span className="material-symbols-outlined text-[32px]">inventory_2</span>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[14px] font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-[12px] text-gray-400">{item.vendor || 'Unknown Vendor'}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-500">Qty: {item.quantity || 1}</span>
                  <span className="text-[16px] font-bold text-gray-900">${(item.price || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Shipping */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-[13px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Shipping Address</h3>
            <p className="text-[14px] font-medium text-gray-700">
              {ship.firstName && ship.lastName ? `${ship.firstName} ${ship.lastName}` : 'Customer'}
            </p>
            <p className="text-[13px] text-gray-500 mt-1">{ship.address || '—'}</p>
            <p className="text-[13px] text-gray-500">
              {ship.city && ship.zip ? `${ship.city}, ${ship.zip}` : ''}
            </p>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-[13px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Payment</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-gray-800 rounded flex items-center justify-center text-[9px] text-white font-bold">VISA</div>
              <div>
                <p className="text-[13px] text-gray-700">•••• 4421</p>
                <p className="text-[11px] text-gray-400">{order.paymentMethod || 'Card'}</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-[13px] font-semibold text-gray-900 uppercase tracking-wider mb-4">Order Summary</h3>
            <div className="space-y-2 text-[14px]">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-emerald-600 font-medium">Free</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-gray-900 text-[16px]">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {order.status === 'Delivered' && (
              <Button variant="outline" fullWidth icon={<span className="material-symbols-outlined text-[18px]">rate_review</span>}>Write a Review</Button>
            )}
            <Button variant="ghost" fullWidth icon={<span className="material-symbols-outlined text-[18px]">help_outline</span>}>Need Help?</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
