#include "cgt_runtime.h"

static size_t g_active_allocations = 0;
static size_t g_total_bytes_allocated = 0;

void *cgt_rt_alloc(size_t size, const char *file, uint32_t line) {
    (void)file; (void)line;
    void *ptr = malloc(size);
    if (!ptr && size > 0) {
        cgt_rt_panic("Out of memory", file, line);
    }
    g_active_allocations++;
    g_total_bytes_allocated += size;
    return ptr;
}

void cgt_rt_free(void *ptr, const char *file, uint32_t line) {
    (void)file; (void)line;
    if (ptr) {
        if (g_active_allocations > 0) g_active_allocations--;
        free(ptr);
    }
}

size_t cgt_rt_active_allocations(void) {
    return g_active_allocations;
}

void cgt_rt_check_memory_leaks(void) {
    if (g_active_allocations > 0) {
        fprintf(stderr, "[C> Memory Leak Detected]: %zu allocation(s) not freed at exit!\n", g_active_allocations);
    }
}

void cgt_rt_panic(const char *msg, const char *file, uint32_t line) {
    fprintf(stderr, "\n=======================================================\n");
    fprintf(stderr, "\033[1;31m[C> RUNTIME PANIC]\033[0m: %s\n", msg);
    fprintf(stderr, "Location: %s:%u\n", file ? file : "<unknown>", line);
    fprintf(stderr, "Aborting execution deterministically.\n");
    fprintf(stderr, "=======================================================\n");
    exit(101);
}

void cgt_rt_assert(bool condition, const char *expr_str, const char *file, uint32_t line) {
    if (!condition) {
        char buf[256];
        snprintf(buf, sizeof(buf), "Assertion failed: '%s'", expr_str);
        cgt_rt_panic(buf, file, line);
    }
}

pthread_t cgt_rt_thread_spawn(cgt_thread_fn fn, void *arg) {
    pthread_t th;
    int rc = pthread_create(&th, NULL, fn, arg);
    if (rc != 0) {
        cgt_rt_panic("Failed to spawn OS thread", __FILE__, __LINE__);
    }
    return th;
}

void cgt_rt_thread_join(pthread_t thread) {
    pthread_join(thread, NULL);
}

cgt_v128_f32_t cgt_rt_v128_add_f32(cgt_v128_f32_t a, cgt_v128_f32_t b) {
    cgt_v128_f32_t r;
    for (int i = 0; i < 4; i++) r.data[i] = a.data[i] + b.data[i];
    return r;
}

cgt_v128_f32_t cgt_rt_v128_mul_f32(cgt_v128_f32_t a, cgt_v128_f32_t b) {
    cgt_v128_f32_t r;
    for (int i = 0; i < 4; i++) r.data[i] = a.data[i] * b.data[i];
    return r;
}

cgt_gpu_buffer_t cgt_rt_gpu_alloc(size_t bytes) {
    cgt_gpu_buffer_t buf;
    buf.size_bytes = bytes;
    buf.device_memory = malloc(bytes);
    buf.is_device_resident = true;
    return buf;
}

void cgt_rt_gpu_free(cgt_gpu_buffer_t *buf) {
    if (buf && buf->device_memory) {
        free(buf->device_memory);
        buf->device_memory = NULL;
        buf->is_device_resident = false;
    }
}

void cgt_rt_gpu_memcpy_to_device(cgt_gpu_buffer_t *dst, const void *src, size_t bytes) {
    if (dst && dst->device_memory && src) {
        memcpy(dst->device_memory, src, bytes);
    }
}

void cgt_rt_gpu_memcpy_to_host(void *dst, const cgt_gpu_buffer_t *src, size_t bytes) {
    if (dst && src && src->device_memory) {
        memcpy(dst, src->device_memory, bytes);
    }
}

void cgt_rt_gpu_dispatch_1d(cgt_gpu_kernel_fn kernel, void *args, uint32_t total_work_items) {
    for (uint32_t i = 0; i < total_work_items; i++) {
        kernel(args, i, 0);
    }
}

void cgt_rt_gpu_dispatch_2d(cgt_gpu_kernel_fn kernel, void *args, uint32_t total_work_items_x, uint32_t total_work_items_y) {
    for (uint32_t y = 0; y < total_work_items_y; y++) {
        for (uint32_t x = 0; x < total_work_items_x; x++) {
            kernel(args, x, y);
        }
    }
}
cgt_gpu_buffer_t cgt_rt_gpu_alloc_zeroed(size_t bytes) {
    cgt_gpu_buffer_t buf = cgt_rt_gpu_alloc(bytes);
    if (buf.device_memory) {
        memset(buf.device_memory, 0, bytes);
    }
    return buf;
}
