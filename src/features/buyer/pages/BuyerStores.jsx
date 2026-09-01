import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '@/shared/context/AuthContext';
import Button from '@/shared/components/Button';
import EmptyState from '@/shared/components/EmptyState';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import BuyerPageHeader from '../components/BuyerPageHeader';
import { useToast } from '@/shared/context/ToastContext';
import * as vendorsApi from '@/shared/api/vendors';
import {
  followedKey,
  loadJson,
  saveJson,
  initials,
} from '../utils';
import { cn } from '@/utils/cn';

export default function BuyerStores() {
  const { user } = useContext(AuthContext);
  const { addToast } = useToast();
  const key = followedKey(user?.id);
  const [followed, setFollowed] = useState(() => loadJson(key, []));
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('following');

  useEffect(() => {
    setFollowed(loadJson(key, []));
  }, [key]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await vendorsApi.getVendors({ status: 'approved' });
        if (!cancelled) setVendors(data.vendors || data || []);
      } catch {
        if (!cancelled) setVendors([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const followedSet = useMemo(
    () => new Set(followed.map((f) => f.vendorId)),
    [followed],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = vendors;
    if (tab === 'following') {
      list = vendors.filter((v) => followedSet.has(v.vendorId));
    }
    if (q) {
      list = list.filter(
        (v) =>
          v.storeName?.toLowerCase().includes(q) ||
          v.name?.toLowerCase().includes(q) ||
          v.storeCategory?.toLowerCase().includes(q) ||
          v.vendorId?.toLowerCase().includes(q),
      );
    }
    return list;
  }, [vendors, tab, query, followedSet]);

  const toggleFollow = (vendor) => {
    const id = vendor.vendorId;
    if (!id) return;
    let next;
    if (followedSet.has(id)) {
      next = followed.filter((f) => f.vendorId !== id);
      addToast(`Unfollowed ${vendor.storeName || vendor.name}`, 'info');
    } else {
      next = [
        ...followed,
        {
          vendorId: id,
          storeName: vendor.storeName || vendor.name,
          name: vendor.name,
          storeCategory: vendor.storeCategory,
          followedAt: new Date().toISOString(),
        },
      ];
      addToast(`Following ${vendor.storeName || vendor.name}`, 'success');
    }
    setFollowed(next);
    saveJson(key, next);
  };

  if (loading) return <LoadingSpinner text="Loading stores..." />;

  return (
    <div className="space-y-xl">
      <BuyerPageHeader
        eyebrow="08  /  Stores"
        title="Followed stores"
        description="Bookmark vendors you love and jump back into their catalogs."
      />

      <div className="flex flex-col sm:flex-row gap-md sm:items-center justify-between">
        <div className="flex gap-1 bg-surface-container-low p-1 rounded-xl w-fit">
          {[
            { id: 'following', label: 'Following', count: followed.length },
            { id: 'discover', label: 'Discover', count: vendors.length },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                'px-md py-sm rounded-lg buyer-mono text-[11px] tracking-wide uppercase transition-colors',
                tab === t.id
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                  : 'text-on-surface-variant',
              )}
            >
              {t.label}
              <span className="ml-1.5 opacity-60">
                {String(t.count).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
        <div className="relative max-w-sm w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
            search
          </span>
          <input
            type="search"
            className="buyer-input pl-10 buyer-mono text-sm"
            placeholder="Search stores"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="buyer-panel">
          <EmptyState
            icon="store"
            title={tab === 'following' ? 'Not following anyone yet' : 'No stores found'}
            description={
              tab === 'following'
                ? 'Discover vendors and follow them to pin their shops here.'
                : 'Try another search.'
            }
            actionLabel={tab === 'following' ? 'Discover stores' : undefined}
            onAction={tab === 'following' ? () => setTab('discover') : undefined}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
          {filtered.map((v) => {
            const isFollowed = followedSet.has(v.vendorId);
            const title = v.storeName || v.name || v.vendorId;
            return (
              <div key={v.vendorId || v.id} className="buyer-panel p-md flex flex-col gap-md">
                <div className="flex items-start gap-sm">
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                    <span className="buyer-mono text-sm font-semibold text-on-surface">
                      {initials(title)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-body-sm font-semibold text-on-surface truncate">{title}</p>
                    <p className="buyer-mono text-[11px] text-on-surface-variant mt-0.5 tracking-wide">
                      {v.storeCategory || 'Marketplace'}
                      {typeof v.productCount === 'number'
                        ? ` · ${v.productCount} products`
                        : ''}
                    </p>
                  </div>
                </div>
                {v.storeDescription && (
                  <p className="text-body-sm text-on-surface-variant line-clamp-2">
                    {v.storeDescription}
                  </p>
                )}
                <div className="flex gap-sm mt-auto pt-sm border-t buyer-hairline">
                  <Button
                    variant="outline"
                    size="sm"
                    to={`/store/${v.vendorId}`}
                    className="flex-1"
                  >
                    Visit store
                  </Button>
                  <Button
                    variant={isFollowed ? 'ghost' : 'primary'}
                    size="sm"
                    onClick={() => toggleFollow(v)}
                  >
                    {isFollowed ? 'Unfollow' : 'Follow'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'following' && followed.length > 0 && filtered.length > 0 && (
        <p className="buyer-mono text-[11px] text-on-surface-variant text-center">
          Following is stored on this device for demo convenience.
        </p>
      )}
    </div>
  );
}
