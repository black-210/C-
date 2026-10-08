#ifndef CGT_RUNTIME_H
#define CGT_RUNTIME_H

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>
#include <string.h>
#include <pthread.h>

#ifdef __cplusplus
extern "C" {
#endif

/* Memory Management & Safety Tracking */
void *cgt_rt_alloc(size_t size, const char *file, uint32_t line);
void cgt_rt_free(void *ptr, const char *file, uint32_t line);
size_t cgt_rt_active_allocations(void);
void cgt_rt_check_memory_leaks(void);

/* Panic & Abort */
void cgt_rt_panic(const char *msg, const char *file, uint32_t line);
void cgt_rt_assert(bool condition, const char *expr_str, const char *file, uint32_t line);

/* Concurrency & Threads */
typedef void *(*cgt_thread_fn)(void *);
pthread_t cgt_rt_thread_spawn(cgt_thread_fn fn, void *arg);
void cgt_rt_thread_join(pthread_t thread);

/* SIMD 128-bit & 256-bit Vector Operations */
typedef struct { float data[4]; } cgt_v128_f32_t;
typedef struct { int32_t data[4]; } cgt_v128_i32_t;
typedef struct { float data[8]; } cgt_v256_f32_t;

cgt_v128_f32_t cgt_rt_v128_add_f32(cgt_v128_f32_t a, cgt_v128_f32_t b);
cgt_v128_f32_t cgt_rt_v128_mul_f32(cgt_v128_f32_t a, cgt_v128_f32_t b);

/* GPU Host Runtime Interface */
typedef struct {
    void *device_memory;
    size_t size_bytes;
    bool is_device_resident;
} cgt_gpu_buffer_t;

typedef void (*cgt_gpu_kernel_fn)(void *args, uint32_t global_id_x, uint32_t global_id_y);

cgt_gpu_buffer_t cgt_rt_gpu_alloc(size_t bytes);
void cgt_rt_gpu_free(cgt_gpu_buffer_t *buf);
void cgt_rt_gpu_memcpy_to_device(cgt_gpu_buffer_t *dst, const void *src, size_t bytes);
void cgt_rt_gpu_memcpy_to_host(void *dst, const cgt_gpu_buffer_t *src, size_t bytes);
void cgt_rt_gpu_dispatch_1d(cgt_gpu_kernel_fn kernel, void *args, uint32_t total_work_items);

/* MMIO & Hardware Register Access */
static inline uint32_t cgt_rt_mmio_read32(uintptr_t addr) {
    return *(volatile uint32_t *)addr;
}

static inline void cgt_rt_mmio_write32(uintptr_t addr, uint32_t val) {
    *(volatile uint32_t *)addr = val;
}

#ifdef __cplusplus
}
#endif

#endif /* CGT_RUNTIME_H */
