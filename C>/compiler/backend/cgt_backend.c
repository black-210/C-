#include "cgt_codegen.h"

typedef struct {
    const char *name;
    cgt_target_arch_t arch;
    const char *triple;
    bool has_avx2;
    bool has_neon;
    bool has_rvv;
} cgt_arch_descriptor_t;

static cgt_arch_descriptor_t SUPPORTED_ARCHS[] = {
    {"x86_64", TARGET_ARCH_X86_64, "x86_64-pc-linux-gnu", true, false, false},
    {"aarch64", TARGET_ARCH_AARCH64, "aarch64-unknown-linux-gnu", false, true, false},
    {"riscv64", TARGET_ARCH_RISCV64, "riscv64-unknown-linux-gnu", false, false, true},
    {NULL, 0, NULL, false, false, false}
};

const char *cgt_target_arch_name(cgt_target_arch_t arch) {
    for (int i = 0; SUPPORTED_ARCHS[i].name != NULL; i++) {
        if (SUPPORTED_ARCHS[i].arch == arch) {
            return SUPPORTED_ARCHS[i].name;
        }
    }
    return "unknown";
}
