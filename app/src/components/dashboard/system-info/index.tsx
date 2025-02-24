"use client"

import { CpuInfo } from "./cpu-info"
import { MemoryInfo } from "./memory-info"
import { NetworkInfo } from "./network-info"
import { DiskInfo } from "./disk-info"
import { SystemOverview } from "./system-overview"
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
      </div>
    </>
  )
}
