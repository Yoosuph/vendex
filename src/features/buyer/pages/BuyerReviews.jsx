import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';
import StarRating from '@/shared/components/StarRating';
import BuyerPageHeader from '../components/BuyerPageHeader';
import { useToast } from '@/shared/context/ToastContext';
import * as reviewsApi from '@/shared/api/reviews';
import {
  formatDate,
  formatMoney,
  loadJson,
  saveJson,
  reviewedKey,
} from '../utils';

export default function BuyerReviews() {
  const { orders, products, loading, addReview, reloadFromDb } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);
  const { addToast } = useToast();
  const [tab, setTab] = useState('pending');
  const [reviewOpen, setReviewOpen] = useState(null);
  const [form, setForm] = useState({ score: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [reviewedMap, setReviewedMap] = useState(() =>
    loadJson(reviewedKey(user?.id), {}),
  );

  const pendingItems = useMemo(() => {
    if (!user || !Array.isArray(orders)) return [];
    const delivered = orders.filter(
      (o) => o.buyerId === user.id && o.status === 'Delivered',
    );
    const items = [];
    delivered.forEach((order) => {
      (order.items || []).forEach((item) => {
        const pid = item.productId || item.id;
        if (!pid || reviewedMap[pid]) return;
        items.push({
          ...item,
          productId: pid,
          orderId: order.displayId || order.id,
          orderDate: order.date,
        });
      });
    });
    // de-dupe by product
    const seen = new Set();
    return items.filter((i) => {
      if (seen.has(i.productId)) return false;
      seen.add(i.productId);
      return true;
    });
  }, [orders, user, reviewedMap]);

  const myReviews = useMemo(() => {
    if (!user || !Array.isArray(products)) return [];
    const list = [];
    products.forEach((p) => {
      (p.reviews || []).forEach((r) => {
        if (r.userId === user.id || r.reviewer === user.name) {
          list.push({ ...r, product: p });
        }
      });
    });
    // also surface locally marked reviewed products without server review payload
    Object.keys(reviewedMap).forEach((pid) => {
      if (list.some((r) => r.product?.id === pid || r.productId === pid)) return;
      const product = products.find((p) => p.id === pid);
      if (product) {
        list.push({
          id: `local-${pid}`,
          score: 5,
          comment: 'Review submitted',
          createdAt: null,
          product,
          local: true,
        });
      }
    });
    return list;
  }, [products, user, reviewedMap]);

  const submit = async (e) => {
    e.preventDefault();
    if (!reviewOpen) return;
    setSubmitting(true);
    try {
      const dto = {
        score: form.score,
        comment: form.comment,
        reviewer: user?.name || 'Buyer',
      };
      if (addReview) {
        await addReview(reviewOpen.productId, dto, user);
      } else {
        await reviewsApi.createReview(reviewOpen.productId, dto);
        await reloadFromDb?.();
      }
      const next = { ...reviewedMap, [reviewOpen.productId]: true };
      setReviewedMap(next);
      saveJson(reviewedKey(user?.id), next);
      addToast('Review published', 'success');
      setReviewOpen(null);
      setForm({ score: 5, comment: '' });
      setTab('done');
    } catch (err) {
      addToast(err.message || 'Could not submit review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading reviews..." />;

  return (
    <div className="space-y-xl">
      <BuyerPageHeader
        eyebrow="05  /  Reviews"
        title="Your reviews"
        description="Rate delivered products and help other buyers shop with confidence."
      />

      <div className="flex gap-1 bg-surface-container-low p-1 rounded-xl w-fit">
        {[
          { id: 'pending', label: 'To review', count: pendingItems.length },
          { id: 'done', label: 'Published', count: myReviews.length },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-md py-sm rounded-lg buyer-mono text-[11px] tracking-wide uppercase transition-colors ${
              tab === t.id
                ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                : 'text-on-surface-variant'
            }`}
          >
            {t.label}
            <span className="ml-1.5 opacity-60">{String(t.count).padStart(2, '0')}</span>
          </button>
        ))}
      </div>

      {tab === 'pending' && (
        pendingItems.length === 0 ? (
          <div className="buyer-panel">
            <EmptyState
              icon="rate_review"
              title="You're all caught up"
              description="When delivered orders arrive, they'll show up here for review."
              actionLabel="View orders"
              onAction={() => { window.location.href = '/buyer/orders'; }}
            />
          </div>
        ) : (
          <div className="space-y-sm">
            {pendingItems.map((item) => (
              <div key={item.productId} className="buyer-panel p-md flex flex-col sm:flex-row gap-md sm:items-center">
                <div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0">
                  {item.image ? (
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-outline-variant">inventory_2</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body-sm font-semibold text-on-surface">{item.name}</p>
                  <p className="buyer-mono text-[11px] text-on-surface-variant mt-1">
                    Order #{item.orderId} · {formatDate(item.orderDate)} · {formatMoney(item.price)}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setReviewOpen(item);
                    setForm({ score: 5, comment: '' });
                  }}
                >
                  Write review
                </Button>
              </div>
            ))}
          </div>
        )
      )}

      {tab === 'done' && (
        myReviews.length === 0 ? (
          <div className="buyer-panel">
            <EmptyState
              icon="star"
              title="No published reviews"
              description="Share your experience after a delivery."
            />
          </div>
        ) : (
          <div className="space-y-sm">
            {myReviews.map((r) => (
              <div key={r.id} className="buyer-panel p-md">
                <div className="flex items-start justify-between gap-md">
                  <div className="min-w-0">
                    <Link
                      to={`/product/${r.product?.id}`}
                      className="text-body-sm font-semibold text-on-surface hover:text-primary"
                    >
                      {r.product?.name || 'Product'}
                    </Link>
                    <div className="mt-1">
                      <StarRating rating={r.score || 0} />
                    </div>
                  </div>
                  <span className="buyer-mono text-[11px] text-on-surface-variant shrink-0">
                    {formatDate(r.createdAt)}
                  </span>
                </div>
                <p className="text-body-sm text-on-surface-variant mt-sm">{r.comment}</p>
              </div>
            ))}
          </div>
        )
      )}

      {reviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close"
            onClick={() => setReviewOpen(null)}
          />
          <form
            onSubmit={submit}
            className="relative buyer-panel w-full max-w-md p-lg shadow-modal space-y-md"
          >
            <p className="buyer-eyebrow">New review</p>
            <h3 className="text-headline-md font-bold text-on-surface">{reviewOpen.name}</h3>
            <div>
              <p className="buyer-label mb-2">Rating</p>
              <StarRating
                interactive
                rating={form.score}
                onChange={(score) => setForm((f) => ({ ...f, score }))}
              />
            </div>
            <div>
              <label className="buyer-label" htmlFor="comment">Comment</label>
              <textarea
                id="comment"
                required
                minLength={3}
                rows={4}
                className="buyer-input resize-none"
                value={form.comment}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-sm">
              <Button type="button" variant="ghost" onClick={() => setReviewOpen(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={submitting}>
                Publish
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
