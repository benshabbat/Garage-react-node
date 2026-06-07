import { useEffect } from "react";
import { useAdminStore } from "../../../stores/adminStore";
import { useServicesUIStore } from "../../../stores/uiStores";
import { useServiceAdminHandlers } from "./useServiceAdminHandlers";
import useFilteredData from "../../../hooks/useFilteredData";
import { serviceFilterFn } from "../utils/serviceValidation";
import { exportToCsv } from "../../../utils/exportCsv";

export function useServiceAdminTableData() {
  const services = useAdminStore((s) => s.services);
  const getServicesByType = useAdminStore((s) => s.getServicesByType);
  const { manageServiceOpen, editStatusOpen, editServiceOpen, editPaidOpen } =
    useServicesUIStore();
  const { handleServiceIdAction } = useServiceAdminHandlers();

  const { displayData: displayServices, handleSearch } = useFilteredData(
    services,
    serviceFilterFn
  );

  useEffect(() => {
    getServicesByType();
  }, [manageServiceOpen, editStatusOpen, editServiceOpen, editPaidOpen, getServicesByType]);

  const handleExport = () => {
    const rows = displayServices?.map((s) => ({
      car: s.car?.numberPlate || "",
      title: s.title,
      description: s.description,
      price: s.price,
      paid: s.paid ? "Paid" : "Unpaid",
      status: s.status,
    }));
    exportToCsv(rows, "services");
  };

  return { displayServices, handleSearch, handleServiceIdAction, handleExport };
}
