export const ORDER_STATUSES = [
  'All',
  'Processing',
  'Shipped',
  'In Transit',
  'Delivered',
  'Cancelled',
  'Refunded',
];

export const TRACKING_STEPS = ['Processing', 'Shipped', 'In Transit', 'Delivered'];

const STATUS_STYLES = {
  Delivered: 'bg-success-container text-success',
  Shipped: 'bg-info-container text-info',
  Processing: 'bg-warning-container text-warning',
  'In Transit': 'bg-info-container text-info',
  Cancelled: 'bg-error-container text-error',
  Refunded: 'bg-surface-container text-on-surface-variant',
  Pending: 'bg-surface-container text-on-surface-variant',
  Open: 'bg-warning-container text-warning',
  'Under Review': 'bg-info-container text-info',
  Resolved: 'bg-success-container text-success',
  Dismissed: 'bg-surface-container text-on-surface-variant',
};

export function statusBadgeClass(status) {
  return STATUS_STYLES[status] || 'bg-surface-container text-on-surface-variant';
}

export function formatMoney(value, currency = 'USD') {
  const n = Number(value) || 0;
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

export function formatDate(dateString, opts = {}) {
  if (!dateString) return '—';
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return String(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...opts,
    });
  } catch {
    return String(dateString);
  }
}

export function formatDateTime(dateString) {
  return formatDate(dateString, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function trackingStepIndex(status) {
  if (!status || status === 'Cancelled' || status === 'Refunded') return -1;
  const idx = TRACKING_STEPS.indexOf(status);
  if (idx >= 0) return idx;
  if (status === 'Pending') return 0;
  return 0;
}

export function orderDbId(order) {
  return order?.dbId || order?.id;
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('') || '?';
}

/** Local storage helpers for buyer-only client data */
export function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function addressesKey(userId) {
  return `vendex_addresses_${userId || 'anon'}`;
}

export function followedKey(userId) {
  return `vendex_followed_${userId || 'anon'}`;
}

export function walletKey(userId) {
  return `vendex_wallet_${userId || 'anon'}`;
}

export function reviewedKey(userId) {
  return `vendex_reviewed_${userId || 'anon'}`;
}
