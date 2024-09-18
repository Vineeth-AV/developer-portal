'use client'

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import * as React from 'react';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        console.log('User logged out');
        // Example: Redirect to login page after logout
    };

    const settingsClicked = () => {
        console.log('Settings clicked');
        // Example: Redirect to settings page
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false); // Close the dropdown if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <Image
                    src="/icons/profile.svg" // Path to the profile icon
                    alt="Profile icon"
                    width={32}
                    height={32}
                    onClick={toggleDropdown}
                    className="relative flex items-center justify-center overflow-hidden border-none size-[2.3rem]"
                />
            </div>

            {isOpen && (
                <div className="origin-top-right absolute z-50 -right-10 mt-1 w-32 rounded-md shadow-lg bg-white border border-gray-300 ring-1 ring-black ring-opacity-5">
                    <div className="block w-full text-left px-4 py-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                            onClick={settingsClicked}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
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
