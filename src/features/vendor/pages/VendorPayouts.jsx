import React, { useContext, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import Button from '@/shared/components/Button';
import EmptyState from '@/shared/components/EmptyState';
import { cn } from '@/utils/cn';

export default function VendorPayouts() {
  const { orders, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const vendorOrders = useMemo(() => {
    if (!user?.vendorId) return [];
    return (orders || []).filter((o) =>
      o.items?.some((item) => item.vendorId === user.vendorId)
    );
  }, [orders, user]);

  const totalRevenue = useMemo(
    () => vendorOrders.reduce((sum, o) => sum + (o.total || 0), 0),
    [vendorOrders]
  );

  const payoutHistory = useMemo(() => {
    return vendorOrders
      .filter((o) => o.status === 'Delivered' || o.status === 'Shipped')
      .map((o) => ({
        id: 'PAY-' + String(o.id).replace('VX-', ''),
        date: o.date || 'Recent',
        amount: o.total || 0,
        status: o.status === 'Delivered' ? 'Completed' : 'Pending',
        destination: 'Chase Bank (****4210)',
      }));
  }, [vendorOrders]);

  const availableBalance = totalRevenue * 0.7;
  const pendingClearance = totalRevenue * 0.3;

  const handleConfirmWithdrawal = () => {
    setShowWithdrawModal(false);
    setWithdrawSuccess(true);
    setWithdrawAmount('');
    setTimeout(() => setWithdrawSuccess(false), 3000);
  };

  const parsedAmount = parseFloat(withdrawAmount) || availableBalance;
  const processingFee = parsedAmount * 0.015;
  const totalPayout = Math.max(0, parsedAmount - processingFee);

  if (loading) return <LoadingSpinner text="Loading payouts..." />;

  return (
    <>
      {withdrawSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-success-container text-success px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce border border-success/30">
          <span className="material-symbols-outlined text-xl">check_circle</span>
          <span className="font-semibold text-sm">Withdrawal submitted successfully!</span>
        </div>
      )}

      <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Vendor Payouts</h1>
            <p className="font-body-md text-sm sm:text-base text-secondary">
              Track vendor settlement balances and transfer earnings to your bank account.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowWithdrawModal(true)}
            icon={<span className="material-symbols-outlined text-lg">payments</span>}
            className="self-start sm:self-auto rounded-xl"
          >
            Withdraw Funds
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-gutter">
          <div className="md:col-span-2 bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-subtle border border-outline-variant/40 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Available Balance</span>
              <p className="text-3xl sm:text-4xl font-black text-primary buyer-price mt-1">
                ${availableBalance.toFixed(2)}
              </p>
              <span className="text-xs text-secondary mt-1 block">Automatic payouts on the 1st and 15th</span>
            </div>
            <Button
              variant="primary-container"
              size="md"
              onClick={() => setShowWithdrawModal(true)}
              className="rounded-xl self-start sm:self-auto"
            >
              Instant Transfer
            </Button>
          </div>

          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-subtle border border-outline-variant/40 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Pending Clearance</span>
              <p className="text-2xl font-bold text-on-surface buyer-price mt-1">${pendingClearance.toFixed(2)}</p>
            </div>
            <div className="border-t border-outline-variant/30 pt-3 mt-4 flex justify-between items-baseline text-xs">
              <span className="text-secondary font-medium">Lifetime Gross</span>
              <span className="font-bold text-on-surface buyer-price text-sm">${totalRevenue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payout History Section */}
        <section className="bg-surface-container-lowest rounded-2xl shadow-subtle border border-outline-variant/40 overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex items-center justify-between">
            <h2 className="font-bold text-base sm:text-lg text-on-surface">Settlement History</h2>
            <span className="text-xs text-secondary font-medium">{payoutHistory.length} payouts</span>
          </div>

          {payoutHistory.length === 0 ? (
            <div className="p-8 text-center text-secondary text-sm">
              <EmptyState icon="account_balance_wallet" title="No payout history" description="Settlements will appear once orders are marked delivered." />
            </div>
          ) : (
            <>
              {/* Dedicated Mobile Cards */}
              <div className="md:hidden divide-y divide-outline-variant/30">
                {payoutHistory.map((p) => (
                  <div key={p.id} className="p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-primary text-xs">#{p.id}</span>
                      <span
                        className={cn(
                          'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase',
                          p.status === 'Completed' ? 'bg-success-container text-success' : 'bg-warning-container text-warning'
                        )}
                      >
                        {p.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-secondary">{p.destination}</span>
                      <span className="font-bold text-sm text-on-surface buyer-price">${p.amount.toFixed(2)}</span>
                    </div>
                    <span className="text-[11px] text-secondary">{p.date}</span>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Reference</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Destination</th>
                      <th className="px-4 py-3 font-semibold text-right">Amount</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30 text-sm">
                    {payoutHistory.map((p) => (
                      <tr key={p.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-primary">#{p.id}</td>
                        <td className="px-4 py-3 text-secondary">{p.date}</td>
                        <td className="px-4 py-3 text-secondary">{p.destination}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-on-surface">${p.amount.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              'px-2.5 py-0.5 rounded-full text-xs font-semibold',
                              p.status === 'Completed' ? 'bg-success-container text-success' : 'bg-warning-container text-warning'
                            )}
                          >
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </div>

      {/* Withdrawal Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowWithdrawModal(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-surface-container-lowest w-full max-w-md rounded-3xl shadow-2xl overflow-hidden z-10 p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
                <h3 className="font-bold text-lg text-on-surface">Withdraw Settlement</h3>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary uppercase mb-1.5">
                  Amount to Withdraw
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-secondary">$</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder={availableBalance.toFixed(2)}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/50 rounded-xl font-bold text-lg outline-none focus:border-primary"
                  />
                </div>
                <span className="text-xs text-secondary mt-1 block">Max available: ${availableBalance.toFixed(2)}</span>
              </div>

              <div className="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/40 space-y-2 text-xs">
                <div className="flex justify-between text-secondary">
                  <span>Processing Fee (1.5%)</span>
                  <span>-${processingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-on-surface border-t border-outline-variant/40 pt-2">
                  <span>Net Transfer</span>
                  <span className="text-primary buyer-price font-black">${totalPayout.toFixed(2)}</span>
                </div>
              </div>

              <Button variant="primary" fullWidth size="lg" onClick={handleConfirmWithdrawal} className="rounded-xl">
                Confirm Withdrawal
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
