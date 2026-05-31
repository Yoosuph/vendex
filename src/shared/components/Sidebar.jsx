import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/shared/context/AuthContext';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

export default function Sidebar({ brandLabel, brandSubtitle, sections, mobile }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <aside className={cn(
      'flex flex-col',
      // Desktop: floating sticky sidebar
      !mobile && 'w-64 bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl border border-outline-variant shadow-lg py-md sticky top-[62px] self-start z-40 h-[calc(100vh-94px)] m-4',
      // Mobile: floating card that fills the drawer
      mobile && 'w-full flex-1 min-h-0 bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl border border-outline-variant shadow-lg overflow-hidden'
    )}>
      {/* Brand header */}
      <div className="px-md mb-lg">
        <h1
          className="font-headline-md text-headline-md font-bold text-primary cursor-pointer"
          onClick={() => navigate('/')}
        >
          {brandLabel || 'Vendex'}
        </h1>
        {brandSubtitle && (
          <p className="font-body-sm text-body-sm text-secondary">{brandSubtitle}</p>
        )}
      </div>

      {/* Navigation sections */}
      <nav className="flex-1 flex flex-col gap-base overflow-y-auto overscroll-contain hide-scrollbar px-2">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <p className="px-3 text-meta font-bold text-secondary uppercase tracking-widest mb-1">
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
                    className={({ isActive }) =>
                      cn(
                        'flex items-center px-3 py-2 rounded-lg text-body-sm transition-all duration-150 active:scale-95',
                        isActive
                          ? 'text-primary font-bold border-r-4 border-primary bg-primary-container/10'
                          : 'text-secondary hover:bg-surface-container hover:text-on-surface'
                      )
                    }
                  >
                    <span className="material-symbols-outlined mr-sm text-body-lg">{item.icon}</span>
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
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-label-sm text-label-sm text-on-surface font-bold truncate">
                {user.name}
              </p>
              <p className="font-meta text-meta text-secondary capitalize">{user.role}</p>
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
