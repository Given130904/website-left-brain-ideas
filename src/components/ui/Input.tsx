
interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows?: number;
  error?: string;
}

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  rows = 3,
  error
}: InputProps) {
  const inputBaseClasses = "w-full text-xs px-4 py-3.5 rounded-lg bg-white/2 border border-white/8 text-[#F8FAFC] outline-none transition-all duration-300 font-sans";
  const focusClasses = "focus:border-[#00D4FF] focus:shadow-[0_0_15px_rgba(0,212,255,0.15)]";
  const errorClasses = error ? "border-[#ef4444]/60" : "";

  return (
    <div className="flex flex-col items-start w-full gap-1.5 text-left">
      <label className="text-[10px] font-heading font-semibold text-text-secondary uppercase tracking-wider">
        {required ? `[ ] ${label}` : `{ } ${label}`}
      </label>

      {type === 'textarea' ? (
        <textarea
          rows={rows}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputBaseClasses} ${focusClasses} ${errorClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputBaseClasses} ${focusClasses} ${errorClasses}`}
        />
      )}

      {error && (
        <span className="text-[10px] text-[#ef4444] font-semibold tracking-wide">
          {error}
        </span>
      )}
    </div>
  );
}
