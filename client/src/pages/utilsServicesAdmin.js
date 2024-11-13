import "../components/table/table.css";
import { useState, useEffect } from "react";
import useOpenModel from "../hooks/useOpenModel";
import ManageService from "../components/manage/ManageService";
import { useDispatch,useSelector } from "react-redux";
import { getServicesByType } from "../features/admin/adminSlice";
import EditStatusService from "../components/edit/EditStatusService";
import EditPaidService from "../components/edit/EditPaidService";


export function useServicesAdmin(){
    
}