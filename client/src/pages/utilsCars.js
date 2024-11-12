  const { user } = useSelector((state) => state.user);
  const { cars } = useSelector((state) => state.admin);
  const [car, setCar] = useState();
  const [handleManageCar, isOpenManageCar] = useOpenModel();
  const [filterCars, setFilterCars] = useState();
  const [handleEditCar, isOpenModelEditCar] = useOpenModel();
  const [handleCreateService, isOpenModelCreateService] = useOpenModel();
  const [handleDeleteCar, isOpenModelDeleteCar] = useOpenModel();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarsByType(user?._id));
  }, [isOpenManageCar,isOpenModelDeleteCar,isOpenModelEditCar]);
  const filterSearch = (e) => {
    const { value } = e.target;
    setFilterCars(
      cars.filter(
        (item) =>
          item.owner?.username.includes(value) ||
          item.numberPlate.includes(value) ||
          item.km.toString().includes(value) ||
          item.brand.includes(value)
      )
    );
  };
  const handleCar = (e) => {
    const { name } = e.target;
    setCar(cars.find((car) => car._id === e.target.value));
    if (name === "editCar") {
      handleEditCar();
    }
    if (name === "createService") handleCreateService();
    if (name === "deleteCar") {
      handleDeleteCar();
    }
    handleManageCar()
  };