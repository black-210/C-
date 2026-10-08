#ifndef CGT_GPU_RUNTIME_H
#define CGT_GPU_RUNTIME_H

#include <stdint.h>
#include <stddef.h>
#include <stdbool.h>

typedef enum {
    CGT_GPU_BACKEND_NONE = 0,
    CGT_GPU_BACKEND_VULKAN,
    CGT_GPU_BACKEND_CUDA,
    CGT_GPU_BACKEND_METAL
} cgt_gpu_backend_type_t;

typedef struct {
    uint32_t device_id;
    char name[128];
    uint64_t total_memory;
    uint32_t compute_units;
    cgt_gpu_backend_type_t backend;
} cgt_gpu_device_info_t;

typedef struct {
    void *device_ptr;
    size_t size_bytes;
    bool is_unified;
} cgt_gpu_buffer_t;

typedef struct {
    uint32_t x;
    uint32_t y;
    uint32_t z;
} cgt_gpu_dim3_t;

/* Common GPU runtime interface functions */
int cgt_gpu_init(cgt_gpu_backend_type_t backend);
int cgt_gpu_get_device_count(void);
int cgt_gpu_get_device_info(int device_idx, cgt_gpu_device_info_t *info);
cgt_gpu_buffer_t *cgt_gpu_alloc_buffer(size_t size);
void cgt_gpu_free_buffer(cgt_gpu_buffer_t *buf);
int cgt_gpu_memcpy_to_device(cgt_gpu_buffer_t *dst, const void *src, size_t size);
int cgt_gpu_memcpy_to_host(void *dst, const cgt_gpu_buffer_t *src, size_t size);
int cgt_gpu_synchronize(void);
void cgt_gpu_shutdown(void);

#endif /* CGT_GPU_RUNTIME_H */
