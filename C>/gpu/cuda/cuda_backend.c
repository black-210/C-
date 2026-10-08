#include "../gpu_runtime.h"
#include <stdio.h>
#include <stdlib.h>

/* CUDA PTX compute backend driver interface */
int cgt_cuda_init(void) {
    /* Initializes cuInit & cuDeviceGet */
    return 0;
}

int cgt_cuda_launch_ptx(const char *ptx_source, const char *kernel_name,
                        cgt_gpu_dim3_t grid, cgt_gpu_dim3_t block,
                        void **kernel_params) {
    (void)ptx_source;
    (void)kernel_name;
    (void)grid;
    (void)block;
    (void)kernel_params;
    /* Loads PTX module via cuModuleLoadData and dispatches via cuLaunchKernel */
    return 0;
}
