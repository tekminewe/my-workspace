# Documentation Index

This folder contains documentation for the my-web application.

## 📚 Available Documentation

### Site Management

- **[Site Logo Management](./site-logo-management.md)** - Complete guide for per-language logo management with dark/light mode support
- **[Site Settings](./site-settings.md)** - Configuration and management of site-wide settings
- **[Theme Override](./theme-override.md)** - How to customize mint-ui themes and colors

### Development

- **[UI Reference](./ui-reference.md)** - Component usage and UI guidelines
- **[Refactoring Complete](./REFACTORING_COMPLETE.md)** - Summary of the logo system refactoring

## 🚀 Quick Start

### Logo Management

For managing site logos (the most commonly needed documentation):

1. **Admin Interface**: Navigate to Admin → Site → General Information
2. **Per-Language Setup**: Upload light and dark logos for each language
3. **Component Usage**: Use `<SiteLogo currentLanguage={lang} />` in components

See [Site Logo Management](./site-logo-management.md) for complete details.

### Theme Customization

For customizing the application's visual theme:

1. **Color Overrides**: Modify CSS custom properties in `globals.css`
2. **Mint-UI Integration**: Use the theme override system
3. **Testing**: Verify in both light and dark modes

See [Theme Override](./theme-override.md) for complete details.

## 📋 Documentation Standards

- **Keep up to date**: Update docs when code changes
- **Include examples**: Provide practical usage examples
- **Test instructions**: Verify code examples actually work
- **Clear structure**: Use consistent formatting and organization
