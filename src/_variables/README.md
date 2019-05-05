Every file matching variables-*.scss in src/ will be processed with PostCSS,
prefixed with "_" and copied to this folder at build time.

> ⚠ Any changes you make to files within this folder **will be overwritten** on next build!

→ Edit variables within `src/variables-[...].scss`  
→ Use them within Sass by importing `src/_variables/_variables-[...]`.
