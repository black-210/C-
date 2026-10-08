# C> Standard Library Reference

The standard library lives in `C>/std/` and provides modular zero-cost abstractions:

| Module | Purpose | Location |
| :--- | :--- | :--- |
| `std::core` | Core runtime primitives, memory allocations, panic handlers | `C>/std/core.cgt` |
| `std::io` | Formatted output, console streaming, buffered reader/writer | `C>/std/io.cgt` |
| `std::simd` | 128-bit, 256-bit, and 512-bit vector types and operations | `C>/std/simd.cgt` |
| `std::sync` | Atomics, spinlocks, mutexes, conditions, channel primitives | `C>/std/sync.cgt` |
| `std::fs` | Filesystem descriptors, synchronous and async I/O | `C>/std/fs.cgt` |
| `std::gpu` | Device queries, buffer allocators, kernel execution helpers | `C>/std/gpu.cgt` |
