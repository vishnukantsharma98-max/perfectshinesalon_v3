/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { ThemeProvider } from './theme/ThemeContext';
import { BookingProvider, useBooking } from './context/BookingContext';
import { TopNavigationHeader } from './components/navigation/TopNavigationHeader';
import { MobileBottomBar } from './components/navigation/MobileBottomBar';
import { HomePage } from './components/home/HomePage';
import { EnrichBookingSystem } from './components/booking/EnrichBookingSystem';
import { ContactPage } from './components/contact/ContactPage';
import { BookingFlowModal } from './components/booking/BookingFlowModal';
import { CartDrawerAndSheet } from './components/booking/CartDrawerAndSheet';
import { FloatingWhatsApp } from './components/cta/FloatingWhatsApp';
import { Footer } from './components/footer/Footer';
import { SplashScreen } from './components/common/SplashScreen';

function MainAppShell() {
  const { activePage } = useBooking();
  const shouldReduceMotion = useReducedMotion();
  const [hasSplashFinished, setHasSplashFinished] = useState(false);

  // Page Routing Transitions variants
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.38,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -14,
      transition: {
        duration: 0.22,
        ease: 'easeIn',
      },
    },
  };

  return (
    <div className="min-h-screen bg-white text-[#18181B] flex flex-col font-sans selection:bg-[#D61C4E]/20 selection:text-[#D61C4E] relative">
      {/* 1. Initial Load Splash Sequence */}
      <SplashScreen onComplete={() => setHasSplashFinished(true)} />

      {/* 2. Desktop & Tablet Top Navigation (z-40) */}
      <TopNavigationHeader />

      {/* 3. Seamless Page Routing Transitions via <AnimatePresence mode="wait"> */}
      <main className="flex-1 bg-white relative">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div
              key="page-home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ willChange: 'transform, opacity' }}
            >
              <HomePage isSplashComplete={hasSplashFinished} />
            </motion.div>
          )}

          {activePage === 'services' && (
            <motion.div
              key="page-services"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ willChange: 'transform, opacity' }}
            >
              <EnrichBookingSystem />
            </motion.div>
          )}

          {activePage === 'contact' && (
            <motion.div
              key="page-contact"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ willChange: 'transform, opacity' }}
            >
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Global Footer */}
      <Footer />

      {/* 5. Single Floating WhatsApp Concierge (z-30) */}
      <FloatingWhatsApp />

      {/* 6. Mobile Fixed Bottom Navigation Bar with LayoutId Indicator (z-40) */}
      <MobileBottomBar />

      {/* 7. Responsive Cart Architecture: Desktop Side-Drawer & Mobile Spring Bottom Sheet (z-50) */}
      <CartDrawerAndSheet />

      {/* 8. Unified Choreographed 3-Step Booking Modal (z-60) */}
      <BookingFlowModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BookingProvider>
        <MainAppShell />
      </BookingProvider>
    </ThemeProvider>
  );
}
