#ifndef CGT_ARCH_RISCV64_H
#define CGT_ARCH_RISCV64_H

#include <stdint.h>
#include <stdbool.h>

#if defined(__riscv) && (__riscv_xlen == 64)

static inline uint64_t cgt_riscv_rdcycle(void) {
    uint64_t cycle;
    __asm__ volatile("rdcycle %0" : "=r"(cycle));
    return cycle;
}

static inline uint64_t cgt_riscv_rdtime(void) {
    uint64_t time;
    __asm__ volatile("rdtime %0" : "=r"(time));
    return time;
}

static inline void cgt_riscv_fence(void) {
    __asm__ volatile("fence iorw, iorw" ::: "memory");
}

static inline void cgt_riscv_fence_i(void) {
    __asm__ volatile("fence.i" ::: "memory");
}

#endif

#endif /* CGT_ARCH_RISCV64_H */
