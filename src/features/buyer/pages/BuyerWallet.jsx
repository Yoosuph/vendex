import React, { useContext, useEffect, useMemo, useState } from 'react';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import Button from '@/shared/components/Button';
import EmptyState from '@/shared/components/EmptyState';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import BuyerPageHeader from '../components/BuyerPageHeader';
import { useToast } from '@/shared/context/ToastContext';
import {
  formatDate,
  formatMoney,
  loadJson,
  saveJson,
  walletKey,
} from '../utils';
import { cn } from '@/utils/cn';

function defaultWallet(userId, orders) {
  const spend = (orders || [])
    .filter((o) => o.buyerId === userId)
    .reduce((s, o) => s + (Number(o.total) || 0), 0);
  // 2% cashback demo
  const credits = Math.round(spend * 0.02 * 100) / 100;
  return {
    balance: credits,
    currency: 'USD',
    ledger: credits
      ? [
          {
            id: 'seed',
            type: 'credit',
            label: 'Loyalty cashback (2%)',
            amount: credits,
            at: new Date().toISOString(),
          },
        ]
      : [],
  };
}

export default function BuyerWallet() {
  const { user } = useContext(AuthContext);
  const { orders, loading } = useContext(MarketplaceContext);
  const { addToast } = useToast();
  const key = walletKey(user?.id);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    if (!user) return;
    const stored = loadJson(key, null);
    if (stored) {
      setWallet(stored);
    } else {
      const seeded = defaultWallet(user.id, orders);
      setWallet(seeded);
      saveJson(key, seeded);
    }
  }, [user, key, orders]);

  const mySpend = useMemo(() => {
    if (!user || !Array.isArray(orders)) return 0;
    return orders
      .filter((o) => o.buyerId === user.id)
      .reduce((s, o) => s + (Number(o.total) || 0), 0);
  }, [orders, user]);

  const redeem = () => {
    if (!wallet || wallet.balance < 5) {
      addToast('Minimum redeem is $5.00', 'info');
      return;
    }
    const amount = Math.min(wallet.balance, 10);
    const next = {
      ...wallet,
      balance: Math.round((wallet.balance - amount) * 100) / 100,
      ledger: [
        {
          id: `redeem_${Date.now()}`,
          type: 'debit',
          label: 'Redeemed as store credit',
          amount: -amount,
          at: new Date().toISOString(),
        },
        ...wallet.ledger,
      ],
    };
    setWallet(next);
    saveJson(key, next);
    addToast(`Redeemed ${formatMoney(amount)} store credit`, 'success');
  };

  if (loading || !wallet) return <LoadingSpinner text="Loading wallet..." />;

  return (
    <div className="space-y-xl">
      <BuyerPageHeader
        eyebrow="09  /  Wallet"
        title="Wallet & credits"
        description="Loyalty balance earned from marketplace purchases. Demo credits are local to this browser."
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={redeem}
            disabled={wallet.balance < 5}
          >
            Redeem credit
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        <div className="md:col-span-2 buyer-panel p-lg relative overflow-hidden bg-inverse-surface text-inverse-on-surface">
          <div className="absolute inset-0 opacity-20 pattern-bg pointer-events-none" />
          <p className="buyer-eyebrow text-inverse-on-surface/70 relative">Available balance</p>
          <p className="buyer-price text-4xl md:text-5xl mt-sm relative">
            {formatMoney(wallet.balance)}
          </p>
          <p className="buyer-mono text-[11px] tracking-widest uppercase mt-md text-inverse-on-surface/60 relative">
            Vendex credits · {wallet.currency}
          </p>
        </div>
        <div className="space-y-md">
          <div className="buyer-panel p-md">
            <p className="buyer-eyebrow">Lifetime spend</p>
            <p className="buyer-price text-2xl text-on-surface mt-sm">{formatMoney(mySpend)}</p>
          </div>
          <div className="buyer-panel p-md">
            <p className="buyer-eyebrow">Cashback rate</p>
            <p className="buyer-price text-2xl text-on-surface mt-sm">2.00%</p>
          </div>
        </div>
      </div>

      <div className="buyer-panel overflow-hidden">
        <div className="px-md py-sm border-b buyer-hairline">
          <p className="buyer-eyebrow">Ledger</p>
          <h2 className="text-body-md font-semibold text-on-surface mt-1">Activity</h2>
        </div>
        {wallet.ledger.length === 0 ? (
          <EmptyState
            icon="account_balance_wallet"
            title="No activity yet"
            description="Credits appear after completed purchases."
          />
        ) : (
          <ul className="divide-y divide-outline-variant/40">
            {wallet.ledger.map((entry) => (
              <li
                key={entry.id}
                className="px-md py-sm flex items-center justify-between gap-md"
              >
                <div className="min-w-0">
                  <p className="text-body-sm font-medium text-on-surface">{entry.label}</p>
                  <p className="buyer-mono text-[11px] text-on-surface-variant mt-0.5">
                    {formatDate(entry.at)}
                  </p>
                </div>
                <p
                  className={cn(
                    'buyer-price text-body-sm shrink-0',
                    entry.amount >= 0 ? 'text-success' : 'text-error',
                  )}
                >
                  {entry.amount >= 0 ? '+' : ''}
                  {formatMoney(entry.amount)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
