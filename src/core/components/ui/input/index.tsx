import {
  type FormEvent,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { CircleX, EyeIcon, SearchIcon } from "lucide-react";

import type { InputComponent, InputFileProps, InputSearchProps } from "./types";
import { cn } from "@/core/libraries/tailwind";

const InputFile: InputFileProps = forwardRef(({ className, ...props }, ref) => {
  const file = useRef<HTMLDivElement | null>(null);

  const [hasFile, setHasFile] = useState<boolean>(false);

  const iconClassNames = useMemo(
    () =>
      cn(
        "border border-transparent right-3",
        "focus:outline-none focus:border-[#0095E5] focus:ring-2 focus:ring-[#C7E7F9] rounded-full",
        "absolute top-1/2 -translate-y-1/2 transition ease-out duration-200",
      ),
    [],
  );

  const inputHandler = (event: FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;

    const hasFile = value.trim().length !== 0;
    if (!hasFile) resetHandler();

    setHasFile(hasFile);
  };

  const resetHandler = useCallback(() => {
    if (file.current) {
      const input = file.current.firstElementChild as HTMLInputElement;
      input.value = "";

      setHasFile(false);
    }
  }, [file]);

  return (
    <div
      ref={file}
      className="relative"
    >
      <input
        {...props}
        ref={ref}
        className={cn(
          "w-full flex items-center gap-2.5 rounded transition ease-out duration-200",
          "disabled:cursor-not-allowed disabled:bg-neutral-bg disabled:text-neutral-tertiary",
          "border border-neutral-outline focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:border-primary-500 focus-visible:ring-primary-100",
          "text-neutral-default placeholder:text-neutral-tertiary bg-neutral-text",
          "text-xs file:text-xxs py-2 px-3 pr-9",
          "file:border-0 file:rounded-full file:mr-2",
          className,
        )}
        type={"file"}
        onChange={inputHandler}
      />
      {hasFile && (
        <EyeIcon
          className={cn(iconClassNames, "text-neutral-tertiary w-4 h-4")}
        />
      )}
    </div>
  );
});
InputFile.displayName = "InputFile";

const InputSearch: InputSearchProps = forwardRef(
  ({ className, ...props }, ref) => {
    const search = useRef<HTMLDivElement | null>(null);

    const [hasInput, setHasInput] = useState<boolean>(false);

    const iconClassNames = useMemo(
      () =>
        cn(
          "border border-transparent ",
          "focus:outline-none focus-visible:border-[#0095E5] focus-visible:ring-2 focus-visible:ring-[#C7E7F9] rounded-full",
          "absolute top-1/2 -translate-y-1/2 transition ease-out duration-200",
        ),
      [],
    );

    const inputHandler = (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value;
      setHasInput(value.trim().length !== 0);
    };

    const resetHandler = useCallback(() => {
      if (search.current) {
        const input = search.current.firstElementChild as HTMLInputElement;
        input.value = "";

        setHasInput(false);
        props.onChange!("");
        input.focus();
      }
    }, [search]);

    return (
      <div
        ref={search}
        className="relative h-fit"
      >
        <input
          {...props}
          ref={ref}
          className={cn(
            "w-full flex items-center gap-2.5 rounded transition ease-out duration-200",
            "disabled:cursor-not-allowed disabled:bg-neutral-bg disabled:text-neutral-tertiary",
            "border border-neutral-outline focus-visible:outline-none",
            "focus-visible:ring-1 focus-visible:border-primary-500 focus-visible:ring-primary-100",
            "text-neutral-default placeholder:text-neutral-tertiary bg-neutral-text",
            "text-xs file:text-xxs py-2 px-3 pr-9",
            "pl-9",
            className,
          )}
          type="text"
          onChange={(e) => props.onChange!(e.target.value)}
          onInput={inputHandler}
        />
        <SearchIcon
          className={cn(
            iconClassNames,
            "text-neutral-tertiary w-4 h-4 stroke-gray-500 left-3",
          )}
        />
        {hasInput && (
          <button
            className={cn(iconClassNames, "right-3 hover:scale-105")}
            onClick={resetHandler}
          >
            <CircleX
              className={cn("cursor-pointer w-[14px] h-[14px] stroke-gray-500")}
            />
          </button>
        )}
      </div>
    );
  },
);
InputSearch.displayName = "InputSearch";

export const Input = forwardRef(
  ({ className, type, leftAddon, rightAddon, ...props }, ref) => {
    return (
      <div className="relative">
        {leftAddon && (
          <div className="absolute flex items-center justify-center -translate-y-1/2 pointer-events-none left-3 top-1/2">
            {leftAddon}
          </div>
        )}
        <input
          {...props}
          ref={ref}
          className={cn(
            "w-full flex items-center gap-2.5 rounded transition ease-out duration-200",
            "disabled:cursor-not-allowed disabled:bg-neutral-bg disabled:text-neutral-tertiary",
            "border border-neutral-outline focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:border-primary-500 focus-visible:ring-primary-100",
            "text-neutral-default placeholder:text-neutral-tertiary bg-neutral-text",
            "file:border-0 file:rounded-full file:mr-2",
            "text-xs file:text-xxs py-2 px-3",
            leftAddon && "pl-9",
            rightAddon && "pr-9",
            className,
          )}
          type={type}
        />
        {rightAddon && (
          <div className="absolute flex items-center justify-center -translate-y-1/2 pointer-events-none right-3 top-1/2">
            {rightAddon}
          </div>
        )}
      </div>
    );
  },
) as InputComponent;
Input.displayName = "Input";

Input.File = InputFile;
Input.Search = InputSearch;
