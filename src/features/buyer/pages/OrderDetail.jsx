import React, { useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

const statusBadge = (status) => {
  const map = {
    Delivered: 'bg-success-container text-success',
    Shipped: 'bg-info-container text-info',
    Processing: 'bg-warning-container text-warning',
    'In Transit': 'bg-info-container text-info',
    Cancelled: 'bg-error-container text-error',
    Pending: 'bg-surface-container text-on-surface-variant',
  };
  return map[status] || 'bg-surface-container text-on-surface-variant';
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, loading } = useContext(MarketplaceContext);

  const order = useMemo(() => orders.find(o => o.id === id), [orders, id]);

  if (loading) return <LoadingSpinner text="Loading order..." />;

  if (!order) {
    return (
      <div className="flex-1 flex items-center justify-center p-xl min-h-[40vh]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error-container flex items-center justify-center">
            <span className="material-symbols-outlined text-headline-lg text-error">error_outline</span>
          </div>
          <h2 className="text-headline-md font-bold text-on-surface mb-2">Order Not Found</h2>
          <p className="text-body-sm text-on-surface-variant mb-6">Order #{id} could not be found. It may have been removed or the ID is incorrect.</p>
          <Button variant="secondary" onClick={() => navigate('/buyer/orders')}>
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const items = order.items || [];
  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
  const tax = subtotal * 0.08;
  const total = Number(order.total) || subtotal + tax;
  const ship = order.shippingDetails || {};
  const steps = ['Processing', 'Shipped', 'Delivered'];
  const currentStep = order.status === 'Cancelled' ? -1 : steps.indexOf(order.status);

  return (
    <div className="space-y-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
        <div className="flex items-center gap-sm">
          <Button variant="ghost" onClick={() => navigate('/buyer/orders')} icon={<span className="material-symbols-outlined text-xl">arrow_back</span>} />
          <div>
            <h1 className="text-headline-md font-bold text-on-surface">Order #{order.id}</h1>
            <p className="text-body-sm text-on-surface-variant mt-base">{order.date || '—'} · {items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <span className={cn('inline-block px-sm py-sm rounded-full text-label-sm font-semibold', statusBadge(order.status))}>
          {order.status || 'Pending'}
        </span>
      </div>

      {/* Progress tracker — only for active orders */}
      {order.status !== 'Cancelled' && (
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-sm">
                <div className={cn('w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                  i <= currentStep ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant',
                )}>
                  <span className="material-symbols-outlined text-xl">
                    {i < currentStep ? 'check' : i === currentStep ? 'hourglass_top' : 'radio_button_unchecked'}
                  </span>
                </div>
                <span className={cn('text-meta font-medium', i <= currentStep ? 'text-on-surface' : 'text-on-surface-variant')}>{step}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn('flex-1 h-0.5 mx-sm -mt-5 rounded-full transition-colors',
                  i < currentStep ? 'bg-primary' : 'bg-surface-container-high',
                )} />
              )}
            </div>
          ))}
        </div>
      </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        {/* Items */}
        <div className="lg:col-span-2 space-y-sm">
          <h2 className="text-body-md font-semibold text-on-surface">Items</h2>
          {items.map((item, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md flex gap-md">
              <div className="w-20 h-20 rounded-lg bg-surface-container overflow-hidden shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline-variant">
                    <span className="material-symbols-outlined text-3xl">inventory_2</span>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-body-sm font-semibold text-on-surface">{item.name}</h3>
                  <p className="text-meta text-on-surface-variant">{item.vendor || 'Unknown Vendor'}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-on-surface-variant">Qty: {item.quantity || 1}</span>
                  <span className="text-body-lg font-bold text-on-surface">${(item.price || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-md">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md">
            <h3 className="text-label-md font-semibold text-on-surface uppercase tracking-wider mb-sm">Shipping Address</h3>
            <p className="text-body-sm font-medium text-on-surface">
              {ship.firstName && ship.lastName ? `${ship.firstName} ${ship.lastName}` : 'Customer'}
            </p>
            <p className="text-body-sm text-on-surface-variant mt-xs">{ship.address || '—'}</p>
            <p className="text-body-sm text-on-surface-variant">{ship.city && ship.zip ? `${ship.city}, ${ship.zip}` : ''}</p>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md">
            <h3 className="text-label-md font-semibold text-on-surface uppercase tracking-wider mb-sm">Payment</h3>
            <div className="flex items-center gap-sm">
              <div className="w-10 h-7 bg-inverse-surface rounded flex items-center justify-center text-meta text-white font-bold">VISA</div>
              <div>
                <p className="text-body-sm text-on-surface">•••• 4421</p>
                <p className="text-meta text-on-surface-variant">{order.paymentMethod || 'Card'}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-md">
            <h3 className="text-label-md font-semibold text-on-surface uppercase tracking-wider mb-md">Order Summary</h3>
            <div className="space-y-sm text-body-sm">
              <div className="flex justify-between text-on-surface-variant"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-on-surface-variant"><span>Shipping</span><span className="text-success font-medium">Free</span></div>
              <div className="flex justify-between text-on-surface-variant"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="border-t border-outline-variant pt-sm mt-sm flex justify-between font-bold text-on-surface text-body-md">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-sm">
            {order.status === 'Delivered' && (
              <Button variant="outline" fullWidth icon={<span className="material-symbols-outlined text-lg">rate_review</span>}>Write a Review</Button>
            )}
            <Button variant="ghost" fullWidth icon={<span className="material-symbols-outlined text-lg">help_outline</span>}>Need Help?</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
