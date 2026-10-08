#ifndef CGT_ARCH_AARCH64_H
#define CGT_ARCH_AARCH64_H

#include <stdint.h>
#include <stdbool.h>

#if defined(__aarch64__)
#include <arm_neon.h>

static inline uint64_t cgt_arm_cntvct(void) {
    uint64_t val;
    __asm__ volatile("mrs %0, cntvct_el0" : "=r"(val));
    return val;
}

static inline void cgt_arm_isb(void) {
    __asm__ volatile("isb" ::: "memory");
}

static inline void cgt_arm_dmb_ish(void) {
    __asm__ volatile("dmb ish" ::: "memory");
}

static inline void cgt_arm_yield(void) {
    __asm__ volatile("yield");
}
#endif

#endif /* CGT_ARCH_AARCH64_H */
