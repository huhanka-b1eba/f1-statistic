export default {
    "*.{ts,tsx,js,jsx}": ["oxlint --fix", "prettier --write"],
    "*.{json,css,scss,md,html}": ["prettier --write"],
}
