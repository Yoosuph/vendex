import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/shared/components/Button';

const STORAGE_KEY = 'vendex_roles_permissions';

const DEFAULT_ROLES = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    icon: 'shield_person',
    description: 'Full system access, including financial settlements and root configs.',
    active: true,
    permissions: {
      system_architecture: true,
      security_audit_logs: true,
      gateway_management: true,
      commission_rules: true,
      refund_override: true,
      bulk_notification: true,
      marketing_automation: true,
    }
  },
  {
    id: 'support_lead',
    name: 'Support Lead',
    icon: 'support_agent',
    description: 'Manage customer disputes, refunds, and support ticket escalations.',
    active: true,
    permissions: {
      system_architecture: false,
      security_audit_logs: false,
      gateway_management: false,
      commission_rules: false,
      refund_override: true,
      bulk_notification: true,
      marketing_automation: false,
    }
  },
  {
    id: 'vendor_manager',
    name: 'Vendor Manager',
    icon: 'inventory_2',
    description: 'Onboard new sellers and audit inventory compliance.',
    active: true,
    permissions: {
      system_architecture: false,
      security_audit_logs: false,
      gateway_management: false,
      commission_rules: true,
      refund_override: false,
      bulk_notification: false,
      marketing_automation: false,
    }
  },
  {
    id: 'data_analyst',
    name: 'Data Analyst',
    icon: 'analytics',
    description: 'Read-only access to sales reports and conversion metrics.',
    active: true,
    permissions: {
      system_architecture: false,
      security_audit_logs: true,
      gateway_management: false,
      commission_rules: false,
      refund_override: false,
      bulk_notification: false,
      marketing_automation: false,
    }
  }
];

const PERMISSION_GROUPS = [
  {
    label: 'CORE PLATFORM ACCESS',
    icon: 'terminal',
    permissions: [
      { key: 'system_architecture', label: 'System Architecture Access', description: 'Modify global environment variables and CDN settings' },
      { key: 'security_audit_logs', label: 'Security Audit Logs', description: 'View and export system-wide security event logs' },
    ]
  },
  {
    label: 'FINANCIAL OPERATIONS',
    icon: 'account_balance',
    permissions: [
      { key: 'gateway_management', label: 'Gateway Management', description: 'Toggle payment methods and configure API keys' },
      { key: 'commission_rules', label: 'Commission Rules', description: 'Define percentage cuts for marketplace categories' },
      { key: 'refund_override', label: 'Refund Override', description: 'Bypass standard refund policy for manual corrections' },
    ]
  },
  {
    label: 'COMMUNICATIONS & CRM',
    icon: 'campaign',
    permissions: [
      { key: 'bulk_notification', label: 'Bulk Notification Blast', description: 'Send push notifications to all vendors and customers' },
      { key: 'marketing_automation', label: 'Marketing Automation', description: 'Configure email triggers for abandoned carts' },
    ]
  }
];

export default function AdminRolesPermissions() {
  const [roles, setRoles] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_ROLES;
  });
  const [selectedRoleId, setSelectedRoleId] = useState(roles[0]?.id || 'super_admin');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
  }, [roles]);

  const selectedRole = roles.find(r => r.id === selectedRoleId) || roles[0];

  const togglePermission = (permKey) => {
    setRoles(prev => prev.map(r =>
      r.id === selectedRoleId
        ? { ...r, permissions: { ...r.permissions, [permKey]: !r.permissions[permKey] } }
        : r
    ));
  };

  const selectAll = () => {
    setRoles(prev => prev.map(r =>
      r.id === selectedRoleId
        ? { ...r, permissions: Object.fromEntries(Object.keys(r.permissions).map(k => [k, true])) }
        : r
    ));
  };

  const clearAll = () => {
    setRoles(prev => prev.map(r =>
      r.id === selectedRoleId
        ? { ...r, permissions: Object.fromEntries(Object.keys(r.permissions).map(k => [k, false])) }
        : r
    ));
  };

  return (
    <main className="pt-16 h-screen overflow-hidden flex flex-col bg-background">
      <div className="flex-1 flex overflow-hidden">
        {/* Role sidebar */}
        <section className="w-80 border-r border-outline-variant bg-surface-container-low p-md flex flex-col overflow-y-auto custom-scrollbar">
          <div className="mb-6">
            <h2 className="font-headline-md text-on-surface mb-1">User Roles</h2>
            <p className="font-body-sm text-on-surface-variant">Select a role to configure permissions</p>
          </div>
          <div className="space-y-3">
            {roles.map(role => (
              <Button
                key={role.id}
                variant="ghost"
                fullWidth
                onClick={() => setSelectedRoleId(role.id)}
                icon={<span className="material-symbols-outlined" style={selectedRoleId === role.id ? { fontVariationSettings: "'FILL' 1" } : {}}>{role.icon}</span>}
              >
                <div className="flex items-center gap-xs mb-1">
                  <h3 className="font-label-md font-bold text-on-surface">{role.name}</h3>
                  {selectedRoleId === role.id && (
                    <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed-variant text-meta font-bold rounded uppercase tracking-wider">Active</span>
                  )}
                </div>
                <p className="font-meta text-on-surface-variant leading-relaxed">{role.description}</p>
              </Button>
            ))}
          </div>
        </section>

        {/* Permissions panel */}
        <section className="flex-1 p-lg overflow-y-auto custom-scrollbar bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary font-bold text-body-sm tracking-widest uppercase">Configuration</span>
                </div>
                <h2 className="font-headline-lg text-on-surface">{selectedRole.name} Permissions</h2>
              </div>
              <div className="flex gap-3">
                <Button variant="primary" onClick={selectAll}>Select All</Button>
                <Button variant="primary" onClick={clearAll}>Clear All</Button>
              </div>
            </div>

            <div className="space-y-12">
              {PERMISSION_GROUPS.map(group => (
                <div key={group.label}>
                  <h3 className="font-label-md font-bold text-on-surface-variant mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">{group.icon}</span>
                    {group.label}
                  </h3>
                  <div className="grid grid-cols-1 gap-px bg-outline-variant border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                    {group.permissions.map(perm => (
                      <div key={perm.key} className="bg-white p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                        <div>
                          <p className="font-label-md text-on-surface">{perm.label}</p>
                          <p className="font-meta text-on-surface-variant">{perm.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            checked={selectedRole.permissions[perm.key] || false}
                            onChange={() => togglePermission(perm.key)}
                            className="sr-only"
                            type="checkbox"
                          />
                          <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${selectedRole.permissions[perm.key] ? 'bg-primary' : 'bg-outline-variant'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${selectedRole.permissions[perm.key] ? 'translate-x-5' : ''}`}></div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-20"></div>
          </div>
        </section>
      </div>
    </main>
  );
}
