import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../UserContext/UseContext';

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logOut } = useContext(AuthContext)


  return (

    <div className="bg-based-100 ">
      <div className=" py-5 ">
        <div className="relative flex items-center justify-between sticky z-50">
          <Link
            to=' '
            aria-label="Company"
            title="Company"
            className="inline-flex items-center"
          >
         
            <span className=" text-xl font-bold tracking-wide text-teal-accent-400 uppercase text-rose-400">
              Task-Management
            </span>
          </Link>
          <ul className="flex items-center hidden space-x-8 lg:flex lg:-ml-32">
            <li>
              <Link
                to='/addTask'

                className="font-medium tracking-wide text-teal-accent-400 hover:shadow-xl p-3 rounded hover:duration-500 duration-500"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to='/myTask'

                className="font-medium tracking-wide text-teal-accent-400  hover:shadow-xl p-3 rounded hover:duration-500 duration-500 "
              >
                My Task
              </Link>
            </li>
            <li>
              <Link
                to='/completeTask'

                className="font-medium tracking-wide text-teal-accent-400  hover:shadow-xl p-3 rounded hover:duration-500 duration-500 "
              >
                Complete Task
              </Link>
            </li>




          </ul>
          <ul className="flex items-center hidden space-x-8 lg:flex mr-7">

            {
              user?.uid ? <>

                <li className="font-medium tracking-wide text-teal-accent-400  hover:shadow-xl p-3 rounded hover:duration-500 duration-500 ">

                  {
                    user?.photoURL ? <img title={user?.displayName} className='w-8 h-8 rounded-full' src={user?.photoURL} alt="" />
                      :
                      <li className="font-medium tracking-wide text-teal-accent-400  hover:shadow-xl p-3 rounded hover:duration-500 duration-500 ">

                        {user?.email}

                      </li>

                  }

                </li>


                <li>
                  <Link
                    onClick={logOut}
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-teal-accent-400 transition duration-200 rounded hover:shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                    aria-label=" Login"
                    title=" Login"
                  >
                    Logout
                  </Link>
                </li>

              </>
                :
                <>
                  <li>
                    <Link
                      to='/login'
                      className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-teal-accent-400 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      aria-label=" Login"
                      title=" Login"
                    >
                      Login
                    </Link>
                  </li>


                </>
            }


          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        to=' '

                        className="inline-flex items-center"
                      >
                       
                        <span className="ml-2 text-xl font-bold tracking-wide text-rose-400 uppercase">
                        Task-Management
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <Link
                          to='/addTask'

                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Add Task
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/myTask'

                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          My Task
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='/completeTask'

                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Complete Task
                        </Link>
                      </li>
                      {
                        user?.uid ? <>

                          <li className="font-medium tracking-wide text-teal-accent-400  hover:shadow-xl p-3 rounded hover:duration-500 duration-500 ">

                            {
                              user?.photoURL ? <img title={user?.displayName} className='w-8 h-8 rounded-full' src={user?.photoURL} alt="" />
                                :
                                <li className="font-medium tracking-wide text-teal-accent-400  hover:shadow-xl p-3 rounded hover:duration-500 duration-500 ">

                                  {user?.email}

                                </li>

                            }

                          </li>


                          <li>
                            <Link
                              onClick={logOut}
                              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-teal-accent-400 transition duration-200 rounded hover:shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                              aria-label=" Login"
                              title=" Login"
                            >
                              Logout
                            </Link>
                          </li>

                        </>
                          :
                          <>
                            <li>
                              <Link
                                to='/login'
                                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-teal-accent-400 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                aria-label=" Login"
                                title=" Login"
                              >
                                Login
                              </Link>
                            </li>


                          </>
                      }
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Navbar;