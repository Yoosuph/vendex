import React, { useState, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';

export default function AdminReviewsDisputes() {
  const { products, disputes, loading, resolveDispute } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('reviews');
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);

  // Extract reviews from products
  const reviews = useMemo(() => {
    const all = [];
    products.forEach(p => {
      if (p.reviews && Array.isArray(p.reviews)) {
        p.reviews.forEach(r => all.push({ ...r, productName: p.name, productId: p.id }));
      }
    });
    return all.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [products]);

  // Rating distribution
  const ratingDist = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      const rating = Math.round(r.rating || 5);
      if (dist[rating] !== undefined) dist[rating]++;
    });
    return dist;
  }, [reviews]);

  const avgRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return (reviews.reduce((s, r) => s + (r.rating || 5), 0) / reviews.length).toFixed(1);
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

  if (loading) return <div className="pt-16"><LoadingSpinner text="Loading reviews & disputes..." /></div>;

  return (
    <>
      <main className="mt-16 p-gutter min-h-[calc(100vh-4rem)]">
        <div className="max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Feedback & Resolution</h2>
              <p className="text-on-surface-variant font-body-md">Monitor customer reviews and manage open dispute claims.</p>
            </div>
            <div className="flex bg-surface-container p-1 rounded-xl">
              <Button variant={activeTab === 'reviews' ? 'primary' : 'ghost'} onClick={() => setActiveTab('reviews')}>Reviews</Button>
              <Button variant={activeTab === 'disputes' ? 'primary' : 'ghost'} onClick={() => setActiveTab('disputes')}>Disputes</Button>
            </div>
          </div>

          {activeTab === 'reviews' && (
          <div>
            <div className="grid grid-cols-4 gap-md mb-lg">
              <div className="col-span-1 p-md bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm">
                <p className="text-label-sm text-secondary uppercase tracking-wider mb-xs">Average Rating</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-display-lg font-black text-primary">{avgRating}</h3>
                  <span className="material-symbols-outlined text-primary pb-2 icon-filled">star</span>
                </div>
                <p className="text-meta text-on-surface-variant mt-2">{reviews.length} total reviews</p>
              </div>
              <div className="col-span-3 p-md bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm flex flex-col justify-center">
                <div className="flex justify-between items-center mb-sm px-md">
                  <span className="text-label-md font-bold">Rating Distribution</span>
                  <span className="text-label-sm text-on-surface-variant">{reviews.length} total reviews</span>
                </div>
                <div className="space-y-3 px-md">
                  {[5, 4, 3, 2, 1].map(star => {
                    const pct = reviews.length > 0 ? (ratingDist[star] / reviews.length * 100) : 0;
                    return (
                      <div key={star} className="flex items-center gap-md">
                        <span className="text-label-sm w-12 text-secondary">{star} Star</span>
                        <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className="text-label-sm w-8">{Math.round(pct)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {reviews.length === 0 ? (
              <EmptyState icon="reviews" title="No reviews yet" description="Customer reviews will appear here once they leave feedback on products." />
            ) : (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      <th className="px-md py-sm font-label-md text-on-surface">Customer</th>
                      <th className="px-md py-sm font-label-md text-on-surface">Rating</th>
                      <th className="px-md py-sm font-label-md text-on-surface">Comment</th>
                      <th className="px-md py-sm font-label-md text-on-surface">Product</th>
                      <th className="px-md py-sm font-label-md text-on-surface">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {reviews.slice(0, 20).map((r, i) => (
                      <tr key={i} className="hover:bg-surface-container-low transition-colors">
                        <td className="px-md py-md">
                          <div className="flex items-center gap-sm">
                            <div className="h-8 w-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-xs">{r.user ? r.user.slice(0, 2).toUpperCase() : 'U'}</div>
                            <span className="font-label-md">{r.user || 'Anonymous'}</span>
                          </div>
                        </td>
                        <td className="px-md py-md">
                          <div className="flex text-primary">
                            {Array.from({ length: r.rating || 5 }).map((_, j) => (
                              <span key={j} className="material-symbols-outlined text-body-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            ))}
                            {Array.from({ length: 5 - (r.rating || 5) }).map((_, j) => (
                              <span key={`e${j}`} className="material-symbols-outlined text-body-lg">star</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-md py-md text-on-surface-variant font-body-sm max-w-xs truncate">
                          "{r.comment || r.text || 'No comment.'}"
                        </td>
                        <td className="px-md py-md font-label-md">{r.productName || 'Unknown'}</td>
                        <td className="px-md py-md text-meta">{r.date || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          )}

          {/* Disputes Tab */}
          <div className={`animate-in fade-in slide-in-from-bottom-2 duration-300 ${activeTab === 'disputes' ? '' : 'hidden'}`}>
            {disputes.length === 0 ? (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-lg">
                <EmptyState icon="gavel" title="No disputes" description="Disputes will appear here when buyers file claims against orders." />
              </div>
            ) : (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden mb-lg">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      <th className="px-md py-sm font-label-md text-on-surface">Case ID</th>
                      <th className="px-md py-sm font-label-md text-on-surface">Claimant</th>
                      <th className="px-md py-sm font-label-md text-on-surface">Vendor</th>
                      <th className="px-md py-sm font-label-md text-on-surface">Status</th>
                      <th className="px-md py-sm font-label-md text-on-surface">Amount</th>
                      <th className="px-md py-sm font-label-md text-on-surface">Date</th>
                      <th className="px-md py-sm"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {disputes.map(d => (
                      <tr key={d.id} className="hover:bg-surface-container-low transition-colors cursor-pointer" onClick={() => handleResolve(d)}>
                        <td className="px-md py-md font-label-md text-primary">{d.id}</td>
                        <td className="px-md py-md font-body-sm">{d.claimant || d.claimantName || 'N/A'}</td>
                        <td className="px-md py-md text-body-sm">{d.vendor || d.vendorName || 'N/A'}</td>
                        <td className="px-md py-md">
                          <span className={`px-2 py-1 rounded font-label-sm uppercase tracking-tight ${
                            d.status === 'Resolved' ? 'bg-secondary-container text-on-secondary-container' :
                            d.status === 'Under Review' ? 'bg-primary/10 text-primary' :
                            'bg-error/10 text-error'
                          }`}>{d.status || 'Open'}</span>
                        </td>
                        <td className="px-md py-md font-label-md">${Number(d.amount || 0).toFixed(2)}</td>
                        <td className="px-md py-md text-meta">{d.date || d.createdAt || 'N/A'}</td>
                        <td className="px-md py-md text-right">
                          <span className="material-symbols-outlined text-secondary">chevron_right</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Resolution Panel */}
      {resolutionOpen && selectedDispute && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-lg">
          <div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm" onClick={() => setResolutionOpen(false)}></div>
          <div className="relative bg-surface-container-lowest w-full max-w-3xl rounded-2xl shadow-xl flex flex-col overflow-hidden">
            <div className="px-md py-sm border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <div className="flex items-center gap-sm">
                <span className="px-2 py-1 rounded bg-error/10 text-error font-label-sm">{selectedDispute.id}</span>
                <h3 className="font-headline-md text-headline-md">Dispute Resolution</h3>
              </div>
              <Button variant="ghost" onClick={() => setResolutionOpen(false)} icon={<span className="material-symbols-outlined">close</span>} />
            </div>
            <div className="flex">
              <div className="flex-1 p-md space-y-md bg-background">
                <div>
                  <p className="font-label-sm text-secondary mb-1">Claimant</p>
                  <p className="font-body-md text-on-surface">{selectedDispute.claimant || selectedDispute.claimantName || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-label-sm text-secondary mb-1">Vendor</p>
                  <p className="font-body-md text-on-surface">{selectedDispute.vendor || selectedDispute.vendorName || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-label-sm text-secondary mb-1">Amount</p>
                  <p className="font-body-md font-bold text-on-surface">${Number(selectedDispute.amount || 0).toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-label-sm text-secondary mb-1">Description</p>
                  <p className="font-body-sm text-on-surface-variant">{selectedDispute.description || selectedDispute.reason || 'No description provided.'}</p>
                </div>
                {selectedDispute.status === 'Resolved' && (
                  <div className="p-sm bg-secondary-container/30 rounded-lg">
                    <p className="font-label-sm text-on-secondary-container">Decision: {selectedDispute.decision || 'N/A'}</p>
                  </div>
                )}
              </div>
              <div className="w-80 border-l border-outline-variant p-md bg-surface-container-low space-y-lg">
                <div>
                  <h4 className="font-label-md text-on-surface mb-sm">Arbitration Decision</h4>
                  {selectedDispute.status === 'Resolved' ? (
                    <p className="text-meta text-on-surface-variant italic">This dispute has already been resolved.</p>
                  ) : (
                    <div className="space-y-sm">
                      <Button variant="outline" fullWidth onClick={() => handleArbitration('Buyer')} icon={<span className="material-symbols-outlined text-body-lg">person</span>}>
                        Side with Buyer
                      </Button>
                      <Button variant="outline" fullWidth onClick={() => handleArbitration('Vendor')} icon={<span className="material-symbols-outlined text-body-lg">storefront</span>}>
                        Side with Vendor
                      </Button>
                      <Button variant="primary-container" fullWidth onClick={() => handleArbitration('Refund')} icon={<span className="material-symbols-outlined text-body-lg">gavel</span>}>
                        Execute Refund
                      </Button>
                    </div>
                  )}
                </div>
                <div className="pt-lg border-t border-outline-variant">
                  <p className="text-meta text-on-surface-variant italic leading-relaxed">
                    Refunds will be processed to the original payment method. Decision is final and binding for both parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
