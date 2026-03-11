"use client";

import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorState = ({
    message = "Failed to load data",
    onRetry
}: ErrorStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-red-50/50 border border-red-100 rounded-3xl">
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-red-100 rounded-full text-red-600">
                <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h3>
            <p className="text-slate-600 mb-6 max-w-md">{message}</p>
            {onRetry && (
                <Button
                    variant="secondary"
                    onClick={onRetry}
                    className="flex items-center gap-2"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </Button>
            )}
        </div>
    );
};
