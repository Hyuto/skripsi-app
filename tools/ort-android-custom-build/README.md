# `onnxruntime-mobile` Custom Build

This directory contains helper files for building a custom ONNX Runtime Android package.
It can be copied outside of the ONNX Runtime repo and used independently.

Run the ./build_custom_android_package.py script. Use the --help option for more information.

Prerequisites:

- Python 3.6+
- Docker

See https://onnxruntime.ai/docs/build/custom.html for more information about creating and using custom builds.

## Build Commands

```bash
$ python build_custom_android_package.py \
    --onnxruntime_branch_or_tag v1.12.1 \
    --include_ops_by_config ./model.required_operators.with_runtime_opt.config \
    --build_settings ./build_settings.json \
    ./build
```
