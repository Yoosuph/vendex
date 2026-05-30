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
  const [sortDir, setSortDir] = useState('desc'); // newest first

  // Sort logs
  const sortedLogs = useMemo(() => {
    const logs = [...auditLogs];
    logs.sort((a, b) => {
      const da = new Date(a.timestamp || 0);
      const db = new Date(b.timestamp || 0);
      return sortDir === 'desc' ? db - da : da - db;
    });
    return logs;
  }, [auditLogs, sortDir]);

  // Filter and search
  const filteredLogs = useMemo(() => {
    return sortedLogs.filter(log => {
      const matchAction = filterAction === 'all' || (log.action || '').toLowerCase().includes(filterAction.toLowerCase());
      const matchSearch = !search ||
        (log.admin || '').toLowerCase().includes(search.toLowerCase()) ||
        (log.action || '').toLowerCase().includes(search.toLowerCase()) ||
        (log.resource || '').toLowerCase().includes(search.toLowerCase());
      return matchAction && matchSearch;
    });
  }, [sortedLogs, filterAction, search]);

  // Stats
  const totalActions = auditLogs.length;
  const uniqueActions = useMemo(() => [...new Set(auditLogs.map(l => l.action))], [auditLogs]);
  const topAdmin = useMemo(() => {
    const counts = {};
    auditLogs.forEach(l => { counts[l.admin] = (counts[l.admin] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0] || ['N/A', 0];
  }, [auditLogs]);

  // Action type badge
  const getActionBadge = (action) => {
    const a = (action || '').toUpperCase();
    if (a.includes('DELETE') || a.includes('SUSPEND') || a.includes('CRITICAL')) return 'bg-error/10 text-error';
    if (a.includes('APPROVE') || a.includes('RESOLVE') || a.includes('ADD')) return 'bg-green-100 text-green-700';
    if (a.includes('EDIT') || a.includes('UPDATE')) return 'bg-orange-100 text-orange-700';
    return 'bg-surface-container text-on-surface-variant';
  };

  if (loading) return <div className="pt-16"><LoadingSpinner text="Loading audit logs..." /></div>;

  return (
    <main className="min-h-screen">
      <section className="pt-24 pb-xl px-gutter max-w-container-max mx-auto">
        <div className="mb-lg flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Audit Logs</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Track all administrative actions across the Vendex ecosystem.</p>
          </div>
          <div className="flex flex-wrap items-center gap-sm">
            <Button variant="outline"><span className="material-symbols-outlined text-body-lg">download</span>
              Export CSV</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-lg">
          <div className="bg-white p-md rounded-xl shadow-sm border border-surface-variant">
            <div className="flex items-center justify-between mb-sm">
              <span className="font-label-md text-label-md text-secondary">Total Actions</span>
              <span className="material-symbols-outlined text-primary">history</span>
            </div>
            <div className="font-headline-md text-headline-md">{totalActions.toLocaleString()}</div>
          </div>
          <div className="bg-white p-md rounded-xl shadow-sm border border-surface-variant">
            <div className="flex items-center justify-between mb-sm">
              <span className="font-label-md text-label-md text-secondary">Unique Types</span>
              <span className="material-symbols-outlined text-error">gpp_maybe</span>
            </div>
            <div className="font-headline-md text-headline-md">{uniqueActions.length}</div>
          </div>
          <div className="bg-white p-md rounded-xl shadow-sm border border-surface-variant">
            <div className="flex items-center justify-between mb-sm">
              <span className="font-label-md text-label-md text-secondary">Top Admin</span>
              <span className="material-symbols-outlined text-secondary">person_check</span>
            </div>
            <div className="font-headline-md text-headline-md">{topAdmin[0]}</div>
            <div className="font-meta text-meta text-secondary mt-xs">{topAdmin[1]} actions</div>
          </div>
          <div className="bg-white p-md rounded-xl shadow-sm border border-surface-variant">
            <div className="flex items-center justify-between mb-sm">
              <span className="font-label-md text-label-md text-secondary">Sort</span>
              <span className="material-symbols-outlined text-secondary">speed</span>
            </div>
            <div className="font-headline-md text-headline-md text-sm">
              <button
                className={cn('px-3 py-1 rounded-lg text-xs font-bold', sortDir === 'desc' ? 'bg-primary text-on-primary' : 'bg-surface-container')}
                onClick={() => setSortDir('desc')}
              >Newest</button>
              <button
                className={cn('px-3 py-1 rounded-lg text-xs font-bold ml-2', sortDir === 'asc' ? 'bg-primary text-on-primary' : 'bg-surface-container')}
                onClick={() => setSortDir('asc')}
              >Oldest</button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-sm rounded-xl border border-outline-variant shadow-sm mb-md flex flex-wrap gap-md items-center">
          <div className="flex-1 min-w-[250px] relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-primary outline-none text-label-md"
              placeholder="Search by admin, action, or resource..."
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="bg-white border border-outline-variant rounded-lg px-md py-2 text-label-md focus:ring-1 focus:ring-primary outline-none"
            value={filterAction}
            onChange={e => setFilterAction(e.target.value)}
          >
            <option value="all">All Actions</option>
            {uniqueActions.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Log Table */}
        {filteredLogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-surface-variant overflow-hidden">
            <EmptyState icon="history" title="No logs found" description={search || filterAction !== 'all' ? 'Try adjusting your filters.' : 'No audit logs recorded yet.'} />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-surface-variant overflow-hidden">
            <div className="custom-scrollbar overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">Timestamp</th>
                    <th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">Administrator</th>
                    <th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">Action Type</th>
                    <th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">Resource</th>
                    <th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">Status</th>
                    <th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredLogs.map((log, i) => {
                    const isFailed = (log.status || '').toLowerCase() === 'failed' || (log.status || '').toLowerCase() === 'critical';
                    return (
                      <tr key={log.id || i} className={cn('hover:bg-surface-container-lowest transition-colors group', isFailed && 'bg-error/5')}>
                        <td className="px-md py-4">
                          <div className="flex flex-col">
                            <span className="font-body-md text-body-md">{log.timestamp || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="px-md py-4">
                          <div className="flex items-center gap-sm">
                            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-label-md text-primary">
                              {log.admin ? log.admin.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'SC'}
                            </div>
                            <span className="font-body-md text-body-md">{log.admin || 'System Core'}</span>
                          </div>
                        </td>
                        <td className="px-md py-4">
                          <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold', getActionBadge(log.action))}>
                            {log.action || 'UNKNOWN'}
                          </span>
                        </td>
                        <td className="px-md py-4">
                          <div className="flex items-center gap-xs">
                            <span className="material-symbols-outlined text-on-surface-variant text-body-lg">
                              {isFailed ? 'dns' : 'inventory_2'}
                            </span>
                            <span className={cn('font-body-sm text-body-sm', isFailed && 'text-error font-bold')}>
                              {log.resource || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="px-md py-4">
                          <span className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface">
                            <span className={cn('w-1.5 h-1.5 rounded-full', isFailed ? 'bg-error' : 'bg-green-500')}></span>
                            {log.status || 'Success'}
                          </span>
                        </td>
                        <td className="px-md py-4 font-meta text-meta text-secondary">{log.ip || 'N/A'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-surface-container-lowest px-md py-sm border-t border-outline-variant flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary">Showing {filteredLogs.length} of {totalActions} entries</span>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
