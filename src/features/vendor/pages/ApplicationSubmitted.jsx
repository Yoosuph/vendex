import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '@/shared/context/AuthContext';
import Button from '@/shared/components/Button';

export default function ApplicationSubmitted() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-gutter py-xl">
      <div className="w-full max-w-[520px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface-container-lowest rounded-2xl shadow-card border border-outline-variant/30 overflow-hidden text-center"
        >
          {/* Top accent */}
          <div className="h-1 bg-success" />

          <div className="p-xl sm:p-2xl">
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-success-container flex items-center justify-center mx-auto mb-lg"
            >
              <span className="material-symbols-outlined text-4xl text-on-success-container icon-filled">check_circle</span>
            </motion.div>

            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Application submitted!</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg max-w-sm mx-auto">
              Your store is now under review. We'll notify you at <span className="font-medium text-on-surface">{user?.email || 'your email'}</span> once approved.
            </p>

            {/* Timeline */}
            <div className="bg-surface-container-low rounded-xl p-md mb-lg text-left">
              <h3 className="font-label-md text-label-md text-on-surface mb-md">What happens next</h3>
              <div className="space-y-md">
                {[
                  { icon: 'search', label: 'Review', desc: 'Our team reviews your application', time: '24-48 hours', done: false },
                  { icon: 'notifications_active', label: 'Notification', desc: "You'll receive an email when approved", time: 'Instant', done: false },
                  { icon: 'rocket_launch', label: 'Go Live', desc: 'Add products and start selling', time: 'After approval', done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-label-md text-label-md text-on-surface">{item.label}</p>
                        <span className="text-meta text-on-surface-variant">{item.time}</span>
                      </div>
                      <p className="text-body-sm text-on-surface-variant">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                fullWidth
                onClick={() => navigate('/vendor')}
                icon={<span className="material-symbols-outlined text-lg">dashboard</span>}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/')}
                icon={<span className="material-symbols-outlined text-lg">home</span>}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Help link */}
        <p className="text-center text-meta text-on-surface-variant mt-lg">
          Questions? <span className="text-primary font-medium hover:underline cursor-pointer">Contact Vendor Support</span>
        </p>
      </div>
    </div>
  );
}
