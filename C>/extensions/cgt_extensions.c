#include "cgt_extensions.h"

static cgt_extension_t *REGISTRY_HEAD = NULL;

void cgt_extension_registry_init(void) {
    REGISTRY_HEAD = NULL;
}

bool cgt_extension_register(cgt_extension_t *ext) {
    if (!ext || !ext->name) return false;

    /* Check if already registered */
    if (cgt_extension_lookup(ext->name)) {
        return false;
    }

    ext->next = REGISTRY_HEAD;
    REGISTRY_HEAD = ext;
    return true;
}

cgt_extension_t *cgt_extension_lookup(const char *name) {
    if (!name) return NULL;
    cgt_extension_t *curr = REGISTRY_HEAD;
    while (curr) {
        if (strcmp(curr->name, name) == 0) return curr;
        curr = curr->next;
    }
    return NULL;
}

void cgt_extension_registry_dump(FILE *out) {
    fprintf(out, "=== Registered C> Language Extensions ===\n");
    cgt_extension_t *curr = REGISTRY_HEAD;
    if (!curr) {
        fprintf(out, "  (none registered)\n");
        return;
    }
    while (curr) {
        fprintf(out, "  - [%s v%s]: %s\n", curr->name, curr->version ? curr->version : "1.0", curr->description ? curr->description : "");
        curr = curr->next;
    }
}
