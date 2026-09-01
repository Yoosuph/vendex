import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import Button from '@/shared/components/Button';
import StarRating from '@/shared/components/StarRating';
import BuyerPageHeader from '../components/BuyerPageHeader';
import { useToast } from '@/shared/context/ToastContext';
import * as ordersApi from '@/shared/api/orders';
import * as disputesApi from '@/shared/api/disputes';
import * as reviewsApi from '@/shared/api/reviews';
import {
  TRACKING_STEPS,
  formatDate,
  formatDateTime,
  formatMoney,
  orderDbId,
  statusBadgeClass,
  trackingStepIndex,
  loadJson,
  saveJson,
  reviewedKey,
} from '../utils';
import { cn } from '@/utils/cn';

function normalizeFetchedOrder(order) {
  if (!order) return null;
  const STATUS_MAP = {
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    IN_TRANSIT: 'In Transit',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
    REFUNDED: 'Refunded',
    PENDING: 'Pending',
  };
  return {
    ...order,
    dbId: order.id,
    displayId: order.displayId || order.id,
    id: order.displayId || order.id,
    status: STATUS_MAP[order.status] || order.status,
    date: order.createdAt,
  };
}

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, loading, reloadFromDb, addReview } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);
  const { addToast } = useToast();

  const [fetched, setFetched] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [disputeOpen, setDisputeOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(null); // product item
  const [submitting, setSubmitting] = useState(false);

  const [disputeForm, setDisputeForm] = useState({
    reason: 'Item not as described',
    description: '',
    amount: '',
  });
  const [reviewForm, setReviewForm] = useState({ score: 5, comment: '' });

  const fromContext = useMemo(() => {
    if (!Array.isArray(orders)) return null;
    return orders.find(
      (o) =>
        o.id === id ||
        o.displayId === id ||
        o.dbId === id,
    );
  }, [orders, id]);

  useEffect(() => {
    if (fromContext || loading) return;
    let cancelled = false;
    (async () => {
      setFetching(true);
      try {
        // Prefer context match; if id looks like displayId, try list then fail
        const data = await ordersApi.getOrder(id);
        if (!cancelled) setFetched(normalizeFetchedOrder(data));
      } catch {
        if (!cancelled) setFetched(null);
      } finally {
        if (!cancelled) setFetching(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fromContext, id, loading]);

  const order = fromContext || fetched;

  if (loading || fetching) return <LoadingSpinner text="Loading order..." />;

  if (!order) {
    return (
      <div className="flex-1 flex items-center justify-center p-xl min-h-[40vh]">
        <div className="text-center buyer-panel p-xl max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error-container flex items-center justify-center">
            <span className="material-symbols-outlined text-headline-lg text-error">error_outline</span>
          </div>
          <p className="buyer-eyebrow mb-2">404</p>
          <h2 className="text-headline-md font-bold text-on-surface mb-2">Order not found</h2>
          <p className="text-body-sm text-on-surface-variant mb-6">
            Order <span className="buyer-mono">#{id}</span> could not be found.
          </p>
          <Button variant="secondary" onClick={() => navigate('/buyer/orders')}>
            Back to orders
          </Button>
        </div>
      </div>
    );
  }

  const items = order.items || [];
  const subtotal = Number(order.subtotal) || items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
  const tax = Number(order.tax) || subtotal * (Number(order.taxRate) || 0.08);
  const shipping = Number(order.shippingCost) ?? 15;
  const total = Number(order.total) || subtotal + tax + shipping;
  const ship = order.shippingDetails || {};
  const payment = order.paymentMethod || {};
  const step = trackingStepIndex(order.status);
  const canDispute = ['Delivered', 'Shipped', 'In Transit', 'Processing'].includes(order.status);
  const canReview = order.status === 'Delivered';

  const reviewed = loadJson(reviewedKey(user?.id), {});

  const submitDispute = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await disputesApi.createDispute({
        orderId: orderDbId(order),
        reason: disputeForm.reason,
        description: disputeForm.description,
        amount: Number(disputeForm.amount) || total,
      });
      addToast('Dispute submitted', 'success');
      setDisputeOpen(false);
      await reloadFromDb?.();
      navigate('/buyer/disputes');
    } catch (err) {
      addToast(err.message || 'Could not open dispute', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!reviewOpen) return;
    setSubmitting(true);
    try {
      const dto = {
        score: reviewForm.score,
        comment: reviewForm.comment,
        reviewer: user?.name || 'Buyer',
      };
      if (addReview) {
        await addReview(reviewOpen.productId || reviewOpen.id, dto, user);
      } else {
        await reviewsApi.createReview(reviewOpen.productId || reviewOpen.id, dto);
      }
      const key = reviewedKey(user?.id);
      const map = loadJson(key, {});
      map[reviewOpen.productId || reviewOpen.id] = true;
      saveJson(key, map);
      addToast('Review published', 'success');
      setReviewOpen(null);
      setReviewForm({ score: 5, comment: '' });
    } catch (err) {
      addToast(err.message || 'Could not submit review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-xl">
      <BuyerPageHeader
        eyebrow="02  /  Order detail"
        title={`Order #${order.displayId || order.id}`}
        description={`${formatDateTime(order.date)} · ${items.length} item${items.length !== 1 ? 's' : ''}`}
        actions={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/buyer/orders')}
              icon={<span className="material-symbols-outlined text-xl">arrow_back</span>}
            >
              Back
            </Button>
            <span className={cn('buyer-chip self-center', statusBadgeClass(order.status))}>
              {order.status || 'Pending'}
            </span>
          </>
        }
      />

      {order.status !== 'Cancelled' && order.status !== 'Refunded' && (
        <div className="buyer-panel p-lg">
          <p className="buyer-eyebrow mb-lg text-center">Shipment progress</p>
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {TRACKING_STEPS.map((label, i) => (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                      i <= step
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface-variant',
                    )}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {i < step ? 'check' : i === step ? 'hourglass_top' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'buyer-mono text-[10px] tracking-wider uppercase text-center',
                      i <= step ? 'text-on-surface' : 'text-on-surface-variant',
                    )}
                  >
                    {label}
                  </span>
                </div>
                {i < TRACKING_STEPS.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-2 -mt-5 rounded-full',
                      i < step ? 'bg-primary' : 'bg-surface-container-high',
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          {(order.trackingNumber || order.carrier) && (
            <div className="mt-lg pt-md border-t buyer-hairline flex flex-wrap gap-md justify-center">
              {order.carrier && (
                <p className="buyer-mono text-meta text-on-surface-variant">
                  Carrier <span className="text-on-surface">{order.carrier}</span>
                </p>
              )}
              {order.trackingNumber && (
                <p className="buyer-mono text-meta text-on-surface-variant">
                  Tracking <span className="text-on-surface">{order.trackingNumber}</span>
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-2 space-y-sm">
          <p className="buyer-eyebrow">Line items</p>
          {items.map((item, i) => {
            const pid = item.productId || item.id;
            const already = reviewed[pid];
            return (
              <div key={`${pid}-${i}`} className="buyer-panel p-md flex gap-md">
                <Link
                  to={pid ? `/product/${pid}` : '#'}
                  className="w-20 h-20 rounded-lg bg-surface-container overflow-hidden shrink-0"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline-variant">
                      <span className="material-symbols-outlined text-3xl">inventory_2</span>
                    </div>
                  )}
                </Link>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-body-sm font-semibold text-on-surface">{item.name}</h3>
                    <p className="buyer-mono text-[11px] text-on-surface-variant mt-0.5">
                      {item.vendor || 'Vendor'}
                      {item.vendorId && (
                        <>
                          {' · '}
                          <Link to={`/store/${item.vendorId}`} className="text-primary hover:underline">
                            Store
                          </Link>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-sm flex-wrap">
                    <span className="buyer-mono text-meta text-on-surface-variant">
                      Qty {item.quantity || 1}
                    </span>
                    <span className="buyer-price text-body-md text-on-surface">
                      {formatMoney(item.price)}
                    </span>
                  </div>
                  {canReview && pid && (
                    <div className="mt-2">
                      {already ? (
                        <span className="buyer-mono text-[10px] tracking-wider uppercase text-success">
                          Reviewed
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="buyer-mono text-[10px] tracking-wider uppercase text-primary hover:underline"
                          onClick={() => {
                            setReviewOpen({ ...item, productId: pid });
                            setReviewForm({ score: 5, comment: '' });
                          }}
                        >
                          Write review →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-md">
          <div className="buyer-panel p-md">
            <p className="buyer-eyebrow mb-sm">Ship to</p>
            <p className="text-body-sm font-medium text-on-surface">
              {ship.firstName || ship.lastName
                ? `${ship.firstName || ''} ${ship.lastName || ''}`.trim()
                : 'Customer'}
            </p>
            <p className="text-body-sm text-on-surface-variant mt-1 buyer-mono text-[13px] leading-relaxed">
              {ship.address || '—'}
              <br />
              {[ship.city, ship.zip].filter(Boolean).join(', ')}
              {ship.country ? <><br />{ship.country}</> : null}
            </p>
          </div>

          <div className="buyer-panel p-md">
            <p className="buyer-eyebrow mb-sm">Payment</p>
            <div className="flex items-center gap-sm">
              <div className="w-11 h-7 bg-inverse-surface rounded flex items-center justify-center buyer-mono text-[10px] text-white font-bold tracking-wider">
                CARD
              </div>
              <div>
                <p className="buyer-mono text-body-sm text-on-surface">
                  {payment.cardNumber || '•••• ••••'}
                </p>
                <p className="buyer-mono text-[11px] text-on-surface-variant">
                  {payment.cardName || 'Card on file'}
                  {payment.expDate ? ` · Exp ${payment.expDate}` : ''}
                </p>
              </div>
            </div>
          </div>

          <div className="buyer-panel p-md bg-surface-container-low/60">
            <p className="buyer-eyebrow mb-md">Summary</p>
            <div className="space-y-sm text-body-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="buyer-price">{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping</span>
                <span className="buyer-price">
                  {shipping === 0 ? (
                    <span className="text-success font-medium">Free</span>
                  ) : (
                    formatMoney(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Tax</span>
                <span className="buyer-price">{formatMoney(tax)}</span>
              </div>
              <div className="border-t buyer-hairline pt-sm mt-sm flex justify-between font-bold text-on-surface text-body-md">
                <span>Total</span>
                <span className="buyer-price">{formatMoney(total)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-sm">
            {canReview && (
              <Button
                variant="outline"
                fullWidth
                icon={<span className="material-symbols-outlined text-lg">rate_review</span>}
                onClick={() => navigate('/buyer/reviews')}
              >
                Review items
              </Button>
            )}
            {canDispute && (
              <Button
                variant="secondary"
                fullWidth
                icon={<span className="material-symbols-outlined text-lg">gavel</span>}
                onClick={() => {
                  setDisputeForm({
                    reason: 'Item not as described',
                    description: '',
                    amount: String(total.toFixed(2)),
                  });
                  setDisputeOpen(true);
                }}
              >
                Open dispute
              </Button>
            )}
            <Button variant="ghost" fullWidth to="/buyer/disputes">
              View my disputes
            </Button>
          </div>
        </div>
      </div>

      {/* Dispute modal */}
      {disputeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close"
            onClick={() => setDisputeOpen(false)}
          />
          <form
            onSubmit={submitDispute}
            className="relative buyer-panel w-full max-w-md p-lg shadow-modal space-y-md"
          >
            <p className="buyer-eyebrow">Dispute</p>
            <h3 className="text-headline-md font-bold text-on-surface">Open a claim</h3>
            <p className="text-body-sm text-on-surface-variant">
              Order <span className="buyer-mono">#{order.displayId || order.id}</span>
            </p>
            <div>
              <label className="buyer-label" htmlFor="dispute-reason">Reason</label>
              <select
                id="dispute-reason"
                className="buyer-input"
                value={disputeForm.reason}
                onChange={(e) => setDisputeForm((f) => ({ ...f, reason: e.target.value }))}
              >
                <option>Item not as described</option>
                <option>Damaged in shipping</option>
                <option>Wrong item received</option>
                <option>Never arrived</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="buyer-label" htmlFor="dispute-amount">Claim amount</label>
              <input
                id="dispute-amount"
                type="number"
                min="0.01"
                step="0.01"
                required
                className="buyer-input buyer-mono"
                value={disputeForm.amount}
                onChange={(e) => setDisputeForm((f) => ({ ...f, amount: e.target.value }))}
              />
            </div>
            <div>
              <label className="buyer-label" htmlFor="dispute-desc">Details</label>
              <textarea
                id="dispute-desc"
                rows={4}
                className="buyer-input resize-none"
                placeholder="Describe what went wrong…"
                value={disputeForm.description}
                onChange={(e) => setDisputeForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="flex gap-sm justify-end">
              <Button type="button" variant="ghost" onClick={() => setDisputeOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={submitting}>
                Submit dispute
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Review modal */}
      {reviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close"
            onClick={() => setReviewOpen(null)}
          />
          <form
            onSubmit={submitReview}
            className="relative buyer-panel w-full max-w-md p-lg shadow-modal space-y-md"
          >
            <p className="buyer-eyebrow">Review</p>
            <h3 className="text-headline-md font-bold text-on-surface">{reviewOpen.name}</h3>
            <div>
              <p className="buyer-label mb-2">Rating</p>
              <StarRating
                interactive
                rating={reviewForm.score}
                onChange={(score) => setReviewForm((f) => ({ ...f, score }))}
              />
            </div>
            <div>
              <label className="buyer-label" htmlFor="review-comment">Your review</label>
              <textarea
                id="review-comment"
                rows={4}
                required
                minLength={3}
                className="buyer-input resize-none"
                placeholder="How was the product?"
                value={reviewForm.comment}
                onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
              />
            </div>
            <div className="flex gap-sm justify-end">
              <Button type="button" variant="ghost" onClick={() => setReviewOpen(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={submitting}>
                Publish review
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
