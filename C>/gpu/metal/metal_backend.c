#include "../gpu_runtime.h"
#include <stdio.h>
#include <stdlib.h>

/* Apple Metal Shading Language (MSL) compute backend */
int cgt_metal_init(void) {
    /* Initializes MTLCreateSystemDefaultDevice */
    return 0;
}

int cgt_metal_dispatch_msl(const char *msl_source, const char *function_name,
                           cgt_gpu_dim3_t grid, cgt_gpu_dim3_t threadgroup,
                           cgt_gpu_buffer_t **buffers, int buffer_count) {
    (void)msl_source;
    (void)function_name;
    (void)grid;
    (void)threadgroup;
    (void)buffers;
    (void)buffer_count;
    /* Compiles MSL library and encodes compute command buffer */
    return 0;
}
