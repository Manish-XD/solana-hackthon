import Navbar from '../components/Navbar';
import Map from '../components/Map';
import LocationSelector from '../components/LocationSelector';
import Confirm from '../components/Confirm';
import PoolList from '../components/PoolList';
import { useContext } from 'react';
import { UberContext } from '../context/uberContext';

const style = {
  wrapper: `h-screen w-screen flex flex-col`,
  main: `h-full w-screen flex-1 z-10`,
  mapContainer: `flex-1 w-full h-full`,
  rideRequestContainer: `h-screen w-[400px] py-[3rem] fixed top-0 right-[4rem] flex flex-col justify-end z-20`,
  rideRequest: `h-screen bg-white rounded-lg flex flex-col overflow-scroll text-white bg-primary`,
}

export default function Home() {
  const { ride, setRide, offer, setOffer } = useContext(UberContext);
  return (
    <div className={style.wrapper}>
      <Navbar />
      <div className={style.main}>
        <Map />
      </div>
      <div className={style.rideRequestContainer}>
        <div className={style.rideRequest}>
          <PoolList ride={ride}/>
          <LocationSelector offer={offer}/>
          <Confirm />
        </div>
      </div>
    </div>
  )
}
