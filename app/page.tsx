"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";

type FormState = {
  status: string;
  registration: string;
  "date-of-registration": string;
  "date-of-delivery": string;
  make: string;
  model: string;
  derivative: string;
  colour: string;
  trim: string;
  purchase: string;
  odometer: string;
  vin: string;
  finance_method: "" | "Cash" | "HP" | "PCP";
  hasTradeIn: boolean;
  "internal-notes": string;
};

const emptyState: FormState = {
  status: "",
  registration: "",
  "date-of-registration": "",
  "date-of-delivery": "",
  make: "",
  model: "",
  derivative: "",
  colour: "",
  trim: "",
  purchase: "",
  odometer: "",
  vin: "",
  finance_method: "",
  hasTradeIn: false,
  "internal-notes": "",
};

type TabId = "customer-selection" | "vehicle-details" | "order-options";
type CustomerRecord = { id: string; name: string };

export default function Home() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("customer-selection");
  const [success, setSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [isSearchingCustomer, setIsSearchingCustomer] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<CustomerRecord[]>([]);
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
        {
          key: "date-of-delivery",
          label: "Date of Delivery",
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
      ] as const,
    [],
  );

  const mockCustomers: CustomerRecord[] = [
    { id: "C-1001", name: "John Doe" },
    { id: "C-1002", name: "Acme Fleet Solutions" },
    { id: "C-1003", name: "Sarah Smith" },
    { id: "C-1004", name: "Michael Johnson" },
    { id: "C-1005", name: "Emma Williams" },
  ];

  function onSearchCustomer() {
    setIsSearchingCustomer(true);
    setHasSearched(true);
    setSelectedCustomer("");
    window.setTimeout(() => {
      const query = searchQuery.trim().toLowerCase();
      const matches = mockCustomers.filter((customer) =>
        customer.name.toLowerCase().includes(query),
      );
      setSearchResults(matches);
      setIsSearchingCustomer(false);
    }, 500);
  }

  function onChange<K extends keyof FormState>(key: K, value: string) {
    setSuccess(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(true);
    setForm(emptyState);
    setSearchQuery("");
    setSelectedCustomer("");
    setIsSearchingCustomer(false);
    setHasSearched(false);
    setSearchResults([]);
    setActiveTab("customer-selection");
    formRef.current?.reset();
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
        <header className="mb-8">
          <h1 className="text-pretty text-2xl font-semibold tracking-tight">
            DMS Automation Training Harness
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            Simulated enterprise workflow with customer lookup, vehicle data
            entry, and order configuration.
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
          <div
            className="flex border-b border-zinc-200 bg-zinc-100/60 p-2"
            role="tablist"
            aria-label="DMS sections"
          >
            <button
              id="customer-selection-tab"
              name="customer-selection-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === "customer-selection"}
              onClick={() => setActiveTab("customer-selection")}
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                activeTab === "customer-selection"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Customer Selection
            </button>
            <button
              id="vehicle-details-tab"
              name="vehicle-details-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === "vehicle-details"}
              onClick={() => setActiveTab("vehicle-details")}
              className={`ml-2 rounded-md px-4 py-2 text-sm font-medium ${
                activeTab === "vehicle-details"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Vehicle Details
            </button>
            <button
              id="order-options-tab"
              name="order-options-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === "order-options"}
              onClick={() => setActiveTab("order-options")}
              className={`ml-2 rounded-md px-4 py-2 text-sm font-medium ${
                activeTab === "order-options"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Order Options
            </button>
          </div>

          <form ref={formRef} onSubmit={onSubmit} className="p-6 sm:p-8" noValidate>
            <section
              id="customer-selection-panel"
              role="tabpanel"
              hidden={activeTab !== "customer-selection"}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="customerSearch"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Customer Search
                  </label>
                  <input
                    id="customerSearch"
                    name="customerSearch"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoComplete="off"
                    className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    id="searchButton"
                    name="searchButton"
                    type="button"
                    onClick={onSearchCustomer}
                    className="inline-flex h-11 items-center justify-center rounded-md bg-zinc-800 px-5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700"
                  >
                    {isSearchingCustomer ? "Searching..." : "Search"}
                  </button>
                </div>
              </div>

              <div
                id="searchResults"
                hidden={!hasSearched}
                className="rounded-md border border-zinc-200 bg-zinc-50 p-3"
              >
                {isSearchingCustomer ? (
                  <p className="text-sm text-zinc-600">Loading search results...</p>
                ) : searchResults.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {searchResults.map((customer) => (
                      <button
                        key={customer.id}
                        type="button"
                        className="customer-result-item rounded-md border border-zinc-300 bg-white px-3 py-2 text-left text-sm text-zinc-900 shadow-sm hover:bg-zinc-100"
                        onClick={() => setSelectedCustomer(customer.name)}
                      >
                        {customer.name} - {customer.id}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-600">No customers found.</p>
                )}
              </div>

              <p id="activeSelection" className="text-sm font-medium text-zinc-800">
                {selectedCustomer
                  ? `Active Selection: ${selectedCustomer}`
                  : "Active Selection: None"}
              </p>
            </section>

            <section
              id="vehicle-details-panel"
              role="tabpanel"
              hidden={activeTab !== "vehicle-details"}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.key} className="flex flex-col gap-2">
                    <label htmlFor={f.key} className="text-sm font-medium text-zinc-900">
                      {f.label}
                    </label>
                    {f.key === "status" ? (
                      <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={(e) => onChange("status", e.target.value)}
                        className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                      >
                        <option value="">Select status</option>
                        <option value="Used">Used</option>
                        <option value="New">New</option>
                        <option value="Demo">Demo</option>
                      </select>
                    ) : (
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
                        className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section
              id="order-options-panel"
              role="tabpanel"
              hidden={activeTab !== "order-options"}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="finance_method" className="text-sm font-medium text-zinc-900">
                    Finance Method
                  </label>
                  <select
                    id="finance_method"
                    name="finance_method"
                    value={form.finance_method}
                    onChange={(e) =>
                      onChange(
                        "finance_method",
                        e.target.value as "" | "Cash" | "HP" | "PCP",
                      )
                    }
                    className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                  >
                    <option value="">Select finance method</option>
                    <option value="Cash">Cash</option>
                    <option value="HP">HP</option>
                    <option value="PCP">PCP</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <div className="flex items-center gap-2">
                    <input
                      id="hasTradeIn"
                      name="hasTradeIn"
                      type="checkbox"
                      checked={form.hasTradeIn}
                      onChange={(e) => {
                        setSuccess(false);
                        setForm((prev) => ({ ...prev, hasTradeIn: e.target.checked }));
                      }}
                      className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900/20"
                    />
                    <label htmlFor="hasTradeIn" className="text-sm text-zinc-900">
                      Has Trade-In
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="internal-notes" className="text-sm font-medium text-zinc-900">
                  Internal Notes
                </label>
                <textarea
                  id="internal-notes"
                  name="internal-notes"
                  value={form["internal-notes"]}
                  onChange={(e) => onChange("internal-notes", e.target.value)}
                  rows={5}
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                />
              </div>
            </section>

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-zinc-200 pt-6">
              <div className="text-xs text-zinc-500">
                Active tab: <span id="active-tab-indicator">{activeTab}</span>
              </div>
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
