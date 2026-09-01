import React, { useState, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

export default function AdminReviewsDisputes() {
  const { products, disputes, loading, resolveDispute } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('reviews');
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);

  // Extract reviews from products
  const reviews = useMemo(() => {
    const all = [];
    (products || []).forEach((p) => {
      if (p.reviews && Array.isArray(p.reviews)) {
        p.reviews.forEach((r) =>
          all.push({ ...r, productName: p.name, productId: p.id })
        );
      }
    });
    return all.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [products]);

  // Rating distribution
  const ratingDist = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const rating = Math.round(r.score || r.rating || 5);
      if (dist[rating] !== undefined) dist[rating]++;
    });
    return dist;
  }, [reviews]);

  const avgRating = useMemo(() => {
    if (reviews.length === 0) return '0.0';
    return (
      reviews.reduce((s, r) => s + (r.score || r.rating || 5), 0) / reviews.length
    ).toFixed(1);
  }, [reviews]);

  const handleResolve = (dispute) => {
    setSelectedDispute(dispute);
    setResolutionOpen(true);
  };

  const handleArbitration = (decision) => {
    if (!selectedDispute) return;
    resolveDispute(selectedDispute.id, decision, user?.name || 'Admin');
    setResolutionOpen(false);
    setSelectedDispute(null);
  };

  if (loading) return <LoadingSpinner text="Loading reviews & disputes..." />;

  return (
    <>
      <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Feedback & Resolution</h1>
            <p className="font-body-md text-sm sm:text-base text-secondary">
              Monitor customer reviews, score distributions, and arbitrate open dispute cases.
            </p>
          </div>
          {/* Tabs Pill */}
          <div className="flex bg-surface-container-lowest border border-outline-variant/40 p-1 rounded-2xl shadow-subtle self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('reviews')}
              className={cn(
                'px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors',
                activeTab === 'reviews' ? 'bg-primary text-white' : 'text-secondary hover:text-on-surface'
              )}
            >
              Reviews ({reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('disputes')}
              className={cn(
                'px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors',
                activeTab === 'disputes' ? 'bg-primary text-white' : 'text-secondary hover:text-on-surface'
              )}
            >
              Disputes ({(disputes || []).length})
            </button>
          </div>
        </div>

        {/* Reviews View */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Rating Distribution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 sm:p-5 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-subtle flex flex-col justify-center">
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Average Rating</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-bold text-primary font-mono">{avgRating}</span>
                  <span className="material-symbols-outlined text-warning text-2xl icon-filled">star</span>
                </div>
                <span className="text-xs text-secondary mt-1">{reviews.length} total verified reviews</span>
              </div>

              <div className="md:col-span-3 p-4 sm:p-5 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-subtle flex flex-col justify-center gap-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = reviews.length > 0 ? (ratingDist[star] / reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3 text-xs">
                      <span className="w-12 font-medium text-secondary">{star} Stars</span>
                      <div className="flex-1 h-2 bg-surface-container-low rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-8 font-mono text-right text-secondary">{Math.round(pct)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {reviews.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-8 text-center shadow-subtle">
                <EmptyState icon="reviews" title="No reviews yet" description="Customer reviews will appear here once submitted." />
              </div>
            ) : (
              <>
                {/* Dedicated Mobile Review Cards */}
                <div className="md:hidden space-y-3">
                  {reviews.slice(0, 20).map((r, i) => (
                    <div key={i} className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/40 shadow-subtle flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-on-surface">{r.user || r.userName || 'Customer'}</span>
                        <div className="flex text-warning">
                          {Array.from({ length: r.score || r.rating || 5 }).map((_, j) => (
                            <span key={j} className="material-symbols-outlined text-base icon-filled">star</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-secondary italic">"{r.comment || r.text || 'No comment provided.'}"</p>
                      <div className="flex items-center justify-between border-t border-outline-variant/30 pt-2 text-[11px] text-secondary">
                        <span className="font-medium text-primary truncate max-w-[200px]">{r.productName || 'Product'}</span>
                        <span>{r.date || 'Recent'}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block bg-surface-container-lowest rounded-2xl shadow-subtle border border-outline-variant/40 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Customer</th>
                          <th className="px-4 py-3 font-semibold">Rating</th>
                          <th className="px-4 py-3 font-semibold">Comment</th>
                          <th className="px-4 py-3 font-semibold">Product</th>
                          <th className="px-4 py-3 font-semibold">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/30 text-sm">
                        {reviews.slice(0, 25).map((r, i) => (
                          <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                            <td className="px-4 py-3 font-semibold text-on-surface">{r.user || r.userName || 'Customer'}</td>
                            <td className="px-4 py-3">
                              <div className="flex text-warning">
                                {Array.from({ length: r.score || r.rating || 5 }).map((_, j) => (
                                  <span key={j} className="material-symbols-outlined text-base icon-filled">star</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-secondary italic max-w-sm truncate">"{r.comment || r.text || 'No comment'}"</td>
                            <td className="px-4 py-3 font-medium text-on-surface truncate">{r.productName || 'Product'}</td>
                            <td className="px-4 py-3 text-secondary text-xs">{r.date || 'Recent'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Disputes View */}
        {activeTab === 'disputes' && (
          <div className="space-y-4">
            {(disputes || []).length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-8 text-center shadow-subtle">
                <EmptyState icon="gavel" title="No disputes on file" description="Open dispute claims from buyers will appear here." />
              </div>
            ) : (
              <>
                {/* Dedicated Mobile Dispute Cards */}
                <div className="md:hidden space-y-3">
                  {(disputes || []).map((d) => (
                    <div
                      key={d.id}
                      onClick={() => handleResolve(d)}
                      className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/40 shadow-subtle flex flex-col gap-3 active:scale-[0.99] transition-transform cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-primary text-sm">#{d.id}</span>
                        <span
                          className={cn(
                            'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase',
                            d.status === 'Resolved'
                              ? 'bg-success-container text-success'
                              : d.status === 'Under Review'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-error-container text-error'
                          )}
                        >
                          {d.status || 'Open'}
                        </span>
                      </div>
                      <div className="text-xs space-y-1">
                        <p><span className="text-secondary">Claimant:</span> <strong className="text-on-surface">{d.claimant || d.claimantName || 'Buyer'}</strong></p>
                        <p><span className="text-secondary">Vendor:</span> <strong className="text-on-surface">{d.vendor || d.vendorName || 'Store'}</strong></p>
                      </div>
                      <div className="flex items-center justify-between border-t border-outline-variant/30 pt-2 text-xs">
                        <span className="font-bold text-base text-primary buyer-price">${Number(d.amount || 0).toFixed(2)}</span>
                        <Button variant="outline" size="sm">Review Case</Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block bg-surface-container-lowest rounded-2xl shadow-subtle border border-outline-variant/40 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Case ID</th>
                          <th className="px-4 py-3 font-semibold">Claimant</th>
                          <th className="px-4 py-3 font-semibold">Vendor</th>
                          <th className="px-4 py-3 font-semibold">Status</th>
                          <th className="px-4 py-3 font-semibold">Amount</th>
                          <th className="px-4 py-3 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/30 text-sm">
                        {(disputes || []).map((d) => (
                          <tr key={d.id} className="hover:bg-surface-container-low/50 transition-colors">
                            <td className="px-4 py-3 font-mono font-bold text-primary">#{d.id}</td>
                            <td className="px-4 py-3">{d.claimant || d.claimantName || 'Buyer'}</td>
                            <td className="px-4 py-3">{d.vendor || d.vendorName || 'Store'}</td>
                            <td className="px-4 py-3">
                              <span
                                className={cn(
                                  'px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase',
                                  d.status === 'Resolved'
                                    ? 'bg-success-container text-success'
                                    : d.status === 'Under Review'
                                    ? 'bg-primary/10 text-primary'
                                    : 'bg-error-container text-error'
                                )}
                              >
                                {d.status || 'Open'}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-mono font-bold text-on-surface">${Number(d.amount || 0).toFixed(2)}</td>
                            <td className="px-4 py-3 text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleResolve(d)}>
                                Arbitrate
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Arbitration Modal */}
      <AnimatePresence>
        {resolutionOpen && selectedDispute && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setResolutionOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-surface-container-lowest w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex justify-between items-center bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold">
                    #{selectedDispute.id}
                  </span>
                  <h3 className="font-bold text-lg text-on-surface">Arbitration Decision</h3>
                </div>
                <button
                  onClick={() => setResolutionOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-surface-container-low rounded-xl">
                    <span className="text-xs text-secondary font-semibold uppercase">Claimant</span>
                    <p className="font-semibold text-on-surface mt-0.5">{selectedDispute.claimant || selectedDispute.claimantName || 'Buyer'}</p>
                  </div>
                  <div className="p-3 bg-surface-container-low rounded-xl">
                    <span className="text-xs text-secondary font-semibold uppercase">Vendor</span>
                    <p className="font-semibold text-on-surface mt-0.5">{selectedDispute.vendor || selectedDispute.vendorName || 'Vendor'}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-surface-container-low rounded-xl">
                  <span className="text-xs text-secondary font-semibold uppercase">Claim Amount</span>
                  <p className="text-xl font-bold text-primary buyer-price mt-0.5">${Number(selectedDispute.amount || 0).toFixed(2)}</p>
                </div>

                <div className="p-3.5 bg-surface-container-low rounded-xl">
                  <span className="text-xs text-secondary font-semibold uppercase">Dispute Reason & Details</span>
                  <p className="text-sm text-on-surface mt-1 leading-relaxed">
                    {selectedDispute.description || selectedDispute.reason || 'No description provided by the claimant.'}
                  </p>
                </div>

                {selectedDispute.status === 'Resolved' && (
                  <div className="p-3.5 bg-success-container/30 rounded-xl border border-success/20">
                    <span className="text-xs font-bold text-success uppercase">Final Resolution</span>
                    <p className="text-sm font-semibold text-on-surface mt-0.5">{selectedDispute.decision || 'Resolved'}</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-outline-variant/40 bg-surface-container-lowest flex flex-col sm:flex-row gap-2.5">
                <Button variant="outline" fullWidth onClick={() => handleArbitration('Side with Buyer')}>
                  Side with Buyer
                </Button>
                <Button variant="outline" fullWidth onClick={() => handleArbitration('Side with Vendor')}>
                  Side with Vendor
                </Button>
                <Button variant="primary" fullWidth onClick={() => handleArbitration('Full Refund')}>
                  Execute Refund
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
