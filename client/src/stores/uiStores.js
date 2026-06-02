/**
 * Lightweight per-page Zustand stores for UI state (selected items, modal open/close).
 * Replaces the Context/Provider pattern for intra-page state sharing.
 */
import { create } from "zustand";

const modalSlice = (names) =>
  names.reduce((acc, name) => {
    const key = name + "Open";
    acc[key] = false;
    acc["toggle" + name[0].toUpperCase() + name.slice(1)] = () =>
      acc[key] === undefined
        ? null
        : set((s) => ({ [key]: !s[key] }));
    return acc;
  }, {});

// ─── Users page ────────────────────────────────────────────────────────────
export const useUsersUIStore = create((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  manageUserOpen: false,  createUserOpen: false,
  createCarOpen: false,   editUserOpen: false,   deleteUserOpen: false,
  toggleManageUser: () => set((s) => ({ manageUserOpen: !s.manageUserOpen })),
  toggleCreateUser: () => set((s) => ({ createUserOpen: !s.createUserOpen })),
  toggleCreateCar:  () => set((s) => ({ createCarOpen:  !s.createCarOpen  })),
  toggleEditUser:   () => set((s) => ({ editUserOpen:   !s.editUserOpen   })),
  toggleDeleteUser: () => set((s) => ({ deleteUserOpen: !s.deleteUserOpen })),
}));

// ─── Cars page ─────────────────────────────────────────────────────────────
export const useCarsUIStore = create((set) => ({
  selectedCar: null,
  setSelectedCar: (car) => set({ selectedCar: car }),
  manageCarOpen: false, deleteCarOpen: false, editCarOpen: false,
  toggleManageCar: () => set((s) => ({ manageCarOpen: !s.manageCarOpen })),
  toggleDeleteCar: () => set((s) => ({ deleteCarOpen: !s.deleteCarOpen })),
  toggleEditCar:   () => set((s) => ({ editCarOpen:   !s.editCarOpen   })),
}));

// ─── Services Admin page ────────────────────────────────────────────────────
export const useServicesUIStore = create((set) => ({
  selectedService: null,
  setSelectedService: (svc) => set({ selectedService: svc }),
  manageServiceOpen: false, editStatusOpen: false,
  editServiceOpen: false,   editPaidOpen: false,
  toggleManageService: () => set((s) => ({ manageServiceOpen: !s.manageServiceOpen })),
  toggleEditStatus:    () => set((s) => ({ editStatusOpen:    !s.editStatusOpen    })),
  toggleEditService:   () => set((s) => ({ editServiceOpen:   !s.editServiceOpen   })),
  toggleEditPaid:      () => set((s) => ({ editPaidOpen:      !s.editPaidOpen      })),
}));

// ─── Messages page ──────────────────────────────────────────────────────────
export const useMessagesUIStore = create((set) => ({
  selectedMsg: null,
  setSelectedMsg: (msg) => set({ selectedMsg: msg }),
  createMsgOpen: false, deleteMsgOpen: false,
  toggleCreateMsg: () => set((s) => ({ createMsgOpen: !s.createMsgOpen })),
  toggleDeleteMsg: () => set((s) => ({ deleteMsgOpen: !s.deleteMsgOpen })),
}));

// ─── Account page ───────────────────────────────────────────────────────────
export const useAccountUIStore = create((set) => ({
  selectedCar: null,
  setSelectedCar: (car) => set({ selectedCar: car }),
  servicesOpen: false, reqServiceOpen: false,
  toggleServices:   () => set((s) => ({ servicesOpen:   !s.servicesOpen   })),
  toggleReqService: () => set((s) => ({ reqServiceOpen: !s.reqServiceOpen })),
}));

// ─── Header ─────────────────────────────────────────────────────────────────
export const useHeaderUIStore = create((set) => ({
  isNavOpen: false,
  toggleNav: () => set((s) => ({ isNavOpen: !s.isNavOpen })),
  closeNav: () => set({ isNavOpen: false }),
  loginOpen: false,
  toggleLogin: () => set((s) => ({ loginOpen: !s.loginOpen })),
}));

// ─── Reviews ────────────────────────────────────────────────────────────────
export const useReviewsUIStore = create((set) => ({
  addReviewOpen: false,
  toggleAddReview: () => set((s) => ({ addReviewOpen: !s.addReviewOpen })),
}));
