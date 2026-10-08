#ifndef CGT_ARCH_X86_64_H
#define CGT_ARCH_X86_64_H

#include <stdint.h>
#include <stdbool.h>

#if defined(__x86_64__) || defined(_M_X64)
#include <immintrin.h>
#include <x86intrin.h>

static inline uint64_t cgt_x86_rdtsc(void) {
    return __rdtsc();
}

static inline void cgt_x86_pause(void) {
    _mm_pause();
}

static inline void cgt_x86_mfence(void) {
    _mm_mfence();
}

static inline void cgt_x86_lfence(void) {
    _mm_lfence();
}

static inline void cgt_x86_sfence(void) {
    _mm_sfence();
}

static inline void cgt_x86_cpuid(int leaf, int subleaf, int *eax, int *ebx, int *ecx, int *edx) {
    __asm__ volatile (
        "cpuid"
        : "=a"(*eax), "=b"(*ebx), "=c"(*ecx), "=d"(*edx)
        : "a"(leaf), "c"(subleaf)
    );
}

static inline bool cgt_x86_has_avx2(void) {
    int eax, ebx, ecx, edx;
    cgt_x86_cpuid(7, 0, &eax, &ebx, &ecx, &edx);
    return (ebx & (1 << 5)) != 0;
}

static inline bool cgt_x86_has_avx512f(void) {
    int eax, ebx, ecx, edx;
    cgt_x86_cpuid(7, 0, &eax, &ebx, &ecx, &edx);
    return (ebx & (1 << 16)) != 0;
}
#endif

#endif /* CGT_ARCH_X86_64_H */
