import Link from "next/link";

export function Breadcrumb({
  crumbs,
}: {
  crumbs: { name: string; path?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        return (
          <span key={i}>
            {c.path && !last ? (
              <Link href={c.path} className="breadcrumb-link">
                {c.name}
              </Link>
            ) : (
              <span aria-current={last ? "page" : undefined}>{c.name}</span>
            )}
            {!last && <span className="breadcrumb-sep">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
