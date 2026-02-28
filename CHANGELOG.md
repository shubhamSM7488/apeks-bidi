# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog
and this project adheres to Semantic Versioning.

## [0.1.0] - 2026-02-28

### Added

- Initial repository setup
- ESM-only package configuration
- TypeScript build configuration
- Strict tsconfig with NodeNext module resolution
- Base folder structure for runtime and unicode pre-build pipeline
- Vitest testing setup
- Initial test folder layout (unit / integration / conformance)
- Scripts folder for unicode data generation pipeline
- Docs folder for decisions and notes
- MIT license
- README describing Apeks engine modular architecture
- CHANGELOG

### Changed

- Migrated package to scoped name @apeks/bidi
- Removed CommonJS support
- Configured ESM-only exports
- Added build / typecheck / dev scripts
- Added clean step using rimraf
- Enabled sideEffects: false for tree-shaking

### Notes

This package is a modular component extracted from the Apeks editor engine.
It is under active development and not yet production stable.
