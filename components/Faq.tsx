"use client";

import { useState } from "react";
import { ChevronIcon } from "./icons";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="faq-item" key={i}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <ChevronIcon
                style={{
                  flex: "none",
                  transition: "transform 0.18s ease",
                  transform: isOpen ? "rotate(180deg)" : "none",
                  color: "var(--gold)",
                }}
              />
            </button>
            {isOpen && <p className="faq-a">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
