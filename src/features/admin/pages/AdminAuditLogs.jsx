import React, { useState, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

export default function AdminAuditLogs() {
  const { auditLogs, loading } = useContext(MarketplaceContext);

  const [search, setSearch] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [sortDir, setSortDir] = useState('desc');

  const logs = auditLogs || [];

  const uniqueActions = useMemo(() => {
    return [...new Set(logs.map((l) => l.action).filter(Boolean))];
  }, [logs]);

  const filteredLogs = useMemo(() => {
    return logs
      .filter((l) => {
        const matchSearch =
          !search ||
          (l.admin || '').toLowerCase().includes(search.toLowerCase()) ||
          (l.action || '').toLowerCase().includes(search.toLowerCase()) ||
          (l.resource || '').toLowerCase().includes(search.toLowerCase());
        const matchAction = filterAction === 'all' || l.action === filterAction;
        return matchSearch && matchAction;
      })
      .sort((a, b) => {
        const timeA = new Date(a.timestamp || 0).getTime();
        const timeB = new Date(b.timestamp || 0).getTime();
        return sortDir === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [logs, search, filterAction, sortDir]);

  const totalActions = logs.length;
  const topAdmin = useMemo(() => {
    const counts = {};
    logs.forEach((l) => {
      if (l.admin) counts[l.admin] = (counts[l.admin] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
    return sorted[0] || ['None', 0];
  }, [logs]);

  if (loading) return <LoadingSpinner text="Loading audit trail..." />;

  return (
    <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24">
      {/* Header */}
      <div>
        <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">System Audit Trail</h1>
        <p className="font-body-md text-sm sm:text-base text-secondary">
          Chronological record of administrative operations, security events, and role updates.
        </p>
      </div>

      {/* KPI Cards (2-col mobile, 4-col desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-gutter">
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-subtle">
          <span className="text-xs font-semibold text-secondary uppercase">Total Events</span>
          <p className="text-xl sm:text-2xl font-bold text-on-surface mt-1">{totalActions.toLocaleString()}</p>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-subtle">
          <span className="text-xs font-semibold text-secondary uppercase">Action Types</span>
          <p className="text-xl sm:text-2xl font-bold text-primary mt-1">{uniqueActions.length}</p>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-subtle">
          <span className="text-xs font-semibold text-secondary uppercase">Active Admin</span>
          <p className="text-xl sm:text-2xl font-bold text-on-surface mt-1 truncate">{topAdmin[0]}</p>
          <span className="text-[11px] text-secondary mt-0.5 block">{topAdmin[1]} actions</span>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-subtle">
          <span className="text-xs font-semibold text-secondary uppercase">Sort Order</span>
          <div className="flex gap-1.5 mt-2">
            <button
              onClick={() => setSortDir('desc')}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors',
                sortDir === 'desc' ? 'bg-primary text-white' : 'bg-surface-container-low text-secondary'
              )}
            >
              Newest
            </button>
            <button
              onClick={() => setSortDir('asc')}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors',
                sortDir === 'asc' ? 'bg-primary text-white' : 'bg-surface-container-low text-secondary'
              )}
            >
              Oldest
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/40 shadow-subtle flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">search</span>
          <input
            type="text"
            placeholder="Search by administrator, action, or target resource..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary text-on-surface"
          />
        </div>
        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="bg-surface-container-low border border-outline-variant/40 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary text-on-surface"
        >
          <option value="all">All Action Types</option>
          {uniqueActions.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Table / Mobile Cards */}
      {filteredLogs.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-8 text-center shadow-subtle">
          <EmptyState icon="history" title="No audit records" description={search ? 'Try adjusting your search criteria.' : 'No audit events recorded.'} />
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredLogs.map((log) => (
              <div key={log.id} className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/40 shadow-subtle flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-on-surface">{log.action}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-success-container text-success uppercase">
                    {log.status || 'Success'}
                  </span>
                </div>
                <p className="text-xs text-secondary">{log.resource}</p>
                <div className="flex items-center justify-between border-t border-outline-variant/30 pt-2 text-[11px] text-secondary">
                  <span>By: <strong className="text-on-surface">{log.admin}</strong></span>
                  <span>{log.timestamp}</span>
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
                    <th className="px-4 py-3 font-semibold">Timestamp</th>
                    <th className="px-4 py-3 font-semibold">Administrator</th>
                    <th className="px-4 py-3 font-semibold">Action</th>
                    <th className="px-4 py-3 font-semibold">Resource</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold text-right">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 text-sm">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-4 py-3 text-secondary text-xs">{log.timestamp}</td>
                      <td className="px-4 py-3 font-semibold text-on-surface">{log.admin}</td>
                      <td className="px-4 py-3 font-medium text-primary">{log.action}</td>
                      <td className="px-4 py-3 text-on-surface truncate max-w-xs">{log.resource}</td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-container text-success">
                          {log.status || 'Success'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-secondary text-xs">{log.ip || '127.0.0.1'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
