# DataTable Scrolling Features

The DataTable component now supports comprehensive scrolling capabilities to handle large datasets and wide tables.

## Features

### 1. Horizontal Scrolling (Default)

- **Always enabled** via `overflow-x-auto`
- Automatically shows horizontal scrollbar when table content exceeds container width
- Perfect for tables with many columns or long content

### 2. Vertical Scrolling (Optional)

- Enable with `maxHeight` prop
- Set a maximum height for the table container
- Content scrolls vertically when it exceeds the specified height
- Useful for displaying many rows without taking up entire page

### 3. Sticky Header (Optional)

- Enable with `stickyHeader` prop (default: `true`)
- Header stays fixed at top when scrolling vertically
- Only active when `maxHeight` is specified
- Maintains consistent background color with table variant

## Usage Examples

### Basic Horizontal Scrolling

```tsx
<DataTable
  columns={wideColumns}
  data={data}
  // Horizontal scrolling is automatic
/>
```

### Vertical Scrolling with Fixed Height

```tsx
<DataTable
  columns={columns}
  data={largeDataset}
  maxHeight="400px"
  stickyHeader={true}
/>
```

### Both Horizontal and Vertical Scrolling

```tsx
<DataTable
  columns={wideColumns}
  data={largeDataset}
  maxHeight="300px"
  stickyHeader={true}
/>
```

### Using Viewport Units

```tsx
<DataTable
  columns={columns}
  data={data}
  maxHeight="50vh" // 50% of viewport height
  stickyHeader={true}
/>
```

## Props

### `maxHeight?: string`

- Sets maximum height for the table container
- Accepts any valid CSS height value (`"400px"`, `"50vh"`, `"20rem"`, etc.)
- When set, enables vertical scrolling
- **Default**: `undefined` (no height limit)

### `stickyHeader?: boolean`

- Controls whether header stays fixed during vertical scrolling
- Only applies when `maxHeight` is set
- Header maintains proper background color for both light and dark themes
- **Default**: `true`

## Implementation Details

### Scrolling Container

- Wrapper div has `overflow-x-auto` for horizontal scrolling
- When `maxHeight` is set, also gets `overflow-y-auto`
- Uses `style={{ maxHeight }}` for dynamic height control

### Sticky Header Styling

- Applied when both `stickyHeader={true}` and `maxHeight` are set
- Uses `sticky top-0 z-10` positioning
- Background color adapts to table variant:
  - **Ghost variant**: `bg-white dark:bg-neutral-950`
  - **Surface variant**: Uses `SURFACE_COLORS.surfaceElevated`

### Theme Compatibility

- All scrolling features work in both light and dark modes
- Sticky headers maintain proper contrast and visibility
- Colors automatically adapt using the mint-ui color system
- **Loading skeletons** use proper contrast colors (`SKELETON_COLORS.primary`) for visibility in both themes
- **Row hover effects** use standardized interaction colors (`INTERACTION_COLORS.hover`) for consistent theming

## Best Practices

### When to Use Vertical Scrolling

- ✅ Large datasets (20+ rows)
- ✅ Fixed layout requirements
- ✅ Dashboard-style interfaces
- ✅ When pagination isn't suitable

### Height Guidelines

- **Small tables**: `300px - 400px`
- **Medium tables**: `400px - 600px`
- **Large tables**: `50vh - 70vh`
- **Full screen**: `80vh - 90vh`

### Performance Considerations

- Vertical scrolling works best with pagination
- Consider virtual scrolling for 1000+ rows
- Use reasonable `maxHeight` values to avoid memory issues

### Accessibility

- Sticky headers improve navigation for screen readers
- Scrollable regions are keyboard accessible
- Focus management is preserved during scrolling

## Examples in Storybook

Check the DataTable AllVariants story for complete examples:

- Basic horizontal scrolling
- Vertical scrolling with fixed height
- Combined horizontal and vertical scrolling
- Different height values and variants

## Migration Guide

### From Previous Versions

- No breaking changes - all existing DataTable usage continues to work
- Add `maxHeight` prop to enable vertical scrolling
- Add `stickyHeader={false}` if you don't want sticky headers

### Adding to Existing Tables

```tsx
// Before: Basic table
<DataTable columns={columns} data={data} />

// After: Add vertical scrolling
<DataTable
  columns={columns}
  data={data}
  maxHeight="400px"
  stickyHeader={true}
/>
```
