"use client";
import { SessionProvider } from 'next-auth/react';
import React, { Children } from 'react';

const NextAuthProvider = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default NextAuthProvider;