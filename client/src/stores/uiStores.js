/**
 * Lightweight per-page Zustand stores for UI state (selected items, modal open/close).
 * Replaces the Context/Provider pattern for intra-page state sharing.
 */
import { create } from "zustand";

const makeToggle = (set, key) => () => set((s) => ({ [key]: !s[key] }));
const makeSetter = (set, key) => (val) => set({ [key]: val });

// ─── Users page ────────────────────────────────────────────────────────────
export const useUsersUIStore = create((set) => ({
  selectedUser: null,
  setSelectedUser: makeSetter(set, "selectedUser"),
  manageUserOpen: false,
  createUserOpen: false,
  createCarOpen: false,
  editUserOpen: false,
  deleteUserOpen: false,
  toggleManageUser: makeToggle(set, "manageUserOpen"),
  toggleCreateUser: makeToggle(set, "createUserOpen"),
  toggleCreateCar: makeToggle(set, "createCarOpen"),
  toggleEditUser: makeToggle(set, "editUserOpen"),
  toggleDeleteUser: makeToggle(set, "deleteUserOpen"),
}));

// ─── Cars page ─────────────────────────────────────────────────────────────
export const useCarsUIStore = create((set) => ({
  selectedCar: null,
  setSelectedCar: makeSetter(set, "selectedCar"),
  manageCarOpen: false,
  deleteCarOpen: false,
  editCarOpen: false,
  createServiceOpen: false,
  toggleManageCar: makeToggle(set, "manageCarOpen"),
  toggleDeleteCar: makeToggle(set, "deleteCarOpen"),
  toggleEditCar: makeToggle(set, "editCarOpen"),
  toggleCreateService: makeToggle(set, "createServiceOpen"),
}));

// ─── Services Admin page ────────────────────────────────────────────────────
export const useServicesUIStore = create((set) => ({
  selectedService: null,
  setSelectedService: makeSetter(set, "selectedService"),
  manageServiceOpen: false,
  editStatusOpen: false,
  editServiceOpen: false,
  editPaidOpen: false,
  toggleManageService: makeToggle(set, "manageServiceOpen"),
  toggleEditStatus: makeToggle(set, "editStatusOpen"),
  toggleEditService: makeToggle(set, "editServiceOpen"),
  toggleEditPaid: makeToggle(set, "editPaidOpen"),
}));

// ─── Messages page ──────────────────────────────────────────────────────────
export const useMessagesUIStore = create((set) => ({
  selectedMsg: null,
  setSelectedMsg: makeSetter(set, "selectedMsg"),
  createMsgOpen: false,
  deleteMsgOpen: false,
  toggleCreateMsg: makeToggle(set, "createMsgOpen"),
  toggleDeleteMsg: makeToggle(set, "deleteMsgOpen"),
}));

// ─── Account page ───────────────────────────────────────────────────────────
export const useAccountUIStore = create((set) => ({
  selectedCar: null,
  setSelectedCar: makeSetter(set, "selectedCar"),
  servicesOpen: false,
  reqServiceOpen: false,
  toggleServices: makeToggle(set, "servicesOpen"),
  toggleReqService: makeToggle(set, "reqServiceOpen"),
}));

// ─── Header ─────────────────────────────────────────────────────────────────
export const useHeaderUIStore = create((set) => ({
  isNavOpen: false,
  toggleNav: makeToggle(set, "isNavOpen"),
  closeNav: () => set({ isNavOpen: false }),
  loginOpen: false,
  toggleLogin: makeToggle(set, "loginOpen"),
}));

// ─── Reviews ────────────────────────────────────────────────────────────────
export const useReviewsUIStore = create((set) => ({
  addReviewOpen: false,
  toggleAddReview: makeToggle(set, "addReviewOpen"),
}));
