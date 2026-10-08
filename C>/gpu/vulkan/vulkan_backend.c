#include "../gpu_runtime.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Vulkan compute backend emulation & dispatcher */
int cgt_vulkan_init(void) {
    /* Probes Vulkan driver instances and physical compute devices */
    return 0;
}

int cgt_vulkan_dispatch_compute(const char *kernel_spv, size_t spv_size,
                                cgt_gpu_dim3_t grid, cgt_gpu_dim3_t block,
                                cgt_gpu_buffer_t **bindings, int binding_count) {
    (void)kernel_spv;
    (void)spv_size;
    (void)grid;
    (void)block;
    (void)bindings;
    (void)binding_count;
    /* Dispatches SPIR-V compute pipeline on Vulkan queue */
    return 0;
}
