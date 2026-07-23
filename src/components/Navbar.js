'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/client-auth';
import toast from 'react-hot-toast';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'All Books' },
  { href: '/profile', label: 'My Profile' },
];

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success('Signed out successfully');
    router.push('/');
    router.refresh();
  };

  return (
    <div className="navbar rounded-2xl border border-base-300/60 bg-base-100/90 px-2 shadow-lg shadow-black/10 backdrop-blur">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-200 p-2 shadow">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="text-xl font-bold tracking-wide text-primary">
          BookBloom
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="font-medium">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
          <>
            <span className="hidden max-w-[160px] truncate rounded-full bg-primary/10 px-3 py-2 text-sm font-medium text-primary sm:block">
              {user.name || user.email}
            </span>
            <button type="button" onClick={handleLogout} className="btn btn-sm btn-outline">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-sm btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
