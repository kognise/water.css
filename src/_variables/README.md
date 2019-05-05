Every file matching variable-*.scss in src/ will be processed with PostCSS,
prefixed with "_" and copied to this folder at build time.

> ⚠ Any changes you make to files within this folder **will be overwritten** on next build!

→ Edit variables within `src/variable-[...].scss`  
→ Use them within Sass by importing `src/_variables/_variable-[...]`.
