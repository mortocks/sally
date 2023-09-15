import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
const NavBar = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-300 fixed z-50">
      <div className="flex-1">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open
        </label>
        <Link href="/" className="btn btn-link text-xl normal-case">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" rx="8" fill="#17133B" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.0069 12.9305C17.6268 11.8846 16.4709 11.3449 15.425 11.7249C14.3792 12.105 13.8394 13.2609 14.2195 14.3068L21.6144 34.6567C21.9945 35.7026 23.1504 36.2423 24.1963 35.8623C25.2421 35.4822 25.7819 34.3263 25.4018 33.2804L18.0069 12.9305ZM25.9377 12.9305C25.5576 11.8846 24.4017 11.3449 23.3558 11.7249C22.31 12.105 21.7702 13.2609 22.1503 14.3068L29.551 34.6727C29.9311 35.7186 31.087 36.2584 32.1329 35.8783C33.1787 35.4982 33.7185 34.3423 33.3384 33.2964L25.9377 12.9305Z"
              fill="url(#paint0_linear_3228_455)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3228_455"
                x1="18.9414"
                y1="12.6739"
                x2="25.11"
                y2="37.2638"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#EC4863" />
                <stop offset="1" stop-color="#4930B5" />
              </linearGradient>
            </defs>
          </svg>
        </Link>
      </div>
      <div className="flex-none ">
        <div className="form-control px-4">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        {session && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={session.user.image} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/profile" className="justify-between p-4">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className="justify-between p-4"
                  // eslint-disable-next-line
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
