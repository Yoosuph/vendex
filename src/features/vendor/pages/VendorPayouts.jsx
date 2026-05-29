import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import Button from '@/shared/components/Button';

export default function VendorPayouts() {
  const { orders, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const vendorOrders = useMemo(() => {
    if (!user?.vendorId) return [];
    return orders.filter(o =>
      o.items?.some(item => item.vendorId === user.vendorId)
    );
  }, [orders, user]);

  const totalRevenue = useMemo(() =>
    vendorOrders.reduce((sum, o) => sum + (o.total || 0), 0),
    [vendorOrders]
  );

  // Payout history derived from completed orders
  const payoutHistory = useMemo(() => {
    return vendorOrders
      .filter(o => o.status === 'Delivered' || o.status === 'Shipped')
      .map(o => ({
        id: 'PAY-' + o.id.replace('VX-', ''),
        date: o.date,
        amount: o.total || 0,
        status: o.status === 'Delivered' ? 'Completed' : 'Pending',
        destination: 'Chase Bank (****4210)',
      }));
  }, [vendorOrders]);

  // Available balance: 70% of total (simulating commission)
  const availableBalance = totalRevenue * 0.7;
  const pendingClearance = totalRevenue * 0.3;

  const handleConfirmWithdrawal = () => {
    alert(`Withdrawal of $${withdrawAmount || availableBalance.toFixed(2)} has been submitted.`);
    setShowWithdrawModal(false);
    setWithdrawAmount('');
  };

  const processingFee = (parseFloat(withdrawAmount) || availableBalance) * 0.015;
  const totalPayout = (parseFloat(withdrawAmount) || availableBalance) - processingFee;

  if (loading) return <LoadingSpinner text="Loading payouts..." />;

  return (
    <>
      <main className="max-w-container-max mx-auto px-gutter py-xl">
        <nav className="flex items-center gap-xs mb-md text-on-surface-variant font-label-sm">
          <span>Finance</span>
          <span className="material-symbols-outlined text-body-sm">chevron_right</span>
          <span className="text-primary">Vendor Payouts</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-xl">
          <div className="lg:col-span-2 bg-surface-container-lowest p-lg rounded-xl shadow-card border border-surface-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
            <div>
              <h2 className="font-label-md text-label-md text-on-surface-variant mb-base">Available Balance</h2>
              <div className="font-display-lg text-display-lg text-on-surface">${availableBalance.toFixed(2)}</div>
              <p className="text-body-sm text-secondary mt-base">Next scheduled payout: from completed orders</p>
            </div>
            <Button variant="primary-container" onClick={() => setShowWithdrawModal(true)} icon={<span className="material-symbols-outlined">payments</span>}>
              Withdraw Funds
            </Button>
          </div>
          <div className="bg-surface-container-lowest p-lg rounded-xl shadow-card border border-surface-variant flex flex-col justify-between">
            <div>
              <h2 className="font-label-md text-label-md text-on-surface-variant mb-base">Pending Clearance</h2>
              <div className="font-headline-lg text-headline-lg text-on-surface">${pendingClearance.toFixed(2)}</div>
            </div>
            <div className="mt-md pt-md border-t border-outline-variant">
              <div className="flex justify-between items-center text-body-sm">
                <span className="text-on-surface-variant">Lifetime Earnings</span>
                <span className="font-bold text-on-surface">${totalRevenue.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl shadow-card border border-surface-variant overflow-hidden">
          <div className="px-lg py-md border-b border-outline-variant flex items-center justify-between">
            <h3 className="font-headline-md text-headline-md">Payout History</h3>
            <div className="flex gap-sm">
              <Button variant="primary"><span className="material-symbols-outlined text-body-lg">filter_list</span>
                Filter</Button>
              <Button variant="primary"><span className="material-symbols-outlined text-body-lg">download</span>
                Export</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            {payoutHistory.length === 0 ? (
              <div className="p-xl text-center text-secondary">No payout history yet</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container text-on-surface-variant font-label-md text-label-md">
                  <tr>
                    <th className="px-lg py-sm">Reference ID</th>
                    <th className="px-lg py-sm">Date</th>
                    <th className="px-lg py-sm">Destination</th>
                    <th className="px-lg py-sm">Amount</th>
                    <th className="px-lg py-sm">Status</th>
                    <th className="px-lg py-sm text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {payoutHistory.map(payout => (
                    <tr key={payout.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-lg py-md font-medium text-on-surface">#{payout.id}</td>
                      <td className="px-lg py-md text-secondary">{payout.date}</td>
                      <td className="px-lg py-md text-secondary">{payout.destination}</td>
                      <td className="px-lg py-md font-bold text-on-surface">${(payout.amount || 0).toFixed(2)}</td>
                      <td className="px-lg py-md">
                        <span className={`inline-flex items-center px-xs py-0.5 rounded-full text-meta font-bold uppercase tracking-wider ${payout.status === 'Completed' ? 'bg-success-container text-success' : 'bg-error-container text-error'}`}>
                          <span className={`w-1 h-1 rounded-full mr-xs ${payout.status === 'Completed' ? 'bg-success' : 'bg-error'}`}></span>
                          {payout.status}
                        </span>
                      </td>
                      <td className="px-lg py-md text-right">
                        <Button variant="ghost">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="px-lg py-md border-t border-outline-variant flex items-center justify-between">
            <span className="text-body-sm text-on-surface-variant">Showing {payoutHistory.length} payouts</span>
          </div>
        </div>
      </main>

      {showWithdrawModal && (
        <div className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-gutter transition-opacity duration-300" onClick={() => setShowWithdrawModal(false)}>
          <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-xl overflow-hidden scale-100 transition-transform duration-300" onClick={e => e.stopPropagation()}>
            <div className="px-lg py-md border-b border-outline-variant flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md">Withdraw Funds</h3>
              <Button variant="ghost" onClick={() => setShowWithdrawModal(false)} icon={<span className="material-symbols-outlined">close</span>} />
            </div>
            <div className="p-lg">
              <div className="mb-md">
                <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Amount to Withdraw</label>
                <div className="relative">
                  <span className="absolute left-md top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">$</span>
                  <input
                    className="w-full pl-lg pr-md py-sm border border-outline-variant rounded-lg focus:ring-0 focus:border-on-surface font-headline-md transition-all"
                    type="number"
                    value={withdrawAmount || availableBalance.toFixed(2)}
                    onChange={e => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <p className="text-meta text-secondary mt-xs">Maximum available: ${availableBalance.toFixed(2)}</p>
              </div>
              <div className="mb-lg">
                <label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Payout Method</label>
                <div className="flex items-center justify-between p-sm border border-on-surface rounded-lg bg-surface-container-low">
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary">account_balance</span>
                    <div>
                      <p className="font-label-md text-on-surface">Chase Bank</p>
                      <p className="text-meta text-secondary">Checking Account ****4210</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                </div>
              </div>
              <div className="bg-surface-container p-sm rounded-lg mb-lg">
                <div className="flex justify-between items-center mb-xs">
                  <span className="text-body-sm text-secondary">Processing Fee (1.5%)</span>
                  <span className="text-body-sm font-medium text-on-surface">-${processingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-t border-outline-variant pt-xs mt-xs">
                  <span className="font-bold text-on-surface">Total Payout</span>
                  <span className="font-bold text-primary text-headline-md">${totalPayout.toFixed(2)}</span>
                </div>
              </div>
              <Button variant="primary-container" onClick={handleConfirmWithdrawal}>Confirm Withdrawal</Button>
              <p className="text-center text-meta text-secondary mt-md">Funds will be available in your bank account in 1-3 business days.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
