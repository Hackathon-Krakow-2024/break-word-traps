export const Header = () => {
  return (
    <header className='bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg'>
      <div className='container mx-auto flex items-center justify-between px-6 py-4'>
        <div className='text-3xl font-extrabold'>
          <a href='/' className='transition-colors duration-300 hover:text-gray-300'>
            Words Smoothie
          </a>
        </div>
      </div>
    </header>
  )
}
