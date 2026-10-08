# C> GPU Subsystem Architecture

## 1. Overview
C> treats the GPU as a first-class compute co-processor rather than requiring external DSLs or separate language ecosystems (like OpenCL or CUDA C).

The GPU subsystem is designed around:
1. Unified memory abstractions (Host vs Device vs Shared)
2. Heterogeneous compilation of `@kernel` functions
3. Multi-backend code generation targeting SPIR-V (Vulkan), PTX (CUDA), and MSL (Metal).

---

## 2. Kernel Definition and Launch Model

Compute kernels are annotated with `@kernel`:
```cgt
@kernel
fn vector_add_kernel(a: &[f32], b: &[f32], out: &mut [f32], count: u32) {
    let gid = gpu::global_id_x();
    if (gid < count) {
        out[gid] = a[gid] + b[gid];
    }
}
```

### Launch Dispatch
```cgt
use std::gpu;

let dev = gpu::Device::get_default();
let d_a = dev.alloc_buffer::<f32>(1024);
let d_b = dev.alloc_buffer::<f32>(1024);
let mut d_out = dev.alloc_buffer::<f32>(1024);

d_a.copy_from_host(h_a);
d_b.copy_from_host(h_b);

gpu::dispatch(vector_add_kernel, blocks: (4, 1, 1), threads: (256, 1, 1), d_a, d_b, &mut d_out, 1024);
dev.synchronize();
```

---

## 3. Backends
- **Vulkan / SPIR-V**: Portable across Linux, Windows, Android, and embedded GPU accelerators.
- **CUDA / PTX**: High performance on NVIDIA HPC architectures with Tensor Core intrinsics.
- **Metal / MSL**: Optimized compute on Apple Silicon unified memory GPUs.
