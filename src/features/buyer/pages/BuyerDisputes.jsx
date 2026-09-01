import React, { useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';
import BuyerPageHeader from '../components/BuyerPageHeader';
import {
  formatDate,
  formatMoney,
  statusBadgeClass,
} from '../utils';
import { cn } from '@/utils/cn';

export default function BuyerDisputes() {
  const { disputes, orders, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const myDisputes = useMemo(() => {
    if (!user || !Array.isArray(disputes)) return [];
    return [...disputes]
      .filter(
        (d) => d.claimantId === user.id || d.claimantName === user.name,
      )
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [disputes, user]);

  const openOrders = useMemo(() => {
    if (!user || !Array.isArray(orders)) return [];
    return orders.filter(
      (o) =>
        o.buyerId === user.id &&
        ['Delivered', 'Shipped', 'In Transit', 'Processing'].includes(o.status),
    );
  }, [orders, user]);

  if (loading) return <LoadingSpinner text="Loading disputes..." />;

  return (
    <div className="space-y-xl">
      <BuyerPageHeader
        eyebrow="06  /  Disputes"
        title="Claims & disputes"
        description="Track open claims against orders. Open a new claim from any order detail page."
        actions={
          openOrders.length > 0 ? (
            <Button variant="outline" size="sm" to="/buyer/orders">
              Browse orders
            </Button>
          ) : null
        }
      />

      {myDisputes.length === 0 ? (
        <div className="buyer-panel">
          <EmptyState
            icon="gavel"
            title="No disputes"
            description="If something goes wrong with an order, you can open a claim from the order detail page."
            actionLabel="View orders"
            onAction={() => navigate('/buyer/orders')}
          />
        </div>
      ) : (
        <div className="space-y-sm">
          {myDisputes.map((d) => (
            <div key={d.id} className="buyer-panel p-md sm:p-lg">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-md">
                <div className="min-w-0">
                  <div className="flex items-center gap-sm flex-wrap">
                    <span className="buyer-mono text-meta text-on-surface-variant">
                      #{d.displayId || d.id}
                    </span>
                    <span className={cn('buyer-chip', statusBadgeClass(d.status))}>
                      {d.status}
                    </span>
                  </div>
                  <h3 className="text-body-md font-semibold text-on-surface mt-1">
                    {d.reason}
                  </h3>
                  {d.description && (
                    <p className="text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                      {d.description}
                    </p>
                  )}
                  <p className="buyer-mono text-[11px] text-on-surface-variant mt-2 tracking-wide">
                    {formatDate(d.createdAt)}
                    {d.vendorName ? ` · ${d.vendorName}` : ''}
                    {d.decision ? ` · Decision: ${d.decision}` : ''}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="buyer-price text-body-lg text-on-surface">
                    {formatMoney(d.amount)}
                  </p>
                  {d.orderId && (
                    <Link
                      to={`/buyer/order-detail/${
                        orders?.find((o) => o.dbId === d.orderId || o.id === d.orderId)?.id ||
                        d.orderId
                      }`}
                      className="buyer-mono text-[11px] text-primary hover:underline mt-1 inline-block"
                    >
                      View order →
                    </Link>
                  )}
                </div>
              </div>
              {d.decisionNotes && (
                <div className="mt-md pt-md border-t buyer-hairline">
                  <p className="buyer-eyebrow mb-1">Resolution notes</p>
                  <p className="text-body-sm text-on-surface-variant">{d.decisionNotes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
