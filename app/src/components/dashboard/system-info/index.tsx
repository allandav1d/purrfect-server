'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/trpc/react';
import { SystemOverview } from './system-overview';
import { CpuInfo } from './cpu-info';
import { MemoryInfo } from './memory-info';
import { NetworkInfo } from './network-info';
import { DiskInfo } from './disk-info';
export function SystemInfo() {
    return (
        <>
            <div className="w-full">
                <SystemOverview />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <CpuInfo />
                <MemoryInfo />
                <NetworkInfo />
            </div>


            <div className="w-full">
                <DiskInfo />
                {/* <DockerInfo /> */}
            </div>
        </>
    );
}

