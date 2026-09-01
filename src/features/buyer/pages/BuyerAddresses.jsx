import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/shared/context/AuthContext';
import Button from '@/shared/components/Button';
import EmptyState from '@/shared/components/EmptyState';
import BuyerPageHeader from '../components/BuyerPageHeader';
import { useToast } from '@/shared/context/ToastContext';
import { addressesKey, loadJson, saveJson } from '../utils';
import { cn } from '@/utils/cn';

const emptyForm = {
  label: 'Home',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zip: '',
  country: '',
  phone: '',
  isDefault: false,
};

export default function BuyerAddresses() {
  const { user } = useContext(AuthContext);
  const { addToast } = useToast();
  const key = addressesKey(user?.id);
  const [addresses, setAddresses] = useState([]);
  const [editing, setEditing] = useState(null); // null | 'new' | id
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setAddresses(loadJson(key, []));
  }, [key]);

  const persist = (next) => {
    setAddresses(next);
    saveJson(key, next);
  };

  const openNew = () => {
    setForm({ ...emptyForm, isDefault: addresses.length === 0 });
    setEditing('new');
  };

  const openEdit = (addr) => {
    setForm({ ...addr });
    setEditing(addr.id);
  };

  const save = (e) => {
    e.preventDefault();
    let next;
    if (editing === 'new') {
      const id = `addr_${Date.now()}`;
      const created = { ...form, id };
      next = form.isDefault
        ? [created, ...addresses.map((a) => ({ ...a, isDefault: false }))]
        : [...addresses, created];
      addToast('Address saved', 'success');
    } else {
      next = addresses.map((a) => {
        if (a.id !== editing) {
          return form.isDefault ? { ...a, isDefault: false } : a;
        }
        return { ...form, id: editing };
      });
      addToast('Address updated', 'success');
    }
    persist(next);
    setEditing(null);
    setForm(emptyForm);
  };

  const remove = (id) => {
    const next = addresses.filter((a) => a.id !== id);
    if (next.length && !next.some((a) => a.isDefault)) {
      next[0].isDefault = true;
    }
    persist(next);
    addToast('Address removed', 'info');
  };

  const setDefault = (id) => {
    persist(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    addToast('Default address updated', 'success');
  };

  return (
    <div className="space-y-xl">
      <BuyerPageHeader
        eyebrow="04  /  Addresses"
        title="Shipping addresses"
        description="Saved destinations for faster checkout."
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={openNew}
            icon={<span className="material-symbols-outlined text-lg">add</span>}
          >
            Add address
          </Button>
        }
      />

      {addresses.length === 0 && !editing ? (
        <div className="buyer-panel">
          <EmptyState
            icon="location_on"
            title="No addresses yet"
            description="Add a shipping address for smoother checkouts."
            actionLabel="Add address"
            onAction={openNew}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={cn(
                'buyer-panel p-md flex flex-col gap-sm',
                addr.isDefault && 'ring-1 ring-primary/40',
              )}
            >
              <div className="flex items-start justify-between gap-sm">
                <div>
                  <p className="buyer-mono text-[11px] tracking-widest uppercase text-on-surface-variant">
                    {addr.label || 'Address'}
                  </p>
                  <p className="text-body-sm font-semibold text-on-surface mt-1">
                    {addr.firstName} {addr.lastName}
                  </p>
                </div>
                {addr.isDefault && (
                  <span className="buyer-chip bg-primary/10 text-primary">Default</span>
                )}
              </div>
              <p className="buyer-mono text-[13px] text-on-surface-variant leading-relaxed">
                {addr.address}
                <br />
                {[addr.city, addr.zip].filter(Boolean).join(', ')}
                {addr.country ? (
                  <>
                    <br />
                    {addr.country}
                  </>
                ) : null}
                {addr.phone ? (
                  <>
                    <br />
                    {addr.phone}
                  </>
                ) : null}
              </p>
              <div className="flex flex-wrap gap-sm mt-auto pt-sm border-t buyer-hairline">
                {!addr.isDefault && (
                  <Button variant="ghost" size="sm" onClick={() => setDefault(addr.id)}>
                    Set default
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => openEdit(addr)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => remove(addr.id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close"
            onClick={() => setEditing(null)}
          />
          <form
            onSubmit={save}
            className="relative buyer-panel w-full max-w-lg p-lg shadow-modal space-y-md max-h-[90vh] overflow-y-auto"
          >
            <p className="buyer-eyebrow">
              {editing === 'new' ? 'New address' : 'Edit address'}
            </p>
            <h3 className="text-headline-md font-bold text-on-surface">Shipping details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              {[
                ['label', 'Label', 'Home'],
                ['firstName', 'First name', ''],
                ['lastName', 'Last name', ''],
                ['address', 'Street address', '', 2],
                ['city', 'City', ''],
                ['zip', 'ZIP / Postal', ''],
                ['country', 'Country', ''],
                ['phone', 'Phone', ''],
              ].map(([field, label, ph, span]) => (
                <div key={field} className={span === 2 ? 'sm:col-span-2' : ''}>
                  <label className="buyer-label" htmlFor={field}>{label}</label>
                  <input
                    id={field}
                    className="buyer-input"
                    placeholder={ph}
                    required={['firstName', 'lastName', 'address', 'city', 'zip'].includes(field)}
                    value={form[field] || ''}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
            <label className="flex items-center gap-2 text-body-sm text-on-surface cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.isDefault}
                onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
                className="rounded border-outline-variant text-primary focus:ring-primary"
              />
              Set as default shipping address
            </label>
            <div className="flex justify-end gap-sm">
              <Button type="button" variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">Save address</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
