import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function CustomerDashboard() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const renderPage = () => {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Add your page components here */}
                    <div>Customer Dashboard Content</div>
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="p-6">Customer Dashboard Header</header>
            <main className="pt-16">
                <div className="p-6">{renderPage()}</div>
            </main>
        </div>
    );
}

export default CustomerDashboard;
