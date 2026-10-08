#include "cgt_driver.h"

int main(int argc, char **argv) {
    cgt_driver_options_t opts;
    cgt_driver_options_init(&opts);

    int parse_res = cgt_driver_parse_args(argc, argv, &opts);
    if (parse_res != 0) {
        return (parse_res > 0) ? 0 : 1;
    }

    return cgt_driver_run(&opts);
}
