# Component Standardization Status

This document tracks the progress of standardizing mint-ui components to use the centralized color system from `src/components/utils/component-colors.ts`.

## ✅ Completed Standardizations

### DataTable Component

- **Status**: ✅ Complete
- **Changes**:
  - Added vertical scrolling (`maxHeight` prop) and sticky header (`stickyHeader` prop)
  - Updated to use `SKELETON_COLORS.primary` for loading states
  - Updated to use `INTERACTION_COLORS.hover` for row hover effects
  - Updated to use standardized surface, text, and border colors
- **Files Modified**:
  - `src/components/data-table/data-table.tsx`
  - `docs/data-table-scrolling.md` (created)

### Skeleton Component

- **Status**: ✅ Complete
- **Changes**: Updated to use `SKELETON_COLORS.primary` for consistent skeleton backgrounds
- **Files Modified**: `src/components/skeleton/skeleton.tsx`

### SearchResultListItemSkeleton Component

- **Status**: ✅ Complete
- **Changes**: Updated to use `SKELETON_COLORS.primary` for consistent skeleton backgrounds
- **Files Modified**: `src/components/search-input/search-result-list-item-skeleton.tsx`

### MobileNavigationMenuItem Component

- **Status**: ✅ Complete
- **Changes**: Updated to use `NAVIGATION_COLORS` for consistent hover/disabled states
- **Files Modified**: `src/components/mobile-navigation-menu/item.tsx`

### Button Component

- **Status**: ✅ Complete
- **Changes**:
  - Replaced hardcoded color classes with standardized `BUTTON_COLORS` system
  - Added `getButtonColors()` helper function
  - All button variants (solid, soft, outline, ghost, link) now use consistent theming
- **Files Modified**: `src/components/button/button.tsx`

### IconButton Component

- **Status**: ✅ Complete
- **Changes**:
  - Replaced hardcoded color classes with standardized `ICON_BUTTON_COLORS` system
  - Added `getIconButtonColors()` helper function
  - All variants (solid, outline, soft, ghost) now use consistent theming
- **Files Modified**: `src/components/icon-button/icon-button.tsx`

## 🎨 New Color System Additions

### Core Color Utilities Added

- `INTERACTION_COLORS`: Hover, focus, and active states
- `SKELETON_COLORS`: Loading skeleton backgrounds
- `NAVIGATION_COLORS`: Navigation item styling
- `BUTTON_COLORS`: Complete button color system for all variants
- `ICON_BUTTON_COLORS`: Complete icon button color system for all variants

### Helper Functions Added

- `getButtonColors(variant, color)`: Returns standardized button colors
- `getIconButtonColors(variant, color)`: Returns standardized icon button colors

## 🔍 Components Identified for Future Standardization

The following components still contain hardcoded hover/background colors that should be standardized:

### High Priority

1. **List Components**

   - `src/components/list/list-item.tsx`: Uses `hover:bg-primary-50 hover:text-primary-700`
   - `src/components/sub-menu/sub-menu-item.tsx`: Uses `hover:bg-primary-50 hover:text-primary-700`

2. **Selection Components**

   - `src/components/select/select.tsx`: Uses `hover:bg-primary-50 hover:text-primary-700`
   - `src/components/search-input/search-result-list-item.tsx`: Uses `hover:bg-primary-50 dark:hover:bg-primary-100`

3. **Command Component**
   - `src/components/command/item.tsx`: Uses `hover:bg-accent-a3`

### Medium Priority

4. **Date Input Component**

   - `src/components/date-input/date-input.tsx`: Uses CSS custom properties for hover states

5. **Story Files** (Low Priority)
   - `src/components/card/card.stories.tsx`: Has hardcoded `hover:bg-blue-700` (story examples only)

## 📋 Standardization Checklist

For each component standardization:

- [ ] **Identify hardcoded colors**: Search for `hover:bg-`, `bg-neutral-`, `text-neutral-` patterns
- [ ] **Create color utilities**: Add appropriate color constants to `component-colors.ts`
- [ ] **Update component**: Replace hardcoded classes with standardized utilities
- [ ] **Add helper functions**: If needed, create `getXColors()` helper functions
- [ ] **Test build**: Ensure `pnpm build` passes without errors
- [ ] **Test themes**: Verify component works in both light and dark modes
- [ ] **Update documentation**: Update this status document

## 🎯 Benefits Achieved

1. **Consistent Theming**: All standardized components now follow the same color patterns
2. **Dark Mode Compatibility**: Colors automatically work in both light and dark themes
3. **Maintainability**: Color changes can be made in one central location
4. **Accessibility**: Consistent contrast ratios and color relationships
5. **Developer Experience**: Clear, semantic color utilities reduce confusion

## 🔧 Usage Guidelines

### For Component Development

```typescript
// ✅ DO - Use standardized color utilities
import { INTERACTION_COLORS, SKELETON_COLORS, getButtonColors } from '../utils/component-colors';

// ✅ DO - Use helper functions for complex color systems
className={getButtonColors('ghost', 'neutral')}

// ✅ DO - Use semantic color constants
className={cn('loading-skeleton', SKELETON_COLORS.primary)}

// ❌ DON'T - Use hardcoded colors that break in dark mode
className="hover:bg-neutral-100 dark:hover:bg-neutral-800"
```

### For Theme Consistency

- Always test components in both light and dark modes
- Use existing color utilities before creating new ones
- Follow the naming pattern: `COMPONENT_TYPE_COLORS`
- Create helper functions for complex color combinations

## 📝 Next Steps

1. **Complete List Component Standardization**: Update `list-item.tsx` and `sub-menu-item.tsx`
2. **Standardize Selection Components**: Update `select.tsx` and `search-result-list-item.tsx`
3. **Review Command Component**: Determine appropriate color system for `command/item.tsx`
4. **Audit Remaining Components**: Search for any other hardcoded color patterns
5. **Create Component Color Guidelines**: Document best practices for future component development
