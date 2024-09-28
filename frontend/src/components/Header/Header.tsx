export const Header = () => {
  return (
    <header className='bg-sky-600 text-white shadow-lg'>
      <div className='container mx-auto flex items-center justify-between px-6 py-4'>
        <div className='text-2xl font-bold'>
          <a href='/' className='hover:text-gray-300'>
            Words Smoothie
          </a>
        </div>
        <nav>
          <ul className='flex space-x-6'>
            {/* <li>
              <a href='/' className='hover:text-gray-300'>
                Home
              </a>
            </li>
            <li>
              <a href='/about' className='hover:text-gray-300'>
                About
              </a>
            </li>
            <li>
              <a href='/services' className='hover:text-gray-300'>
                Services
              </a>
            </li> */}
            <li>
              <a href='/contact' className='hover:text-gray-300'>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
