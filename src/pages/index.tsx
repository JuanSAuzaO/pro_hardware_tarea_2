import Link from 'next/link';

export default function Page() {
  return (
    <div className='central-container'>
      <h1>Welcome to Pro Hardware Xtreme!</h1>
      <h2 id='subtitle'>Find or offer the latest High-end Hardware available!</h2>
      <div className='button-box'>
        <button className='link-button'><Link href='/signup'>Sign up!</Link></button>
      </div>
      <div className='button-box'>
        <button className='link-button'><Link href='/login'>Log in!</Link></button>
      </div>
    </div>
  )
}