"use client";

import { useMemo, useRef, useState, type SubmitEvent } from "react";

type FormState = {
  status: string;
  registration: string;
  "date-of-registration": string;
  make: string;
  model: string;
  derivative: string;
  colour: string;
  trim: string;
  purchase: string;
  odometer: string;
  vin: string;
  range: string;
  checkbox: string;
};

const emptyState: FormState = {
  status: "",
  registration: "",
  "date-of-registration": "",
  make: "",
  model: "",
  derivative: "",
  colour: "",
  trim: "",
  purchase: "",
  odometer: "",
  vin: "",
  range: "",
  checkbox: "",
};

export default function Home() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<FormState>(emptyState);

  const fields = useMemo(
    () =>
      [
        { key: "status", label: "Status", type: "text" },
        { key: "registration", label: "Registration", type: "text" },
        {
          key: "date-of-registration",
          label: "Date of Registration",
          type: "date",
        },
        { key: "make", label: "Make", type: "text" },
        { key: "model", label: "Model", type: "text" },
        { key: "derivative", label: "Derivative", type: "text" },
        { key: "colour", label: "Colour", type: "text" },
        { key: "trim", label: "Trim", type: "text" },
        { key: "purchase", label: "Purchase", type: "number", step: "any" },
        { key: "odometer", label: "Odometer", type: "number", step: "1" },
        { key: "vin", label: "VIN", type: "text" },
        { key: "range", label:"Range", type: "range"},
        { key: "checkbox", label:"Checkbox", type: "checkbox"},
      ] as const,
    [],
  );

  function onChange<K extends keyof FormState>(key: K, value: string) {
    setSuccess(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(true);
    setForm(emptyState);
    formRef.current?.reset();
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
        <header className="mb-8">
          <h1 className="text-pretty text-2xl font-semibold tracking-tight">
            AI Browser Automation Form Harness
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            All fields have explicit <code>id</code>, <code>name</code>, and
            associated <code>label</code> tags for reliable agent interaction.
          </p>
        </header>

        {success ? (
          <div
            id="success-message"
            className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900 shadow-sm"
            role="status"
            aria-live="polite"
          >
            <div className="font-semibold">Submitted successfully.</div>
            <div className="text-sm">
              The form has been cleared and is ready for another test.
            </div>
          </div>
        ) : null}

        <section className="rounded-xl border border-zinc-200 bg-white shadow-sm">
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="p-6 sm:p-8"
            noValidate
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key} className="flex flex-col gap-2">
                  <label
                    htmlFor={f.key}
                    className="text-sm font-medium text-zinc-900"
                  >
                    {f.label}
                  </label>
                  {f.key !== "trim" ? 
                    <input
                      id={f.key}
                      name={f.key}
                      type={f.type}
                      value={form[f.key]}
                      onChange={(e) => onChange(f.key, e.target.value)}
                      step={"step" in f ? f.step : undefined}
                      inputMode={
                        f.type === "number"
                          ? "step" in f && f.step === "1"
                            ? "numeric"
                            : "decimal"
                          : undefined
                      }
                      autoComplete="off"
                      className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                    />
                  :
                    <select 
                      id={f.key} 
                      name={f.key}
                      className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                      autoComplete="off"
                    >
                      <option value="" disabled={true}>--Please choose an option--</option>
                      <option value={"Cloth"}>Cloth</option>
                      <option value={"Leather"}>Leather</option>
                      <option value={"Unknown"}>Unknown</option>
                    </select>
                  }
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                id="submit"
                name="submit"
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-md bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
