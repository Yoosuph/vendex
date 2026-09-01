import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/shared/context/AuthContext';
import Button from '@/shared/components/Button';
import VendexLogo from '@/shared/components/VendexLogo';
import { cn } from '@/utils/cn';

export default function Sidebar({ brandLabel, brandSubtitle, sections, mobile, closeDrawer }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavClick = () => {
    if (closeDrawer) closeDrawer();
  };

  return (
    <aside className={cn(
      'flex flex-col',
      // Desktop: floating sticky sidebar
      !mobile && 'w-64 bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl border border-outline-variant shadow-lg py-md sticky top-24 self-start z-40 h-[calc(100vh-120px)] mx-4 mb-4 mt-0',
      // Mobile: floating card that fills the drawer
      mobile && 'w-full flex-1 min-h-0 bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl border border-outline-variant shadow-lg overflow-hidden'
    )}>
      {/* Brand header */}
      <div className="px-md mb-lg">
        <VendexLogo size="md" badge={brandSubtitle} linkTo="/" />
      </div>

      {/* Navigation sections */}
      <nav className="flex-1 flex flex-col gap-base overflow-y-auto overscroll-contain hide-scrollbar px-2">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <p className="px-3 buyer-eyebrow text-secondary mb-1">
              {section.title}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                if (item.disabled) {
                  return (
                    <div
                      key={item.name}
                      className="flex items-center px-3 py-2 rounded-lg text-body-sm text-secondary opacity-50 cursor-not-allowed transition-all duration-150"
                    >
                      <span className="material-symbols-outlined mr-sm text-body-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  );
                }
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.end}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      cn(
                        'relative flex items-center px-3 py-2 rounded-xl text-body-sm transition-all duration-200 group active:scale-98',
                        isActive
                          ? 'text-primary font-bold bg-primary/10 border-l-2 border-primary shadow-xs'
                          : 'text-secondary hover:bg-surface-container/70 hover:text-on-surface'
                      )
                    }
                  >
                    <span className="material-symbols-outlined mr-sm text-body-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-md mt-auto pt-md border-t border-outline-variant/30 flex flex-col gap-2">
        {user && (
          <div className="flex items-center gap-xs mb-1">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant shrink-0 bg-surface-container flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="buyer-mono text-[10px] font-semibold text-on-surface">
                  {(user.name || '?').slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-label-sm text-label-sm text-on-surface font-bold truncate">
                {user.name}
              </p>
              <p className="buyer-mono text-[10px] tracking-wider text-secondary uppercase">
                {user.role}
              </p>
            </div>
          </div>
        )}
        <Button
          variant="primary"
          fullWidth
          onClick={() => { logout(); navigate('/login'); }}
          icon={<span className="material-symbols-outlined text-body-lg">logout</span>}
        >
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
