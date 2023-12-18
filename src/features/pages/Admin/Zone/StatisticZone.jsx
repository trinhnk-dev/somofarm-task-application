import { Divider } from "antd";
import DisplayCard from "./DisplayCard";
import TableZone from "./TableZone";
import { useDispatch, useSelector } from "react-redux";
import { getZoneByFarmId } from "features/slice/zone/zoneByFarmSlice";
import { useEffect } from "react";
import { adminDeleteZone } from "features/slice/zone/zoneSlice";
import PieChartZone from "./PieChartZone";

const StatisticZone = () => {
  const dispatch = useDispatch();
  const zoneByFarm = useSelector((state) => state.zoneByFarm.data);
  const loading = useSelector((state) => state.zoneByFarm.loading);

  const farmId = localStorage.getItem("farmId");

  useEffect(() => {
    dispatch(getZoneByFarmId(farmId));
  }, [dispatch]);

  const onFinishDelete = (id) => {
    dispatch(adminDeleteZone(id)).then(() => {
      loadData();
    });
  };

  const loadData = () => {
    dispatch(getZoneByFarmId(farmId));
  };

  // --------Count------------
  //zone
  const filterActiveZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const activeZones = zoneByFarm.data.filter(
        (zone) => zone.status === "Hiện"
      );
      return activeZones.length;
    }
    return 0;
  };
  const activeZoneCount = filterActiveZones(zoneByFarm);
  const inActiveZoneCount = zoneByFarm?.data?.length - activeZoneCount;

  // zoneType
  const filterAnimalZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const animalZones = zoneByFarm.data.filter(
        (area) => area.zoneTypeName === "Vùng chăn nuôi"
      );
      return animalZones.length;
    }
    return 0;
  };
  const animalZoneCount = filterAnimalZones(zoneByFarm);

  const filterPlantZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const plantZones = zoneByFarm.data.filter(
        (area) => area.zoneTypeName === "Vùng trồng trọt"
      );
      return plantZones.length;
    }
    return 0;
  };
  const plantZoneCount = filterPlantZones(zoneByFarm);

  const otherZoneCount =
    zoneByFarm?.data?.length - (animalZoneCount + plantZoneCount);

  // -------------------------Chart-------------------------------
  // Vùng chăn nuôi
  const filterActiveAnimalZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const zones = zoneByFarm.data.filter(
        (zone) =>
          zone.status === "Hiện" && zone.zoneTypeName === "Vùng chăn nuôi"
      );
      return zones.length;
    }
    return 0;
  };
  const activeAnimalZoneCount = filterActiveAnimalZones(zoneByFarm); //Mở

  // Vùng trồng trọt
  const filterActivePlantZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const zones = zoneByFarm.data.filter(
        (zone) =>
          zone.status === "Hiện" && zone.zoneTypeName === "Vùng trồng trọt"
      );
      return zones.length;
    }
    return 0;
  };
  const activePlantZoneCount = filterActivePlantZones(zoneByFarm); //Mở

  // Khác
  const filterActiveOtherZones = (zoneByFarm) => {
    if (zoneByFarm && zoneByFarm.data) {
      const zones = zoneByFarm.data.filter(
        (zone) => zone.status === "Hiện" && zone.zoneTypeName === "Vùng khác"
      );
      return zones.length;
    }
    return 0;
  };
  const activeOtherZoneCount = filterActiveOtherZones(zoneByFarm); //Mở

  return (
    <>
      <div className="animal-group-content content">
        <h3>Vùng</h3>
        <div
          style={{
            backgroundColor: "#fcfffc",
            borderRadius: "15px",
          }}
        >
          {zoneByFarm?.data?.length === 0 ? (
            <>
              <DisplayCard
                zoneByFarm={zoneByFarm}
                activeZoneCount={activeZoneCount}
                inActiveZoneCount={inActiveZoneCount}
                animalZoneCount={animalZoneCount}
                plantZoneCount={plantZoneCount}
                otherZoneCount={otherZoneCount}
              />
              <Divider dashed />
              <TableZone
                zoneByFarm={zoneByFarm}
                onFinishDelete={onFinishDelete}
                loading={loading}
              />
            </>
          ) : (
            <>
            <div className="admin-zone-header">
            <DisplayCard
                zoneByFarm={zoneByFarm}
                activeZoneCount={activeZoneCount}
                inActiveZoneCount={inActiveZoneCount}
                animalZoneCount={animalZoneCount}
                plantZoneCount={plantZoneCount}
                otherZoneCount={otherZoneCount}
              />
              <PieChartZone
                activeAnimalZoneCount={activeAnimalZoneCount}
                activePlantZoneCount={activePlantZoneCount}
                activeOtherZoneCount={activeOtherZoneCount}
              />
            </div>
              
              <Divider dashed />
              <TableZone
                zoneByFarm={zoneByFarm}
                onFinishDelete={onFinishDelete}
                loading={loading}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default StatisticZone;
