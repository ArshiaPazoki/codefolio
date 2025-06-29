// import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full h-full flex flex-row justify-center items-center m-2'>
        <div className='w-1/3 h-2/3 flex justify-center items-center border-r-1'>
            <h1 className="text-2xl">Error 404</h1>
        </div>
        <div className='w-2/3 h-2/3 flex justify-center items-center'>
            <p>Page Not Found</p>
        </div>
    </div>
  )
}