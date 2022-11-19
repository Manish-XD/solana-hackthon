import Image from 'next/image'
import avatar from '../temp/avatar.jpg'
import { BsPerson } from 'react-icons/bs'
import { useContext } from 'react'
import { UberContext } from '../context/uberContext'
import SolWagLogo from '../assets/SolWagLogo.png'

const style = {
  wrapper: `h-full bg-primary text-white flex md:justify-around items-center px-4 fixed z-20 flex-col`,
  leftMenu: `gap-3 flex-col justify-center`,
  logo: `text-3xl flex cursor-pointer bg-gradient-to-r from-[#D900FA] via-[#00DBFD] to-[#00FF9D] text-transparent bg-clip-text w-full font-bold text-left`,
  menuItem: `text-lg text-white font-medium flex items-center my-4 cursor-pointer hover:text-slate-500`,
  rightMenu: `flex gap-3 items-center flex-col`,
  userImageContainer: `mr-2`,
  userImage: `h-10 w-10 mr-4 rounded-full p-px object-cover cursor-pointer`,
  loginButton: `flex items-center cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1`,
  loginText: `ml-2`,
  logoContainer: ` items-center`
}

const Navbar = () => {
  const { currentAccount, connectWallet, currentUser, setRide, setOffer } = useContext(UberContext)

  return (
    <div className={style.wrapper}>
      <div className={style.leftMenu}>
        <div className={style.logoContainer}>
          <Image src={SolWagLogo} height={50} width={50} />
          <div className={style.logo}>SolWag</div>
        </div>
        <div className={style.menuItem} onClick={()=>{setOffer('hidden'); setRide('block')}}>Ride Pool</div>
        <div className={style.menuItem} onClick={()=>{setOffer('block'); setRide('hidden')}}>Offer Pool</div>
        <div className={style.menuItem}>Offers</div>
      </div>
      <div className={style.rightMenu}>
        {/* <div className={style.menuItem}></div> */}
        <div className={style.menuItem}>Wallet connected</div>
        <div className={style.userImageContainer}>
          <Image
            className={style.userImage}
            src={avatar}
            width={40}
            height={40}
          />
        </div>
        {currentAccount ? (
          <div>
            {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
          </div>
        ) : (
          <div className={style.loginButton} onClick={() => connectWallet()}>
            <BsPerson />
            <span className={style.loginText}>Log in</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
