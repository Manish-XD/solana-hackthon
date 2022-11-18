import RideSelector from './RideSelector'
import { useContext, useState } from 'react'
import { UberContext } from '../context/uberContext'
import { ethers } from 'ethers'

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between bg-primary`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10 py-2 my-2`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
  timeInput: `text-black outline-0 py-2 px-4`
}

const Confirm = () => {
  const {
    currentAccount,
    pickup,
    dropoff,
    price,
    selectedRide,
    pickupCoordinates,
    dropoffCoordinates,
    metamask,
  } = useContext(UberContext)
  const [time, setTime] = useState('');

  const storeTripDetails = async (pickup, dropoff) => {
    console.log("time",time);
    try {
      await fetch('/api/db/saveTrips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          userWalletAddress: currentAccount,
          price: price,
          selectedRide: selectedRide,
          scheduled: time
        }),
      })

      await metamask.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: '0xb5ef446e6B0690fe007A00B42238B112f00d9a1d',
            gas: '0x7EF40', // 520000 Gwei
            value: ethers.utils.parseEther(price)._hex,
          },
        ],
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        {pickupCoordinates && dropoffCoordinates && <RideSelector />}
      </div>
      <div className={style.confirmButtonContainer}>
        {pickupCoordinates && dropoffCoordinates && <label>Schedule your Ride for: </label>}
          {pickupCoordinates && dropoffCoordinates && <input type="datetime-local" id="appt" name="appt"
           min="09:00" max="18:00" className={style.timeInput} onChange={e=>{setTime(e.target.value)}} required/>}
        <div className={style.confirmButtonContainer}>
          <div
            className={style.confirmButton}
            onClick={() => storeTripDetails(pickup, dropoff)}
          >
            Book {selectedRide.service || 'Ride'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm
