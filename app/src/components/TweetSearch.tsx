import { ReactNode } from "react";
import { useForm } from "react-hook-form";

type SearchProps = {
  children?: ReactNode;
  modelValue?: string;
  setModelValue: (a: string) => void;
  placeholder?: string;
  disabled?: boolean;
  search: () => void;
};

export default function TweetSearch({
  children,
  modelValue,
  setModelValue,
  placeholder,
  disabled,
  search,
}: SearchProps) {
  const handleSearchSubmit = () => {
    search();
  };

  const { handleSubmit, register } = useForm();
  const onSubmit = () => handleSearchSubmit();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative border-b">
      <input
        {...register("search")}
        type="text"
        value={modelValue}
        className="w-full bg-skin-secondary py-4 pl-16 pr-32 text-skin-secondary"
        placeholder={placeholder}
        onChange={(e) => setModelValue(e.target.value)}
        autoComplete="off"
      />
      <div
        className={
          (modelValue ? "text-skin-secondary " : "text-skin-third ") +
          "absolute inset-y-0 left-0 flex items-center justify-center pl-8 pr-2"
        }
      >
        {children}
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-8">
        <button
          type="submit"
          className={
            (!disabled
              ? "bg-current text-skin-secondary hover:bg-focus hover:text-white "
              : "cursor-not-allowed bg-current text-skin-third ") +
            "rounded-full px-4 py-1 font-semibold"
          }
          disabled={disabled}
        >
          Search
        </button>
      </div>
    </form>
  );
}
