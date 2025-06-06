// © 2025 Ömer Gülçiçek – MIT License
// https://omergulcicek.com • https://github.com/omergulcicek

import { useState, useCallback, memo, useRef } from "react";

interface PasswordConfig {
  icons?: {
    show?: React.ReactNode;
    hide?: React.ReactNode;
  };
}

type ClassNameFn = (
  ...classes: (string | undefined | null | false)[]
) => string;

interface UsePasswordInputOptions {
  password?: boolean | PasswordConfig;
  classNames?: {
    wrapper?: string;
    suffix?: string;
    button?: string;
  };
  cn?: ClassNameFn;
}

interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  password?: boolean | PasswordConfig;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  classNames?: {
    wrapper?: string;
    suffix?: string;
    button?: string;
  };
  cn?: ClassNameFn;
}

const DEFAULT_ICONS = {
  show: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  hide: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  ),
} as const;

const DEFAULT_CLASSES = {
  wrapper: "relative",
  suffix:
    "flex bg-white absolute right-2 top-1/2 gap-1 items-center -translate-y-1/2",
  button: "p-1 focus:outline-none",
} as const;

const combineClasses = (
  cn: ClassNameFn | undefined,
  defaultClass: string,
  customClass?: string
) => {
  return cn
    ? cn(defaultClass, customClass)
    : [defaultClass, customClass].filter(Boolean).join(" ");
};

const InputWrapper = memo(
  ({
    children,
    className,
    password,
    showPassword,
    onTogglePassword,
    classNames = {},
    cn,
    ...props
  }: InputWrapperProps) => {
    if (!password) {
      return (
        <div className={className} {...props}>
          {children}
        </div>
      );
    }

    const config = typeof password === "boolean" ? {} : password;
    const showIcon = config.icons?.show ?? DEFAULT_ICONS.show;
    const hideIcon = config.icons?.hide ?? DEFAULT_ICONS.hide;

    const wrapperClass = combineClasses(
      cn,
      DEFAULT_CLASSES.wrapper,
      classNames.wrapper
    );
    const suffixClass = combineClasses(
      cn,
      DEFAULT_CLASSES.suffix,
      classNames.suffix
    );
    const buttonClass = combineClasses(
      cn,
      DEFAULT_CLASSES.button,
      classNames.button
    );
    const finalWrapperClass = cn
      ? cn(wrapperClass, className)
      : `${wrapperClass} ${className || ""}`.trim();

    return (
      <div className={finalWrapperClass} {...props}>
        {children}
        <div className={suffixClass}>
          <button
            type="button"
            onClick={onTogglePassword}
            className={buttonClass}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? hideIcon : showIcon}
          </button>
        </div>
      </div>
    );
  }
);

InputWrapper.displayName = "InputWrapper";

/**
 * Password input hook with password toggle functionality
 * @param options - Configuration options for the hook
 * @param options.password - Enable password functionality (boolean or config object)
 * @param options.classNames - Custom class names for styling
 * @param options.cn - Custom class name utility function
 * @returns Object containing input props, show password state, and InputWrapper component
 */
export function usePasswordInput(options: UsePasswordInputOptions = {}) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { password, classNames = {}, cn } = options;
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const textLength = inputRef.current.value.length;
        inputRef.current.setSelectionRange(textLength, textLength);
      }
    }, 0);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  return {
    inputProps: password
      ? {
          type: showPassword ? "text" : "password",
          value: inputValue,
          onChange: handleInputChange,
          className: "pr-10",
          ref: inputRef,
        }
      : {},
    showPassword,
    InputWrapper,
    wrapperProps: {
      password,
      showPassword,
      onTogglePassword: togglePassword,
      classNames,
      cn,
    },
    value: inputValue,
    setValue: setInputValue,
  };
}
