/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceItem } from '../types/service';
import { SALONS_DATA, SalonOutlet } from '../data/salons';
import { getServicePrice, formatPriceINR } from '../utils/pricing';

export interface ClientDetails {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export interface ConfirmedBookingInfo {
  bookingId: string;
  services: ServiceItem[];
  outlet: SalonOutlet;
  serviceMode: 'salon' | 'home';
  date: string;
  dateLabel: string;
  timeSlot: string;
  stylist: string;
  client: ClientDetails;
  totalPrice: number;
  totalDurationMinutes: number;
  timestamp: string;
}

interface BookingContextType {
  // Services in Cart
  selectedServices: ServiceItem[];
  addService: (service: ServiceItem) => void;
  addCustomService: (baseService: ServiceItem, selectedOptionText: string, customPrice: number) => void;
  removeService: (serviceId: string) => void;
  toggleService: (service: ServiceItem) => void;
  isServiceSelected: (serviceId: string) => boolean;
  clearServices: () => void;
  totalDuration: number;
  totalPrice: number;
  totalPriceFormatted: string;

  // View mode: 'site' (main landing site) vs 'booking' (Enrich Booking Portal)
  appView: 'site' | 'booking';
  setAppView: (view: 'site' | 'booking') => void;
  openBookingPortal: (service?: ServiceItem) => void;

  // Active navigation page ('home' | 'services' | 'contact')
  activePage: 'home' | 'services' | 'contact';
  setActivePage: (page: 'home' | 'services' | 'contact') => void;

  // Sub-view in booking portal: 'catalog' | 'cart' | 'confirmation'
  bookingSubView: 'catalog' | 'cart' | 'confirmation';
  setBookingSubView: (view: 'catalog' | 'cart' | 'confirmation') => void;

  // Modals & Drawers inside Enrich flow
  activeOptionsService: ServiceItem | null;
  setActiveOptionsService: (service: ServiceItem | null) => void;
  isTimeModalOpen: boolean;
  setIsTimeModalOpen: (open: boolean) => void;
  isGuestModalOpen: boolean;
  setIsGuestModalOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;

  // Category & Filters
  activeCategory: string;
  setActiveCategory: (categoryId: string) => void;
  selectAndScrollToCategory: (categoryId: string) => void;
  activeGender: 'all' | 'women' | 'men' | 'bridal' | null;
  setActiveGender: (gender: 'all' | 'women' | 'men' | 'bridal' | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Service Details Inspector
  inspectingService: ServiceItem | null;
  openServiceDetails: (service: ServiceItem) => void;
  closeServiceDetails: () => void;

  // Enrich-style Service Mode: Salon vs Home
  serviceMode: 'salon' | 'home';
  setServiceMode: (mode: 'salon' | 'home') => void;

  // Selected Salon Outlet
  selectedOutlet: SalonOutlet;
  setSelectedOutlet: (outlet: SalonOutlet) => void;
  isOutletModalOpen: boolean;
  setIsOutletModalOpen: (open: boolean) => void;

  // Date, Time, Stylist
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedDateLabel: string;
  setSelectedDateLabel: (label: string) => void;
  selectedTimeSlot: string;
  setSelectedTimeSlot: (slot: string) => void;
  selectedStylist: string;
  setSelectedStylist: (stylist: string) => void;
  clientDetails: ClientDetails;
  setClientDetails: React.Dispatch<React.SetStateAction<ClientDetails>>;

  // Booking Confirmation
  confirmedBooking: ConfirmedBookingInfo | null;
  setConfirmedBooking: (info: ConfirmedBookingInfo | null) => void;
  confirmBooking: (guestName: string, guestPhone: string, notes?: string) => ConfirmedBookingInfo;
  resetBookingFlow: () => void;

  // Quick fallback modal
  isModalOpen: boolean;
  openModal: (service?: ServiceItem) => void;
  closeModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<'home' | 'services' | 'contact'>('home');
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [appView, setAppView] = useState<'site' | 'booking'>('booking');
  const [bookingSubView, setBookingSubView] = useState<'catalog' | 'cart' | 'confirmation'>('catalog');

  const [activeCategory, setActiveCategory] = useState<string>('haircut');
  const [activeGender, setActiveGender] = useState<'all' | 'women' | 'men' | 'bridal' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [inspectingService, setInspectingService] = useState<ServiceItem | null>(null);

  const openServiceDetails = (service: ServiceItem) => {
    setInspectingService(service);
  };

  const closeServiceDetails = () => {
    setInspectingService(null);
  };

  const [serviceMode, setServiceMode] = useState<'salon' | 'home'>('salon');
  const [selectedOutlet, setSelectedOutlet] = useState<SalonOutlet>(SALONS_DATA[0]);
  const [isOutletModalOpen, setIsOutletModalOpen] = useState(false);

  // Sub-option modal (e.g. Colour Effect modal from screenshot 4)
  const [activeOptionsService, setActiveOptionsService] = useState<ServiceItem | null>(null);

  // Time picker modal from screenshot 7
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  // Cart drawer / bottom sheet open state
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Guest details prompt modal
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  // Quick fallback modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tomorrow as default
  const defaultDateStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(defaultDateStr());
  const [selectedDateLabel, setSelectedDateLabel] = useState<string>('Tomorrow, 2 Oct');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('12:15 PM');
  const [selectedStylist, setSelectedStylist] = useState<string>('Any Specialist');
  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBookingInfo | null>(null);

  // Phone back-button and browser navigation support
  const navigateToPage = (page: 'home' | 'services' | 'contact') => {
    if (page !== activePage) {
      window.history.pushState({ page }, '', '');
      setActivePage(page);
    }
  };

  React.useEffect(() => {
    // Initial state
    if (!window.history.state) {
      window.history.replaceState({ page: 'home' }, '', '');
    }

    const handlePopState = (e: PopStateEvent) => {
      // 1. Close open modals first
      if (isGuestModalOpen) {
        setIsGuestModalOpen(false);
        return;
      }
      if (isTimeModalOpen) {
        setIsTimeModalOpen(false);
        return;
      }
      if (activeOptionsService) {
        setActiveOptionsService(null);
        return;
      }
      // 2. If in cart view, go back to catalog
      if (bookingSubView === 'cart') {
        setBookingSubView('catalog');
        return;
      }
      // 3. Navigate page back
      if (e.state?.page) {
        setActivePage(e.state.page);
      } else {
        setActivePage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isGuestModalOpen, isTimeModalOpen, activeOptionsService, bookingSubView, activePage]);

  const totalDuration = selectedServices.reduce(
    (acc, s) => acc + (s.durationMinutes || 0),
    0
  );

  const totalPrice = selectedServices.reduce(
    (acc, s) => acc + getServicePrice(s),
    0
  );

  const totalPriceFormatted = formatPriceINR(totalPrice);

  const addService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      if (prev.some((s) => s.id === service.id)) return prev;
      return [...prev, service];
    });
    setIsCartDrawerOpen(true);
  };

  const addCustomService = (
    baseService: ServiceItem,
    selectedOptionText: string,
    customPrice: number
  ) => {
    const customizedItem: ServiceItem = {
      ...baseService,
      id: `${baseService.id}-${Date.now()}`,
      name: baseService.name,
      selectedOptionText,
      startingPrice: customPrice,
      priceFormatted: `₹${customPrice.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    };
    setSelectedServices((prev) => [...prev, customizedItem]);
    setIsCartDrawerOpen(true);
  };

  const removeService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const updated = prev.filter((s) => s.id !== serviceId);
      if (updated.length === 0) {
        setIsCartDrawerOpen(false);
      }
      return updated;
    });
  };

  const toggleService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id || s.id.startsWith(service.id));
      if (exists) {
        const next = prev.filter((s) => s.id !== service.id && !s.id.startsWith(service.id));
        if (next.length === 0) {
          setIsCartDrawerOpen(false);
        }
        return next;
      } else {
        setIsCartDrawerOpen(true);
        return [...prev, service];
      }
    });
  };

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some(
      (s) => s.id === serviceId || s.id.startsWith(serviceId)
    );
  };

  const clearServices = () => {
    setSelectedServices([]);
  };

  const openBookingPortal = (service?: ServiceItem) => {
    if (service && !selectedServices.some((s) => s.id === service.id)) {
      addService(service);
    }
    setAppView('booking');
    setBookingSubView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (service?: ServiceItem) => {
    if (service && !selectedServices.some((s) => s.id === service.id)) {
      addService(service);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selectAndScrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setAppView('booking');
    setBookingSubView('catalog');
    setTimeout(() => {
      const el = document.getElementById(`section-${categoryId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const confirmBooking = (guestName: string, guestPhone: string, notes?: string): ConfirmedBookingInfo => {
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const bookingId = `ENR-${randomCode}`;
    const client: ClientDetails = {
      name: guestName,
      phone: guestPhone,
      email: clientDetails.email,
      notes: notes || clientDetails.notes,
    };
    setClientDetails(client);

    const info: ConfirmedBookingInfo = {
      bookingId,
      services: [...selectedServices],
      outlet: selectedOutlet,
      serviceMode,
      date: selectedDate,
      dateLabel: selectedDateLabel,
      timeSlot: selectedTimeSlot,
      stylist: selectedStylist,
      client,
      totalPrice,
      totalDurationMinutes: totalDuration,
      timestamp: new Date().toLocaleString(),
    };

    setConfirmedBooking(info);
    setBookingSubView('confirmation');
    return info;
  };

  const resetBookingFlow = () => {
    setSelectedServices([]);
    setBookingSubView('catalog');
    setConfirmedBooking(null);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedServices,
        addService,
        addCustomService,
        removeService,
        toggleService,
        isServiceSelected,
        clearServices,
        totalDuration,
        totalPrice,
        totalPriceFormatted,
        appView,
        setAppView,
        openBookingPortal,
        activePage,
        setActivePage,
        bookingSubView,
        setBookingSubView,
        activeOptionsService,
        setActiveOptionsService,
        isTimeModalOpen,
        setIsTimeModalOpen,
        isGuestModalOpen,
        setIsGuestModalOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        activeCategory,
        setActiveCategory,
        selectAndScrollToCategory,
        activeGender,
        setActiveGender,
        searchQuery,
        setSearchQuery,
        inspectingService,
        openServiceDetails,
        closeServiceDetails,
        serviceMode,
        setServiceMode,
        selectedOutlet,
        setSelectedOutlet,
        isOutletModalOpen,
        setIsOutletModalOpen,
        selectedDate,
        setSelectedDate,
        selectedDateLabel,
        setSelectedDateLabel,
        selectedTimeSlot,
        setSelectedTimeSlot,
        selectedStylist,
        setSelectedStylist,
        clientDetails,
        setClientDetails,
        confirmedBooking,
        setConfirmedBooking,
        confirmBooking,
        resetBookingFlow,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
