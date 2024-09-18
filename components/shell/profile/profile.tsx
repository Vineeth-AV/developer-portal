'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // for programmatic navigation
import Image from 'next/image';
import clsx from 'clsx';
import * as React from 'react';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    //   const router = useRouter();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        // Add logout logic here (e.g., clear tokens, redirect to login page, etc.)
        console.log('User logged out');
        // Example: Redirect to login page after logout
        // router.push('/login');
    };

    const settingsClicked = () => {
        // Add logout logic here (e.g., clear tokens, redirect to login page, etc.)
        console.log('Settings clicked');
        // Example: Redirect to login page after logout
        // router.push('/login');
    };

    return (
        <div className="relative inline-block text-left">
            <div>

                <Image
                    src="/icons/profile.svg" // Path to the share icon
                    alt="Profile icon"
                    width={32}
                    height={32}
                    onClick={toggleDropdown}
                    className="relative flex items-center justify-center overflow-hidden border-none size-[2.3rem]" />

            </div>

            {isOpen && (
                <div className="origin-top-right absolute z-50 -right-10 mt-0 w-36 rounded-md shadow-lg bg-white border border-gray-300 ring-1 ring-black ring-opacity-5">
                    <div className="block w-full text-left px-4 py-2" role="" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                            onClick={settingsClicked}
                            className="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100"
                            role="menuitem"
                        >
                            Settings
                        </button>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            role="menuitem"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;

