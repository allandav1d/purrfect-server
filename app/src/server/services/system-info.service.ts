import si from 'systeminformation';

export const getSystemInfo = async () => {
  const [cpu, mem, disk] = await Promise.all([
    si.cpu(),
    si.mem(),
    si.fsSize(),
  ]);

  return {
    cpu: {
      manufacturer: cpu.manufacturer,
      brand: cpu.brand,
      speed: cpu.speed,
    },
    memory: {
      total: mem.total,
      free: mem.free,
    },
    disks: disk.map((d) => ({
      device: d.fs,
      size: d.size,
      used: d.used,
      available: d.available,
    })),
  };
};