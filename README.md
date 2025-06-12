# @omergulcicek/password-input

React hook that adds show/hide toggle to password inputs.

![npm](https://img.shields.io/npm/v/@omergulcicek/password-input)
![bundlephobia](https://img.shields.io/bundlephobia/minzip/@omergulcicek/password-input)
![types](https://img.shields.io/npm/types/@omergulcicek/password-input)
![license](https://img.shields.io/npm/l/@omergulcicek/password-input)
![npm downloads](https://img.shields.io/npm/dw/@omergulcicek/password-input)

## 🚀 Live Demo

Try the interactive demo: **[omergulcicek-password-input.vercel.app](https://omergulcicek-password-input.vercel.app/)**

See password input with show/hide toggle functionality in action.

## Installation

```bash
npm install @omergulcicek/password-input
```

## Features

**Password Toggle**: Show/hide password functionality with custom icons  
**Custom Icons**: Support for any React components as icons  
**TypeScript Support**: Full type safety  
**Customizable Styling**: Custom class names and styling options  
**Accessible**: Proper ARIA labels and keyboard support  
**Flexible**: Works with any CSS framework or custom styles  

## Basic Usage

```tsx
import { usePasswordInput } from "@omergulcicek/password-input"

const { inputProps, InputWrapper, wrapperProps } = usePasswordInput({
  password: true
});

return (
  <InputWrapper {...wrapperProps}>
    <input {...inputProps} />
  </InputWrapper>
)
```

## Custom Icons and Text

You can customize the show/hide icons with any React component:

```tsx
import { usePasswordInput } from "@omergulcicek/password-input"

const { inputProps, InputWrapper, wrapperProps } = usePasswordInput({
  password: {
    icons: {
      show: <span className="text-xs">Show</span>,
      hide: <span className="text-xs">Hide</span>,
    }
  }
});

return (
  <InputWrapper {...wrapperProps}>
    <input {...inputProps} />
  </InputWrapper>
)
```

## With Lucide React Icons

```tsx
import { usePasswordInput } from "@omergulcicek/password-input"
import { House, Star } from "lucide-react"

const { inputProps, InputWrapper, wrapperProps } = usePasswordInput({
  password: {
    icons: {
      show: <House className="size-4" />,
      hide: <Star className="size-4" />,
    }
  }
});

return (
  <InputWrapper {...wrapperProps}>
    <input {...inputProps} />
  </InputWrapper>
)
```

## Custom Styling

```tsx
import { usePasswordInput } from "@omergulcicek/password-input"

const { inputProps, InputWrapper, wrapperProps } = usePasswordInput({
  password: true,
  classNames: {
    wrapper: "my-custom-wrapper", // outer container div
    suffix: "my-custom-suffix",     // right-side icon container
    button: "my-custom-button"    // toggle button element
  }
});

return (
  <InputWrapper {...wrapperProps}>
    <input {...inputProps} />
  </InputWrapper>
)
```

## With Class Name Utility (clsx, cn, etc.)

```tsx
import { usePasswordInput } from "@omergulcicek/password-input"
import { cn } from "@/lib/utils" // your class name utility

const { inputProps, InputWrapper, wrapperProps } = usePasswordInput({
  password: true,
  classNames: {
    wrapper: "my-custom-wrapper",
    suffix: "my-custom-suffix", 
    button: "my-custom-button"
  },
  cn // optional
});

return (
  <InputWrapper {...wrapperProps} className="border rounded-md">
    <input {...inputProps} className="px-3 py-2 w-full" />
  </InputWrapper>
)
```

> **Note:** The `cn` parameter is optional. If not provided, the component will work perfectly but conflicting Tailwind classes may not be resolved (e.g., `p-1` and `p-2` both remain in the output). Using a class name utility like `clsx`, `cn`, or `twMerge` ensures proper class merging and conflict resolution.

## API Reference

### usePasswordInput Options

| Option | Type | Description |
|--------|------|-------------|
| `password` | `boolean \| PasswordConfig` | Enable password toggle functionality |
| `classNames` | `object` | Custom class names for wrapper, suffix, and button |
| `cn` | `function` | Class name utility function (like clsx or cn) |

### PasswordConfig

| Option | Type | Description |
|--------|------|-------------|
| `icons.show` | `React.ReactNode` | Custom icon for show password button |
| `icons.hide` | `React.ReactNode` | Custom icon for hide password button |

### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `inputProps` | `object` | Props to spread on your input element |
| `InputWrapper` | `Component` | Wrapper component for the input |
| `wrapperProps` | `object` | Props to spread on InputWrapper |
| `showPassword` | `boolean` | Current password visibility state |
| `value` | `string` | Current input value |
| `setValue` | `function` | Function to update input value |

## Key Benefits

**Zero Configuration**: Works out of the box with sensible defaults  
**Highly Customizable**: Every aspect can be customized  
**Framework Agnostic**: Works with any CSS framework  
**Lightweight**: Minimal bundle size impact  
**TypeScript First**: Built with TypeScript for the best DX

## Credits

Default icons are adapted from [Lucide](https://lucide.dev) (ISC License)

### Contributors

- [@omergulcicek](https://github.com/omergulcicek)
