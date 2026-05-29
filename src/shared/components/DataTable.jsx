import React, { useState, useMemo } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function DataTable({
  columns = [],
  data = [],
  pageSize = 10,
  emptyMessage = 'No data available.',
  loading = false,
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);

  // Sorting
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setCurrentPage(1);
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey] ?? '';
      const bVal = b[sortKey] ?? '';
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      const strA = String(aVal).toLowerCase();
      const strB = String(bVal).toLowerCase();
      if (strA < strB) return sortDir === 'asc' ? -1 : 1;
      if (strA > strB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * itemsPerPage;
  const pageData = sortedData.slice(startIdx, startIdx + itemsPerPage);

  const getSortIcon = (key) => {
    if (sortKey !== key) return 'unfold_more';
    return sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward';
  };

  // Render
  if (loading) {
    return (
      <div className="bg-surface-container-lowest rounded-xl shadow-card p-6">
        <LoadingSpinner text="Loading table data..." size="md" />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-surface-container-lowest rounded-xl shadow-card p-12 flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-on-surface/20 mb-3">table</span>
        <p className="text-body-md text-secondary">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-card overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-outline-variant/20 bg-surface-container-low/50 sticky top-0">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left font-label-sm text-label-sm text-secondary ${
                    col.sortable !== false ? 'cursor-pointer select-none hover:bg-surface-container transition-colors' : ''
                  }`}
                  onClick={() => {
                    if (col.sortable !== false) handleSort(col.key);
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.label}</span>
                    {col.sortable !== false && (
                      <span
                        className="material-symbols-outlined text-base"
                      >
                        {getSortIcon(col.key)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/30 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-body-sm text-on-surface">
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-outline-variant/10">
        {pageData.map((row, idx) => (
          <div key={row.id ?? idx} className="p-4 space-y-2">
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between items-start gap-2">
                <span className="text-meta text-secondary shrink-0">{col.label}</span>
                <span className="text-body-sm text-on-surface text-right">
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer — Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-outline-variant/20 bg-surface-container-low/30">
        <div className="flex items-center gap-2 text-body-sm text-secondary">
          <span>Rows per page:</span>
          <select
            className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-2 py-1 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 text-body-sm text-secondary">
          <span>
            {startIdx + 1}–{Math.min(startIdx + itemsPerPage, sortedData.length)} of {sortedData.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className="p-1.5 rounded-lg hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <span className="material-symbols-outlined text-on-surface">chevron_left</span>
          </button>
          <span className="px-2 text-body-sm text-on-surface font-medium">
            Page {safePage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            className="p-1.5 rounded-lg hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <span className="material-symbols-outlined text-on-surface">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
